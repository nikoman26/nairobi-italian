import { motion } from "motion/react";
import { Plus, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/src/components/cart/CartProvider";
import { formatKes } from "@/src/lib/commerce";
import { MOCK_PRODUCTS, MODIFIER_GROUPS } from "../../data";
import type { CartCustomization, ModifierGroup, Product } from "../../types";

const buildableProducts = MOCK_PRODUCTS.filter(product => product.category === 'Desserts' && product.modifierGroupIds?.length);

function selectedOptionIds(customizations: CartCustomization[], group: ModifierGroup) {
  return customizations
    .filter(item => item.modifierGroupId === group.id)
    .map(item => item.optionId);
}

function defaultCustomizations(product: Product): CartCustomization[] {
  const groups = MODIFIER_GROUPS.filter(group => product.modifierGroupIds?.includes(group.id));

  return groups.flatMap(group => {
    if (group.min <= 0) return [];
    return group.options.slice(0, group.min).map(option => ({
      modifierGroupId: group.id,
      optionId: option.id
    }));
  });
}

export function StorefrontBuilder() {
  const [productId, setProductId] = useState(buildableProducts[0]?.id ?? '');
  const [customizations, setCustomizations] = useState<CartCustomization[]>(() =>
    buildableProducts[0] ? defaultCustomizations(buildableProducts[0]) : []
  );
  const { addItem } = useCart();

  const product = buildableProducts.find(item => item.id === productId) ?? buildableProducts[0];
  const groups = MODIFIER_GROUPS.filter(group => product.modifierGroupIds?.includes(group.id));
  const modifierTotal = useMemo(
    () =>
      groups.reduce((sum, group) => {
        return (
          sum +
          group.options
            .filter(option => customizations.some(item => item.modifierGroupId === group.id && item.optionId === option.id))
            .reduce((optionSum, option) => optionSum + option.price, 0)
        );
      }, 0),
    [customizations, groups]
  );

  function toggleOption(group: ModifierGroup, optionId: string) {
    const groupSelections = selectedOptionIds(customizations, group);
    const alreadySelected = groupSelections.includes(optionId);

    if (alreadySelected) {
      if (groupSelections.length <= group.min) return;
      setCustomizations(current => current.filter(item => !(item.modifierGroupId === group.id && item.optionId === optionId)));
      return;
    }

    setCustomizations(current => {
      const withoutGroupWhenSingle = group.max === 1 ? current.filter(item => item.modifierGroupId !== group.id) : current;
      const currentCount = withoutGroupWhenSingle.filter(item => item.modifierGroupId === group.id).length;
      if (currentCount >= group.max) return current;
      return [...withoutGroupWhenSingle, { modifierGroupId: group.id, optionId }];
    });
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <Badge className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
            Build your own dessert
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Custom desserts with live pricing.</h1>
          <p className="mt-4 text-slate-400 text-lg">
            Choose a base, size, toppings, and sauces. The same customization model powers webstore checkout, POS, and future kitchen display tickets.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <section className="bg-[#161618] border border-white/5 rounded-xl p-5">
              <h2 className="text-lg font-bold text-white mb-4">Base</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {buildableProducts.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setProductId(item.id);
                      setCustomizations(defaultCustomizations(item));
                    }}
                    className={`rounded-lg border p-4 text-left transition-colors ${
                      productId === item.id ? 'border-[#FF6B35] bg-[#FF6B35]/10' : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="block font-semibold text-white">{item.name}</span>
                    <span className="mt-1 block text-sm text-slate-500">{formatKes(item.price)}</span>
                  </button>
                ))}
              </div>
            </section>

            {groups.map(group => (
              <section key={group.id} className="bg-[#161618] border border-white/5 rounded-xl p-5">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-white">{group.name}</h2>
                    <p className="text-sm text-slate-500 mt-1">Choose {group.min}{group.min !== group.max ? `-${group.max}` : ''}.</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.options.map(option => {
                    const selected = customizations.some(item => item.modifierGroupId === group.id && item.optionId === option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleOption(group, option.id)}
                        className={`rounded-lg border p-4 text-left transition-colors ${
                          selected ? 'border-green-400/50 bg-green-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-medium text-white">{option.name}</span>
                          <span className="font-mono text-sm text-slate-400">{option.price ? `+${formatKes(option.price)}` : 'Included'}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-fit rounded-xl border border-white/10 bg-[#161618] p-5 shadow-2xl lg:sticky lg:top-28"
          >
            <img src={product.imageUrl} alt={product.name} className="h-56 w-full rounded-lg object-cover" />
            <div className="mt-5 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#FF6B35]/20 text-[#FF6B35]">
                <WandSparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-white">{product.name}</h2>
                <p className="text-xs uppercase tracking-wider text-slate-500">{product.calories ?? 0} calories base estimate</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Base</span>
                <span className="font-mono text-white">{formatKes(product.price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Add-ons</span>
                <span className="font-mono text-white">{formatKes(modifierTotal)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-lg">
                <span className="font-bold text-white">Total</span>
                <span className="font-bold font-mono text-[#FF6B35]">{formatKes(product.price + modifierTotal)}</span>
              </div>
            </div>
            <Button
              className="mt-5 w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-black font-semibold"
              onClick={() => addItem(product, 1, customizations)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add custom dessert
            </Button>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
