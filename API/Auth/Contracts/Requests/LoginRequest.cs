// ================================================
// FileName:        LoginRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Auth.Contracts.Requests
// Description:     Represents a login request with username and password.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Auth.Contracts.Requests;

public class LoginRequest
{
    [Required][MaxLength(100)] public string Username { get; set; } = string.Empty;
    [Required][MaxLength(200)] public string Password { get; set; } = string.Empty;
}