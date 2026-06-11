"use client";

import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";
import { formatKes, type Product } from "@nairobi/shared";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

export function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();

  return (
    <article className="overflow-hidden rounded-md border border-black/10 bg-white shadow-sm">
      <Link href={`/menu/${product.slug}`}>
        <img alt={product.name} className="h-48 w-full object-cover" src={product.imageUrl} />
      </Link>
      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {product.tags.slice(0, 2).map((tag) => (
            <span className="rounded-md bg-mint/10 px-2 py-1 text-xs font-bold text-mint" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/menu/${product.slug}`}>
          <h3 className="text-lg font-black leading-tight">{product.name}</h3>
        </Link>
        <p className="mt-2 min-h-12 text-sm leading-6 text-black/65">{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-black">{formatKes(product.price)}</span>
          <Button aria-label={`Add ${product.name} to cart`} onClick={() => addProduct(product)} size="sm">
            <Plus size={16} />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();

  return (
    <article className="grid overflow-hidden rounded-md border border-black/10 bg-white shadow-sm md:grid-cols-[1fr_1.1fr]">
      <img alt={product.name} className="h-full min-h-64 w-full object-cover" src={product.imageUrl} />
      <div className="flex flex-col justify-between p-6">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-cherry">Featured</p>
          <h3 className="mt-2 text-2xl font-black">{product.name}</h3>
          <p className="mt-3 text-black/65">{product.description}</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-xl font-black">{formatKes(product.price)}</span>
          <Button onClick={() => addProduct(product)}>
            <ShoppingBag size={18} />
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
