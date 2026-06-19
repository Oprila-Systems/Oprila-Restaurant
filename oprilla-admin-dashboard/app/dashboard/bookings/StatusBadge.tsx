interface StatusBadgeProps {
  status: string;
  statusColor?: string;
}

export default function StatusBadge({
  status,
  statusColor,
}: StatusBadgeProps) {
  const statusClasses = {
    green: "bg-[#E7F2E5] text-[#6D8D69]",
    orange: "bg-[#F9E3D7] text-[#C17A52]",
    gray: "bg-[#ECEAE6] text-[#6B6763]",
    red: "bg-[#FBE7E7] text-[#CC7D7D]",
    default: "bg-[#ECEAE6] text-[#6B6763]",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-medium ${
        statusClasses[
          statusColor as keyof typeof statusClasses
        ] ?? statusClasses.default
      }`}
    >
      {status}
    </span>
  );
}