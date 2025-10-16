import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "@/api/getProductDetails";
import type { Product } from "./ProductPage";
import { ProductDetailsCard } from "@/components/ProductDetailsCard";
import { useUpdateProductsStore } from "@/store/updateProductsStore";

const ProductDetailsPage = () => {
  const { allProducts: productsFromStore } = useUpdateProductsStore();
  const hasStoredProducts = productsFromStore.length > 0;
  const { id } = useParams();
  const { data: product = {} as Product, isLoading: isLoadingProduct } =
    useQuery<Product>({
      enabled: !!id && !hasStoredProducts,
      queryKey: ["productDetails", id],
      queryFn: () => getProductDetails(id as string),
    });
  const displayProduct: Product = hasStoredProducts
    ? (productsFromStore.find((p) => p.id === id) as Product)
    : (product as Product);
  return (
    <div className="lg:w-3xl xl:w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Product details</h1>
      {isLoadingProduct ? (
        <p className="text-muted-foreground">Loading product...</p>
      ) : (
        <ProductDetailsCard product={displayProduct} />
      )}
    </div>
  );
};

export default ProductDetailsPage;
