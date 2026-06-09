import Sidebar from "./sidebar";

export default function CallHistoryPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">
          Call History
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          Call History Page Content
        </div>
      </div>

    </div>
  );
}