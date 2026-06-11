"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { formatKes, type ModifierGroup, type Product } from "@nairobi/shared";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

export function ProductAddPanel({
  product,
  groups,
  basePrice
}: {
  product: Product;
  groups: ModifierGroup[];
  basePrice: string;
}) {
  const [optionIds, setOptionIds] = useState<string[]>(groups.some((group) => group.id === "mod-size") ? ["size-regular"] : []);
  const { addProduct } = useCart();

  function toggle(group: ModifierGroup, optionId: string) {
    const isSelected = optionIds.includes(optionId);
    if (isSelected && optionIds.filter((id) => group.options.some((option) => option.id === id)).length > group.minSelections) {
      setOptionIds(optionIds.filter((id) => id !== optionId));
      return;
    }

    if (isSelected) return;

    const next =
      group.maxSelections === 1
        ? optionIds.filter((id) => !group.options.some((option) => option.id === id))
        : optionIds;

    if (group.options.filter((option) => next.includes(option.id)).length >= group.maxSelections) {
      return;
    }

    setOptionIds([...next, optionId]);
  }

  const modifierTotal = groups.reduce(
    (sum, group) => sum + group.options.filter((option) => optionIds.includes(option.id)).reduce((groupSum, option) => groupSum + option.price, 0),
    0
  );

  return (
    <aside className="h-fit rounded-md border border-black/10 bg-white p-5 shadow-soft lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-black/60">Starts at</p>
          <p className="text-3xl font-black">{basePrice}</p>
        </div>
        <span className="rounded-md bg-citrus px-3 py-2 text-sm font-black">Earn points</span>
      </div>

      {groups.map((group) => (
        <section className="mt-6 border-t border-black/10 pt-5" key={group.id}>
          <h2 className="font-black">{group.name}</h2>
          <div className="mt-3 grid gap-2">
            {group.options.map((option) => {
              const selected = optionIds.includes(option.id);
              return (
                <button
                  className={`focus-ring flex items-center justify-between rounded-md border p-3 text-left text-sm ${
                    selected ? "border-mint bg-mint/10" : "border-black/10"
                  }`}
                  key={option.id}
                  onClick={() => toggle(group, option.id)}
                  type="button"
                >
                  <span className="font-bold">{option.name}</span>
                  <span>{option.price ? `+${formatKes(option.price)}` : "Included"}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
        <span className="text-sm font-bold text-black/60">Configured price</span>
        <span className="text-2xl font-black">{formatKes(product.price + modifierTotal)}</span>
      </div>
      <Button className="mt-5 w-full" onClick={() => addProduct(product, optionIds)}>
        <Plus size={18} />
        Add to cart
      </Button>
    </aside>
  );
}
