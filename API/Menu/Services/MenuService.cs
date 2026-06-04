// ================================================
// FileName:        MenuService.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Menu.Services
// Description:     Manages restaurant menu categories, items, and tables, handling CRUD operations, availability toggling, validation, and mapping database entities into structured
//                  response models efficiently.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using Microsoft.EntityFrameworkCore;
using RestaurantApi.Menu.Contracts.Requests;
using RestaurantApi.Menu.Contracts.Responses;
using RestaurantApi.Menu.Models;
using RestaurantApi.Table.Contracts.Requests;
using RestaurantApi.Table.Contracts.Responses;
using RestaurantApi.Table.Models;
using RestaurantApi.Shared.Data;

namespace RestaurantApi.Menu.Services;

public class MenuService(AppDbContext db) : IMenuService
{
    private readonly AppDbContext _db = db;

    // ═══════════════════════════════════════════════════════════════
    //  CATEGORIES
    // ═══════════════════════════════════════════════════════════════

    public async Task<List<MenuCategoryResponse>> GetCategoriesAsync(bool includeInactive = false)
    {
        var q = _db.MenuCategories.Include(c => c.Items).AsQueryable();
        if (!includeInactive) q = q.Where(c => c.IsActive);

        return await q.OrderBy(c => c.DisplayOrder)
                       .Select(c => MapCategory(c, !includeInactive))
                       .ToListAsync();
    }

    public async Task<MenuCategoryResponse?> GetCategoryAsync(int id)
    {
        var c = await _db.MenuCategories.Include(x => x.Items).FirstOrDefaultAsync(x => x.Id == id);
        return c is null ? null : MapCategory(c, false);
    }

    public async Task<MenuCategoryResponse> CreateCategoryAsync(CreateCategoryRequest req)
    {
        var entity = new MenuCategory
        {
            Name = req.Name.Trim(),
            Description = req.Description.Trim(),
            DisplayOrder = req.DisplayOrder
        };
        _db.MenuCategories.Add(entity);
        await _db.SaveChangesAsync();
        await _db.Entry(entity).Collection(c => c.Items).LoadAsync();
        return MapCategory(entity, false);
    }

    public async Task<MenuCategoryResponse?> UpdateCategoryAsync(int id, UpdateCategoryRequest req)
    {
        var entity = await _db.MenuCategories.Include(c => c.Items).FirstOrDefaultAsync(c => c.Id == id);
        if (entity is null) return null;

        if (req.Name is not null) entity.Name = req.Name.Trim();
        if (req.Description is not null) entity.Description = req.Description.Trim();
        if (req.DisplayOrder.HasValue) entity.DisplayOrder = req.DisplayOrder.Value;
        if (req.IsActive.HasValue) entity.IsActive = req.IsActive.Value;

        await _db.SaveChangesAsync();
        return MapCategory(entity, false);
    }

    public async Task<bool> DeleteCategoryAsync(int id)
    {
        var entity = await _db.MenuCategories.FindAsync(id);
        if (entity is null) return false;
        entity.IsActive = false;
        await _db.SaveChangesAsync();
        return true;
    }

    // ═══════════════════════════════════════════════════════════════
    //  ITEMS
    // ═══════════════════════════════════════════════════════════════

    public async Task<List<MenuItemResponse>> GetItemsAsync(int? categoryId = null, bool includeUnavailable = false)
    {
        var q = _db.MenuItems.Include(i => i.Category).AsQueryable();

        if (categoryId.HasValue) q = q.Where(i => i.CategoryId == categoryId.Value);
        if (!includeUnavailable) q = q.Where(i => i.IsAvailable);

        return await q.OrderBy(i => i.Category.DisplayOrder).ThenBy(i => i.Name)
                       .Select(i => MapItem(i))
                       .ToListAsync();
    }

    public async Task<MenuItemResponse?> GetItemAsync(int id)
    {
        var i = await _db.MenuItems.Include(x => x.Category).FirstOrDefaultAsync(x => x.Id == id);
        return i is null ? null : MapItem(i);
    }

    public async Task<MenuItemResponse> CreateItemAsync(CreateMenuItemRequest req)
    {
        var catExists = await _db.MenuCategories.AnyAsync(c => c.Id == req.CategoryId && c.IsActive);
        if (!catExists) throw new KeyNotFoundException($"Category {req.CategoryId} not found.");

        var entity = new MenuItem
        {
            CategoryId = req.CategoryId,
            Name = req.Name.Trim(),
            Description = req.Description.Trim(),
            Price = req.Price,
            ImageUrl = req.ImageUrl,
            IsVegetarian = req.IsVegetarian,
            IsVegan = req.IsVegan,
            IsGlutenFree = req.IsGlutenFree,
            Allergens = req.Allergens
        };
        _db.MenuItems.Add(entity);
        await _db.SaveChangesAsync();
        await _db.Entry(entity).Reference(i => i.Category).LoadAsync();
        return MapItem(entity);
    }

