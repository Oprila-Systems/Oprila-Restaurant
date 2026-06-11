export default function RecentActivityPanel() {
  return (
    <div className="w-80 bg-white h-full border-r border-gray-100">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">
          Recent Activity
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          AI Concierge logs for today
        </p>
      </div>

      {/* Activity List */}
      <div className="p-4 space-y-3">

        {/* Active Item */}
        <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 cursor-pointer">
          <p className="font-semibold text-sm text-gray-900">
            +1 (555) 012-4492
          </p>

          <p className="text-xs text-green-600 mt-1 font-medium">
            POSITIVE • 4m 32s
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Table booked for 4 at 8:00 PM tonight...
          </p>
        </div>

        {/* Item 2 */}
        <div className="p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition">
          <p className="font-semibold text-sm text-gray-900">
            +1 (555) 089-1123
          </p>

          <p className="text-xs text-gray-500 mt-1">
            NEUTRAL • 1m 15s
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Inquiry about gluten-free pasta options...
          </p>
        </div>

        {/* Item 3 */}
        <div className="p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition">
          <p className="font-semibold text-sm text-gray-900">
            +1 (555) 044-8832
          </p>

          <p className="text-xs text-green-600 mt-1">
            POSITIVE • 2m 45s
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Confirmed existing booking...
          </p>
        </div>

        {/* Item 4 */}
        <div className="p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition">
          <p className="font-semibold text-sm text-gray-900">
            +1 (555) 077-2210
          </p>

          <p className="text-xs text-gray-500 mt-1">
            MISSED • 55s
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Disconnected before finishing order...
          </p>
        </div>

      </div>
    </div>
  );
}