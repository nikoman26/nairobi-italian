"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatKes, getModifierOption } from "@nairobi/shared";
import { getLinePresentation, useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart, totals, updateQuantity, removeLine, applyPromo } = useCart();

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
      <section>
        <p className="inline-flex items-center gap-2 rounded-md bg-cherry/10 px-3 py-2 text-sm font-black text-cherry">
          <ShoppingBag size={16} />
          Cart
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-5xl">Review your webstore order.</h1>

        <div className="mt-8 space-y-4">
          {cart.items.length === 0 ? (
            <div className="rounded-md border border-black/10 bg-white p-8 text-center">
              <h2 className="text-2xl font-black">Your cart is empty.</h2>
              <Link className="mt-5 inline-flex" href="/menu">
                <Button>Open webstore</Button>
              </Link>
            </div>
          ) : (
            cart.items.map((line) => {
              const presentation = getLinePresentation(line);
              return (
                <article className="grid gap-4 rounded-md border border-black/10 bg-white p-4 sm:grid-cols-[120px_1fr_auto]" key={line.id}>
                  <img alt={presentation.title} className="h-28 w-full rounded-md object-cover sm:w-28" src={presentation.imageUrl} />
                  <div>
                    <h2 className="text-xl font-black">{presentation.title}</h2>
                    <p className="mt-1 text-sm text-black/60">{presentation.priceLabel} base</p>
                    {line.modifiers.length ? (
                      <p className="mt-2 text-sm text-black/60">
                        {line.modifiers.map((modifier) => getModifierOption(modifier.optionId).name).join(", ")}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <strong>{formatKes(presentation.lineTotal)}</strong>
                    <div className="flex items-center gap-2">
                      <Button aria-label="Decrease quantity" onClick={() => updateQuantity(line.id, line.quantity - 1)} size="icon" variant="secondary">
                        <Minus size={16} />
                      </Button>
                      <span className="grid h-10 min-w-10 place-items-center rounded-md bg-cloud px-3 font-black">{line.quantity}</span>
                      <Button aria-label="Increase quantity" onClick={() => updateQuantity(line.id, line.quantity + 1)} size="icon" variant="secondary">
                        <Plus size={16} />
                      </Button>
                      <Button aria-label="Remove line" onClick={() => removeLine(line.id)} size="icon" variant="ghost">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <aside className="h-fit rounded-md border border-black/10 bg-white p-5 shadow-soft lg:sticky lg:top-24">
        <h2 className="text-2xl font-black">Order summary</h2>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            applyPromo(String(form.get("promo") ?? ""));
          }}
        >
          <input
            className="focus-ring min-w-0 flex-1 rounded-md border border-black/10 px-3 py-2"
            name="promo"
            placeholder="Promo code"
            type="text"
          />
          <Button type="submit" variant="secondary">
            Apply
          </Button>
        </form>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <strong>{formatKes(totals.subtotal)}</strong>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <strong>-{formatKes(totals.discount)}</strong>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <strong>{formatKes(totals.deliveryFee)}</strong>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-3 text-lg">
            <span>Total</span>
            <strong>{formatKes(totals.total)}</strong>
          </div>
          <div className="rounded-md bg-mint/10 p-3 font-bold text-mint">
            Earn {totals.loyaltyPointsEarned.toLocaleString()} loyalty points
          </div>
        </div>
        <Link className="mt-5 block" href="/checkout">
          <Button className="w-full" disabled={cart.items.length === 0}>
            Checkout
          </Button>
        </Link>
      </aside>
    </main>
  );
}
