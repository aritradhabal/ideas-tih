const BASE_URL = import.meta.env.VITE_API_URL;
import type { Product } from "@/pages/ProductPage";
import db from "@/assets/db.json";

export async function getProductDetails(id: string): Promise<Product> {
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
