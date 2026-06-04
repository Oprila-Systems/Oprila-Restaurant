// ================================================
// FileName:        CreateUserRequest.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Auth.Contracts.Requests
// Description:     Represents a user creation request with username, password, and email .
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Auth.Contracts.Requests;

public class CreateUserRequest
{
    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MinLength(8)]
    [MaxLength(200)]
    public string Password { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [RegularExpression("^(Admin|Staff)$", ErrorMessage = "Role must be Admin or Staff")]
    public string Role { get; set; } = "Staff";
}