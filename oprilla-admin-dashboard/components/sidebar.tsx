import {
  FiGrid,
  FiCalendar,
  FiBookOpen,
  FiMap,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";
import { MdOutlineCall } from "react-icons/md";

export default function Sidebar() {
  const menuItems = [
    { name: "Overview", icon: <FiGrid size={16} /> },
    { name: "Bookings", icon: <FiCalendar size={16} /> },
    { name: "Menu", icon: <FiBookOpen size={16} /> },
    { name: "Call History", icon: <MdOutlineCall size={16} /> },
    { name: "Floor Plan", icon: <FiMap size={16} /> },
  ];

  return (
    <div className="w-[170px] min-h-screen bg-[#F7F4EF] border-r border-[#E7E1D9] px-4 py-6 flex flex-col">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-[18px] font-bold text-[#1F2937] leading-5">
          Maitre D' Pro
        </h1>

        <p className="text-[9px] uppercase tracking-wider text-[#9CA3AF] mt-1">
          Premium Admin
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1">

        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
              item.name === "Call History"
                ? "bg-[#A85B2B] text-white"
                : "text-[#6B7280] hover:bg-white"
            }`}
          >
            {item.icon}

            <span className="text-[13px] font-medium">
              {item.name}
            </span>
          </div>
        ))}

      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#E7E1D9] pt-4 space-y-1">

        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#6B7280] hover:bg-white cursor-pointer">
          <FiSettings size={16} />
          <span className="text-[13px]">Settings</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#6B7280] hover:bg-white cursor-pointer">
          <FiHelpCircle size={16} />
          <span className="text-[13px]">Support</span>
        </div>

      </div>
    </div>
  );
}