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
  const infoItems = [
    {
      icon: (
        <FiCalendar
          size={16}
          className="text-[#8B8B8B]"
        />
      ),
      text: "Oct 24, 2023",
    },
    {
      icon: (
        <FiClock
          size={16}
          className="text-[#8B8B8B]"
        />
      ),
      text: "12:45 PM",
    },
    {
      icon: (
        <LuTimer
          size={16}
          className="text-[#8B8B8B]"
        />
      ),
      text: "Duration • 4m 32s",
    },
  ];

  const buttons = [
    {
      label: "Export Transcript",
      variant: "secondary" as const,
    },
    {
      label: "Flag for Review",
      variant: "primary" as const,
    },
  ];

  return (
    <div className="bg-white rounded-2xl lg:rounded-[28px] border border-[#E7E1D9] p-4 sm:p-6 lg:p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-6 lg:mb-8">
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <FiBell
            size={18}
            className="text-[#6B7280] cursor-pointer"
          />

          <FiMoon
            size={18}
            className="text-[#6B7280] cursor-pointer"
          />

          <div className="text-right">
            <p className="text-xs sm:text-sm font-semibold text-[#111827]">
              Julian Rossi
            </p>

            <p className="text-[10px] sm:text-[11px] uppercase tracking-wide text-[#9CA3AF]">
              Floor Manager
            </p>
          </div>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#A85B2B] text-white flex items-center justify-center font-semibold">
            J
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 lg:gap-12">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-[78px]
              font-black
              leading-[0.9]
              tracking-tight
              text-[#081228]
              break-words
            "
          >
            +1 (555)
            <br />
            012-4492
          </h1>

          {/* Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 lg:gap-8 mt-6 lg:mt-8">
            {infoItems.map((item, index) => (
              <InfoItem
                key={index}
                icon={item.icon}
                text={item.text}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="w-full xl:w-auto flex flex-col items-center xl:items-end gap-6">
          {/* Badge */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F2BE95] flex items-center justify-center shadow-sm">
            <span
              className="
                text-[9px]
                sm:text-[10px]
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
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            {buttons.map((button, index) => (
              <ActionButton
                key={index}
                label={button.label}
                variant={button.variant}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}