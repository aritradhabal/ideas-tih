import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/getProducts";
import ProductCard from "@/components/ProductCard";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
};

const ProductPage = () => {
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<
    Product[]
  >({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className="lg:w-6xl xl:w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Products</h1>
      {isLoadingProducts ? (
        <p className="text-muted-foreground">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
