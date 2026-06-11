import { BadgePercent, Cake, Crown, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_USER } from "../../data";

const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'VIP'];

export function StorefrontLoyalty() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
            Nairobi Rewards
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Loyalty wallet for repeat orders, referrals, birthdays, and future gamification.
          </h1>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-xl border border-white/10 bg-[#161618] p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-[#FF6B35] bg-[#FF6B35]/10 text-xl font-bold text-[#FF6B35]">
                DM
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{MOCK_USER.name}</h2>
                <p className="text-sm text-slate-500">{MOCK_USER.tier} member</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-xs uppercase tracking-wider text-slate-500">Points</span>
                <strong className="mt-1 block text-2xl text-white">{MOCK_USER.points.toLocaleString()}</strong>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-xs uppercase tracking-wider text-slate-500">Referrals</span>
                <strong className="mt-1 block text-2xl text-white">{MOCK_USER.referralsCount}</strong>
              </div>
            </div>
          </aside>

          <section className="grid gap-5 md:grid-cols-3">
            {[
              [Trophy, '1 KES = 1 point', 'Points are awarded after confirmed paid orders.'],
              [Cake, 'Birthday rewards', 'Profiles support birthday and anniversary offers.'],
              [Crown, 'Tier progression', 'Bronze to VIP progression is ready in the customer wallet.']
            ].map(([Icon, title, copy]) => {
              const FeatureIcon = Icon as typeof Trophy;
              return (
                <article key={String(title)} className="rounded-xl border border-white/10 bg-[#161618] p-5">
                  <FeatureIcon className="h-7 w-7 text-[#FF6B35]" />
                  <h2 className="mt-4 text-xl font-bold text-white">{String(title)}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{String(copy)}</p>
                </article>
              );
            })}
          </section>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-5">
          {tiers.map(tier => (
            <div key={tier} className={`rounded-xl border p-4 ${tier === MOCK_USER.tier ? 'border-[#FF6B35] bg-[#FF6B35]/10' : 'border-white/10 bg-[#161618]'}`}>
              <BadgePercent className="h-5 w-5 text-[#FF6B35]" />
              <span className="mt-3 block text-xs uppercase tracking-wider text-slate-500">Tier</span>
              <strong className="mt-1 block text-xl text-white">{tier}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
