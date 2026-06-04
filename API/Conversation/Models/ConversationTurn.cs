// ================================================
// FileName:        ConversationTurn.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Models
// Description:     Represents a conversation turn with details and timing information.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.Conversation.Models;

public class ConversationTurn
{
    public string Role { get; set; } = string.Empty;   // system | user | assistant
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}