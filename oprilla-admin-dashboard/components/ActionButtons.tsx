interface ActionButtonProps {
  label: string;
  variant?: "primary" | "secondary";
}

export default function ActionButton({
  label,
  variant = "secondary",
}: ActionButtonProps) {
  return (
    <button
      className={
        variant === "primary"
          ? "w-[135px] h-[58px] bg-black text-white rounded-xl font-semibold text-[15px]"
          : "w-[135px] h-[58px] border border-[#D6D6D6] bg-white rounded-xl font-semibold text-[15px] text-[#111827]"
      }
    >
      {label}
    </button>
  );
}