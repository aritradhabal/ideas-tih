const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
import type { Product } from "@/pages/ProductPage";
import db from "@/assests/db.json";
// export async function getProductDetails(id: number) {
//   const response = await fetch(`${BASE_URL}/products/${id}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch product details");
//   }
//   return response.json();
// }

export async function getProductDetails(id: number): Promise<Product> {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error(`API error ${response.status}`);
    return await response.json();
  } catch {
    const product = db.products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Product not found in bundled db.json");
    }
    return product;
  }
}
