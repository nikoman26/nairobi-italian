import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/src/components/cart/CartProvider";
import { calculateLineTotal, formatKes, getModifierOption } from "@/src/lib/commerce";

export function StorefrontCart() {
  const { items, totals, promoCode, setPromoCode, updateQuantity, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <section>
          <Badge className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
            Cart
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Review your webstore order.</h1>

          <div className="mt-8 space-y-4">
            {items.length === 0 ? (
              <div className="rounded-xl border border-white/5 bg-[#161618] p-12 text-center">
                <ShoppingBag className="mx-auto h-10 w-10 text-slate-500" />
                <h2 className="mt-4 text-2xl font-bold text-white">Your cart is empty.</h2>
                <p className="mt-2 text-slate-500">Add Italian ice, gelato, office boxes, or a custom dessert.</p>
                <Link to="/menu" className="mt-6 inline-flex h-8 items-center justify-center rounded-lg bg-[#FF6B35] px-3 text-sm font-semibold text-black transition-colors hover:bg-[#FF6B35]/90">
                  Open webstore
                </Link>
              </div>
            ) : (
              items.map(item => (
                <article
                  key={`${item.product.id}-${JSON.stringify(item.customizations ?? [])}`}
                  className="grid gap-4 rounded-xl border border-white/5 bg-[#161618] p-4 sm:grid-cols-[112px_1fr_auto]"
                >
                  <img src={item.product.imageUrl} alt={item.product.name} className="h-28 w-full rounded-lg object-cover sm:w-28" />
                  <div>
                    <h2 className="text-lg font-bold text-white">{item.product.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{formatKes(item.product.price)} base</p>
                    {item.customizations?.length ? (
                      <p className="mt-2 text-sm text-slate-400">
                        {item.customizations.map(customization => getModifierOption(customization.optionId)?.name).filter(Boolean).join(', ')}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <strong className="font-mono text-white">{formatKes(calculateLineTotal(item))}</strong>
                    <div className="flex items-center gap-2">
                      <Button
                        aria-label="Decrease quantity"
                        variant="outline"
                        size="icon"
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.customizations)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="grid h-8 min-w-8 place-items-center rounded-lg bg-white/5 px-2 font-bold text-white">{item.quantity}</span>
                      <Button
                        aria-label="Increase quantity"
                        variant="outline"
                        size="icon"
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.customizations)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        aria-label="Remove item"
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => removeItem(item.product.id, item.customizations)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <aside className="h-fit rounded-xl border border-white/10 bg-[#161618] p-5 shadow-2xl lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold text-white">Order summary</h2>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              setPromoCode(String(form.get('promo') ?? ''));
            }}
          >
            <input
              name="promo"
              defaultValue={promoCode}
              placeholder="Promo code"
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-2 text-sm text-white outline-none focus:border-[#FF6B35]"
            />
            <Button type="submit" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              Apply
            </Button>
          </form>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Subtotal</span>
              <strong className="font-mono text-white">{formatKes(totals.subtotal)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Discount</span>
              <strong className="font-mono text-green-400">-{formatKes(totals.discount)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Delivery</span>
              <strong className="font-mono text-white">{formatKes(totals.deliveryFee)}</strong>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-lg">
              <span className="font-bold text-white">Total</span>
              <strong className="font-mono text-[#FF6B35]">{formatKes(totals.total)}</strong>
            </div>
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-green-400">
              Earn {totals.pointsEarned.toLocaleString()} loyalty points after payment confirmation.
            </div>
          </div>
          {items.length === 0 ? (
            <Button disabled className="mt-5 w-full bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90">
              Checkout
            </Button>
          ) : (
            <Link to="/checkout" className="mt-5 inline-flex h-8 w-full items-center justify-center rounded-lg bg-[#FF6B35] px-3 text-sm font-semibold text-black transition-colors hover:bg-[#FF6B35]/90">
              Checkout
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
