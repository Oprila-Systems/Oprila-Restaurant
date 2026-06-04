// ================================================
// FileName:        CreateCategoryRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Menu.Contracts.Requests
// Description:     Represents a category creation request with name, description, and display order.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Menu.Contracts.Requests;

public class CreateCategoryRequest
{
    [Required][MaxLength(100)] public string Name { get; set; } = string.Empty;
    [MaxLength(500)] public string Description { get; set; } = string.Empty;
    [Range(0, 9999)] public int DisplayOrder { get; set; }
}