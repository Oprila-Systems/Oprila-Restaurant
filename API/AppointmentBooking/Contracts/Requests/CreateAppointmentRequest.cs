// ================================================
// FileName:        CreateAppointmentRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Contracts.Requests
// Description:     Represents an appointment creation request with customer details, date, and time.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.AppointmentBooking.Contracts.Requests;

public class CreateAppointmentRequest
{
    [Required][MaxLength(200)] public string CustomerName { get; set; } = string.Empty;
    [Required][Phone][MaxLength(30)] public string CustomerPhone { get; set; } = string.Empty;
    [EmailAddress][MaxLength(200)] public string? CustomerEmail { get; set; }
    [Required][Range(1, 50)] public int GuestCount { get; set; }
    [Required] public DateTime AppointmentDate { get; set; }
    [Required][RegularExpression(@"^\d{2}:\d{2}$")] public string StartTime { get; set; } = string.Empty;
    [Required][RegularExpression(@"^\d{2}:\d{2}$")] public string EndTime { get; set; } = string.Empty;
    public int? TableId { get; set; }
    [MaxLength(1000)] public string? SpecialRequests { get; set; }
    public string Source { get; set; } = "Web";
}