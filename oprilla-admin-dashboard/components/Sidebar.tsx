export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r p-4">
      <h1 className="text-xl font-bold mb-6">
        Restaurant Admin
      </h1>

      <ul className="space-y-4">
        <li>Dashboard</li>
        <li>Orders</li>
        <li>Menu</li>
        <li>Customers</li>
        <li>Tables</li>
        <li>Reservations</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}