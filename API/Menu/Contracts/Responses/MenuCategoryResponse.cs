// ================================================
// FileName:        MenuCategoryResponse.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Menu.Contracts.Responses
// Description:     Represents a menu category API response.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.Menu.Contracts.Responses;

public class MenuCategoryResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<MenuItemResponse> Items { get; set; } = new();
}