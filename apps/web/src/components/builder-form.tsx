"use client";

import { useMemo, useState } from "react";
import { IceCreamBowl, Plus } from "lucide-react";
import {
  formatKes,
  modifierGroups,
  products,
  type ModifierGroup,
  type Product
} from "@nairobi/shared";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

const buildableProducts = products.filter((product) => product.modifierGroupIds.length > 0);

function groupTotal(group: ModifierGroup, optionIds: string[]) {
  return group.options
    .filter((option) => optionIds.includes(option.id))
    .reduce((sum, option) => sum + option.price, 0);
}

export function BuilderForm() {
  const [productId, setProductId] = useState(buildableProducts[0]?.id ?? "");
  const [optionIds, setOptionIds] = useState<string[]>(["size-regular"]);
  const { addProduct } = useCart();

  const product = buildableProducts.find((item) => item.id === productId) as Product;
  const groups = modifierGroups.filter((group) => product.modifierGroupIds.includes(group.id));
  const total = useMemo(
    () => product.price + groups.reduce((sum, group) => sum + groupTotal(group, optionIds), 0),
    [groups, optionIds, product.price]
  );

  function toggleOption(group: ModifierGroup, optionId: string) {
    const selectedForGroup = group.options.filter((option) => optionIds.includes(option.id));
    const isSelected = optionIds.includes(optionId);

    if (isSelected) {
      if (selectedForGroup.length <= group.minSelections) return;
      setOptionIds(optionIds.filter((id) => id !== optionId));
      return;
    }

    const withoutGroupIfSingle =
      group.maxSelections === 1
        ? optionIds.filter((id) => !group.options.some((option) => option.id === id))
        : optionIds;

    const nextSelectedCount = group.options.filter((option) => withoutGroupIfSingle.includes(option.id)).length + 1;
    if (nextSelectedCount > group.maxSelections) return;
    setOptionIds([...withoutGroupIfSingle, optionId]);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-5">
        <section className="rounded-md border border-black/10 bg-white p-5">
          <h2 className="text-xl font-black">Choose a base</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {buildableProducts.map((item) => (
              <button
                className={`focus-ring rounded-md border p-3 text-left transition ${
                  productId === item.id ? "border-cherry bg-cherry/5" : "border-black/10 bg-white hover:border-cherry"
                }`}
                key={item.id}
                onClick={() => setProductId(item.id)}
                type="button"
              >
                <span className="block font-black">{item.name}</span>
                <span className="mt-1 block text-sm text-black/60">{formatKes(item.price)}</span>
              </button>
            ))}
          </div>
        </section>

        {groups.map((group) => (
          <section className="rounded-md border border-black/10 bg-white p-5" key={group.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">{group.name}</h2>
                <p className="mt-1 text-sm text-black/60">
                  Select {group.minSelections}
                  {group.maxSelections !== group.minSelections ? `-${group.maxSelections}` : ""}.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.options.map((option) => {
                const selected = optionIds.includes(option.id);
                return (
                  <button
                    className={`focus-ring rounded-md border p-3 text-left transition ${
                      selected ? "border-mint bg-mint/10" : "border-black/10 bg-white hover:border-mint"
                    }`}
                    key={option.id}
                    onClick={() => toggleOption(group, option.id)}
                    type="button"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-bold">{option.name}</span>
                      <span className="text-sm font-black">{option.price ? `+${formatKes(option.price)}` : "Included"}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <aside className="h-fit rounded-md border border-black/10 bg-white p-5 shadow-soft lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-md">
          <img alt={product.name} className="h-56 w-full object-cover" src={product.imageUrl} />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-citrus">
            <IceCreamBowl aria-hidden size={22} />
          </span>
          <div>
            <h2 className="font-black">{product.name}</h2>
            <p className="text-sm text-black/60">Live price and nutrition estimate</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md bg-cloud p-3">
            <span className="block text-black/60">Calories</span>
            <strong>{product.nutrition.calories}</strong>
          </div>
          <div className="rounded-md bg-cloud p-3">
            <span className="block text-black/60">Sugar</span>
            <strong>{product.nutrition.sugarGrams}g</strong>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">
          <span className="text-sm font-semibold text-black/60">Total</span>
          <span className="text-2xl font-black">{formatKes(total)}</span>
        </div>
        <Button className="mt-5 w-full" onClick={() => addProduct(product, optionIds)}>
          <Plus size={18} />
          Add custom dessert
        </Button>
      </aside>
    </div>
  );
}
