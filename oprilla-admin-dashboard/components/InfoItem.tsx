type InfoItemProps = {
  icon: React.ReactNode;
  text: string;
};

export default function InfoItem({
  icon,
  text,
}: InfoItemProps) {
  return (
    <div className="flex items-start gap-2 min-w-0">
      <div className="flex-shrink-0 mt-0.5">
        {icon}
      </div>

      <span className="min-w-0 break-words text-xs sm:text-sm font-semibold text-[#4B5563] leading-5">
        {text}
      </span>
    </div>
  );
}