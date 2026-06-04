// ================================================
// FileName:        IAuthService.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Auth.Services
// Description:     Interface for handling authentication logic.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using RestaurantApi.Auth.Contracts.Requests;
using RestaurantApi.Auth.Contracts.Responses;

namespace RestaurantApi.Auth.Services;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
    Task<(UserResponse? user, string? error)> CreateUserAsync(CreateUserRequest request);
    Task<List<UserResponse>> GetUsersAsync();
    Task<UserResponse?> GetUserByIdAsync(int id);
    Task<bool> DeactivateUserAsync(int id);
}