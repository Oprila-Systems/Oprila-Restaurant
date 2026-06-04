// ================================================
// FileName:        TtsRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Contracts.Requests
// Description:     Request model for text-to-speech synthesis.
// Created:         28/04/2026
// Modified:        28/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Conversation.Contracts.Requests;

public class TtsRequest
{
    [Required]
    [MaxLength(4096)]
    public string Text { get; set; } = string.Empty;

    /// <summary>alloy | echo | fable | onyx | nova | shimmer</summary>
    [MaxLength(20)]
    public string? Voice { get; set; } = "nova";

    /// <summary>tts-1 (fast) | tts-1-hd (higher quality, slower)</summary>
    [MaxLength(20)]
    public string? Model { get; set; } = "tts-1";
}