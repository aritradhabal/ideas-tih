import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/getProducts";
import type { Product } from "@/pages/ProductPage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ProductCard from "@/components/ProductCard";
import { useUpdateProductsStore } from "@/store/updateProductsStore";

const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50";

const SettingsPage = () => {
  const { allProducts, setAllProducts, addProduct } = useUpdateProductsStore();
  const hasStoredProducts = allProducts.length > 0;
  const { data: products = [], isLoading } = useQuery<Product[]>({
    enabled: !hasStoredProducts,
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [newProduct, setNewProduct] = useState<{
    name: string;
    price: string;
    category: string;
    stock: string;
  }>({ name: "", price: "", category: "", stock: "" });

  useEffect(() => {
    if (products?.length) {
      setAllProducts(products);
    }
  }, [products, setAllProducts]);

  const onCreate = () => {
    const product: Product = {
      id: (products.length + 1).toString(),
      name: newProduct.name.trim(),
      price: Number(newProduct.price),
      category: newProduct.category.trim(),
      stock: Number(newProduct.stock),
    };

    addProduct(product);

    setNewProduct({ name: "", price: "", category: "", stock: "" });
  };

  const isDisabled =
    newProduct.name.trim() === "" ||
    newProduct.price.trim() === "" ||
    newProduct.category.trim() === "" ||
    newProduct.stock.trim() === "";

  return (
    <div className="lg:w-6xl xl:w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="grid gap-2">
              <Label htmlFor="np-name">Name</Label>
              <input
                id="np-name"
                className={inputClass}
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct((s) => ({ ...s, name: e.target.value }))
                }
                placeholder="e.g. Laptop Pro"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="np-price">Price</Label>
              <input
                id="np-price"
                type="number"
                step="0.01"
                className={inputClass}
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct((s) => ({ ...s, price: e.target.value }))
                }
                placeholder="e.g. 999.99"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="np-category">Category</Label>
              <input
                id="np-category"
                className={inputClass}
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct((s) => ({ ...s, category: e.target.value }))
                }
                placeholder="e.g. Electronics"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="np-stock">Stock</Label>
              <input
                id="np-stock"
                type="number"
                className={inputClass}
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct((s) => ({ ...s, stock: e.target.value }))
                }
                placeholder="e.g. 25"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              className="cursor-pointer"
              onClick={onCreate}
              disabled={isDisabled}
            >
              Create Product
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">All Products</h2>
      {isLoading && allProducts.length === 0 ? (
        <p className="text-muted-foreground">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
