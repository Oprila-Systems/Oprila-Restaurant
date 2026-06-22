import Sidebar from "../components/Sidebar";
import CallHistoryPage from "../components/CallHistoryPage";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <CallHistoryPage />
      </main>
    </div>
  );
}