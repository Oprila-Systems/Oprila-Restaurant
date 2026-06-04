// ================================================
// FileName:        IMenuService.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Menu.Services
// Description:     Service for handling menu logic.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using RestaurantApi.Menu.Contracts.Requests;
using RestaurantApi.Menu.Contracts.Responses;
using RestaurantApi.Table.Contracts.Requests;
using RestaurantApi.Table.Contracts.Responses;

namespace RestaurantApi.Menu.Services;

public interface IMenuService
{
    // Categories
    Task<List<MenuCategoryResponse>> GetCategoriesAsync(bool includeInactive = false);
    Task<MenuCategoryResponse?> GetCategoryAsync(int id);
    Task<MenuCategoryResponse> CreateCategoryAsync(CreateCategoryRequest req);
    Task<MenuCategoryResponse?> UpdateCategoryAsync(int id, UpdateCategoryRequest req);
    Task<bool> DeleteCategoryAsync(int id);

    // Items
    Task<List<MenuItemResponse>> GetItemsAsync(int? categoryId = null, bool includeUnavailable = false);
    Task<MenuItemResponse?> GetItemAsync(int id);
    Task<MenuItemResponse> CreateItemAsync(CreateMenuItemRequest req);
    Task<MenuItemResponse?> UpdateItemAsync(int id, UpdateMenuItemRequest req);
    Task<bool> DeleteItemAsync(int id);
    Task<bool> ToggleAvailabilityAsync(int id);

    // Tables
    Task<List<TableResponse>> GetTablesAsync(bool includeInactive = false);
    Task<TableResponse?> GetTableAsync(int id);
    Task<TableResponse> CreateTableAsync(CreateTableRequest req);
    Task<TableResponse?> UpdateTableAsync(int id, UpdateTableRequest req);
    Task<bool> DeleteTableAsync(int id);
}