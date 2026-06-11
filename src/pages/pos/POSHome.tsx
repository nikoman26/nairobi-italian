import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Search, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/src/components/cart/CartProvider";
import { calculateLineTotal, formatKes } from "@/src/lib/commerce";
import { MOCK_PRODUCTS } from "../../data";

export function POSHome() {
  const categories = Array.from(new Set(MOCK_PRODUCTS.map(product => product.category)));
  const { items, totals, addItem, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="h-screen w-full flex bg-[#0A0A0B] text-slate-300 font-sans overflow-hidden">
      <div className="w-24 bg-[#161618] border-r border-white/5 flex flex-col items-center py-6 shrink-0 z-10">
        <Link to="/admin" className="p-3 bg-white/5 rounded-xl mb-8 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex-1 w-full space-y-2 px-2 overflow-y-auto scrollbar-hide py-2 flex flex-col items-center">
          <button className="w-full aspect-square rounded-xl bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 flex flex-col items-center justify-center p-2 transition-colors">
            <span className="text-xs font-bold text-center leading-tight">All items</span>
          </button>

          {categories.map(category => (
            <button key={category} className="w-full aspect-square rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5 transition-colors flex flex-col items-center justify-center p-2">
              <span className="text-xs font-medium text-center leading-tight break-words">{category}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0B]">
        <header className="h-20 bg-[#0A0A0B] border-b border-white/5 flex items-center px-6 shrink-0 shadow-sm z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <Input
              placeholder="Search products, barcodes..."
              className="pl-10 h-12 bg-[#161618] border-white/5 text-white text-lg rounded-xl focus-visible:ring-1 focus-visible:ring-[#FF6B35]"
            />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {MOCK_PRODUCTS.map(product => (
              <button
                key={product.id}
                onClick={() => addItem(product)}
                className="bg-[#161618] border border-white/5 rounded-2xl overflow-hidden hover:ring-2 ring-[#FF6B35] ring-offset-2 ring-offset-[#0A0A0B] transition-all flex flex-col text-left shadow-sm active:scale-95"
              >
                <div className="aspect-[4/3] w-full bg-[#0A0A0B]">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 text-left w-full border-t border-white/5">
                  <p className="font-semibold text-white leading-tight mb-1 line-clamp-2 text-sm">{product.name}</p>
                  <p className="text-[#FF6B35] font-mono text-sm">{formatKes(product.price)}</p>
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>

      <div className="w-[380px] bg-[#161618] border-l border-white/5 shadow-2xl flex flex-col shrink-0 z-20">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#161618]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/30 rounded-full flex items-center justify-center font-bold">
              SJ
            </div>
            <div>
              <p className="font-bold text-white leading-none">Order #012</p>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Dine In · Server: John</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-white hover:bg-white/5" onClick={clearCart}>
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-[#0A0A0B]">
          {items.length === 0 ? (
            <div className="h-full text-center flex flex-col justify-center items-center">
              <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-full mb-4 flex items-center justify-center text-slate-500">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <p className="text-slate-400 font-medium">Cart is empty</p>
              <p className="text-sm text-slate-500 mt-1">Select items to add to current order.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={`${item.product.id}-${JSON.stringify(item.customizations ?? [])}`} className="rounded-xl border border-white/5 bg-[#161618] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white leading-tight">{item.product.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatKes(item.product.price)} each</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                      onClick={() => removeItem(item.product.id, item.customizations)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.customizations)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="grid h-7 min-w-7 place-items-center rounded-lg bg-white/5 px-2 text-sm font-bold text-white">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.customizations)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-mono text-sm text-[#FF6B35]">{formatKes(calculateLineTotal(item))}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-[#161618] border-t border-white/5 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Subtotal</span>
            <span className="font-mono text-white">{formatKes(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Discount</span>
            <span className="font-mono text-green-400">-{formatKes(totals.discount)}</span>
          </div>
          <div className="pt-2 border-t border-white/5 flex justify-between">
            <span className="font-bold text-lg text-white">Total</span>
            <span className="font-bold text-lg font-mono text-[#FF6B35]">{formatKes(totals.total)}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button variant="outline" className="h-14 font-semibold text-slate-400 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white rounded-xl" disabled={items.length === 0}>Cash</Button>
            <Button className="h-14 bg-[#FF6B35] hover:bg-[#FF6B35]/90 font-semibold text-black rounded-xl" disabled={items.length === 0}>M-Pesa</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
