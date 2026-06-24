"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import CallHistoryPage from "../components/CallHistoryPage";
import {
  RESTAURANT_NAME,
  SUBTITLE,
} from  "./dashboard/constants/dashboardConstants";
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Mobile / Tablet Header */}
<div className="xl:hidden sticky top-0 z-30 bg-white border-b border-[#E6E1DA] shadow-sm">
  <div className="flex items-center gap-4 px-4 py-4">
    <button
      onClick={() => setSidebarOpen(true)}
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2C2C2C] text-white shadow-sm"
    >
      <Menu size={20} />
    </button>

    <div>
      <h1 className="text-lg font-serif font-semibold text-[#2C2C2C] leading-none">
        Maître D' Pro
      </h1>

      <p className="text-[10px] tracking-[2px] uppercase text-gray-400 mt-1">
        Premium Admin
      </p>
    </div>
  </div>
</div>

        {/* Page Content */}
        <CallHistoryPage />
      </main>
    </div>
  );
}