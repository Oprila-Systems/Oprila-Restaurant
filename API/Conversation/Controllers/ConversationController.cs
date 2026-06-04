// ================================================
// FileName:        VoiceController.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantAPI.Conversation.Controllers
// Description:     API controller for AI-powered voice booking sessions and Twilio webhooks.
// Created:         23/04/2026
// Modified:        23/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantApi.AppointmentBooking.Contracts.Responses;
using RestaurantApi.AppointmentBooking.Services;
using RestaurantApi.Conversation.Contracts.Requests;
using RestaurantApi.Conversation.Contracts.Responses;
using RestaurantApi.Conversation.Twilio;
using RestaurantApi.Shared.Responses;

namespace RestaurantApi.Conversation.Controllers;

/// <summary>
/// AI-powered voice booking controller.
///
/// ┌─────────────────────────────────────────────────────┐
/// │  Flow A – API / Mobile / Testing                    │
/// │  POST /api/voice/sessions/start                     │
/// │  POST /api/voice/sessions/converse  (repeat)        │
/// │  POST /api/voice/sessions/{id}/end                  │
/// ├─────────────────────────────────────────────────────┤
/// │  Flow B – Real Phone (Twilio)                       │
/// │  Set your Twilio Voice URL →                        │
/// │    POST /api/voice/twilio/incoming                  │ 
/// │  Speech gather callback →                           │
/// │    POST /api/voice/twilio/gather?sessionId=...      │
/// └─────────────────────────────────────────────────────┘
/// </summary>
[ApiController]
[Route("api/voice")]
[Produces("application/json")]
public class VoiceController(IVoiceBookingService voice, ILogger<VoiceController> logger) : ControllerBase
{
    private readonly IVoiceBookingService _voice = voice;
    private readonly ILogger<VoiceController> _logger = logger;

    // ═══════════════════════════════════════════════════════════════
    //  SESSION MANAGEMENT  (API Flow)
    // ═══════════════════════════════════════════════════════════════

