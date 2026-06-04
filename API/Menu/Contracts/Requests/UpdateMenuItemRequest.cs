// ================================================
// FileName:        UpdateMenuItemRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Menu.Contracts.Requests
// Description:     Represents a menu item update request with name, description, and price.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Menu.Contracts.Requests;

public class UpdateMenuItemRequest
{
    public int? CategoryId { get; set; }
    [MaxLength(150)] public string? Name { get; set; }
    [MaxLength(1000)] public string? Description { get; set; }
    [Range(0.01, 99999.99)] public decimal? Price { get; set; }
    [MaxLength(2000)][Url] public string? ImageUrl { get; set; }
    public bool? IsAvailable { get; set; }
    public bool? IsVegetarian { get; set; }
    public bool? IsVegan { get; set; }
    public bool? IsGlutenFree { get; set; }
    [MaxLength(500)] public string? Allergens { get; set; }
}