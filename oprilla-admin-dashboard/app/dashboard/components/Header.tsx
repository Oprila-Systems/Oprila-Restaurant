import { Bell, Moon, Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="border-b border-gray-200 bg-[#F9F8F4] px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#2B2B2B] text-white shadow-md"
          >
            <Menu size={28} />
          </button>

          <div>
            <h1 className="text-[28px] font-serif font-semibold text-[#2C2C2C]">
              Maître D' Pro
            </h1>

            <p className="mt-1 text-[11px] uppercase tracking-[3px] text-gray-400">
              PREMIUM ADMIN
            </p>
          </div>
        </div>

        <div className="hidden lg:flex ml-auto items-center gap-6">
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

            <div className="h-10 w-10 rounded-full bg-black"></div>

            <div className="rounded-full bg-[#F7DED3] px-5 py-2 text-xs font-medium text-[#A46A4D]">
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}