// ================================================
// FileName:        MenuController.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantAPI.Menu.Controllers
// Description:     API controller for managing the restaurant menu.
// Created:         23/04/2026
// Modified:        23/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantApi.Menu.Contracts.Responses;
using RestaurantApi.Menu.Services;
using RestaurantApi.Shared.Responses;

namespace RestaurantApi.Menu.Controllers;

/// <summary>
/// Public read-only menu access. No authentication required.
/// </summary>
[ApiController]
[Route("api/menu")]
[AllowAnonymous]
[Produces("application/json")]
public class MenuController(IMenuService menu) : ControllerBase
{
    private readonly IMenuService _menu = menu;

    /// <summary>Retrieve the full menu grouped by category.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<List<MenuCategoryResponse>>), 200)]
    public async Task<IActionResult> GetMenu()
    {
        var data = await _menu.GetCategoriesAsync(includeInactive: false);
        return Ok(ApiResponse<List<MenuCategoryResponse>>.Ok(data, $"{data.Count} categories returned."));
    }

    /// <summary>Retrieve a single category with its items.</summary>
    [HttpGet("categories/{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<MenuCategoryResponse>), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetCategory(int id)
    {
        var data = await _menu.GetCategoryAsync(id);
        if (data is null) return NotFound(ApiResponse<object>.Fail("Category not found."));
        return Ok(ApiResponse<MenuCategoryResponse>.Ok(data));
    }

    /// <summary>Retrieve all available menu items, optionally filtered by category.</summary>
    [HttpGet("items")]
    [ProducesResponseType(typeof(ApiResponse<List<MenuItemResponse>>), 200)]
    public async Task<IActionResult> GetItems([FromQuery] int? categoryId)
    {
        var data = await _menu.GetItemsAsync(categoryId, includeUnavailable: false);
        return Ok(ApiResponse<List<MenuItemResponse>>.Ok(data));
    }

    /// <summary>Retrieve a single menu item.</summary>
    [HttpGet("items/{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<MenuItemResponse>), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetItem(int id)
    {
        var data = await _menu.GetItemAsync(id);
        if (data is null) return NotFound(ApiResponse<object>.Fail("Item not found."));
        return Ok(ApiResponse<MenuItemResponse>.Ok(data));
    }
}