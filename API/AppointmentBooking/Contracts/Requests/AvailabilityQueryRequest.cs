// ================================================
// FileName:        AvailabilityQueryRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Contracts.Requests
// Description:     Represents an availability query request with date and guest count.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.AppointmentBooking.Contracts.Requests;

public class AvailabilityQueryRequest
{
    [Required] public DateTime Date { get; set; }
    [Range(1, 50)] public int GuestCount { get; set; } = 2;
}