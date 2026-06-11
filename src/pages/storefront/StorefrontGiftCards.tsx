import { Gift, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatKes } from "@/src/lib/commerce";

const amounts = [1500, 3000, 5000, 10000];

export function StorefrontGiftCards() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[1fr_420px]">
        <section>
          <Badge className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
            Gift cards
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Digital dessert credit for birthdays, teams, and thank-you moments.
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl">
            Gift cards are modeled as wallet credit for webstore checkout, POS redemption, customer accounts, and future corporate rewards.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {amounts.map(amount => (
              <button key={amount} className="rounded-xl border border-white/10 bg-[#161618] p-5 text-left transition-colors hover:border-[#FF6B35]">
                <Gift className="h-6 w-6 text-[#FF6B35]" />
                <span className="mt-4 block text-2xl font-bold text-white">{formatKes(amount)}</span>
                <span className="mt-2 block text-sm text-slate-500">Instant email delivery</span>
              </button>
            ))}
          </div>
        </section>

        <aside className="rounded-xl border border-white/10 bg-[#161618] p-5 shadow-2xl">
          <h2 className="text-2xl font-bold text-white">Send a gift card</h2>
          <div className="mt-4 grid gap-3">
            <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Purchaser email" />
            <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Recipient email" />
            <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Amount" />
            <textarea className="min-h-28 rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Message" />
          </div>
          <Button className="mt-5 w-full bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90">
            <Send className="h-4 w-4 mr-2" />
            Create gift card
          </Button>
        </aside>
      </div>
    </div>
  );
}
