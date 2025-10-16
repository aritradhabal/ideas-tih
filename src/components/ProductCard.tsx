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
import type { Product } from "@/pages/ProductPage";
import { useProductStore } from "@/store/useProductStore";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ProductCard = ({ product: p }: { product: Product }) => {
  const { setProduct } = useProductStore();
  return (
    <>
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
    </>
  );
};

export default ProductCard;
