export default function RecentActivityPanel() {
  return (
    <div className="w-[280px] bg-white border-r border-[#E6E1DA]">

      <div className="p-6 border-b border-[#E7E1D9]">
      <h2 className="text-3xl font-extrabold text-[#111827]">
        Recent Activity
      </h2>

        <p className="text-xs text-gray-500 mt-1">
          AI Concierge logs for today
        </p>
      </div>

      {/* Activity List */}
      <div className="p-4 space-y-4">

        {/* Active Item */}
        <div className="bg-[#FBF3EC] border border-[#F2E1D2] rounded-xl p-4 cursor-pointer">

          <p className="text-lg font-extrabold text-[#111827]">
            +1 (555) 012-4492
          </p>

          <p className="text-xs font-semibold text-green-600 mt-1">
            POSITIVE • 4m 32s
          </p>

          <p className="text-sm text-[#6B7280] mt-2">
            Table booked for 4 at 8:00 PM tonight...
          </p>

        </div>

        {/* Item 2 */}
        <div className="p-4 rounded-xl hover:bg-[#F9F7F4] cursor-pointer transition">

          <p className="text-lg font-extrabold text-[#111827]">
            +1 (555) 089-1123
          </p>

          <p className="text-xs text-[#6B7280] mt-1">
            NEUTRAL • 1m 15s
          </p>

          <p className="text-sm text-[#6B7280] mt-2">
            Inquiry about gluten-free pasta options...
          </p>

        </div>

        {/* Item 3 */}
        <div className="p-4 rounded-xl hover:bg-[#F9F7F4] cursor-pointer transition">

          <p className="text-lg font-extrabold text-[#111827]">
            +1 (555) 044-8832
          </p>

          <p className="text-xs text-green-600 mt-1">
            POSITIVE • 2m 45s
          </p>

          <p className="text-sm text-[#6B7280] mt-2">
            Confirmed existing booking...
          </p>

        </div>

        {/* Item 4 */}
        <div className="p-4 rounded-xl hover:bg-[#F9F7F4] cursor-pointer transition">

          <p className="text-lg font-extrabold text-[#111827]">
            +1 (555) 077-2210
          </p>

          <p className="text-xs text-[#6B7280] mt-1">
            MISSED • 55s
          </p>

          <p className="text-sm text-[#6B7280] mt-2">
            Disconnected before finishing order...
          </p>

        </div>

      </div>
    </div>
  );
}