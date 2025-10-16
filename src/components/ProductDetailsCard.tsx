import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Product } from "@/pages/ProductPage";
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductDetailsCard({ product }: { product: Product }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-2xl">{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
          <dt className="text-muted-foreground text-sm">Price</dt>
          <dd className="font-medium">{currency.format(product.price)}</dd>

          <dt className="text-muted-foreground text-sm">Category</dt>
          <dd className="font-medium">{product.category}</dd>

          <dt className="text-muted-foreground text-sm">Stock</dt>
          <dd className="font-medium">{product.stock}</dd>
        </dl>
      </CardContent>
    </Card>
  );
}
