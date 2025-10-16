import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/api/getProducts";
import type { Product } from "@/pages/ProductPage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type NewProductInput = Omit<Product, "id">;

async function createProductApi(body: NewProductInput) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

async function updateProductApi(id: number, updates: Partial<NewProductInput>) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50";

const SettingsPage = () => {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Create product form state
  const [newProduct, setNewProduct] = useState<{
    name: string;
    price: string;
    category: string;
    stock: string;
  }>({ name: "", price: "", category: "", stock: "" });

  const createMutation = useMutation({
    mutationFn: (body: NewProductInput) => createProductApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setNewProduct({ name: "", price: "", category: "", stock: "" });
    },
  });

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formById, setFormById] = useState<
    Record<
      number,
      { name: string; price: string; category: string; stock: string }
    >
  >({});

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setFormById((prev) => ({
      ...prev,
      [p.id]: {
        name: p.name ?? "",
        price: String(p.price ?? ""),
        category: p.category ?? "",
        stock: String(p.stock ?? ""),
      },
    }));
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const updateMutation = useMutation({
    mutationFn: (vars: { id: number; updates: NewProductInput }) =>
      updateProductApi(vars.id, vars.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingId(null);
    },
  });

  const currency = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    []
  );

  const onCreate = () => {
    const body: NewProductInput = {
      name: newProduct.name.trim(),
      price: Number.parseFloat(newProduct.price || "0"),
      category: newProduct.category.trim(),
      stock: Number.parseInt(newProduct.stock || "0", 10),
    };
    createMutation.mutate(body);
  };

  const onSave = (id: number) => {
    const f = formById[id];
    if (!f) return;
    const updates: NewProductInput = {
      name: f.name.trim(),
      price: Number.parseFloat(f.price || "0"),
      category: f.category.trim(),
      stock: Number.parseInt(f.stock || "0", 10),
    };
    updateMutation.mutate({ id, updates });
  };

  return (
    <div className="lg:w-6xl xl:w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

      {/* Create new product */}
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
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Create Product"}
            </Button>
            {createMutation.isError && (
              <p className="text-sm text-red-500 mt-2">
                {(createMutation.error as Error)?.message ??
                  "Failed to create product."}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* List and edit existing products */}
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>
      {isLoading ? (
        <p className="text-muted-foreground">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const isEditing = editingId === p.id;
            const f = formById[p.id] ?? {
              name: p.name,
              price: String(p.price),
              category: p.category,
              stock: String(p.stock),
            };

            return (
              <Card key={p.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {isEditing ? (
                      <input
                        className={inputClass}
                        value={f.name}
                        onChange={(e) =>
                          setFormById((prev) => ({
                            ...prev,
                            [p.id]: { ...f, name: e.target.value },
                          }))
                        }
                      />
                    ) : (
                      p.name
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Category</Label>
                      {isEditing ? (
                        <input
                          className={inputClass}
                          value={f.category}
                          onChange={(e) =>
                            setFormById((prev) => ({
                              ...prev,
                              [p.id]: { ...f, category: e.target.value },
                            }))
                          }
                        />
                      ) : (
                        <div className="text-sm">{p.category}</div>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label>Price</Label>
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.01"
                          className={inputClass}
                          value={f.price}
                          onChange={(e) =>
                            setFormById((prev) => ({
                              ...prev,
                              [p.id]: { ...f, price: e.target.value },
                            }))
                          }
                        />
                      ) : (
                        <div className="text-sm font-medium">
                          {currency.format(p.price)}
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label>Stock</Label>
                      {isEditing ? (
                        <input
                          type="number"
                          className={inputClass}
                          value={f.stock}
                          onChange={(e) =>
                            setFormById((prev) => ({
                              ...prev,
                              [p.id]: { ...f, stock: e.target.value },
                            }))
                          }
                        />
                      ) : (
                        <div className="text-sm">{p.stock} in stock</div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      {isEditing ? (
                        <>
                          <Button
                            className="cursor-pointer"
                            onClick={() => onSave(p.id)}
                            disabled={updateMutation.isPending}
                          >
                            {updateMutation.isPending ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={cancelEdit}
                            disabled={updateMutation.isPending}
                          >
                            Cancel
                          </Button>
                          {updateMutation.isError && (
                            <p className="text-sm text-red-500 mt-2">
                              {(updateMutation.error as Error)?.message ??
                                "Failed to update product."}
                            </p>
                          )}
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => startEdit(p)}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
