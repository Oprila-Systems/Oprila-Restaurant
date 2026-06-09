export default function ActivityPanel() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">

        <div className="border-b pb-3">
          <p className="font-medium text-gray-800">
            Booking Confirmed
          </p>
          <p className="text-sm text-gray-500">
            Table for 4 reserved at 8:00 PM
          </p>
        </div>

        <div className="border-b pb-3">
          <p className="font-medium text-gray-800">
            New Customer Registered
          </p>
          <p className="text-sm text-gray-500">
            Customer account created successfully
          </p>
        </div>

        <div className="border-b pb-3">
          <p className="font-medium text-gray-800">
            Reservation Rescheduled
          </p>
          <p className="text-sm text-gray-500">
            Booking moved from 7:30 PM to 8:15 PM
          </p>
        </div>

        <div>
          <p className="font-medium text-gray-800">
            AI Call Completed
          </p>
          <p className="text-sm text-gray-500">
            Customer inquiry handled successfully
          </p>
        </div>

      </div>
    </div>
  );
}