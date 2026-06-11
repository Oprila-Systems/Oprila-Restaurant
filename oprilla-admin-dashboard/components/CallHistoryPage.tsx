import Sidebar from "./sidebar";

import RecentActivityPanel from "./Recentactivitypanel";
import CallDetailsHeader from "./CallDetails";
import ConversationSection from "./Convsection";

export default function CallHistoryPage() {
  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
      
      <Sidebar/>
      

      {/* Recent Activity */}
      <RecentActivityPanel />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        <CallDetailsHeader />

        <div className="mt-6">
          <ConversationSection />
        </div>
      </div>
    </div>
  );
}