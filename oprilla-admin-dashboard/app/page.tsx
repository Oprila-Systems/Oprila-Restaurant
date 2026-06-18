import Sidebar from "../components/Sidebar";
import CallHistoryPage from "../components/CallHistoryPage";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-h-screen bg-gray-100">
        <CallHistoryPage />
      </main>
    </div>
  );
}