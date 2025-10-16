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

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 1200,
    category: "Electronics",
    stock: 20,
  },
  { id: 2, name: "Smartwatch X", price: 250, category: "Wearables", stock: 45 },
  { id: 3, name: "Desk Chair", price: 150, category: "Furniture", stock: 10 },
  {
    id: 4,
    name: "Laptop Pro",
    price: 1200,
    category: "Electronics",
    stock: 20,
  },
  { id: 5, name: "Smartwatch X", price: 250, category: "Wearables", stock: 45 },
  { id: 6, name: "Desk Chair", price: 150, category: "Furniture", stock: 10 },
  {
    id: 7,
    name: "Laptop Pro",
    price: 1200,
    category: "Electronics",
    stock: 20,
  },
  { id: 8, name: "Smartwatch X", price: 250, category: "Wearables", stock: 45 },
  { id: 9, name: "Desk Chair", price: 150, category: "Furniture", stock: 10 },
  {
    id: 10,
    name: "Laptop Pro",
    price: 1200,
    category: "Electronics",
    stock: 20,
  },
  { id: 11, name: "Smartwatch X", price: 250, category: "Wearables", stock: 45 },
  { id: 12, name: "Desk Chair", price: 150, category: "Furniture", stock: 10 },
  {
    id: 13,
    name: "Laptop Pro",
    price: 1200,
    category: "Electronics",
    stock: 20,
  },
  { id: 14, name: "Smartwatch X", price: 250, category: "Wearables", stock: 45 },
  { id: 15, name: "Desk Chair", price: 150, category: "Furniture", stock: 10 },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ProductPage = () => {
  return (
    <div className="lg:w-6xl xl:w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Products</h1>
      {products.length === 0 ? (
        <p className="text-muted-foreground">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
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
                  <Button variant="outline" className="cursor-pointer">
                    View details
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="cursor-pointer hover:text-white hover:bg-primary"
                  onClick={() => {}}
                >
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
