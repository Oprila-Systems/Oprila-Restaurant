import Sidebar from "./Sidebar";
import RecentActivityPanel from "./Recent activity panel";
import CallDetailsHeader from "./Call Details";
import ConversationSection from "./Conv Section";

export default function CallHistoryPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <RecentActivityPanel />

      <div className="flex-1">
        <CallDetailsHeader />

        <div className="p-6">
          <ConversationSection />
        </div>
      </div>
    </div>
  );
}