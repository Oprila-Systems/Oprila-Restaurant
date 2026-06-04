// ================================================
// FileName:        TtsResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Contracts.Responses
// Description:     Represents text-to-speech API response.
// Created:         28/04/2026
// Modified:        28/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.Conversation.Contracts.Responses;

public class TtsResponse
{
    public string AudioB64 { get; set; } = string.Empty;
    public string AudioFormat { get; set; } = "mp3";
    public string Voice { get; set; } = string.Empty;
    public int CharCount { get; set; }
}