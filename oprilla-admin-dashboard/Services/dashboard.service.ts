export interface Appointment {
  id: number;
  customerName: string;
  customerPhone: string;
  guestCount: number;
  status: string;
  specialRequests?: string;
}

const API_URL = "http://localhost:5232/api";

export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const token = localStorage.getItem("token");

    console.log("🔑 Token:", token);

    if (!token) {
      console.error("❌ No token found in localStorage");
      return [];
    }

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

    console.log("Status:", response.status);

    if (response.status === 401) {
      console.error("❌ Unauthorized (401)");

      const errorText = await response.text();
      console.log("Backend Response:", errorText);

      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    console.log("Appointments API Response:", result);

    return result.data ?? [];
  } catch (error) {
    console.error("❌ Fetch appointments failed:", error);
    return [];
  }
};

export const getRecentActivities = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("🔑 Token:", token);

    if (!token) {
      console.error("❌ No token found in localStorage");
      return [];
    }

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

    console.log("Status:", response.status);

    if (response.status === 401) {
      console.error("❌ Unauthorized (401)");

      const errorText = await response.text();
      console.log("Backend Response:", errorText);

      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    console.log("Recent Activities Response:", result);

    return result.data ?? [];
  } catch (error) {
    console.error("❌ Fetch recent activities failed:", error);
    return [];
  }
};