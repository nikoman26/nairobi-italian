import { Gift, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Gift Cards | Nairobi Italian Ice & Eats"
};

export default function GiftCardsPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_420px]">
      <section>
        <p className="inline-flex items-center gap-2 rounded-md bg-citrus/30 px-3 py-2 text-sm font-black text-ink">
          <Gift size={16} />
          Gift cards
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Digital dessert credit for birthdays, teams, and thank-you moments.</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1500, 3000, 5000].map((amount) => (
            <button className="focus-ring rounded-md border border-black/10 bg-white p-5 text-left transition hover:border-cherry" key={amount}>
              <span className="block text-3xl font-black">KES {amount.toLocaleString()}</span>
              <span className="mt-2 block text-sm text-black/60">Instant email delivery</span>
            </button>
          ))}
        </div>
      </section>
      <aside className="rounded-md border border-black/10 bg-white p-5 shadow-soft">
        <h2 className="text-2xl font-black">Send a gift card</h2>
        <div className="mt-4 grid gap-3">
          <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Purchaser email" />
          <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Recipient email" />
          <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Amount" />
          <textarea className="focus-ring min-h-28 rounded-md border border-black/10 px-3 py-3" placeholder="Message" />
        </div>
        <Button className="mt-5 w-full">
          <Send size={18} />
          Create gift card
        </Button>
      </aside>
    </main>
  );
}
