// ================================================
// FileName:        IVoiceBookingService.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Services
// Description:     Defines the interface for voice-based restaurant booking services.
// Created:         23/04/2026
// Modified:        23/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using RestaurantApi.Conversation.Contracts.Requests;
using RestaurantApi.Conversation.Contracts.Responses;
using RestaurantApi.AppointmentBooking.Contracts.Responses;

namespace RestaurantApi.AppointmentBooking.Services;

public interface IVoiceBookingService
{
    Task<StartCallResponse> StartSessionAsync(string callerPhone);
    Task<ConversationTurnResponse> ProcessTurnAsync(ConverseTurnRequest req);
    Task<CallSessionResponse?> GetSessionAsync(string sessionId);
    Task<ConversationHistoryResponse?> GetHistoryAsync(string sessionId);
    Task<List<CallSessionResponse>> GetAllSessionsAsync(int page, int pageSize);
    Task AbandonSessionAsync(string sessionId);
}