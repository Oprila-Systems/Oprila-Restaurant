// ================================================
// FileName:        MenuCategory.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Menu.Models
// Description:     Represents a menu category with items and metadata.
// Created:         20/04/2026
// Modified:        20/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.Menu.Models;

public class MenuCategory
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<MenuItem> Items { get; set; } = new List<MenuItem>();
}