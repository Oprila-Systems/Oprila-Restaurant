import Sidebar from "../../../components/Sidebar";
import Header from "../components/Header";

import ReservationHeader from "./ReservationHeader";
import FilterBar from "./FilterBar";
import ReservationTable from "./ReservationTable";
import ServicePreparedness from "./ServicePreparedness";
import UpcomingPeak from "./UpcomingPeak";

export default function BookingsPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F9F8F4]">
      <Sidebar />

      <main className="flex-1 overflow-x-auto">
        <Header />

        <div className="px-4 py-6 md:px-6 lg:px-10 space-y-8">
          <ReservationHeader />

          <FilterBar />

          <ReservationTable />

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <ServicePreparedness />
            <UpcomingPeak />
          </div>
        </div>
      </main>
    </div>
  );
}