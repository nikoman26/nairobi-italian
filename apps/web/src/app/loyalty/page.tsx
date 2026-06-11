import { BadgePercent, Cake, Crown, Trophy } from "lucide-react";

export const metadata = {
  title: "Loyalty | Nairobi Italian Ice & Eats"
};

const tiers = ["Bronze", "Silver", "Gold", "Platinum", "VIP"];

export default function LoyaltyPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-md bg-mint/10 px-3 py-2 text-sm font-black text-mint">
          <BadgePercent size={16} />
          Loyalty wallet
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Rewards designed for repeat visits and office champions.</h1>
        <p className="mt-4 text-lg leading-8 text-black/65">
          V1 supports points, basic wallet state, birthdays, referrals, and tier progression. Later phases add challenges, badges, and leaderboards.
        </p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-md border border-black/10 bg-white p-5 shadow-sm">
          <Trophy className="text-citrus" size={28} />
          <h2 className="mt-4 text-2xl font-black">1 KES = 1 point</h2>
          <p className="mt-2 text-black/65">Every confirmed paid order awards points after payment webhook confirmation.</p>
        </div>
        <div className="rounded-md border border-black/10 bg-white p-5 shadow-sm">
          <Cake className="text-cherry" size={28} />
          <h2 className="mt-4 text-2xl font-black">Birthday rewards</h2>
          <p className="mt-2 text-black/65">Customer profiles are prepared for birthday and anniversary campaigns.</p>
        </div>
        <div className="rounded-md border border-black/10 bg-white p-5 shadow-sm">
          <Crown className="text-mint" size={28} />
          <h2 className="mt-4 text-2xl font-black">Tiered loyalty</h2>
          <p className="mt-2 text-black/65">Bronze to VIP progression is included in shared domain logic.</p>
        </div>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-5">
        {tiers.map((tier) => (
          <div className="rounded-md bg-ink p-4 text-white" key={tier}>
            <span className="text-sm text-white/60">Tier</span>
            <strong className="mt-1 block text-xl">{tier}</strong>
          </div>
        ))}
      </div>
    </main>
  );
}
