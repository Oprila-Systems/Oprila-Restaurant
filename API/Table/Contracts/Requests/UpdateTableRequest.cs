// ================================================
// FileName:        UpdateTableRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Table.Contracts.Requests
// Description:     Represents a table update request with table number, capacity, and location.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Table.Contracts.Requests;

public class UpdateTableRequest
{
    [MaxLength(20)] public string? TableNumber { get; set; }
    [Range(1, 50)] public int? Capacity { get; set; }
    [MaxLength(100)] public string? Location { get; set; }
    public bool? IsActive { get; set; }
}