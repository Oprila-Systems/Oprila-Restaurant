// ================================================
// FileName:        AuthController.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Auth.Controllers
// Description:     API controller for authentication and user management.
// Created:         23/04/2026
// Modified:        23/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantApi.Auth.Contracts.Requests;
using RestaurantApi.Auth.Contracts.Responses;
using RestaurantApi.Shared.Responses;
using RestaurantApi.Auth.Services;

namespace RestaurantApi.Auth.Controllers;

[ApiController]
[Route("api/auth")]
[Produces("application/json")]
public class AuthController(IAuthService auth) : ControllerBase
{
    private readonly IAuthService _auth = auth;

    // ─────────────────────────────────────────────────────────────────────────

    /// <summary>Authenticate and receive a JWT bearer token.</summary>
    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<LoginResponse>), 200)]
    [ProducesResponseType(typeof(ApiResponse<object>), 401)]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        var result = await _auth.LoginAsync(req);
        if (result is null)
            return Unauthorized(ApiResponse<object>.Fail("Invalid username or password.", "Authentication failed."));

        return Ok(ApiResponse<LoginResponse>.Ok(result, "Login successful."));
    }

    // ─────────────────────────────────────────────────────────────────────────

    /// <summary>Return identity information for the current bearer token.</summary>
    [HttpGet("me")]
    [Authorize]
    [ProducesResponseType(typeof(ApiResponse<UserResponse>), 200)]
    public async Task<IActionResult> Me()
    {
        var id = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0");
        var user = await _auth.GetUserByIdAsync(id);
        if (user is null) return NotFound(ApiResponse<object>.Fail("User not found."));
        return Ok(ApiResponse<UserResponse>.Ok(user));
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Admin – User management
    // ─────────────────────────────────────────────────────────────────────────

    /// <summary>Create a new Staff or Admin user. [Admin only]</summary>
    [HttpPost("users")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<UserResponse>), 201)]
    [ProducesResponseType(typeof(ApiResponse<object>), 409)]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest req)
    {
        var (user, error) = await _auth.CreateUserAsync(req);
        if (user is null)
            return Conflict(ApiResponse<object>.Fail(error!, "User creation failed."));

        return StatusCode(201, ApiResponse<UserResponse>.Ok(user, "User created successfully."));
    }

    /// <summary>List all system users. [Admin only]</summary>
    [HttpGet("users")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<List<UserResponse>>), 200)]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _auth.GetUsersAsync();
        return Ok(ApiResponse<List<UserResponse>>.Ok(users));
    }

    /// <summary>Get a single user by ID. [Admin only]</summary>
    [HttpGet("users/{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<UserResponse>), 200)]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _auth.GetUserByIdAsync(id);
        if (user is null) return NotFound(ApiResponse<object>.Fail("User not found."));
        return Ok(ApiResponse<UserResponse>.Ok(user));
    }

    /// <summary>Deactivate a user account. [Admin only]</summary>
    [HttpDelete("users/{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<object>), 200)]
    public async Task<IActionResult> DeactivateUser(int id)
    {
        var ok = await _auth.DeactivateUserAsync(id);
        if (!ok) return NotFound(ApiResponse<object>.Fail("User not found."));
        return Ok(ApiResponse<object>.Ok(null!, "User deactivated."));
    }
}