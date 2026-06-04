// ================================================
// FileName:        ISpeechService.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Services
// Description:     Defines the interface for speech processing services, including speech-to-text and text-to-speech functionalities.
// Created:         29/04/2026
// Modified:        29/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.AppointmentBooking.Services;

public interface ISpeechService
{
    /// <summary>
    /// Speech-to-Text via OpenAI Whisper.
    /// Accepts any audio format Whisper supports (mp3, mp4, wav, webm, m4a, ogg, flac).
    /// Returns the transcribed text.
    /// </summary>
    Task<string> TranscribeAsync(Stream audioStream, string fileName, string? language = "en");

    /// <summary>
    /// Text-to-Speech via OpenAI TTS.
    /// Returns raw MP3 audio bytes ready to stream back to the client.
    /// </summary>
    Task<byte[]> SynthesizeAsync(string text, string voice = "alloy", string model = "tts-1");
}