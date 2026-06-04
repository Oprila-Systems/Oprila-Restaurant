// ================================================
// FileName:        StartCallResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Contracts.Responses
// Description:     Represents start call API response.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================


namespace RestaurantApi.Conversation.Contracts.Responses;

public class StartCallResponse
{
    public string SessionId { get; set; } = string.Empty;
    public string WelcomeMessage { get; set; } = string.Empty;
}