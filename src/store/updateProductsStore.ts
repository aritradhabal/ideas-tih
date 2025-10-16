import { create } from "zustand";
import type { Product } from "@/pages/ProductPage";

type UpdateProductsStore = {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
};

export const useUpdateProductsStore = create<UpdateProductsStore>((set) => ({
  allProducts: [],
  setAllProducts: (products) => set({ allProducts: products }),
  addProduct: (product) =>
    set((state) => ({ allProducts: [product, ...state.allProducts] })),
}));
