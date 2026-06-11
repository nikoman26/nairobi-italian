import { Link } from "react-router-dom";
import { CreditCard, MapPin, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/src/components/cart/CartProvider";
import { formatKes } from "@/src/lib/commerce";
import type { FulfillmentType } from "../../types";

const fulfillmentOptions: { value: FulfillmentType; label: string; description: string }[] = [
  { value: 'pickup', label: 'Pickup', description: 'Ready at Westlands branch.' },
  { value: 'delivery', label: 'Delivery', description: 'Zone validation and rider flow.' },
  { value: 'scheduled', label: 'Scheduled', description: 'Choose a future time window.' }
];

export function StorefrontCheckout() {
  const { items, fulfillment, setFulfillment, totals, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="space-y-6">
          <div>
            <Badge className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
              Checkout
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              M-Pesa-ready checkout for pickup, delivery, and scheduled orders.
            </h1>
          </div>

          <section className="rounded-xl border border-white/5 bg-[#161618] p-5">
            <h2 className="text-lg font-bold text-white">Fulfillment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {fulfillmentOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFulfillment(option.value)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    fulfillment === option.value ? 'border-[#FF6B35] bg-[#FF6B35]/10' : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <strong className="text-white">{option.label}</strong>
                  <span className="mt-1 block text-sm text-slate-500">{option.description}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-white/5 bg-[#161618] p-5">
            <h2 className="text-lg font-bold text-white">Customer details</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Full name" />
              <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Phone number" />
              <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35] md:col-span-2" placeholder="Email address" />
              <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35] md:col-span-2" placeholder="Delivery address or pickup note" />
            </div>
          </section>

          <section className="rounded-xl border border-white/5 bg-[#161618] p-5">
            <h2 className="text-lg font-bold text-white">Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button type="button" className="rounded-lg border border-[#FF6B35] bg-[#FF6B35]/10 p-4 text-left">
                <Smartphone className="h-6 w-6 text-[#FF6B35]" />
                <strong className="mt-3 block text-white">M-Pesa STK Push</strong>
                <span className="mt-1 block text-sm text-slate-500">Mandatory launch payment rail.</span>
              </button>
              <button type="button" className="rounded-lg border border-white/10 bg-white/5 p-4 text-left">
                <CreditCard className="h-6 w-6 text-blue-400" />
                <strong className="mt-3 block text-white">Visa / Mastercard</strong>
                <span className="mt-1 block text-sm text-slate-500">Provider adapter ready for live credentials.</span>
              </button>
            </div>
          </section>
        </section>

        <aside className="h-fit rounded-xl border border-white/10 bg-[#161618] p-5 shadow-2xl lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold text-white">Pay {formatKes(totals.total)}</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Items</span>
              <strong className="font-mono text-white">{items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fulfillment</span>
              <strong className="capitalize text-white">{fulfillment}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Points</span>
              <strong className="font-mono text-green-400">{totals.pointsEarned.toLocaleString()}</strong>
            </div>
          </div>
          <Button
            disabled={items.length === 0}
            className="mt-5 w-full bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90"
            onClick={clearCart}
          >
            Confirm mock order
          </Button>
          <Link to="/track" className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-lg text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
            <MapPin className="h-4 w-4 mr-2" />
            Track order status
          </Link>
        </aside>
      </div>
    </div>
  );
}
