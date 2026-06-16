"use client";

export default function ReservationHeader() {
  const handleQuickBooking = () => {
    alert("Quick Booking Clicked");
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#2B2B2B]">
          Reservation Ledger
        </h1>

        <p className="mt-3 text-gray-500 text-base md:text-lg">
          Managing 48 guests for today's service.
        </p>
      </div>

      <button
        onClick={handleQuickBooking}
        className="
          bg-[#1F1F1F]
          text-white
          px-7
          py-3
          rounded-xl
          shadow-sm
          hover:bg-black
          transition-all
          w-full
          md:w-auto
        "
      >
        + Quick Booking
      </button>
    </div>
  );
}