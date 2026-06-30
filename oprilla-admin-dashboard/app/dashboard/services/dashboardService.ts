const API_URL = "http://localhost:5232/api";

// Temporary token from Swagger.
// Replace this with the JWT token you received after login.
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcmVzdGF1cmFudC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImp0aSI6ImVkMmQ2NTY1LTYxMGQtNDhhOS04ZjE5LWU5NDQ2YzhiMDhkNyIsIm5iZiI6MTc4Mjc5MTY4OCwiZXhwIjoxNzgyODIwNDg4LCJpc3MiOiJSZXN0YXVyYW50QXBpIiwiYXVkIjoiUmVzdGF1cmFudENsaWVudCJ9.q1GX_Gejymj1V_9aA3Ybzoyv3LTMB4ck4caOoSXAKZA";

export async function getDashboardData() {
  const response = await fetch(
    `${API_URL}/admin/appointments/dashboard`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}