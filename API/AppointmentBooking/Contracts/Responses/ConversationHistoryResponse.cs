// ================================================
// FileName:        ConversationHistoryResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Contracts.Responses
// Description:     Represents a conversation history API response.
// Created:         27/04/2026
// Modified:        27/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.AppointmentBooking.Contracts.Responses;

/// <summary>Full conversation history for a session, used for review and debugging.</summary>
public class ConversationHistoryResponse
{
    public string SessionId { get; set; } = string.Empty;
    public string CallerPhone { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int? CreatedAppointmentId { get; set; }
    public int TotalTurns { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? EndedAt { get; set; }
    public List<ConversationHistoryTurnResponse> Turns { get; set; } = new();
}