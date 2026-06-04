// ================================================
// FileName:        CallSessionResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Contracts.Responses
// Description:     Represents call session API response.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.Conversation.Contracts.Responses;

public class CallSessionResponse
{
    public string SessionId { get; set; } = string.Empty;
    public string CallerPhone { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int? CreatedAppointmentId { get; set; }
    public int TurnCount { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? EndedAt { get; set; }
}