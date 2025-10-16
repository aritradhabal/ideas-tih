const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
