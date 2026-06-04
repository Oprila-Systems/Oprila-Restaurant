// ================================================
// FileName:        SttResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Contracts.Responses
// Description:     Represents speech-to-text API response.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.Conversation.Contracts.Responses;

/// <summary>Returned by standalone STT.</summary>
public class SttResponse
{
    public string Transcript { get; set; } = string.Empty;
    public string Language { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public long FileSizeKb { get; set; }
}