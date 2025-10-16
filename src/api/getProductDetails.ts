const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export async function getProductDetails(id: number) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return response.json();
}
