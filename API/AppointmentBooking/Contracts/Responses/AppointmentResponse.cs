// ================================================
// FileName:        AppointmentResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Contracts.Responses
// Description:     Represents an appointment API response.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.AppointmentBooking.Contracts.Responses;

public class AppointmentResponse
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string? CustomerEmail { get; set; }
    public int GuestCount { get; set; }
    public string AppointmentDate { get; set; } = string.Empty;
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public int? TableId { get; set; }
    public string? TableNumber { get; set; }
    public string? TableLocation { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
    public string? SpecialRequests { get; set; }
    public string? InternalNotes { get; set; }
    public string? CallSessionId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}