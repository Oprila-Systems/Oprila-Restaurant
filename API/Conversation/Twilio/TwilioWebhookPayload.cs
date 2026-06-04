// ================================================
// FileName:        TwilioWebhookPayload.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Contracts.Responses
// Description:     Represents Twilio webhook payload.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.Conversation.Twilio;

public class TwilioWebhookPayload
{
    public string CallSid { get; set; } = string.Empty;
    public string From { get; set; } = string.Empty;
    public string To { get; set; } = string.Empty;
    public string SpeechResult { get; set; } = string.Empty;
    public string CallStatus { get; set; } = string.Empty;
    public string Direction { get; set; } = string.Empty;
}