export interface Appointment {
  id: number;
  customerName: string;
  customerPhone: string;
  guestCount: number;
  status: string;
  specialRequests?: string;
}

export interface RecentActivity {
  id: number;
  title: string;
  description: string;
  time: string;
}

const API_URL = "http://localhost:5232/api";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcmVzdGF1cmFudC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImp0aSI6ImUwNzE0YWM4LWNhYTctNGI3Yi1iMmJjLTFlYzFjNDIzMzM1MyIsIm5iZiI6MTc4MjkwODY0NCwiZXhwIjoxNzgyOTM3NDQ0LCJpc3MiOiJSZXN0YXVyYW50QVBJIiwiYXVkIjoiUmVzdGF1cmFudEFQSUNsaWVudHMifQ.AqbeDlyAZly8540jXTXGviLNe5cWGrrNVHRjFc8x6hk";
// ======================
// GET APPOINTMENTS
// ======================
export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await fetch(
      `${API_URL}/admin/appointments?page=1&pageSize=20`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Appointments API Error:", response.status);
      return [];
    }

    const result = await response.json();

    console.log("Appointments API Response:", result);

    // Backend response:
    // {
    //   success: true,
    //   data: {
    //     items: []
    //   }
    // }

    if (
      result &&
      result.success &&
      result.data &&
      Array.isArray(result.data.items)
    ) {
      return result.data.items;
    }

    return [];
  } catch (error) {
    console.error("getAppointments Error:", error);
    return [];
  }
};

// ======================
// GET RECENT ACTIVITIES
// ======================
export const getRecentActivities = async (): Promise<RecentActivity[]> => {
  try {
    const response = await fetch(
      `${API_URL}/admin/recent-activities`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Recent Activity API Error:", response.status);
      return [];
    }

    const result = await response.json();

    console.log("Recent Activity API Response:", result);

    if (
      result &&
      result.success &&
      Array.isArray(result.data)
    ) {
      return result.data;
    }

    if (
      result &&
      result.success &&
      result.data &&
      Array.isArray(result.data.items)
    ) {
      return result.data.items;
    }

    return [];
  } catch (error) {
    console.error("getRecentActivities Error:", error);
    return [];
  }
};