    public async Task<MenuItemResponse?> UpdateItemAsync(int id, UpdateMenuItemRequest req)
    {
        var entity = await _db.MenuItems.Include(i => i.Category).FirstOrDefaultAsync(i => i.Id == id);
        if (entity is null) return null;

        if (req.CategoryId.HasValue) entity.CategoryId = req.CategoryId.Value;
        if (req.Name is not null) entity.Name = req.Name.Trim();
        if (req.Description is not null) entity.Description = req.Description.Trim();
        if (req.Price.HasValue) entity.Price = req.Price.Value;
        if (req.ImageUrl is not null) entity.ImageUrl = req.ImageUrl;
        if (req.IsAvailable.HasValue) entity.IsAvailable = req.IsAvailable.Value;
        if (req.IsVegetarian.HasValue) entity.IsVegetarian = req.IsVegetarian.Value;
        if (req.IsVegan.HasValue) entity.IsVegan = req.IsVegan.Value;
        if (req.IsGlutenFree.HasValue) entity.IsGlutenFree = req.IsGlutenFree.Value;
        if (req.Allergens is not null) entity.Allergens = req.Allergens;

        entity.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        await _db.Entry(entity).Reference(i => i.Category).LoadAsync();
        return MapItem(entity);
    }

    public async Task<bool> DeleteItemAsync(int id)
    {
        var entity = await _db.MenuItems.FindAsync(id);
        if (entity is null) return false;
        _db.MenuItems.Remove(entity);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ToggleAvailabilityAsync(int id)
    {
        var entity = await _db.MenuItems.FindAsync(id);
        if (entity is null) return false;
        entity.IsAvailable = !entity.IsAvailable;
        entity.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return true;
    }

    // ═══════════════════════════════════════════════════════════════
    //  TABLES
    // ═══════════════════════════════════════════════════════════════

    public async Task<List<TableResponse>> GetTablesAsync(bool includeInactive = false)
    {
        var q = _db.Tables.AsQueryable();
        if (!includeInactive) q = q.Where(t => t.IsActive);
        return await q.OrderBy(t => t.Location).ThenBy(t => t.TableNumber)
                       .Select(t => MapTable(t))
                       .ToListAsync();
    }

    public async Task<TableResponse?> GetTableAsync(int id)
    {
        var t = await _db.Tables.FindAsync(id);
        return t is null ? null : MapTable(t);
    }

    public async Task<TableResponse> CreateTableAsync(CreateTableRequest req)
    {
        var exists = await _db.Tables.AnyAsync(t => t.TableNumber == req.TableNumber);
        if (exists) throw new InvalidOperationException($"Table number '{req.TableNumber}' already exists.");

        var entity = new RestaurantTable
        {
            TableNumber = req.TableNumber.Trim().ToUpperInvariant(),
            Capacity = req.Capacity,
            Location = req.Location.Trim()
        };
        _db.Tables.Add(entity);
        await _db.SaveChangesAsync();
        return MapTable(entity);
    }

    public async Task<TableResponse?> UpdateTableAsync(int id, UpdateTableRequest req)
    {
        var entity = await _db.Tables.FindAsync(id);
        if (entity is null) return null;

        if (req.TableNumber is not null) entity.TableNumber = req.TableNumber.Trim().ToUpperInvariant();
        if (req.Capacity.HasValue) entity.Capacity = req.Capacity.Value;
        if (req.Location is not null) entity.Location = req.Location.Trim();
        if (req.IsActive.HasValue) entity.IsActive = req.IsActive.Value;

        await _db.SaveChangesAsync();
        return MapTable(entity);
    }

    public async Task<bool> DeleteTableAsync(int id)
    {
        var entity = await _db.Tables.FindAsync(id);
        if (entity is null) return false;
        entity.IsActive = false;
        await _db.SaveChangesAsync();
        return true;
    }

    // ═══════════════════════════════════════════════════════════════
    //  MAPPERS
    // ═══════════════════════════════════════════════════════════════

    private static MenuCategoryResponse MapCategory(MenuCategory c, bool onlyAvailable) => new()
    {
        Id = c.Id,
        Name = c.Name,
        Description = c.Description,
        DisplayOrder = c.DisplayOrder,
        IsActive = c.IsActive,
        CreatedAt = c.CreatedAt,
        Items = c.Items
                        .Where(i => !onlyAvailable || i.IsAvailable)
                        .Select(i => MapItem(i))
                        .ToList()
    };

    private static MenuItemResponse MapItem(MenuItem i) => new()
    {
        Id = i.Id,
        CategoryId = i.CategoryId,
        CategoryName = i.Category?.Name ?? string.Empty,
        Name = i.Name,
        Description = i.Description,
        Price = i.Price,
        ImageUrl = i.ImageUrl,
        IsAvailable = i.IsAvailable,
        IsVegetarian = i.IsVegetarian,
        IsVegan = i.IsVegan,
        IsGlutenFree = i.IsGlutenFree,
        Allergens = i.Allergens,
        UpdatedAt = i.UpdatedAt
    };

    private static TableResponse MapTable(RestaurantTable t) => new()
    {
        Id = t.Id,
        TableNumber = t.TableNumber,
        Capacity = t.Capacity,
        Location = t.Location,
        IsActive = t.IsActive,
        CreatedAt = t.CreatedAt
    };
}