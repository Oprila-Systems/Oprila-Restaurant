export default function FilterBar() {
  return (
    <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-4">

      <input
        type="date"
        className="border rounded-lg px-3 py-2"
      />

      <select className="border rounded-lg px-3 py-2">
        <option>All Statuses</option>
      </select>

      <select className="border rounded-lg px-3 py-2">
        <option>All Sources</option>
      </select>

      <button className="ml-auto text-gray-500">
        More Filters
      </button>

    </div>
  );
}