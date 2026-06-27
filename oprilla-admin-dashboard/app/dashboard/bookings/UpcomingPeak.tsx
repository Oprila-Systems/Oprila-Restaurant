"use client";
import { Sparkles } from "lucide-react";

export default function UpcomingPeak() {
  return (
    <div className="rounded-3xl border bg-[#F8F6F2] p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="text-amber-500">
          <Sparkles size={18} />
        </div>

        <span className="rounded-lg border bg-white px-3 py-1 text-xs font-medium text-gray-700">
          AI Insights
        </span>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Upcoming Peak
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Arrival spike expected between{" "}
          <span className="font-medium text-gray-700">
            19:45 and 20:15
          </span>{" "}
          based on historical Friday data.
        </p>
      </div>
    </div>
  );
}