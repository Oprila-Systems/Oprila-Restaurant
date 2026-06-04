// ================================================
// FileName:        AuthService.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Auth.Services
// Description:     Service for handling authentication logic.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RestaurantApi.Auth.Contracts.Requests;
using RestaurantApi.Auth.Contracts.Responses;
using RestaurantApi.Auth.Models;
using RestaurantApi.Shared.Data;

namespace RestaurantApi.Auth.Services;

public class AuthService(AppDbContext db, IConfiguration config) : IAuthService
{
    private const int TokenLifetimeHours = 8;

    private readonly AppDbContext _db = db;
    private readonly IConfiguration _config = config;

    // ── Login ─────────────────────────────────────────────────────────────────

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var user = await _db.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Username == request.Username && u.IsActive);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return null;

        var expiresAt = DateTime.UtcNow.AddHours(TokenLifetimeHours);

        return new LoginResponse
        {
            Token = GenerateJwt(user, expiresAt),
            Role = user.Role,
            Username = user.Username,
            Email = user.Email,
            ExpiresAt = expiresAt
        };
    }

    // ── Users ─────────────────────────────────────────────────────────────────

    public async Task<(UserResponse? user, string? error)> CreateUserAsync(CreateUserRequest request)
    {
        if (await _db.Users.AnyAsync(u => u.Username == request.Username))
            return (null, "Username is already taken.");

        if (await _db.Users.AnyAsync(u => u.Email == request.Email))
            return (null, "Email is already registered.");

        var user = new User
        {
            Username = request.Username.Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Email = request.Email.Trim().ToLowerInvariant(),
            Role = request.Role
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return (ToResponse(user), null);
    }

    public async Task<List<UserResponse>> GetUsersAsync()
        => await _db.Users
            .AsNoTracking()
            .OrderBy(u => u.Username)
            .Select(u => ToResponse(u))
            .ToListAsync();

    public async Task<UserResponse?> GetUserByIdAsync(int id)
    {
        var user = await _db.Users.FindAsync(id);
        return user is null ? null : ToResponse(user);
    }

    public async Task<bool> DeactivateUserAsync(int id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user is null) return false;

        user.IsActive = false;
        user.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return true;
    }

    // ── JWT ───────────────────────────────────────────────────────────────────

    private string GenerateJwt(User user, DateTime expiresAt)
    {
        var key = Encoding.UTF8.GetBytes(GetRequiredConfig("Jwt:Key"));
        var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

        var claims = new Claim[]
        {
            new(JwtRegisteredClaimNames.Sub,   user.Id.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, user.Username),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(ClaimTypes.Role,               user.Role),
            new(JwtRegisteredClaimNames.Jti,   Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: GetRequiredConfig("Jwt:Issuer"),
            audience: GetRequiredConfig("Jwt:Audience"),
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: expiresAt,
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private string GetRequiredConfig(string key) =>
        _config[key] ?? throw new InvalidOperationException($"Missing configuration: {key}");

    private static UserResponse ToResponse(User u) => new()
    {
        Id = u.Id,
        Username = u.Username,
        Email = u.Email,
        Role = u.Role,
        IsActive = u.IsActive,
        CreatedAt = u.CreatedAt
    };
}