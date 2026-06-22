import { Globe, Bot, Users } from "lucide-react";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import { Reservation } from "./types";

interface Props {
  item: Reservation;
}


export default function ReservationCard({ item }: Props) {
  const isCancelled = item.status === "Cancelled";

  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm ${
        item.highlight
          ? "border-l-4 border-l-[#B76F49] border-[#ECE8E1]"
          : "border-[#ECE8E1]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <Avatar
            avatar={item.avatar}
            avatarColor={item.avatarColor}
            status={item.status}
          />

          <div>
            <p
              className={`text-[14px] font-semibold ${
                isCancelled
                  ? "line-through text-[#B8B2AC]"
                  : "text-[#2B2B2B]"
              }`}
            >
              {item.customer}
            </p>

            <p
              className={`mt-0.5 text-[11px] ${
                isCancelled
                  ? "text-[#B8B2AC]"
                  : item.subtitle.includes("Special")
                  ? "text-[#B56E47]"
                  : "text-[#8A8A8A]"
              }`}
            >
              {item.subtitle}
            </p>
          </div>
        </div>

        <StatusBadge
          status={item.status}
          statusColor={item.statusColor}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-[#6B6763]">
        <span>🕒 {item.time}</span>

        <span className="flex items-center gap-1">
          <Users size={12} />
          {item.guests}
        </span>

        {!isCancelled && (
          <span className="rounded-md bg-[#F2F0EC] px-2 py-0.5">
            Table {item.table}
          </span>
        )}

        <span className="flex items-center gap-1">
          {item.source === "Web" ? (
            <Globe size={12} />
          ) : (
            <Bot size={12} />
          )}
          {item.source}
        </span>
      </div>

      {item.approve && (
        <div className="mt-4 flex justify-end">
          <button className="rounded-lg bg-[#2B2B2B] px-4 py-1.5 text-[12px] font-semibold text-white">
            Approve
          </button>
        </div>
      )}
    </div>
  );
}