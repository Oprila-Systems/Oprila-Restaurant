// ================================================
// FileName:        RequestLoggingMiddleware.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Shared.Middleware
// Description:     Middleware to log incoming HTTP requests and their responses with method, path, status code and elapsed time.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

using System.Diagnostics;

namespace RestaurantApi.Shared.Middleware;

/// <summary>
/// Logs every HTTP request with method, path, status code and elapsed time.
/// </summary>
public class RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<RequestLoggingMiddleware> _logger = logger;

    public async Task InvokeAsync(HttpContext ctx)
    {
        // Skip health-check noise
        if (ctx.Request.Path.StartsWithSegments("/health"))
        {
            await _next(ctx);
            return;
        }

        var sw = Stopwatch.StartNew();
        var reqId = ctx.TraceIdentifier;

        _logger.LogInformation(
            "[{RequestId}] → {Method} {Path}{Query}",
            reqId,
            ctx.Request.Method,
            ctx.Request.Path,
            ctx.Request.QueryString);

        try
        {
            await _next(ctx);
        }
        finally
        {
            sw.Stop();
            var level = ctx.Response.StatusCode >= 500
                ? LogLevel.Error
                : ctx.Response.StatusCode >= 400
                    ? LogLevel.Warning
                    : LogLevel.Information;

            _logger.Log(level,
                "[{RequestId}] ← {StatusCode} in {Elapsed}ms",
                reqId,
                ctx.Response.StatusCode,
                sw.ElapsedMilliseconds);
        }
    }
}