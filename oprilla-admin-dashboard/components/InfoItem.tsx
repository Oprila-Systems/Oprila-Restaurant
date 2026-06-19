type InfoItemProps = {
  icon: React.ReactNode;
  text: string;
};

export default function InfoItem({
  icon,
  text,
}: InfoItemProps) {
  return (
    <div className="flex items-center gap-2">
      {icon}

      <span className="text-sm font-semibold text-[#4B5563]">
        {text}
      </span>
    </div>
  );
}