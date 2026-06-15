import { Bell, Moon } from "lucide-react";

export default function Header() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="flex items-center justify-end gap-6 border-b border-gray-200 pb-4 mb-6">
      <Bell size={18} className="text-gray-600" />
      <Moon size={18} className="text-gray-600" />

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-semibold text-[#2B2B2B]">
            Julian Rossi
          </p>

          <p className="text-[10px] uppercase text-gray-400">
            Manager Profile
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-black"></div>
        <div className="bg-[#F7DED3] text-[#A46A4D] px-5 py-2 rounded-full text-xs font-medium">
        {formattedDate}
      </div>
      </div>
    </div>
  );
}