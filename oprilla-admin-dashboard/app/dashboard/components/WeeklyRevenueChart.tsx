"use client";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function WeeklyRevenueChart() {
  
  const currentDay = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-[420px]">
      
      <div className="flex items-start justify-between">
        <h2 className="text-[18px] font-serif font-semibold text-[#2B2B2B] whitespace-nowrap">
          Weekly Revenue Trend
        </h2>

        <div className="flex items-center gap-2 text-[10px] text-gray-600">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <span>Revenue</span>
        </div>
      </div>

      
      <div className="h-[320px]"></div>

      
      <div className="flex justify-end mb-3">
        <div className="w-28 border-t border-dashed border-gray-300"></div>
      </div>

      
      <div className="flex justify-between text-[10px] uppercase px-4">
        {days.map((day) => (
          <span
            key={day}
            className={
              day === currentDay
                ? "font-semibold text-black"
                : "text-gray-400"
            }
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}