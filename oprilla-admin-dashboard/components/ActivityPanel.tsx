export default function ActivityPanel() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Recent Activity
        </h2>
        <p className="text-sm text-gray-500">
          AI Concierge logs for today
        </p>
      </div>

      <div className="space-y-6">

        <div className="border-b pb-4">
          <p className="font-semibold text-gray-800">
            Booking Confirmed
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Table for 4 reserved at 8:00 PM
          </p>

          <p className="text-xs text-gray-400 mt-2">
            5 minutes ago
          </p>
        </div>

        <div className="border-b pb-4">
          <p className="font-semibold text-gray-800">
            New Customer Registered
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Customer account created successfully
          </p>

          <p className="text-xs text-gray-400 mt-2">
            20 minutes ago
          </p>
        </div>

        <div className="border-b pb-4">
          <p className="font-semibold text-gray-800">
            Reservation Rescheduled
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Booking moved from 7:30 PM to 8:15 PM
          </p>

          <p className="text-xs text-gray-400 mt-2">
            1 hour ago
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-800">
            AI Call Completed
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Customer inquiry handled successfully
          </p>

          <p className="text-xs text-gray-400 mt-2">
            2 hours ago
          </p>
        </div>

      </div>
    </div>
  );
}