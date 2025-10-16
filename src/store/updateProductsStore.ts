import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/pages/ProductPage";

type UpdateProductsStore = {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
};

export const useUpdateProductsStore = create<UpdateProductsStore>()(
  persist(
    (set) => ({
      allProducts: [],
      setAllProducts: (products) => set({ allProducts: products }),
      addProduct: (product) =>
        set((state) => ({
          allProducts: [product, ...state.allProducts],
        })),
    }),
    {
      name: "products-store",
    }
  )
);
