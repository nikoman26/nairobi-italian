"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@nairobi/shared";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export function WebstoreCatalog() {
  const [categoryId, setCategoryId] = useState("all");

  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        if (!product.isAvailable) return false;
        return categoryId === "all" || product.categoryId === categoryId;
      }),
    [categoryId]
  );

  return (
    <div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <Button
          onClick={() => setCategoryId("all")}
          size="sm"
          variant={categoryId === "all" ? "primary" : "secondary"}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setCategoryId(category.id)}
            size="sm"
            variant={categoryId === category.id ? "primary" : "secondary"}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
