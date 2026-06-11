import {
  FiBell,
  FiMoon,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { LuTimer } from "react-icons/lu";

export default function CallDetails() {
  return (
    <div className="bg-white rounded-2xl border border-[#E7E1D9] p-6 shadow-sm">

      {/* Top Header */}
      <div className="flex justify-end items-center gap-4 mb-6">

        <FiBell
          size={18}
          className="text-[#6B7280] cursor-pointer"
        />

        <FiMoon
          size={18}
          className="text-[#6B7280] cursor-pointer"
        />

        <div className="text-right">
          <p className="text-[12px] font-semibold text-[#111827]">
            Julian Rossi
          </p>

          <p className="text-[10px] uppercase text-[#9CA3AF]">
            Floor Manager
          </p>
        </div>

        <div className="w-9 h-9 rounded-full bg-[#A85B2B] text-white flex items-center justify-center font-semibold">
          J
        </div>
      </div>

      {/* Main Section */}
      <div className="flex justify-between">

        {/* Left */}
        <div>

          <h1 className="text-[58px] font-black leading-[52px] text-[#111827]">
            +1 (555)
            <br />
            012-4492
          </h1>

          <div className="flex gap-8 mt-6">

            <div className="flex items-start gap-2">
              <FiCalendar
                size={14}
                className="text-[#8B8B8B] mt-1"
              />

              <div>
                <p className="text-xs text-[#7C7C7C]">
                  Oct 24,
                </p>
                <p className="text-xs text-[#7C7C7C]">
                  2023
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FiClock
                size={14}
                className="text-[#8B8B8B] mt-1"
              />

              <div>
                <p className="text-xs text-[#7C7C7C]">
                  12:45
                </p>
                <p className="text-xs text-[#7C7C7C]">
                  PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <LuTimer
                size={14}
                className="text-[#8B8B8B] mt-1"
              />

              <div>
                <p className="text-xs text-[#7C7C7C]">
                  Duration:
                </p>
                <p className="text-xs text-[#7C7C7C]">
                  4m 32s
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right */}
       <div className="flex flex-col justify-center items-center gap-5">

          {/* Badge */}
          <div className="w-20 h-20 rounded-full bg-[#F2BE95] flex items-center justify-center shadow-sm">
          <span className="text-[10px] font-extrabold text-center uppercase text-[#8D4A22] leading-tight tracking-wide">
            TABLE
          <br />
             BOOKED
           <br />
              FOR 4
           </span>
           </div>
          {/* Buttons */}
          <div className="flex justify-center gap-3 w-full">

            <button className="border border-[#D1D5DB] bg-white px-6 py-3 rounded-xl font-black text-xl text-[#111827]">
              Export Transcript
             </button>
               
             <button className="w-[120px] h-[58px] bg-black text-white rounded-xl font-semibold">
              Flag
            <br />
              for Review
            </button>
           </div>
           </div>
      </div>
    </div>
  );
}