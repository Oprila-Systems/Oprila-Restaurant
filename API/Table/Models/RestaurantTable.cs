// ================================================
// FileName:        RestaurantTable.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Models
// Description:     Represents a restaurant table with details and availability information.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using RestaurantApi.Table.Constants;
using RestaurantApi.AppointmentBooking.Models;

namespace RestaurantApi.Table.Models;

public class RestaurantTable
{
    public int Id { get; set; }
    public string TableNumber { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public string Location { get; set; } = TableLocation.MainHall;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<AppointmentDetails> Appointments { get; set; } = new List<AppointmentDetails>();
}