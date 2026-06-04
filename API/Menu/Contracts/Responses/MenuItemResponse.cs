// ================================================
// FileName:        MenuItemResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Menu.Contracts.Responses
// Description:     Represents a menu item API response.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.Menu.Contracts.Responses;

public class MenuItemResponse
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsAvailable { get; set; }
    public bool IsVegetarian { get; set; }
    public bool IsVegan { get; set; }
    public bool IsGlutenFree { get; set; }
    public string? Allergens { get; set; }
    public DateTime UpdatedAt { get; set; }
}