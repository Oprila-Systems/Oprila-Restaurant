"use client";

import { useMemo, useState } from "react";

import Pagination from "../../../components/Pagination";
import ReservationCard from "./ReservationCard";
import ReservationRow from "./ReservationRow";
import Table from "./Table";
import { reservations } from "../constants/bookingConstants";

export default function ReservationTable() {
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(reservations.length / ITEMS_PER_PAGE),
    [ITEMS_PER_PAGE]
  );

  const currentReservations = useMemo(
    () =>
      reservations.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [currentPage, ITEMS_PER_PAGE]
  );

  return (
    <>
      <div className="space-y-4 p-4 md:hidden">
        {currentReservations.map((item) => (
          <ReservationCard
            key={item.id}
            item={item}
          />
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-[#ECE8E1] bg-white md:block">
        <Table
          headers={[
            "Customer Name",
            "Date & Time",
            "Guests",
            "Table",
            "Status",
            "Source",
            "Actions",
          ]}
        >
          {currentReservations.map((item) => (
            <ReservationRow
              key={item.id}
              item={item}
            />
          ))}
        </Table>

        <div className="border-t border-[#ECE8E1] px-4 py-4 text-[12px] text-[#7F7A74] lg:px-6 lg:py-5">
          <p>
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              reservations.length
            )}{" "}
            of {reservations.length} results
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