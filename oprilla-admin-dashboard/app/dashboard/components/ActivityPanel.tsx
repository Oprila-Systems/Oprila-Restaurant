import AIActivityCard from "./AIActivityCard";
import { AI_ACTIVITY_DATA } from "../constants/dashboardConstants";

export default function ActivityPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <h2 className="text-[18px] font-serif font-semibold text-[#2B2B2B]">
          AI Activity
        </h2>

        <div className="w-5 h-5 rounded-full border-2 border-[#A46A4D] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#A46A4D]"></div>
        </div>
      </div>

      <div className="space-y-8">
        {AI_ACTIVITY_DATA.map((activity, index) => (
          <AIActivityCard
            key={index}
            title={activity.title}
            status={activity.status}
            statusBg={activity.statusBg}
            statusText={activity.statusText}
            dotColor={activity.dotColor}
            description={activity.description}
            footer={activity.footer}
            italic={activity.italic}
          />
        ))}
      </div>
    </div>
  );
}