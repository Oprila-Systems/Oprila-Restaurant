// ================================================
// FileName:        VoiceBookingService.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Services
// Description:     Implements a voice-based booking service using OpenAI's GPT models to handle phone call interactions for restaurant reservations.
// Created:         23/04/2026
// Modified:        23/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using RestaurantApi.AppointmentBooking.Contracts.Requests;
using RestaurantApi.AppointmentBooking.Contracts.Responses;
using RestaurantApi.Conversation.Contracts.Requests;
using RestaurantApi.Conversation.Contracts.Responses;
using RestaurantApi.Conversation.Enums;
using RestaurantApi.Conversation.Models;
using RestaurantApi.Conversation.Services;
using RestaurantApi.Shared.Data;

namespace RestaurantApi.AppointmentBooking.Services;

public class VoiceBookingService : IVoiceBookingService
{
    // Internal DTO for OpenAI extraction result
    private sealed class ExtractedBooking
    {
        [JsonPropertyName("customerName")] public string? CustomerName { get; set; }
        [JsonPropertyName("customerPhone")] public string? CustomerPhone { get; set; }
        [JsonPropertyName("date")] public string? Date { get; set; }   // YYYY-MM-DD
        [JsonPropertyName("time")] public string? Time { get; set; }   // HH:mm
        [JsonPropertyName("guestCount")] public int? GuestCount { get; set; }
        [JsonPropertyName("specialRequests")] public string? SpecialRequests { get; set; }
        [JsonPropertyName("isComplete")] public bool IsComplete { get; set; }
    }

    private readonly AppDbContext _db;
    private readonly IAppointmentService _appointments;
    private readonly IHttpClientFactory _httpFactory;
    private readonly IConfiguration _config;
    private readonly ILogger<VoiceBookingService> _logger;

    public VoiceBookingService(
        AppDbContext db,
        IAppointmentService appointments,
        IHttpClientFactory httpFactory,
        IConfiguration config,
        ILogger<VoiceBookingService> logger)
    {
        _db = db;
        _appointments = appointments;
        _httpFactory = httpFactory;
        _config = config;
        _logger = logger;
    }

    // ═══════════════════════════════════════════════════════════════
    //  START SESSION
    // ═══════════════════════════════════════════════════════════════

    public async Task<StartCallResponse> StartSessionAsync(string callerPhone)
    {
        var systemPrompt = await BuildSystemPromptAsync();

        // Build the initial turns list before the first save
        var initialTurns = new List<ConversationTurn>
        {
            new() { Role = "system", Content = systemPrompt }
        };

        var session = new CallSession
        {
            CallerPhone = callerPhone,
            Turns = initialTurns
        };

        _db.CallSessions.Add(session);
        await _db.SaveChangesAsync();   // saves system prompt turn

        // Generate greeting using the system prompt as context
        var greeting = await ChatAsync(session.Turns);

        // ⚠ CRITICAL: EF Core cannot detect mutations to JSON-serialised list properties.
        // We must replace the list reference AND mark the property as modified explicitly.
        session.Turns = new List<ConversationTurn>(session.Turns)
        {
            new() { Role = "assistant", Content = greeting, CreatedAt = DateTime.UtcNow }
        };
        _db.Entry(session).Property(s => s.Turns).IsModified = true;
        await _db.SaveChangesAsync();

        return new StartCallResponse
        {
            SessionId = session.SessionId,
            WelcomeMessage = greeting
        };
    }

    // ═══════════════════════════════════════════════════════════════
    //  PROCESS TURN
    // ═══════════════════════════════════════════════════════════════

    public async Task<ConversationTurnResponse> ProcessTurnAsync(ConverseTurnRequest req)
    {
        var session = await _db.CallSessions
            .FirstOrDefaultAsync(s => s.SessionId == req.SessionId)
            ?? throw new KeyNotFoundException($"Session '{req.SessionId}' not found.");

        if (session.Status != CallSessionStatus.Active)
            throw new InvalidOperationException($"Session is {session.Status}, not Active.");

        _logger.LogInformation(
            "Processing turn {TurnNum} for session {SessionId} | History length: {Count} turns",
            session.Turns.Count(t => t.Role != "system") + 1,
            session.SessionId,
            session.Turns.Count);

        // Build updated turns list with new user message appended
        // ⚠ We copy to a NEW list so EF Core detects the reference change
        var updatedTurns = new List<ConversationTurn>(session.Turns)
        {
            new() { Role = "user", Content = req.UserMessage, CreatedAt = DateTime.UtcNow }
        };

        // Send the FULL conversation history (including all prior turns) to OpenAI
        var reply = await ChatAsync(updatedTurns);

        // Append assistant reply to history
        updatedTurns.Add(new ConversationTurn
        {
            Role = "assistant",
            Content = reply,
            CreatedAt = DateTime.UtcNow
        });

        // Assign new list reference so EF change tracker detects the mutation
        session.Turns = updatedTurns;
        _db.Entry(session).Property(s => s.Turns).IsModified = true;

        // Try to extract a complete booking from the full conversation
        AppointmentResponse? booked = null;
        var extracted = await TryExtractBookingAsync(updatedTurns);

        if (extracted?.IsComplete == true)
        {
            try
            {
                booked = await BookFromExtractionAsync(extracted, session);
                session.Status = CallSessionStatus.BookingCompleted;
                session.CreatedAppointmentId = booked.Id;
                session.EndedAt = DateTime.UtcNow;
                _logger.LogInformation(
                    "Booking completed via AI: SessionId={S}, AppointmentId={A}",
                    session.SessionId, booked.Id);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Booking extraction failed for session {S}", session.SessionId);
            }
        }

        await _db.SaveChangesAsync();   // persists updated Turns + any status change

        return new ConversationTurnResponse
        {
            SessionId = session.SessionId,
            AssistantMessage = reply,
            IsBookingComplete = booked is not null,
            BookedAppointment = booked
        };
    }

