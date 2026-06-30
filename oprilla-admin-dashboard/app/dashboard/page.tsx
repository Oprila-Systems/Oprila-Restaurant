"use client";

import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useBodyScrollLock(sidebarOpen);

  return (
    <div className="min-h-screen flex bg-[#F9F8F4]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 w-[280px] overflow-y-auto lg:hidden">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden bg-[#F9F8F4]">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <Dashboard />
      </main>
    </div>
  );
}