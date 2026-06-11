import { motion } from "motion/react";
import { Check, Info, Minus, Plus, ShoppingBag, WandSparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/src/components/cart/CartProvider";
import { calculateLineTotal, formatKes } from "@/src/lib/commerce";
import { CATEGORIES, MOCK_PRODUCTS, MODIFIER_GROUPS } from "../../data";
import type { CartCustomization, ModifierGroup, Product, ProductCategory } from "../../types";

function selectedOptionIds(customizations: CartCustomization[], group: ModifierGroup) {
  return customizations
    .filter(item => item.modifierGroupId === group.id)
    .map(item => item.optionId);
}

function defaultCustomizations(product: Product): CartCustomization[] {
  const groups = MODIFIER_GROUPS.filter(group => product.modifierGroupIds?.includes(group.id));

  return groups.flatMap(group => {
    if (group.min <= 0) return [];
    const preferred = group.options.find(option => option.id === 'regular') ?? group.options[0];
    return group.options.slice(0, group.min).map((option, index) => ({
      modifierGroupId: group.id,
      optionId: index === 0 ? preferred.id : option.id
    }));
  });
}

export function StorefrontMenu() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('Italian Ice');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customizations, setCustomizations] = useState<CartCustomization[]>([]);
  const [quickViewQuantity, setQuickViewQuantity] = useState(1);
  const { addItem } = useCart();

  const filteredProducts = MOCK_PRODUCTS.filter(p => p.category === activeCategory);
  const selectedGroups = useMemo(
    () => MODIFIER_GROUPS.filter(group => selectedProduct?.modifierGroupIds?.includes(group.id)),
    [selectedProduct]
  );
  const quickViewTotal = selectedProduct
    ? calculateLineTotal({ product: selectedProduct, quantity: quickViewQuantity, customizations })
    : 0;
  const canAddSelectedProduct = selectedGroups.every(group => selectedOptionIds(customizations, group).length >= group.min);

  function openQuickView(product: Product) {
    setSelectedProduct(product);
    setCustomizations(defaultCustomizations(product));
    setQuickViewQuantity(1);
  }

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

  function addSelectedProduct() {
    if (!selectedProduct || !canAddSelectedProduct) return;
    addItem(selectedProduct, quickViewQuantity, customizations);
    setSelectedProduct(null);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24">
      <div className="bg-[#0A0A0B] border-b border-white/10 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4 scrollbar-hide">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap text-sm font-medium transition-colors pb-1 border-b-2 ${
                  activeCategory === category
                    ? 'border-[#FF6B35] text-[#FF6B35]'
                    : 'border-transparent text-slate-500 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
              Webstore
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{activeCategory}</h1>
            <p className="text-slate-500 max-w-2xl">
              Branch-aware catalog, add-ons, allergens, nutrition hints, cross-sells, pickup, delivery, scheduled orders, and loyalty points.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/builder" className="inline-flex h-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
              <WandSparkles className="h-4 w-4 mr-2" />
              Build dessert
            </Link>
            <Link to="/cart" className="inline-flex h-8 items-center justify-center rounded-lg bg-[#FF6B35] px-3 text-sm font-semibold text-black transition-colors hover:bg-[#FF6B35]/90">
              <ShoppingBag className="h-4 w-4 mr-2" />
              View cart
            </Link>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-[#161618] p-10 text-center">
            <Info className="mx-auto h-9 w-9 text-slate-500" />
            <h2 className="mt-4 text-2xl font-bold text-white">This shelf is being prepared.</h2>
            <p className="mt-2 text-slate-500">Switch categories or build a custom dessert while this menu area is filled out.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-[#161618] rounded-xl p-4 flex flex-row gap-4 border border-white/5 hover:border-white/20 hover:shadow-lg transition-all group"
              >
                <button
                  type="button"
                  onClick={() => openQuickView(product)}
                  className="h-24 w-24 overflow-hidden rounded-lg bg-[#0A0A0B] shrink-0"
                  aria-label={`View ${product.name}`}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-white leading-tight">{product.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{product.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(product.tags ?? []).slice(0, 2).map(tag => (
                        <span key={tag} className="rounded-md bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 mt-3">
                    <span className="font-medium text-sm text-white font-mono">{formatKes(product.price)}</span>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 rounded-full px-3 bg-white/5 border border-white/10 hover:bg-[#FF6B35] hover:text-black hover:border-transparent text-white transition-all"
                      onClick={() => openQuickView(product)}
                    >
                      <Plus className="h-4 w-4 mr-1" /> {product.modifierGroupIds?.length ? 'Customize' : 'View'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct ? (
        <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm sm:py-10">
          <div className="mx-auto grid max-w-5xl gap-0 overflow-hidden rounded-xl border border-white/10 bg-[#161618] shadow-2xl lg:grid-cols-[420px_1fr]">
            <div className="relative min-h-72 bg-[#0A0A0B]">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="h-full max-h-[520px] w-full object-cover lg:absolute lg:inset-0 lg:max-h-none" />
              <button
                type="button"
                aria-label="Close product details"
                onClick={() => setSelectedProduct(null)}
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-lg bg-black/60 text-white transition-colors hover:bg-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-3rem)] overflow-y-auto p-5 sm:p-6">
              <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
                Product detail
              </Badge>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">{selectedProduct.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{selectedProduct.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(selectedProduct.tags ?? []).map(tag => (
                  <span key={tag} className="rounded-md bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400">
                    {tag}
                  </span>
                ))}
                {selectedProduct.calories ? (
                  <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400">
                    {selectedProduct.calories} cal base
                  </span>
                ) : null}
                {(selectedProduct.allergens ?? []).map(allergen => (
                  <span key={allergen} className="rounded-md bg-orange-500/10 px-2 py-1 text-[10px] uppercase tracking-wider text-orange-300">
                    Contains {allergen}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-5">
                {selectedGroups.map(group => {
                  const selectedIds = selectedOptionIds(customizations, group);
                  return (
                    <section key={group.id}>
                      <div className="flex flex-wrap items-end justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-white">{group.name}</h3>
                          <p className="mt-1 text-xs text-slate-500">
                            Choose {group.min}{group.min !== group.max ? `-${group.max}` : ''}.
                          </p>
                        </div>
                        <span className="text-xs font-medium text-slate-500">{selectedIds.length}/{group.max} selected</span>
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {group.options.map(option => {
                          const selected = selectedIds.includes(option.id);
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => toggleOption(group, option.id)}
                              className={`flex min-h-14 items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors ${
                                selected ? 'border-green-400/50 bg-green-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'
                              }`}
                            >
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-semibold text-white">{option.name}</span>
                                <span className="block text-xs text-slate-500">{option.price ? `+${formatKes(option.price)}` : 'Included'}</span>
                              </span>
                              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${selected ? 'bg-green-400 text-black' : 'bg-white/5 text-slate-500'}`}>
                                {selected ? <Check className="h-4 w-4" /> : null}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>

              <div className="mt-6 rounded-lg border border-white/10 bg-[#0A0A0B] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-white">Quantity</span>
                  <div className="flex items-center gap-2">
                    <Button
                      aria-label="Decrease quick view quantity"
                      variant="outline"
                      size="icon"
                      className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => setQuickViewQuantity(quantity => Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="grid h-9 min-w-9 place-items-center rounded-lg bg-white/5 px-2 font-bold text-white">{quickViewQuantity}</span>
                    <Button
                      aria-label="Increase quick view quantity"
                      variant="outline"
                      size="icon"
                      className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => setQuickViewQuantity(quantity => quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm text-slate-400">Line total</span>
                  <strong className="font-mono text-xl text-[#FF6B35]">{formatKes(quickViewTotal)}</strong>
                </div>
                <Button
                  disabled={!canAddSelectedProduct}
                  className="mt-4 w-full bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90"
                  onClick={addSelectedProduct}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
