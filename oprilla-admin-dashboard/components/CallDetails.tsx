import InfoItem from "./InfoItem";
import ActionButton from "./ActionButtons";
import {
  FiBell,
  FiMoon,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { LuTimer } from "react-icons/lu";

export default function CallDetails() {
  return (
    <div className="bg-white rounded-[28px] border border-[#E7E1D9] p-8 shadow-sm">

      {/* Header */}
      <div className="flex justify-end items-center gap-4 mb-8">

        <FiBell
          size={18}
          className="text-[#6B7280] cursor-pointer"
        />

        <FiMoon
          size={18}
          className="text-[#6B7280] cursor-pointer"
        />

        <div className="text-right">
          <p className="text-sm font-semibold text-[#111827]">
            Julian Rossi
          </p>

          <p className="text-[11px] uppercase tracking-wide text-[#9CA3AF]">
            Floor Manager
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-[#A85B2B] text-white flex items-center justify-center font-semibold">
          J
        </div>

      </div>

      {/* Main Section */}
      <div className="flex flex-col xl:flex-row items-center gap-14">

        {/* LEFT */}
        <div className="flex-1 max-w-[700px]">

          <h1
            className="
              text-[48px]
              md:text-[64px]
              lg:text-[78px]
              font-black
              leading-[0.9]
              tracking-tight
              text-[#081228]
            "
          >
            +1 (555)
            <br />
            012-4492
          </h1>

          {/* Meta Data */}
          <div className="flex flex-wrap items-center gap-8 mt-8">

            <InfoItem
              icon={
                <FiCalendar
                  size={16}
                  className="text-[#8B8B8B]"
                />
              }
              text="Oct 24, 2023"
            />

            <InfoItem
              icon={
                <FiClock
                  size={16}
                  className="text-[#8B8B8B]"
                />
              }
              text="12:45 PM"
            />

            <InfoItem
              icon={
                <LuTimer
                  size={16}
                  className="text-[#8B8B8B]"
                />
              }
              text="Duration • 4m 32s"
            />

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center gap-6 min-w-[260px]">

          {/* Badge */}
          <div className="w-24 h-24 rounded-full bg-[#F2BE95] flex items-center justify-center shadow-sm">

            <span
              className="
                text-[10px]
                font-extrabold
                text-center
                uppercase
                tracking-wider
                leading-4
                text-[#8D4A22]
              "
            >
              TABLE
              <br />
              BOOKED
              <br />
              FOR 4
            </span>

          </div>

          {/* Buttons */}
      <div className="flex flex-row gap-3">
          <ActionButton
            label="Export Transcript"
          />

         <ActionButton
           label="Flag for Review"
           variant="primary"
          />

          </div>
          </div>

        </div>

      </div>
    
  );
}