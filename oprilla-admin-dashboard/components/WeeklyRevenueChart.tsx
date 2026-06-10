"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", revenue: 1200 },
  { day: "Tue", revenue: 2100 },
  { day: "Wed", revenue: 1800 },
  { day: "Thu", revenue: 2500 },
  { day: "Fri", revenue: 3200 },
  { day: "Sat", revenue: 4000 },
  { day: "Sun", revenue: 2800 },
];

export default function WeeklyRevenueChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">
        Weekly Revenue Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#000"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}