// ================================================
// FileName:        AppointmentsController.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.AppointmentBooking.Controllers
// Description:     API controller for managing restaurant appointments (bookings).
// Created:         23/04/2026
// Modified:        23/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantApi.AppointmentBooking.Contracts.Requests;
using RestaurantApi.AppointmentBooking.Contracts.Responses;
using RestaurantApi.AppointmentBooking.Services;
using RestaurantApi.Shared.Responses;

namespace RestaurantApi.AppointmentBooking.Controllers;

/// <summary>
/// Public-facing booking endpoints for customers.
/// No authentication required.
/// </summary>
[ApiController]
[Route("api/appointments")]
[AllowAnonymous]
[Produces("application/json")]
public class AppointmentsController(IAppointmentService svc) : ControllerBase
{
    private readonly IAppointmentService _svc = svc;

    /// <summary>
    /// Check available time slots for a date and party size.
    /// Returns the first available table per slot.
    /// </summary>
    [HttpGet("availability")]
    [ProducesResponseType(typeof(ApiResponse<List<AvailableSlotResponse>>), 200)]
    public async Task<IActionResult> GetAvailability([FromQuery] AvailabilityQueryRequest req)
    {
        if (req.Date.Date < DateTime.UtcNow.Date)
            return BadRequest(ApiResponse<object>.Fail("Date cannot be in the past."));

        var slots = await _svc.GetAvailabilityAsync(req);
        return Ok(ApiResponse<List<AvailableSlotResponse>>.Ok(slots, $"{slots.Count} slots available."));
    }

    /// <summary>Create a new appointment. Returns the confirmed booking.</summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<AppointmentResponse>), 201)]
    [ProducesResponseType(typeof(ApiResponse<object>), 400)]
    public async Task<IActionResult> Create([FromBody] CreateAppointmentRequest req)
    {
        var appt = await _svc.CreateAsync(req);
        return StatusCode(201, ApiResponse<AppointmentResponse>.Ok(appt, "Booking confirmed."));
    }

    /// <summary>Get appointment details by ID.</summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<AppointmentResponse>), 200)]
    public async Task<IActionResult> Get(int id)
    {
        var data = await _svc.GetByIdAsync(id);
        if (data is null) return NotFound(ApiResponse<object>.Fail("Appointment not found."));
        return Ok(ApiResponse<AppointmentResponse>.Ok(data));
    }

    /// <summary>Cancel an appointment.</summary>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<object>), 200)]
    public async Task<IActionResult> Cancel(int id, [FromQuery] string? reason = null)
    {
        var ok = await _svc.CancelAsync(id, reason);
        if (!ok) return NotFound(ApiResponse<object>.Fail("Appointment not found."));
        return Ok(ApiResponse<object>.Ok(null!, "Appointment cancelled."));
    }
}