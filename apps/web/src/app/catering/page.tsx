"use client";

import { useMemo, useState } from "react";
import { CalendarDays, UsersRound } from "lucide-react";
import {
  calculateCateringDeposit,
  calculateCateringEstimate,
  cateringPackages,
  formatKes
} from "@nairobi/shared";
import { Button } from "@/components/ui/button";

export default function CateringPage() {
  const [packageId, setPackageId] = useState(cateringPackages[0].id);
  const [guestCount, setGuestCount] = useState(40);
  const selectedPackage = cateringPackages.find((item) => item.id === packageId) ?? cateringPackages[0];
  const estimate = useMemo(() => calculateCateringEstimate(selectedPackage, guestCount), [guestCount, selectedPackage]);
  const deposit = calculateCateringDeposit(estimate);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-md bg-cherry/10 px-3 py-2 text-sm font-black text-cherry">
          <CalendarDays size={16} />
          Catering portal
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Events, schools, weddings, birthdays, and office dessert drops.</h1>
        <p className="mt-4 text-lg leading-8 text-black/65">
          Quote requests, package selection, guest count estimates, deposit payments, and CRM handoff are represented in the V1 flow.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            {cateringPackages.map((pkg) => (
              <button
                className={`focus-ring rounded-md border bg-white p-5 text-left transition ${
                  packageId === pkg.id ? "border-cherry shadow-soft" : "border-black/10 hover:border-cherry"
                }`}
                key={pkg.id}
                onClick={() => setPackageId(pkg.id)}
                type="button"
              >
                <h2 className="text-xl font-black">{pkg.name}</h2>
                <p className="mt-3 min-h-20 text-sm leading-6 text-black/65">{pkg.description}</p>
                <strong className="mt-4 block">{formatKes(pkg.startingPrice)}+</strong>
              </button>
            ))}
          </div>

          <section className="rounded-md border border-black/10 bg-white p-5">
            <h2 className="text-xl font-black">Request a quote</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Contact name" />
              <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Phone" />
              <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Email" />
              <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Event type" />
              <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Event date" type="date" />
              <input className="focus-ring rounded-md border border-black/10 px-3 py-3" placeholder="Location" />
              <textarea className="focus-ring min-h-32 rounded-md border border-black/10 px-3 py-3 md:col-span-2" placeholder="Notes" />
            </div>
          </section>
        </section>

        <aside className="h-fit rounded-md border border-black/10 bg-white p-5 shadow-soft lg:sticky lg:top-24">
          <UsersRound className="text-mint" size={28} />
          <h2 className="mt-4 text-2xl font-black">Guest count calculator</h2>
          <label className="mt-5 block text-sm font-bold" htmlFor="guests">
            Guests
          </label>
          <input
            className="mt-2 w-full accent-cherry"
            id="guests"
            max={300}
            min={selectedPackage.minGuests}
            onChange={(event) => setGuestCount(Number(event.target.value))}
            type="range"
            value={guestCount}
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-cloud p-3">
              <span className="text-sm text-black/60">Guests</span>
              <strong className="block text-xl">{guestCount}</strong>
            </div>
            <div className="rounded-md bg-cloud p-3">
              <span className="text-sm text-black/60">Minimum</span>
              <strong className="block text-xl">{selectedPackage.minGuests}</strong>
            </div>
          </div>
          <div className="mt-5 space-y-3 border-t border-black/10 pt-5">
            <div className="flex justify-between">
              <span>Estimate</span>
              <strong>{formatKes(estimate)}</strong>
            </div>
            <div className="flex justify-between text-lg">
              <span>Deposit due</span>
              <strong>{formatKes(deposit)}</strong>
            </div>
          </div>
          <Button className="mt-5 w-full">Submit request</Button>
        </aside>
      </div>
    </main>
  );
}
