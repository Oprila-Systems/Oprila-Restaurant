import AIActivityCard from "@/app/dashboard/components/AIActivityCard";

export default function ActivityPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-start justify-between mb-8">
        <h2 className="text-[18px] font-serif font-semibold text-[#2B2B2B]">
          AI Activity
        </h2>

        <div className="w-5 h-5 rounded-full border-2 border-[#A46A4D] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#A46A4D]"></div>
        </div>
      </div>

      <div className="space-y-8">

        <AIActivityCard
          title="Booking Confirmed"
          status="COMPLETED"
          statusBg="bg-[#E7F0E3]"
          statusText="text-[#56724F]"
          dotColor="bg-[#0E1E16]"
          description='"Table for 4 at 8 PM. Guest requested window seat for anniversary."'
          footer="Assistant #4 • 2m ago"
          italic
        />

        <AIActivityCard
          title="Inbound Inquiry"
          status="IN PROGRESS"
          statusBg="bg-[#F8DDD7]"
          statusText="text-[#8B5A4A]"
          dotColor="bg-[#B96A45]"
          description="Clarifying dietary restrictions for a private event inquiry on Nov 12th."
          footer="Assistant #1 • Live"
        />

        <AIActivityCard
          title="Rescheduling"
          status="COMPLETED"
          statusBg="bg-[#E7F0E3]"
          statusText="text-[#56724F]"
          dotColor="bg-[#0E1E16]"
          description='"Moved Henderson party (6) from 7:30 to 8:15 PM."'
          footer="Assistant #2 • 15m ago"
          italic
        />

      </div>
    </div>
  );
}