"use client";

import { useEffect, useState } from "react";
import { getAppointments, Appointment } from "../Services/dashboard.service";

export default function RecentActivityPanel() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await getAppointments();
        console.log("Appointments:", data);
        setAppointments(data);
      } catch (error) {
        console.error("Error loading appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  if (loading) {
    return (
      <div className="w-[280px] bg-white border-r border-[#E6E1DA] p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-[280px] bg-white border-r border-[#E6E1DA]">
      {/* Header */}
      <div className="p-6 border-b border-[#E7E1D9]">
        <h2 className="text-3xl font-extrabold text-[#111827]">
          Recent Activity
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          AI Concierge logs for today
        </p>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold mb-3">
          Appointments
        </h3>

        {appointments.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No appointments found.
          </p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-[#FBF3EC] border border-[#F2E1D2] rounded-xl p-3 mb-3"
            >
              <p className="font-bold text-[#111827]">
                {appointment.customerPhone}
              </p>

              <p className="text-xs uppercase text-green-600 mt-1">
                {appointment.status}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                {appointment.specialRequests
                  ? appointment.specialRequests
                  : `${appointment.customerName} booked ${appointment.guestCount} guests`}
              </p>
            </div>
          ))
        )}

        <div className="mt-8">
          <h3 className="text-sm font-bold mb-3">
            Recent Activity
          </h3>

          <p className="text-sm text-gray-500">
            Recent Activity API is not available yet.
          </p>
        </div>
      </div>
    </div>
  );
}