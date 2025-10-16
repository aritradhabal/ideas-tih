import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "@/store/useProductStore";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
};
import { getProducts } from "@/api/getProducts";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ProductPage = () => {
  const { setProduct } = useProductStore();
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
            <Card key={p.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{p.name}</CardTitle>
                <CardDescription>{p.category}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-baseline justify-between">
                <span className="text-2xl font-semibold">
                  {currency.format(p.price)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {p.stock} in stock
                </span>
              </CardContent>
              <CardFooter className="flex justify-end gap-x-2 items-center">
                <Link to={`/home/products/${p.id}`}>
                  <Button
                    onClick={() => setProduct(p)}
                    variant="outline"
                    className="cursor-pointer"
                  >
                    View details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
