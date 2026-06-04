// ================================================
// FileName:        DashboardStatsResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Dashboard.Responses
// Description:     Represents dashboard statistics API response.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using RestaurantApi.AppointmentBooking.Contracts.Responses;

namespace RestaurantApi.Dashboard.Responses;

public class DashboardStatsResponse
{
    public int TotalToday { get; set; }
    public int TotalThisWeek { get; set; }
    public int TotalThisMonth { get; set; }
    public int PendingConfirmations { get; set; }
    public int CancelledToday { get; set; }
    public int TotalGuestsConfirmed { get; set; }
    public Dictionary<string, int> AppointmentsBySource { get; set; } = new();
    public Dictionary<string, int> AppointmentsByStatus { get; set; } = new();
    public List<AppointmentResponse> UpcomingToday { get; set; } = new();
}