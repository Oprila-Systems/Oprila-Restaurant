interface StatusBadgeProps {
  status: string;
  statusColor?: string;
}

export default function StatusBadge({
  status,
  statusColor,
}: StatusBadgeProps) {
  const statusClasses = {
   green: "bg-status-greenBg text-status-greenText",
   orange: "bg-status-orangeBg text-status-orangeText",
   gray: "bg-status-grayBg text-status-grayText",
   red: "bg-status-redBg text-status-redText",
   default: "bg-status-grayBg text-status-grayText",
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