import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "@/api/getProductDetails";
import type { Product } from "./ProductPage";
import { ProductDetailsCard } from "@/components/ProductDetailsCard";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data: product = {} as Product, isLoading: isLoadingProduct } =
    useQuery<Product>({
      queryKey: ["productDetails", id],
      queryFn: () => getProductDetails(Number(id)),
    });
  return (
    <div className="lg:w-3xl xl:w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Product details</h1>
      {isLoadingProduct ? (
        <p className="text-muted-foreground">Loading product...</p>
      ) : (
        <ProductDetailsCard product={product} />
      )}
    </div>
  );
};

export default ProductDetailsPage;
