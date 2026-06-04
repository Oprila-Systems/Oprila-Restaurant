// ================================================
// FileName:        MenuItem.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Menu.Models
// Description:     Represents a menu item with details and availability information.
// Created:         20/04/2026
// Modified:        20/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.Menu.Models;

public class MenuItem
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public MenuCategory Category { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsAvailable { get; set; } = true;
    public bool IsVegetarian { get; set; }
    public bool IsVegan { get; set; }
    public bool IsGlutenFree { get; set; }
    public string? Allergens { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}