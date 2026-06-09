export default function ActivityPanel() {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Activity Panel
      </h2>

      <div className="space-y-4">
        <div className="border-b pb-2">
          <p className="font-medium">New order received</p>
          <p className="text-sm text-gray-500">
            5 minutes ago
          </p>
        </div>

        <div className="border-b pb-2">
          <p className="font-medium">Reservation confirmed</p>
          <p className="text-sm text-gray-500">
            20 minutes ago
          </p>
        </div>

        <div>
          <p className="font-medium">Customer added</p>
          <p className="text-sm text-gray-500">
            1 hour ago
          </p>
        </div>
      </div>
    </div>
  );
}