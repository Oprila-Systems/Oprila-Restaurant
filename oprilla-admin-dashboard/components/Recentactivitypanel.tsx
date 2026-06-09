export default function RecentActivityPanel() {
  return (
    <div className="w-72 bg-white border-r p-6">
      <h2 className="text-3xl font-bold mb-2">
        Recent Activity
      </h2>

      <p className="text-gray-500 mb-6">
        AI Concierge logs for today
      </p>

      <div className="space-y-6">

        <div className="border-b pb-4">
          <p className="font-semibold">
            +1 (555) 012-4492
          </p>

          <p className="text-sm text-green-600 mt-1">
            POSITIVE • 4m 32s
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Table booked for 4 at 8:00 PM tonight...
          </p>
        </div>

        <div className="border-b pb-4">
          <p className="font-semibold">
            +1 (555) 089-1123
          </p>

          <p className="text-sm text-gray-500 mt-1">
            NEUTRAL • 1m 15s
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Inquiry about gluten-free pasta options...
          </p>
        </div>

        <div className="border-b pb-4">
          <p className="font-semibold">
            +1 (555) 044-8832
          </p>

          <p className="text-sm text-green-600 mt-1">
            POSITIVE • 2m 45s
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Confirmed existing booking...
          </p>
        </div>

      </div>
    </div>
  );
}