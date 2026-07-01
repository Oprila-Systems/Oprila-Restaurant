import CallDetails from "./CallDetails";
import ConversationSection from "./Convsection";
import RecentActivityPanel from "./Recentactivitypanel";


export default function CallHistoryPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-[#F7F4EF]">
      {/* Recent Activity */}
      <div className="w-full lg:w-[340px] xl:w-[380px]">
       <RecentActivityPanel/>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
        <CallDetails />

        <div className="mt-6">
          <ConversationSection />
        </div>
      </div>
    </div>
  );
}