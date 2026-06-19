export default function MenuHeader() {
  return (
    <div className="mb-8">

      <h1 className="text-5xl font-bold text-[#1F1F1F] tracking-tight">
  Seasonal Menu Editor
</h1>

      <div className="flex gap-3 mt-4">

        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
          124 ITEMS LIVE
        </span>

        <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-semibold">
          3 OUT OF STOCK
        </span>

      </div>

    </div>
  );
}