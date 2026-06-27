import { SlidersHorizontal } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="flex flex-wrap items-center justify-between rounded-2xl border border-[#E7E2D9] bg-[#F7F5F1] px-5 py-4">

      <div className="flex flex-wrap items-center gap-6">

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#6F6A63]">
            Date:
          </span>

          <input
            type="date"
            className="h-9 rounded-md border border-[#DDD8CF] bg-white px-3 text-sm text-[#4B4B4B] outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#6F6A63]">
            Status:
          </span>

          <select className="h-9 rounded-md border border-[#DDD8CF] bg-white px-3 text-sm text-[#4B4B4B] outline-none">
            <option>All Statuses</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#6F6A63]">
            Source:
          </span>

          <select className="h-9 rounded-md border border-[#DDD8CF] bg-white px-3 text-sm text-[#4B4B4B] outline-none">
            <option>All Sources</option>
          </select>
        </div>

      </div>

      <button className="mt-3 flex items-center gap-2 text-sm font-medium text-[#6F6A63] md:mt-0 hover:text-black">
       <SlidersHorizontal size={14} />
          More Filters
        </button>
    </div>
  );
}