    /// <summary>Start a new AI call session. Returns a sessionId and opening greeting.</summary>
    [HttpPost("sessions/start")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<StartCallResponse>), 200)]
    public async Task<IActionResult> StartSession([FromBody] StartCallRequest req)
    {
        var result = await _voice.StartSessionAsync(req.CallerPhone);
        return Ok(ApiResponse<StartCallResponse>.Ok(result, "Session started."));
    }

    /// <summary>
    /// Send one user message and receive the AI's reply.
    /// When IsBookingComplete=true, the BookedAppointment field contains the confirmed booking.
    /// Keep calling this until IsBookingComplete=true or you end the session.
    /// </summary>
    [HttpPost("sessions/converse")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<ConversationTurnResponse>), 200)]
    public async Task<IActionResult> Converse([FromBody] ConverseTurnRequest req)
    {
        var result = await _voice.ProcessTurnAsync(req);
        return Ok(ApiResponse<ConversationTurnResponse>.Ok(result));
    }

    /// <summary>Get the current state of a session (status, turn count, linked appointment).</summary>
    [HttpGet("sessions/{sessionId}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<CallSessionResponse>), 200)]
    public async Task<IActionResult> GetSession(string sessionId)
    {
        var session = await _voice.GetSessionAsync(sessionId);
        if (session is null) return NotFound(ApiResponse<object>.Fail("Session not found."));
        return Ok(ApiResponse<CallSessionResponse>.Ok(session));
    }

    /// <summary>
    /// Get the full conversation history for a session.
    /// Returns every user and assistant turn in order (system prompt excluded).
    /// Useful for reviewing what was said, debugging extraction, and audit logs.
    /// </summary>
    [HttpGet("sessions/{sessionId}/history")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<ConversationHistoryResponse>), 200)]
    public async Task<IActionResult> GetHistory(string sessionId)
    {
        var history = await _voice.GetHistoryAsync(sessionId);
        if (history is null) return NotFound(ApiResponse<object>.Fail("Session not found."));
        return Ok(ApiResponse<ConversationHistoryResponse>.Ok(history));
    }

    /// <summary>End / abandon an active session without booking.</summary>
    [HttpPost("sessions/{sessionId}/end")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<object>), 200)]
    public async Task<IActionResult> EndSession(string sessionId)
    {
        await _voice.AbandonSessionAsync(sessionId);
        return Ok(ApiResponse<object>.Ok(null!, "Session ended."));
    }

    // ═══════════════════════════════════════════════════════════════
    //  ADMIN – Session History
    // ═══════════════════════════════════════════════════════════════

    /// <summary>Get paginated call session history. [Admin | Staff]</summary>
    [HttpGet("sessions")]
    [Authorize(Roles = "Admin,Staff")]
    [ProducesResponseType(typeof(ApiResponse<List<CallSessionResponse>>), 200)]
    public async Task<IActionResult> GetSessions(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var data = await _voice.GetAllSessionsAsync(page, pageSize);
        return Ok(ApiResponse<List<CallSessionResponse>>.Ok(data));
    }

    // ═══════════════════════════════════════════════════════════════
    //  TWILIO WEBHOOKS
    // ═══════════════════════════════════════════════════════════════

    /// <summary>
    /// Twilio Voice webhook – handles an incoming phone call.
    /// Returns TwiML that greets the caller and opens a speech-gather loop.
    ///
    /// Configure your Twilio number's Voice URL to:
    ///   https://your-domain.com/api/voice/twilio/incoming
    ///   Method: HTTP POST
    /// </summary>
    [HttpPost("twilio/incoming")]
    [AllowAnonymous]
    [Produces("application/xml")]
    public async Task<ContentResult> TwilioIncoming([FromForm] TwilioWebhookPayload payload)
    {
        _logger.LogInformation("Incoming call: From={From} CallSid={Sid}", payload.From, payload.CallSid);

        StartCallResponse session;
        try
        {
            session = await _voice.StartSessionAsync(payload.From);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to start session for {From}", payload.From);
            return Twiml(ErrorTwiml());
        }

        var gatherUrl = BuildGatherUrl(session.SessionId);

        var twiml = $"""
            <?xml version="1.0" encoding="UTF-8"?>
            <Response>
                <Say voice="Polly.Joanna-Neural">{Xml(session.WelcomeMessage)}</Say>
                <Gather input="speech" action="{gatherUrl}" method="POST"
                        speechTimeout="auto" timeout="10" language="en-US" enhanced="true" speechModel="phone_call">
                    <Say voice="Polly.Joanna-Neural">Please go ahead.</Say>
                </Gather>
                
            </Response>
            """;
        // <Redirect method="POST">{gatherUrl}</Redirect>
        return Twiml(twiml);
    }

    /// <summary>
    /// Twilio Voice webhook – processes each caller utterance.
    /// Speech-to-text is handled by Twilio; the result lands in SpeechResult.
    /// </summary>
    [HttpGet("twilio/gather")]
    [AllowAnonymous]
    [Produces("application/xml")]
    public async Task<ContentResult> TwilioGather(
        [FromQuery] string sessionId,
        [FromQuery] TwilioWebhookPayload payload)
    {
        _logger.LogInformation("Speech received: Session={S} Speech=\"{T}\"", sessionId, payload.SpeechResult);

        var gatherUrl = BuildGatherUrl(sessionId);

        if (string.IsNullOrWhiteSpace(payload.SpeechResult))
        {
            var retry = $"""
                <?xml version="1.0" encoding="UTF-8"?>
                <Response>
                    <Say voice="Polly.Joanna-Neural">Sorry, I didn't catch that. Could you please repeat?</Say>
                    <Gather input="speech" action="{gatherUrl}" method="POST"
                            speechTimeout="auto" timeout="10" language="en-US" enhanced="true" speechModel="phone_call"/>
                </Response>
                """;
            return Twiml(retry);
        }

        ConversationTurnResponse turn;
        try
        {
            turn = await _voice.ProcessTurnAsync(new ConverseTurnRequest
            {
                SessionId = sessionId,
                UserMessage = payload.SpeechResult
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Turn processing failed for session {S}", sessionId);
            return Twiml(ErrorTwiml());
        }

        string twiml;

        if (turn.IsBookingComplete && turn.BookedAppointment is not null)
        {
            var appt = turn.BookedAppointment;
            var summary = $"Your table for {appt.GuestCount} guests is confirmed for " +
                          $"{DateTime.Parse(appt.AppointmentDate):dddd, MMMM d} at {appt.StartTime}. " +
                          $"We look forward to welcoming you. Goodbye!";

            twiml = $"""
                <?xml version="1.0" encoding="UTF-8"?>
                <Response>
                    <Say voice="Polly.Joanna-Neural">{Xml(turn.AssistantMessage)}</Say>
                    <Pause length="1"/>
                    <Say voice="Polly.Joanna-Neural">{Xml(summary)}</Say>
                    <Hangup/>
                </Response>
                """;
        }
        else
        {
            twiml = $"""
                <?xml version="1.0" encoding="UTF-8"?>
                <Response>
                    <Say voice="Polly.Joanna-Neural">{Xml(turn.AssistantMessage)}</Say>
                    <Gather input="speech" action="{gatherUrl}" method="POST"
                            speechTimeout="auto" timeout="10" language="en-US" enhanced="true" speechModel="phone_call"/>
                    <Say voice="Polly.Joanna-Neural">I didn't catch that. Please try again or call us back. Goodbye!</Say>
                    <Hangup/>
                </Response>
                """;
        }

        return Twiml(twiml);
    }

    // ═══════════════════════════════════════════════════════════════
    //  HELPERS
    // ═══════════════════════════════════════════════════════════════

    private string BuildGatherUrl(string sessionId)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        return $"{baseUrl}/api/voice/twilio/gather?sessionId={Uri.EscapeDataString(sessionId)}";
    }

    private static ContentResult Twiml(string xml) =>
        new() { Content = xml, ContentType = "application/xml" };

    private static string ErrorTwiml() =>
        """
        <?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <Say voice="Polly.Joanna-Neural">
                I'm sorry, something went wrong on our end. Please call us directly. Goodbye!
            </Say>
            <Hangup/>
        </Response>
        """;

    /// <summary>Escape reserved XML characters.</summary>
    private static string Xml(string s) =>
        s.Replace("&", "&amp;")
         .Replace("<", "&lt;")
         .Replace(">", "&gt;")
         .Replace("\"", "&quot;")
         .Replace("'", "&apos;");
}