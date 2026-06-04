// ================================================
// FileName:        AppointmentStatus.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Appointment.Enums
// Description:     Represents the status of a restaurant appointment.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.AppointmentBooking.Enums;

public enum AppointmentStatus
{
    Pending,
    Confirmed,
    Cancelled,
    Completed,
    NoShow
}