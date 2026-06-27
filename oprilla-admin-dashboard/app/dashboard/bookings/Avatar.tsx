interface AvatarProps {
  avatar: string;
  avatarColor?: string;
  status: string;
}

export default function Avatar({
  avatar,
  avatarColor,
  status,
}: AvatarProps) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
        avatarColor || "bg-[#F4DDD2]"
      } ${
        status === "Cancelled"
          ? "text-[#D28D96]"
          : "text-[#7A4F3D]"
      }`}
    >
      {avatar}
    </div>
  );
}