    // ═══════════════════════════════════════════════════════════════
    //  READ
    // ═══════════════════════════════════════════════════════════════

    public async Task<CallSessionResponse?> GetSessionAsync(string sessionId)
    {
        var s = await _db.CallSessions.AsNoTracking().FirstOrDefaultAsync(x => x.SessionId == sessionId);
        return s is null ? null : MapSession(s);
    }

    public async Task<ConversationHistoryResponse?> GetHistoryAsync(string sessionId)
    {
        var session = await _db.CallSessions
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.SessionId == sessionId);

        if (session is null) return null;

        // Exclude the system prompt from the public history view
        var visibleTurns = session.Turns
            .Where(t => t.Role != "system")
            .Select(t => new ConversationHistoryTurnResponse
            {
                Role = t.Role,
                Content = t.Content,
                CreatedAt = t.CreatedAt
            })
            .ToList();

        return new ConversationHistoryResponse
        {
            SessionId = session.SessionId,
            CallerPhone = session.CallerPhone,
            Status = session.Status.ToString(),
            CreatedAppointmentId = session.CreatedAppointmentId,
            StartedAt = session.StartedAt,
            EndedAt = session.EndedAt,
            TotalTurns = visibleTurns.Count,
            Turns = visibleTurns
        };
    }

    public async Task<List<CallSessionResponse>> GetAllSessionsAsync(int page, int pageSize)
    {
        return await _db.CallSessions.AsNoTracking()
            .OrderByDescending(s => s.StartedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(s => MapSession(s))
            .ToListAsync();
    }

    public async Task AbandonSessionAsync(string sessionId)
    {
        var session = await _db.CallSessions.FirstOrDefaultAsync(s => s.SessionId == sessionId);
        if (session is null) return;
        session.Status = CallSessionStatus.Abandoned;
        session.EndedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
    }

    // ═══════════════════════════════════════════════════════════════
    //  OPENAI
    // ═══════════════════════════════════════════════════════════════

    private async Task<string> ChatAsync(List<ConversationTurn> turns)
    {
        var client = MakeHttpClient();

        var messages = turns.Select(t => new { role = t.Role, content = t.Content }).ToList();

        var body = new
        {
            model = _config["OpenAI:Model"] ?? "gpt-4o-mini",
            messages,
            temperature = 0.7,
            max_tokens = 400
        };

        var res = await client.PostAsync(
            "https://api.openai.com/v1/chat/completions",
            new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json"));

        res.EnsureSuccessStatusCode();

        using var doc = JsonDocument.Parse(await res.Content.ReadAsStringAsync());
        return doc.RootElement
                  .GetProperty("choices")[0]
                  .GetProperty("message")
                  .GetProperty("content")
                  .GetString() ?? string.Empty;
    }

    /// <summary>
    /// Separate extraction call – keeps conversation model clean.
    /// Returns null if booking is incomplete.
    /// </summary>
    private async Task<ExtractedBooking?> TryExtractBookingAsync(List<ConversationTurn> turns)
    {
        var convoText = string.Join("\n", turns
            .Where(t => t.Role != "system")
            .Select(t => $"{t.Role.ToUpper()}: {t.Content}"));

        var extractPrompt = $$$"""
            Analyse this conversation and extract table-booking information.
            Today's date: {{{DateTime.UtcNow:yyyy-MM-dd}}}
 
            Respond ONLY with valid JSON (no markdown, no preamble):
            {"isComplete": true | false,
              "customerName":    "<full name or null>",
              "customerPhone":   "<phone or null>",
              "date":            "<YYYY-MM-DD or null>",
              "time":            "<HH:mm or null>",
              "guestCount":      <number or null>,
              "specialRequests": "<text or null>"
            }
 
            isComplete must be true ONLY when name, date, time, and guestCount are all confirmed by the customer.
 
            Conversation:
            {{{convoText}}}
            """;

        var client = MakeHttpClient();
        var body = new
        {
            model = "gpt-4o-mini",
            messages = new[] { new { role = "user", content = extractPrompt } },
            temperature = 0,
            max_tokens = 300
        };

        var res = await client.PostAsync(
            "https://api.openai.com/v1/chat/completions",
            new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json"));

        if (!res.IsSuccessStatusCode) return null;

        using var doc = JsonDocument.Parse(await res.Content.ReadAsStringAsync());
        var text = doc.RootElement
                      .GetProperty("choices")[0]
                      .GetProperty("message")
                      .GetProperty("content")
                      .GetString() ?? "";

        return JsonSerializer.Deserialize<ExtractedBooking>(text,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
    }

    // ═══════════════════════════════════════════════════════════════
    //  HELPERS
    // ═══════════════════════════════════════════════════════════════

    private async Task<AppointmentResponse> BookFromExtractionAsync(
        ExtractedBooking data, CallSession session)
    {
        if (!DateTime.TryParse(data.Date, out var date))
            throw new InvalidOperationException("Could not parse booking date.");
        if (!TimeSpan.TryParse(data.Time, out var start))
            throw new InvalidOperationException("Could not parse booking time.");

        var end = start.Add(TimeSpan.FromHours(1.5));

        return await _appointments.CreateAsync(new CreateAppointmentRequest
        {
            CustomerName = data.CustomerName ?? session.CallerPhone,
            CustomerPhone = data.CustomerPhone ?? session.CallerPhone,
            GuestCount = data.GuestCount ?? 2,
            AppointmentDate = date,
            StartTime = $"{start.Hours:D2}:{start.Minutes:D2}",
            EndTime = $"{end.Hours:D2}:{end.Minutes:D2}",
            SpecialRequests = data.SpecialRequests,
            Source = "PhoneCall"
        }, session.SessionId);
    }

    private async Task<string> BuildSystemPromptAsync()
    {
        var name = _config["Restaurant:Name"] ?? "our restaurant";
        var phone = _config["Restaurant:Phone"] ?? "";
        var hours = _config["Restaurant:OpeningHours"] ?? "12:00 – 22:00";

        // Build menu summary
        var categories = await _db.MenuCategories
            .Include(c => c.Items.Where(i => i.IsAvailable))
            .Where(c => c.IsActive)
            .OrderBy(c => c.DisplayOrder)
            .ToListAsync();

        var menuSummary = new StringBuilder();
        foreach (var cat in categories)
        {
            menuSummary.AppendLine($"\n{cat.Name}:");
            foreach (var item in cat.Items.Take(6))   // limit to avoid token bloat
            {
                var tags = new[] { item.IsVegan ? "vegan" : item.IsVegetarian ? "vegetarian" : "", item.IsGlutenFree ? "GF" : "" }
                            .Where(t => t.Length > 0);
                var tagStr = tags.Any() ? $" [{string.Join("/", tags)}]" : "";
                menuSummary.AppendLine($"  • {item.Name} – ${item.Price:F2}{tagStr}");
            }
        }

        return $"""
            You are a warm, professional voice booking assistant for {name}.
            Phone: {phone} | Hours: {hours}
 
            Your role:
            1. Help callers book a table – collect: full name, date, time, guest count.
            2. Answer questions about the menu briefly.
            3. Keep each response to 2-3 short sentences (this is a phone call).
            4. When you have all details, confirm them back to the caller, then say:
               "Your booking is confirmed! We look forward to seeing you."
 
            Our menu highlights:
            {menuSummary}
 
            Rules:
            - Today is {DateTime.UtcNow:dddd, d MMMM yyyy}.
            - We take bookings noon to 10 PM, reservations are 90 minutes.
            - Always confirm the date, time, and guest count before finalising.
            - If a requested slot may be unavailable, suggest alternatives.
            - Be conversational, friendly, and concise.
            """;
    }

    private HttpClient MakeHttpClient()
    {
        var apiKey = _config["OpenAI:ApiKey"]
            ?? throw new InvalidOperationException("OpenAI:ApiKey not configured.");

        var client = _httpFactory.CreateClient("OpenAI");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        client.Timeout = TimeSpan.FromSeconds(30);
        return client;
    }

    public string GetPreferredVoice() =>
        _config["OpenAI:TtsVoice"] ?? SpeechService.Voices.Nova;

    private static CallSessionResponse MapSession(CallSession s) => new()
    {
        SessionId = s.SessionId,
        CallerPhone = s.CallerPhone,
        Status = s.Status.ToString(),
        CreatedAppointmentId = s.CreatedAppointmentId,
        TurnCount = s.Turns.Count(t => t.Role != "system"),
        StartedAt = s.StartedAt,
        EndedAt = s.EndedAt
    };
}
