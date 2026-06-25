"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import CallHistoryPage from "../components/CallHistoryPage";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 px-5 py-4">
          
          {/* Menu Button - Transparent BG */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 transition hover:opacity-80"
          >
            <Menu
              size={30}
              className="text-[#B86A32]" // Restaurant theme color
            />
          </button>

          {/* Restaurant Name */}
          <div>
            <h1 className="text-[18px] font-serif font-semibold text-[#2C2C2C]">
              Maître D' Pro
            </h1>

            <p className="text-[10px] tracking-[2px] uppercase text-gray-400">
              Premium Admin
            </p>
          </div>
        </div>
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 pt-[80px] lg:pt-0">
        <CallHistoryPage />
      </main>
    </div>
  );
}