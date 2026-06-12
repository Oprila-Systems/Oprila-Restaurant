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

       
        <div className="relative pl-5 border-l border-gray-200">
          <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#0E1E16]"></div>

          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm text-[#2B2B2B]">
              Booking Confirmed
            </h3>

            <span className="bg-[#E7F0E3] text-[#56724F] text-[9px] px-3 py-1 rounded">
              COMPLETED
            </span>
          </div>

          <p className="italic text-sm text-gray-500">
            "Table for 4 at 8 PM. Guest requested window seat for anniversary."
          </p>

          <p className="text-[10px] text-gray-400 mt-3">
            Assistant #4 • 2m ago
          </p>
        </div>

        
        <div className="relative pl-5 border-l border-gray-200">
          <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#B96A45]"></div>

          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm text-[#2B2B2B]">
              Inbound Inquiry
            </h3>

            <span className="bg-[#F8DDD7] text-[#8B5A4A] text-[9px] px-3 py-1 rounded">
              IN PROGRESS
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Clarifying dietary restrictions for a private event inquiry on Nov 12th.
          </p>

          <p className="text-[10px] text-gray-400 mt-3">
            Assistant #1 • Live
          </p>
        </div>

        
        <div className="relative pl-5 border-l border-gray-200">
          <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#0E1E16]"></div>

          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm text-[#2B2B2B]">
              Rescheduling
            </h3>

            <span className="bg-[#E7F0E3] text-[#56724F] text-[9px] px-3 py-1 rounded">
              COMPLETED
            </span>
          </div>

          <p className="italic text-sm text-gray-500">
            "Moved Henderson party (6) from 7:30 to 8:15 PM."
          </p>

          <p className="text-[10px] text-gray-400 mt-3">
            Assistant #2 • 15m ago
          </p>
        </div>

      </div>
    </div>
  );
}