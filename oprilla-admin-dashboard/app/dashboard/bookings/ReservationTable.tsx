"use client";

import { useState } from "react";

import {
  Globe,
  Bot,
  Users,
  MoreVertical,
} from "lucide-react";

import Pagination from "./Pagination";
import Table from "./Table";
import { reservations } from "../constants/bookingConstants";

export default function ReservationTable() {
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    reservations.length / ITEMS_PER_PAGE
  );

  const currentReservations = reservations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusClasses = (color?: string) => {
    switch (color) {
      case "green":
        return "bg-[#E7F2E5] text-[#6D8D69]";

      case "orange":
        return "bg-[#F9E3D7] text-[#C17A52]";

      case "gray":
        return "bg-[#ECEAE6] text-[#6B6763]";

      case "red":
        return "bg-[#FBE7E7] text-[#CC7D7D]";

      default:
        return "bg-[#ECEAE6] text-[#6B6763]";
    }
  };

  return (
    <>
      <div className="md:hidden space-y-4 p-4">
        {currentReservations.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border bg-white p-5 shadow-sm ${
              item.highlight
                ? "border-l-4 border-l-[#B76F49] border-[#ECE8E1]"
                : "border-[#ECE8E1]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                    item.avatarColor || "bg-[#F4DDD2]"
                  } ${
                    item.status === "Cancelled"
                      ? "text-[#D28D96]"
                      : "text-[#7A4F3D]"
                  }`}
                >
                  {item.avatar}
                </div>
                <div>
                  <p
                    className={`text-[14px] font-semibold ${
                      item.status === "Cancelled"
                        ? "line-through text-[#B8B2AC]"
                        : "text-[#2B2B2B]"
                    }`}
                  >
                    {item.customer}
                  </p>
                  <p
                    className={`mt-0.5 text-[11px] ${
                      item.status === "Cancelled"
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

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ${getStatusClasses(
                  item.statusColor
                )}`}
              >
                {item.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-[#6B6763]">
              <span className={item.status === "Cancelled" ? "text-[#B8B2AC]" : ""}>
                🕒 {item.time}
              </span>
              <span
                className={`flex items-center gap-1 ${
                  item.status === "Cancelled" ? "text-[#B8B2AC]" : ""
                }`}
              >
                <Users size={12} />
                {item.guests}
              </span>
              {item.status !== "Cancelled" && (
                <span className="rounded-md bg-[#F2F0EC] px-2 py-0.5">
                  Table {item.table}
                </span>
              )}
              <span
                className={`flex items-center gap-1 ${
                  item.status === "Cancelled" ? "text-[#B8B2AC]" : ""
                }`}
              >
                {item.source === "Web" ? <Globe size={12} /> : <Bot size={12} />}
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
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#ECE8E1] bg-white">
        <table className="w-full min-w-[720px]">

          <thead className="bg-[#F8F7F3]">
            <tr className="text-[11px] uppercase tracking-wide text-[#7E7A74]">
              <th className="px-3 py-4 lg:px-6 lg:py-5 text-left whitespace-nowrap">Customer Name</th>
              <th className="px-3 py-4 lg:px-6 lg:py-5 text-left whitespace-nowrap">Date & Time</th>
              <th className="px-3 py-4 lg:px-6 lg:py-5 text-left whitespace-nowrap">Guests</th>
              <th className="px-3 py-4 lg:px-6 lg:py-5 text-left whitespace-nowrap">Table</th>
              <th className="px-3 py-4 lg:px-6 lg:py-5 text-left whitespace-nowrap">Status</th>
              <th className="px-3 py-4 lg:px-6 lg:py-5 text-left whitespace-nowrap">Source</th>
              <th className="px-3 py-4 lg:px-6 lg:py-5 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentReservations.map((item) => (
              <tr
                key={item.id}
                className={`border-t border-[#ECE8E1] hover:bg-[#FAFAF8] transition-colors ${
                  item.highlight ? "border-l-[3px] border-l-[#B76F49]" : ""
                }`}
              >
                <td className="px-3 py-5 lg:px-6 lg:py-7">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                        item.avatarColor || "bg-[#F4DDD2]"
                      } ${
                        item.status === "Cancelled"
                          ? "text-[#D28D96]"
                          : "text-[#7A4F3D]"
                      }`}
                    >
                      {item.avatar}
                    </div>
                    <div className="leading-5 min-w-0">
                      <p
                        className={`text-[13px] truncate ${
                          item.status === "Cancelled"
                            ? "line-through text-[#B8B2AC]"
                            : "text-[#2B2B2B]"
                        }`}
                      >
                        {item.customer}
                      </p>
                      <p
                        className={`mt-1 text-[11px] truncate ${
                          item.status === "Cancelled"
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
                </td>

                <td className="px-3 py-5 lg:px-6 lg:py-7 whitespace-nowrap">
                  <div
                    className={`text-[13px] font-semibold ${
                      item.status === "Cancelled" ? "text-[#B8B2AC]" : "text-[#262626]"
                    }`}
                  >
                    Today,
                  </div>
                  <div
                    className={`text-[14px] font-bold ${
                      item.status === "Cancelled" ? "text-[#B8B2AC]" : "text-[#262626]"
                    }`}
                  >
                    {item.time}
                  </div>
                  <div
                    className={`mt-1 text-[11px] ${
                      item.status === "Cancelled" ? "text-[#B8B2AC]" : "text-[#9B9792]"
                    }`}
                  >
                    Fri Nov 24
                  </div>
                </td>

                <td className="px-3 py-5 lg:px-6 lg:py-7">
                  <div
                    className={`flex items-center gap-1.5 text-[13px] ${
                      item.status === "Cancelled" ? "text-[#B8B2AC]" : "text-[#4A4A4A]"
                    }`}
                  >
                    <Users size={13} />
                    {item.guests}
                  </div>
                </td>

                <td className="px-3 py-5 lg:px-6 lg:py-7">
                  {item.status === "Cancelled" ? (
                    <span className="text-sm text-[#B8B2AC]">—</span>
                  ) : (
                    <div className="w-fit rounded-md bg-[#F2F0EC] px-2 py-1 text-[11px] text-center">
                      <div className="font-semibold">Table</div>
                      <div>{item.table}</div>
                    </div>
                  )}
                </td>

                <td className="px-3 py-5 lg:px-6 lg:py-7 whitespace-nowrap">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-medium ${getStatusClasses(
                      item.statusColor
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-3 py-5 lg:px-6 lg:py-7">
                  <div
                    className={`flex items-center gap-1.5 text-[12px] ${
                      item.status === "Cancelled" ? "text-[#B8B2AC]" : "text-[#666]"
                    }`}
                  >
                    {item.source === "Web" ? (
                      <Globe size={13} />
                    ) : (
                      <Bot size={13} />
                    )}
                    <span className="whitespace-pre-line">{item.source}</span>
                  </div>
                </td>

                <td className="px-3 py-5 lg:px-6 lg:py-7">
                  <div className="flex items-center justify-end gap-3">
                    {item.approve && (
                      <button className="text-[12px] font-semibold text-[#2B2B2B] hover:underline">
                        Approve
                      </button>
                    )}
                    <MoreVertical
                      size={15}
                      className="cursor-pointer text-gray-400 hover:text-gray-600"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-[#ECE8E1] px-4 py-4 lg:px-6 lg:py-5 text-[12px] text-[#7F7A74]">
         <p>
           Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, reservations.length)} of{" "}
          {reservations.length} results
        </p>

      <Pagination
       currentPage={currentPage}
       totalPages={totalPages}
       onPageChange={setCurrentPage}
      />
       </div>
      </div>
      
    </>
  );
} 