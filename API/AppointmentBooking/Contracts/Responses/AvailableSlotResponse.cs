// ================================================
// FileName:        AvailableSlotResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Contracts.Responses
// Description:     Represents an available slot API response.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.AppointmentBooking.Contracts.Responses;

public class AvailableSlotResponse
{
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public int? TableId { get; set; }
    public string? TableNumber { get; set; }
    public string? Location { get; set; }
    public int Capacity { get; set; }
}