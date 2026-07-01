"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import TopBar from "../components/Temp";
import MenuHeader from "../components/MenuHeader";
import CategorySection from "../components/CategorySection";
import MainsSection from "../components/MainSection";
import Sidebar from "../../components/Sidebar";

export default function MenuPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 w-full">
        {/* Mobile / Tablet Header */}
        <div className="xl:hidden sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 px-5 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 transition hover:opacity-80"
            >
              <Menu
                size={30}
                className="text-[#B86A32]"
              />
            </button>

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

        {/* Content */}
        <div className="px-4 md:px-6 py-4">
          <TopBar />

          <div className="bg-white">
            <MenuHeader />
            <CategorySection />
            <MainsSection />
          </div>
        </div>
      </main>
    </div>
  );
}