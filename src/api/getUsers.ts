const BASE_URL = import.meta.env.VITE_API_URL;
import db from "@/assets/db.json";
import type { User } from "@/pages/ProfilePage";
export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error(`API error ${response.status}`);
    return await response.json();
  } catch {
    const users = db.users as User[];
    if (!users) {
      throw new Error("User not found in bundled db.json");
    }
    return users;
  }
}
