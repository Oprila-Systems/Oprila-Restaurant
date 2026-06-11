export default function Sidebar() {
  const menuItems = [
    "Overview",
    "Bookings",
    "Menu",
    "Call History",
    "Floor Plan",
  ];

  return (
    <div className="w-64 bg-[#F7F3EF] border-r border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-[#8B4513] mb-10">
        Maitre D' Pro
      </h1>

      <div className="space-y-3">
        {menuItems.map((item) => (
          <div
            key={item}
            className={`px-4 py-3 rounded-xl cursor-pointer transition ${
              item === "Call History"
                ? "bg-[#A85B2B] text-white"
                : "hover:bg-white text-gray-700"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}