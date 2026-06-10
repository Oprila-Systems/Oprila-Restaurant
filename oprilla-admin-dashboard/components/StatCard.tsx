type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
};
export default function StatCard({
  title,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 w-60">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

      <p className="text-3xl font-bold mt-2">
        {subtitle}
      </p>
    </div>
  );
}