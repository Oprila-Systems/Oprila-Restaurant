// ================================================
// FileName:        ConversationTurnResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Contracts.Responses
// Description:     Represents conversation turn API response.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using RestaurantApi.AppointmentBooking.Contracts.Responses;

namespace RestaurantApi.Conversation.Contracts.Responses;

public class ConversationTurnResponse
{
    public string SessionId { get; set; } = string.Empty;
    public string AssistantMessage { get; set; } = string.Empty;
    public bool IsBookingComplete { get; set; }
    public AppointmentResponse? BookedAppointment { get; set; }
}