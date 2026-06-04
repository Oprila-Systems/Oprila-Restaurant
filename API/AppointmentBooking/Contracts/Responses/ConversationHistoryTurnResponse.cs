// ================================================
// FileName:        ConversationHistoryTurnResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Contracts.Responses
// Description:     Represents a conversation turn API response.
// Created:         27/04/2026
// Modified:        27/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.AppointmentBooking.Contracts.Responses;

/// <summary>A single visible turn in the conversation (system prompt excluded).</summary>
public class ConversationHistoryTurnResponse
{
    public string Role { get; set; } = string.Empty;   // user | assistant
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}