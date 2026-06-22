//import Sidebar from "../components/Sidebar";
import RecentActivityPanel from "./Recentactivitypanel";
import CallDetails from "./CallDetails";
import ConversationSection from "./Convsection";

export default function CallHistoryPage() {
  return (
    <div className="flex min-h-screen bg-[#F7F4EF]">

      {/* Sidebar */}
      

      {/* Recent Activity */}
      <RecentActivityPanel />

      {/* Main Content */}
      <div className="flex-1 p-6">

        <CallDetails />

        <div className="mt-6">
          <ConversationSection />
        </div>

      </div>
    </div>
  );
}