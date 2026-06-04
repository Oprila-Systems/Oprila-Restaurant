// ================================================
// FileName:        CallSessionStatus.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Conversation.Enums
// Description:     Represents the status of a call session.
// Created:         21/04/2026
// Modified:        21/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================

namespace RestaurantApi.Conversation.Enums;

public enum CallSessionStatus
{
    Active,
    BookingCompleted,
    Abandoned,
    Failed
}