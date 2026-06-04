// ================================================
// FileName:        CallSession.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Models
// Description:     Represents a call session with details and status information.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using RestaurantApi.Conversation.Enums;

namespace RestaurantApi.Conversation.Models;

public class CallSession
{
    public int Id { get; set; }
    public string SessionId { get; set; } = Guid.NewGuid().ToString();
    public string CallerPhone { get; set; } = string.Empty;
    public CallSessionStatus Status { get; set; } = CallSessionStatus.Active;
    public List<ConversationTurn> Turns { get; set; } = new();
    public int? CreatedAppointmentId { get; set; }
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime? EndedAt { get; set; }
}