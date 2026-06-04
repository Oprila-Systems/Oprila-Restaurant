// ================================================
// FileName:        SpeechService.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Services
// Description:     Implementation for speech processing services.
// Created:         28/04/2026
// Modified:        28/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace RestaurantApi.Conversation.Services;

public class SpeechService : ISpeechService
{
    // OpenAI TTS voices available for use
    public static class Voices
    {
        public const string Alloy = "alloy";    // neutral
        public const string Echo = "echo";     // male
        public const string Fable = "fable";    // british
        public const string Onyx = "onyx";     // deep male
        public const string Nova = "nova";     // female (warm) ← recommended for restaurant
        public const string Shimmer = "shimmer";  // soft female
    }

    // Whisper supports these formats
    private static readonly HashSet<string> SupportedAudioExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".mp3", ".mp4", ".mpeg", ".mpga", ".m4a", ".wav", ".webm", ".ogg", ".flac"
    };

    private readonly IHttpClientFactory _httpFactory;
    private readonly IConfiguration _config;
    private readonly ILogger<SpeechService> _logger;

    public SpeechService(
        IHttpClientFactory httpFactory,
        IConfiguration config,
        ILogger<SpeechService> logger)
    {
        _httpFactory = httpFactory;
        _config = config;
        _logger = logger;
    }

    // ═══════════════════════════════════════════════════════════════
    //  STT — Whisper
    // ═══════════════════════════════════════════════════════════════

    public async Task<string> TranscribeAsync(Stream audioStream, string fileName, string? language = "en")
    {
        ValidateAudioFileName(fileName);

        _logger.LogInformation("Transcribing audio file: {File} ({Bytes} bytes)",
            fileName, audioStream.Length);

        var client = MakeHttpClient();

        // Whisper requires multipart/form-data
        using var form = new MultipartFormDataContent();
        using var content = new StreamContent(audioStream);

        content.Headers.ContentType = new MediaTypeHeaderValue(GetMimeType(fileName));
        form.Add(content, "file", fileName);
        form.Add(new StringContent("whisper-1"), "model");
        form.Add(new StringContent("text"), "response_format");

        if (!string.IsNullOrWhiteSpace(language))
            form.Add(new StringContent(language), "language");

        var res = await client.PostAsync("https://api.openai.com/v1/audio/transcriptions", form);

        if (!res.IsSuccessStatusCode)
        {
            var err = await res.Content.ReadAsStringAsync();
            _logger.LogError("Whisper transcription failed: {Status} – {Error}", res.StatusCode, err);
            throw new InvalidOperationException($"Transcription failed: {res.StatusCode}");
        }

        var transcript = await res.Content.ReadAsStringAsync();
        _logger.LogInformation("Transcribed: \"{Text}\"", transcript.Trim());
        return transcript.Trim();
    }

    // ═══════════════════════════════════════════════════════════════
    //  TTS — OpenAI TTS
    // ═══════════════════════════════════════════════════════════════

    public async Task<byte[]> SynthesizeAsync(
        string text,
        string voice = Voices.Nova,
        string model = "tts-1")
    {
        if (string.IsNullOrWhiteSpace(text))
            throw new ArgumentException("Text cannot be empty.", nameof(text));

        // OpenAI TTS has a 4096-character input limit
        if (text.Length > 4096)
            text = text[..4096];

        _logger.LogInformation("Synthesizing TTS: voice={Voice} model={Model} length={Len}",
            voice, model, text.Length);

        var client = MakeHttpClient();

        var body = new
        {
            model,
            input = text,
            voice,
            response_format = "mp3",
            speed = 1.0
        };

        var res = await client.PostAsync(
            "https://api.openai.com/v1/audio/speech",
            new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json"));

        if (!res.IsSuccessStatusCode)
        {
            var err = await res.Content.ReadAsStringAsync();
            _logger.LogError("TTS synthesis failed: {Status} – {Error}", res.StatusCode, err);
            throw new InvalidOperationException($"TTS synthesis failed: {res.StatusCode}");
        }

        var audioBytes = await res.Content.ReadAsByteArrayAsync();
        _logger.LogInformation("TTS audio generated: {Bytes} bytes", audioBytes.Length);
        return audioBytes;
    }

    // ═══════════════════════════════════════════════════════════════
    //  HELPERS
    // ═══════════════════════════════════════════════════════════════

    private HttpClient MakeHttpClient()
    {
        var apiKey = _config["OpenAI:ApiKey"]
            ?? throw new InvalidOperationException("OpenAI:ApiKey not configured.");

        var client = _httpFactory.CreateClient("OpenAI");
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);
        client.Timeout = TimeSpan.FromSeconds(60);   // audio can take longer
        return client;
    }

    private static void ValidateAudioFileName(string fileName)
    {
        var ext = Path.GetExtension(fileName);
        if (!SupportedAudioExtensions.Contains(ext))
            throw new ArgumentException(
                $"Unsupported audio format '{ext}'. Supported: {string.Join(", ", SupportedAudioExtensions)}");
    }

    private static string GetMimeType(string fileName) =>
        Path.GetExtension(fileName).ToLowerInvariant() switch
        {
            ".mp3" => "audio/mpeg",
            ".mp4" => "audio/mp4",
            ".mpeg" => "audio/mpeg",
            ".mpga" => "audio/mpeg",
            ".m4a" => "audio/mp4",
            ".wav" => "audio/wav",
            ".webm" => "audio/webm",
            ".ogg" => "audio/ogg",
            ".flac" => "audio/flac",
            _ => "application/octet-stream"
        };
}