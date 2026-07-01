export interface Appointment {
  id: number;
  customerName: string;
  customerPhone: string;
  guestCount: number;
  status: string;
  specialRequests?: string;
}

const API_URL = "http://localhost:5232/api";

export const getAppointments = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/admin/appointments?page=1&pageSize=20`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Appointments Status:", response.status);

  const result = await response.json();

  console.log("Appointments Response:", result);

  return result.data || result;
};

export const getRecentActivities = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/admin/recent-activities`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Activities Status:", response.status);

  const result = await response.json();

  console.log("Activities Response:", result);

  return result.data || result;
};