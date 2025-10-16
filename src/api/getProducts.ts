const BASE_URL = import.meta.env.VITE_API_URL;
import type { Product } from "@/pages/ProductPage";
import db from "@/assests/db.json";
// export async function getProducts() {
//   const response = await fetch(`${BASE_URL}/products`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }
//   return response.json();
// }

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error(`API error ${response.status}`);
    return await response.json();
  } catch {
    const products = db.products as Product[];
    if (!products) {
      throw new Error("Product not found in bundled db.json");
    }
    return products;
  }
}
