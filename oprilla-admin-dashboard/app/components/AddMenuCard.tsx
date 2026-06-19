import { Plus } from "lucide-react";

export default function AddMenuCard() {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl h-[260px] flex flex-col items-center justify-center bg-white">
      <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 text-2xl">
        <Plus className="w-6 h-6 text-gray-500" />
      </div>

      <p className="mt-4 text-sm text-gray-500 font-medium">
        Add Appetizer
      </p>

    </div>
  );
}