"use client";

import Link from "next/link";
import { CreditCard, MapPin, Smartphone } from "lucide-react";
import { formatKes } from "@nairobi/shared";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { cart, totals, setFulfillmentType, clearCart } = useCart();

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
      <section className="space-y-5">
        <div>
          <p className="inline-flex items-center gap-2 rounded-md bg-mint/10 px-3 py-2 text-sm font-black text-mint">
            <CreditCard size={16} />
            Checkout
          </p>
          <h1 className="mt-4 text-4xl font-black md:text-5xl">Pickup, delivery, scheduled orders, and M-Pesa-ready checkout.</h1>
        </div>

        <section className="rounded-md border border-black/10 bg-white p-5">
          <h2 className="text-xl font-black">Fulfillment</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {(["pickup", "delivery", "scheduled"] as const).map((type) => (
              <button
                className={`focus-ring rounded-md border p-4 text-left capitalize ${
                  cart.fulfillmentType === type ? "border-cherry bg-cherry/5" : "border-black/10"
                }`}
                key={type}
                onClick={() => setFulfillmentType(type)}
                type="button"
              >
                <strong>{type}</strong>
                <span className="mt-1 block text-sm text-black/60">
                  {type === "pickup" ? "Ready at Westlands" : type === "delivery" ? "Zone fee applied" : "Choose a future time"}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-black/10 bg-white p-5">
          <h2 className="text-xl font-black">Customer details</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Full name" />
            <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Phone number" />
            <input className="focus-ring rounded-md border border-black/10 px-3 py-3 md:col-span-2" placeholder="Email address" />
            <input className="focus-ring rounded-md border border-black/10 px-3 py-3 md:col-span-2" placeholder="Delivery address or pickup note" />
          </div>
        </section>

        <section className="rounded-md border border-black/10 bg-white p-5">
          <h2 className="text-xl font-black">Payment method</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button className="focus-ring rounded-md border border-cherry bg-cherry/5 p-4 text-left" type="button">
              <Smartphone className="text-cherry" size={22} />
              <strong className="mt-3 block">M-Pesa STK Push</strong>
              <span className="mt-1 block text-sm text-black/60">Primary launch payment rail.</span>
            </button>
            <button className="focus-ring rounded-md border border-black/10 p-4 text-left" type="button">
              <CreditCard className="text-mint" size={22} />
              <strong className="mt-3 block">Visa / Mastercard</strong>
              <span className="mt-1 block text-sm text-black/60">Card adapter ready for provider credentials.</span>
            </button>
          </div>
        </section>
      </section>

      <aside className="h-fit rounded-md border border-black/10 bg-white p-5 shadow-soft lg:sticky lg:top-24">
        <h2 className="text-2xl font-black">Pay {formatKes(totals.total)}</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Items</span>
            <strong>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <strong>{formatKes(totals.deliveryFee)}</strong>
          </div>
          <div className="flex justify-between">
            <span>Rewards</span>
            <strong>{totals.loyaltyPointsEarned.toLocaleString()} pts</strong>
          </div>
        </div>
        <Button className="mt-5 w-full" disabled={cart.items.length === 0} onClick={clearCart}>
          Confirm mock order
        </Button>
        <Link className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-black/60 hover:text-cherry" href="/track">
          <MapPin size={16} />
          Track order status
        </Link>
      </aside>
    </main>
  );
}
