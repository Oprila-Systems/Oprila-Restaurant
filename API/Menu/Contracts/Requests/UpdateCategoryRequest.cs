// ================================================
// FileName:        UpdateCategoryRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Menu.Contracts.Requests
// Description:     Represents a category update request with name, description, and display order.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Menu.Contracts.Requests;

public class UpdateCategoryRequest
{
    [MaxLength(100)] public string? Name { get; set; }
    [MaxLength(500)] public string? Description { get; set; }
    [Range(0, 9999)] public int? DisplayOrder { get; set; }
    public bool? IsActive { get; set; }
}