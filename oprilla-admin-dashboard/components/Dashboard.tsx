export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 border-r bg-white">
        Sidebar
      </div>

      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
}