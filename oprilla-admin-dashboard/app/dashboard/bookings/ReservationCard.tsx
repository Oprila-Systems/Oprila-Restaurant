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
          ? "border-l-4 border-l-card-highlight border-card-border"
          : "border-card-border"
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
                  ? "line-through text-card-disabled"
                  : "text-card-title"
              }`}
            >
              {item.customer}
            </p>

            <p
              className={`mt-0.5 text-[11px] ${
                isCancelled
                  ? "text-card-disabled"
                  : item.subtitle.includes("Special")
                  ? "text-card-special"
                  : "text-card-subtitle"
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

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-status-grayText">
        <span>🕒 {item.time}</span>

        <span className="flex items-center gap-1">
          <Users size={12} />
          {item.guests}
        </span>

        {!isCancelled && (
          <span className="rounded-md bg-card-tableBg px-2 py-0.5">
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
          <button className="rounded-lg bg-card-button px-4 py-1.5 text-[12px] font-semibold text-white">
            Approve
          </button>
        </div>
      )}
    </div>
  );
}