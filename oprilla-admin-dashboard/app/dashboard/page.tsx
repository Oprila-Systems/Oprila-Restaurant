"use client";

import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F9F8F4]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="fixed left-0 top-0 z-50 h-full lg:hidden">
            <Sidebar />
          </div>
        </>
      )}

      <main className="flex-1 overflow-x-auto bg-[#F9F8F4]">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <Dashboard />
      </main>
    </div>
  );
}