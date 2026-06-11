import { useMemo, useState } from "react";
import { CalendarDays, CreditCard, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATERING_PACKAGES } from "../../data";
import { estimateCateringDeposit, estimateCateringTotal, formatKes } from "@/src/lib/commerce";

export function StorefrontCatering() {
  const [packageId, setPackageId] = useState(CATERING_PACKAGES[0].id);
  const [guestCount, setGuestCount] = useState(40);
  const selectedPackage = CATERING_PACKAGES.find(item => item.id === packageId) ?? CATERING_PACKAGES[0];
  const estimate = useMemo(() => estimateCateringTotal(selectedPackage, guestCount), [selectedPackage, guestCount]);
  const deposit = estimateCateringDeposit(estimate);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <Badge className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
            Catering portal
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Events, birthdays, offices, schools, and weddings.
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Package selection, guest-count estimates, quote intake, deposit readiness, and CRM handoff are part of the first launch flow.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {CATERING_PACKAGES.map(pkg => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => {
                    setPackageId(pkg.id);
                    setGuestCount(Math.max(guestCount, pkg.minGuests));
                  }}
                  className={`rounded-xl border p-5 text-left transition-colors ${
                    packageId === pkg.id ? 'border-[#FF6B35] bg-[#FF6B35]/10' : 'border-white/10 bg-[#161618] hover:border-white/20'
                  }`}
                >
                  <h2 className="text-xl font-bold text-white">{pkg.name}</h2>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-slate-400">{pkg.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pkg.idealFor.slice(0, 2).map(item => (
                      <span key={item} className="rounded-md bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400">
                        {item}
                      </span>
                    ))}
                  </div>
                  <strong className="mt-4 block font-mono text-white">{formatKes(pkg.startingPrice)}+</strong>
                </button>
              ))}
            </div>

            <section className="rounded-xl border border-white/5 bg-[#161618] p-5">
              <h2 className="text-lg font-bold text-white">Quote request</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Contact name" />
                <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Phone" />
                <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Email" />
                <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Event type" />
                <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" type="date" />
                <input className="rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35]" placeholder="Event location" />
                <textarea className="min-h-32 rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none focus:border-[#FF6B35] md:col-span-2" placeholder="Notes, allergies, delivery timing, branding needs" />
              </div>
            </section>
          </section>

          <aside className="h-fit rounded-xl border border-white/10 bg-[#161618] p-5 shadow-2xl lg:sticky lg:top-28">
            <UsersRound className="h-7 w-7 text-[#FF6B35]" />
            <h2 className="mt-4 text-2xl font-bold text-white">Guest calculator</h2>
            <label htmlFor="guests" className="mt-5 block text-sm font-semibold text-slate-400">
              Guests
            </label>
            <input
              id="guests"
              type="range"
              min={selectedPackage.minGuests}
              max={300}
              value={guestCount}
              onChange={event => setGuestCount(Number(event.target.value))}
              className="mt-3 w-full accent-[#FF6B35]"
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-xs uppercase tracking-wider text-slate-500">Guests</span>
                <strong className="mt-1 block text-xl text-white">{guestCount}</strong>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-xs uppercase tracking-wider text-slate-500">Minimum</span>
                <strong className="mt-1 block text-xl text-white">{selectedPackage.minGuests}</strong>
              </div>
            </div>
            <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
              <div className="flex justify-between">
                <span className="text-slate-400">Estimate</span>
                <strong className="font-mono text-white">{formatKes(estimate)}</strong>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-white">Deposit</span>
                <strong className="font-mono text-[#FF6B35]">{formatKes(deposit)}</strong>
              </div>
            </div>
            <Button className="mt-5 w-full bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90">
              <CalendarDays className="h-4 w-4 mr-2" />
              Submit quote request
            </Button>
            <Button variant="outline" className="mt-3 w-full border-white/10 bg-white/5 text-white hover:bg-white/10">
              <CreditCard className="h-4 w-4 mr-2" />
              Prepare deposit
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}
