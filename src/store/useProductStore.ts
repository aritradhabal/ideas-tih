import type { Product } from "@/pages/ProductPage";
import { create } from "zustand";

type ProductStore = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
}));