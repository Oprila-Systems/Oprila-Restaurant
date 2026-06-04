// ================================================
// FileName:        UpdateAppointmentRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Contracts.Requests
// Description:     Represents an appointment update request with customer details, date, and time.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.AppointmentBooking.Contracts.Requests;

public class UpdateAppointmentRequest
{
    [MaxLength(200)] public string? CustomerName { get; set; }
    [Phone][MaxLength(30)] public string? CustomerPhone { get; set; }
    [EmailAddress][MaxLength(200)] public string? CustomerEmail { get; set; }
    [Range(1, 50)] public int? GuestCount { get; set; }
    public DateTime? AppointmentDate { get; set; }
    [RegularExpression(@"^\d{2}:\d{2}$")] public string? StartTime { get; set; }
    [RegularExpression(@"^\d{2}:\d{2}$")] public string? EndTime { get; set; }
    public int? TableId { get; set; }
    public string? Status { get; set; }
    [MaxLength(1000)] public string? SpecialRequests { get; set; }
    [MaxLength(2000)] public string? InternalNotes { get; set; }
}