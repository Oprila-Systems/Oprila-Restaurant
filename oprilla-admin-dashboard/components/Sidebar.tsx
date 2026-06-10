"use client";

import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  TableProperties,
  CalendarDays,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between p-6">
      <div>
        <h1 className="text-2xl font-bold mb-8">
          Restaurant Admin
        </h1>

        <ul className="space-y-5 text-gray-700">
          <li className="flex items-center gap-3">
            <LayoutDashboard size={18} />
            Dashboard
          </li>

          <li className="flex items-center gap-3">
            <ShoppingBag size={18} />
            Orders
          </li>

          <li className="flex items-center gap-3">
            <UtensilsCrossed size={18} />
            Menu
          </li>

          <li className="flex items-center gap-3">
            <Users size={18} />
            Customers
          </li>

          <li className="flex items-center gap-3">
            <TableProperties size={18} />
            Tables
          </li>

          <li className="flex items-center gap-3">
            <CalendarDays size={18} />
            Reservations
          </li>
        </ul>
      </div>

      <div className="border-t pt-5">
        <div className="flex items-center gap-3">
          <Settings size={18} />
          Settings
        </div>
      </div>
    </div>
  );
}