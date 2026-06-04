// ================================================
// FileName:        StartCallRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Contracts.Requests
// Description:     Represents a call initiation request with caller phone number.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Conversation.Contracts.Requests;

public class StartCallRequest
{
    [Required]
    [Phone]
    [MaxLength(30)]
    public string CallerPhone { get; set; } = string.Empty;
}