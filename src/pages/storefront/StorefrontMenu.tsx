import { motion } from "motion/react";
import { Plus, ShoppingBag, WandSparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/src/components/cart/CartProvider";
import { formatKes } from "@/src/lib/commerce";
import { CATEGORIES, MOCK_PRODUCTS } from "../../data";
import { ProductCategory } from "../../types";

export function StorefrontMenu() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('Italian Ice');
  const { addItem } = useCart();

  const filteredProducts = MOCK_PRODUCTS.filter(p => p.category === activeCategory);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-[#161618] rounded-2xl p-4 flex flex-row gap-4 border border-white/5 hover:border-white/20 hover:shadow-lg transition-all group"
            >
              <div className="h-24 w-24 rounded-xl overflow-hidden shrink-0 bg-[#0A0A0B]">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="h-full w-full object-cover"
                />
              </div>
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
                <div className="flex items-center justify-between mt-3">
                  <span className="font-medium text-sm text-white font-mono">{formatKes(product.price)}</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 rounded-full px-3 bg-white/5 border border-white/10 hover:bg-[#FF6B35] hover:text-black hover:border-transparent text-white transition-all"
                    onClick={() => addItem(product)}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
