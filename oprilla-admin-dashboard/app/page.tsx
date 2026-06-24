"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import CallHistoryPage from "../components/CallHistoryPage";

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
        <div className="xl:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-semibold text-[#111827]">
            Call History
          </h1>
        </div>

        {/* Page Content */}
        <CallHistoryPage />
      </main>
    </div>
  );
}