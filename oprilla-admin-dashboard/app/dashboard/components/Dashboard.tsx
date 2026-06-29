
import StatCard from "./StatCard";
import WeeklyRevenueChart from "./WeeklyRevenueChart";
import ActivityPanel from "./ActivityPanel";
import { DASHBOARD_STATS } from "../constants/dashboardConstants";

export default function Dashboard() {
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

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {DASHBOARD_STATS.map((item, index) => (
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