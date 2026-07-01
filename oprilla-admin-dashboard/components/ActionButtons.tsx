interface ActionButtonProps {
  label: string;
  variant?: "primary" | "secondary";
}

export default function ActionButton({
  label,
  variant = "secondary",
}: ActionButtonProps) {
  const baseClasses =
    "w-full sm:w-[180px] lg:w-[135px] min-h-[58px] px-4 py-3 rounded-xl font-semibold text-[14px] md:text-[15px] transition-colors";

  return (
    <button
      className={
        variant === "primary"
          ? `${baseClasses} bg-black text-white hover:bg-gray-800`
          : `${baseClasses} border border-[#D6D6D6] bg-white text-[#111827] hover:bg-gray-50`
      }
    >
      {label}
    </button>
  );
}