type NavItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

export default function NavItem({
  icon: Icon,
  label,
  active = false,
}: NavItemProps) {
  return (
    <li
      className={`flex items-center gap-4 text-[16px] ${
        active
          ? "text-black font-medium"
          : "text-gray-500"
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </li>
  );
}