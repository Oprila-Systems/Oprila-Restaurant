import StatCard from "./StatCard";
import WeeklyRevenueChart from "./WeeklyRevenueChart";
import ActivityPanel from "./ActivityPanel";

export default function Dashboard() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold">
        Service Overview
      </h1>

      <p className="text-gray-500 mb-6">
        Welcome back. Here's what's happening today.
      </p>

      <div className="flex gap-4 mb-6">
        <StatCard title="Today's Bookings" value="0" />
        <StatCard title="Active AI Calls" value="0" />
        <StatCard title="Table Occupancy" value="85%" />
        <StatCard title="New Customers" value="12" />
      </div>

      
      <div className="flex gap-6">
        <div className="flex-1">
          <WeeklyRevenueChart />
        </div>

        <div className="w-80">
          <ActivityPanel />
        </div>
      </div>

    </div>
  );
}