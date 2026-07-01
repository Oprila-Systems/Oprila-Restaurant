"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  AudioLines,
  Armchair,
  UserRoundPlus,
} from "lucide-react";

import StatCard from "./StatCard";
import WeeklyRevenueChart from "./WeeklyRevenueChart";
import ActivityPanel from "./ActivityPanel";
import { getDashboardData } from "../services/dashboardService";

type DashboardApiData = {
  totalToday: number;
  totalThisWeek: number;
  totalThisMonth: number;
  pendingConfirmations: number;
};

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await getDashboardData();
        setDashboard(response.data);
      } catch (error) {
        console.error("Dashboard API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const dashboardStats = dashboard
    ? [
        {
          title: "TODAY'S BOOKINGS",
          value: dashboard.totalToday.toString(),
          subtitle: "Today's bookings",
          icon: CalendarDays,
          borderColor: "border-l-black",
          subtitleColor: "text-gray-500",
        },
        {
          title: "THIS WEEK",
          value: dashboard.totalThisWeek.toString(),
          subtitle: "This week's bookings",
          icon: AudioLines,
          borderColor: "border-l-[#B96A45]",
          subtitleColor: "text-gray-500",
        },
        {
          title: "THIS MONTH",
          value: dashboard.totalThisMonth.toString(),
          subtitle: "This month's bookings",
          icon: Armchair,
          borderColor: "border-l-black",
          subtitleColor: "text-[#C26D57]",
        },
        {
          title: "PENDING",
          value: dashboard.pendingConfirmations.toString(),
          subtitle: "Pending confirmations",
          icon: UserRoundPlus,
          borderColor: "border-l-black",
          subtitleColor: "text-gray-500",
        },
      ]
    : [];

  return (
    <main className="flex-1 bg-[#F8F7F4] px-8 py-8 overflow-y-auto">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-[36px] font-serif font-semibold text-[#2B2B2B]">
            Service Overview
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Julian. Here's what's happening today.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading dashboard...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardStats.map((item, index) => (
              <StatCard
                key={index}
                title={item.title}
                value={item.value}
                subtitle={item.subtitle}
                icon={item.icon}
                borderColor={item.borderColor}
                subtitleColor={item.subtitleColor}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeeklyRevenueChart />
          </div>

          <div>
            <ActivityPanel />
          </div>
        </div>
      </div>
    </main>
  );
}