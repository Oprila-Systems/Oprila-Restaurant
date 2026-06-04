// ================================================
// FileName:        AdminMenuController.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Menu.Controllers
// Description:     Controller for managing admin-specific menu operations.
// Created:         23/04/2026
// Modified:        23/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantApi.Menu.Contracts.Requests;
using RestaurantApi.Menu.Contracts.Responses;
using RestaurantApi.Menu.Services;
using RestaurantApi.Shared.Responses;
using RestaurantApi.Table.Contracts.Requests;
using RestaurantApi.Table.Contracts.Responses;

namespace RestaurantApi.Menu.Controllers;

/// <summary>
/// Admin endpoints for managing menu categories, items, and tables.
/// Requires Admin or Staff role.
/// </summary>
[ApiController]
[Route("api/admin/menu")]
[Authorize]
[Produces("application/json")]
public class AdminMenuController(IMenuService menu) : ControllerBase
{
    private readonly IMenuService _menu = menu;

    // ═══════════════════════════════════════════════════════════════
    //  CATEGORIES
    // ═══════════════════════════════════════════════════════════════

    /// <summary>Get all categories including inactive ones. [Admin | Staff]</summary>
    [HttpGet("categories")]
    [Authorize(Roles = "Admin,Staff")]
    [ProducesResponseType(typeof(ApiResponse<List<MenuCategoryResponse>>), 200)]
    public async Task<IActionResult> GetCategories([FromQuery] bool includeInactive = false)
    {
        var data = await _menu.GetCategoriesAsync(includeInactive);
        return Ok(ApiResponse<List<MenuCategoryResponse>>.Ok(data));
    }

    /// <summary>Create a new menu category. [Admin only]</summary>
    [HttpPost("categories")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<MenuCategoryResponse>), 201)]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequest req)
    {
        var data = await _menu.CreateCategoryAsync(req);
        return StatusCode(201, ApiResponse<MenuCategoryResponse>.Ok(data, "Category created."));
    }

    /// <summary>Update an existing category. [Admin only]</summary>
    [HttpPut("categories/{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<MenuCategoryResponse>), 200)]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryRequest req)
    {
        var data = await _menu.UpdateCategoryAsync(id, req);
        if (data is null) return NotFound(ApiResponse<object>.Fail("Category not found."));
        return Ok(ApiResponse<MenuCategoryResponse>.Ok(data, "Category updated."));
    }

    /// <summary>Soft-delete (deactivate) a category. [Admin only]</summary>
    [HttpDelete("categories/{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<object>), 200)]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var ok = await _menu.DeleteCategoryAsync(id);
        if (!ok) return NotFound(ApiResponse<object>.Fail("Category not found."));
        return Ok(ApiResponse<object>.Ok(null!, "Category deactivated."));
    }

    // ═══════════════════════════════════════════════════════════════
    //  MENU ITEMS
    // ═══════════════════════════════════════════════════════════════

    /// <summary>Get all menu items including unavailable ones. [Admin | Staff]</summary>
    [HttpGet("items")]
    [Authorize(Roles = "Admin,Staff")]
    [ProducesResponseType(typeof(ApiResponse<List<MenuItemResponse>>), 200)]
    public async Task<IActionResult> GetItems([FromQuery] int? categoryId, [FromQuery] bool includeUnavailable = true)
    {
        var data = await _menu.GetItemsAsync(categoryId, includeUnavailable);
        return Ok(ApiResponse<List<MenuItemResponse>>.Ok(data));
    }

    /// <summary>Add a new menu item. [Admin only]</summary>
    [HttpPost("items")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<MenuItemResponse>), 201)]
    public async Task<IActionResult> CreateItem([FromBody] CreateMenuItemRequest req)
    {
        var data = await _menu.CreateItemAsync(req);
        return StatusCode(201, ApiResponse<MenuItemResponse>.Ok(data, "Item created."));
    }

    /// <summary>Update a menu item. [Admin only]</summary>
    [HttpPut("items/{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<MenuItemResponse>), 200)]
    public async Task<IActionResult> UpdateItem(int id, [FromBody] UpdateMenuItemRequest req)
    {
        var data = await _menu.UpdateItemAsync(id, req);
        if (data is null) return NotFound(ApiResponse<object>.Fail("Item not found."));
        return Ok(ApiResponse<MenuItemResponse>.Ok(data, "Item updated."));
    }

    /// <summary>Toggle an item's availability on / off. [Admin | Staff]</summary>
    [HttpPatch("items/{id:int}/toggle-availability")]
    [Authorize(Roles = "Admin,Staff")]
    [ProducesResponseType(typeof(ApiResponse<object>), 200)]
    public async Task<IActionResult> ToggleAvailability(int id)
    {
        var ok = await _menu.ToggleAvailabilityAsync(id);
        if (!ok) return NotFound(ApiResponse<object>.Fail("Item not found."));
        return Ok(ApiResponse<object>.Ok(null!, "Availability toggled."));
    }

    /// <summary>Permanently delete a menu item. [Admin only]</summary>
    [HttpDelete("items/{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<object>), 200)]
    public async Task<IActionResult> DeleteItem(int id)
    {
        var ok = await _menu.DeleteItemAsync(id);
        if (!ok) return NotFound(ApiResponse<object>.Fail("Item not found."));
        return Ok(ApiResponse<object>.Ok(null!, "Item deleted."));
    }

    // ═══════════════════════════════════════════════════════════════
    //  TABLES
    // ═══════════════════════════════════════════════════════════════

    /// <summary>List all restaurant tables. [Admin | Staff]</summary>
    [HttpGet("tables")]
    [Authorize(Roles = "Admin,Staff")]
    [ProducesResponseType(typeof(ApiResponse<List<TableResponse>>), 200)]
    public async Task<IActionResult> GetTables([FromQuery] bool includeInactive = false)
    {
        var data = await _menu.GetTablesAsync(includeInactive);
        return Ok(ApiResponse<List<TableResponse>>.Ok(data));
    }

    /// <summary>Add a new table. [Admin only]</summary>
    [HttpPost("tables")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<TableResponse>), 201)]
    public async Task<IActionResult> CreateTable([FromBody] CreateTableRequest req)
    {
        var data = await _menu.CreateTableAsync(req);
        return StatusCode(201, ApiResponse<TableResponse>.Ok(data, "Table added."));
    }

    /// <summary>Update table details. [Admin only]</summary>
    [HttpPut("tables/{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<TableResponse>), 200)]
    public async Task<IActionResult> UpdateTable(int id, [FromBody] UpdateTableRequest req)
    {
        var data = await _menu.UpdateTableAsync(id, req);
        if (data is null) return NotFound(ApiResponse<object>.Fail("Table not found."));
        return Ok(ApiResponse<TableResponse>.Ok(data, "Table updated."));
    }

    /// <summary>Soft-delete (deactivate) a table. [Admin only]</summary>
    [HttpDelete("tables/{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<object>), 200)]
    public async Task<IActionResult> DeleteTable(int id)
    {
        var ok = await _menu.DeleteTableAsync(id);
        if (!ok) return NotFound(ApiResponse<object>.Fail("Table not found."));
        return Ok(ApiResponse<object>.Ok(null!, "Table deactivated."));
    }
}