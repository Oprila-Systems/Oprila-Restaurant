type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  borderColor: string;
  subtitleColor: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  borderColor,
  subtitleColor,
}: StatCardProps) {
  return (
    <div
      className={`h-[125px] bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 border-l-2 ${borderColor}`}
    >
      
      <div className="flex items-start justify-between">
        <h3 className="text-[9px] uppercase tracking-[1.5px] text-gray-500 leading-4">
          {title}
        </h3>

        <Icon size={14} className="text-gray-400" />
      </div>

      
      <div className="mt-4 flex items-end gap-1">
        <h2 className="text-[34px] font-bold leading-none text-[#1E1E1E]">
          {value}
        </h2>

        {subtitle && (
          <p className={`text-[10px] mb-1 leading-4 ${subtitleColor}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}