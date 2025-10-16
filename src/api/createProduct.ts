const BASE_URL = import.meta.env.VITE_API_URL;
import type { Product } from "@/pages/ProductPage";
export type NewProductInput = Omit<Product, "id">;

export async function createProduct(body: NewProductInput) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Failed to create product");
  }
  return res.json();
}
