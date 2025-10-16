const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}
