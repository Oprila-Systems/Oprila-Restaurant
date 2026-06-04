// ================================================
// FileName:        Appointment.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Models
// Description:     Represents a restaurant appointment with details and status information.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using RestaurantApi.AppointmentBooking.Enums;
using RestaurantApi.Table.Models;

namespace RestaurantApi.AppointmentBooking.Models;

public class AppointmentDetails
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string? CustomerEmail { get; set; }
    public int GuestCount { get; set; }
    public DateTime AppointmentDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int? TableId { get; set; }
    public RestaurantTable? Table { get; set; }
    public AppointmentStatus Status { get; set; } = AppointmentStatus.Pending;
    public BookingSource Source { get; set; } = BookingSource.Web;
    public string? SpecialRequests { get; set; }
    public string? InternalNotes { get; set; }
    public string? CallSessionId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}