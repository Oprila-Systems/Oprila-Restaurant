// ================================================
// FileName:        ConverseTurnRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Contracts.Requests
// Description:     Represents a conversation turn request with session ID and user message.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Conversation.Contracts.Requests;

public class ConverseTurnRequest
{
    [Required][MaxLength(200)] public string SessionId { get; set; } = string.Empty;
    [Required][MaxLength(2000)] public string UserMessage { get; set; } = string.Empty;
}