import Link from "next/link";
import { ArrowRight, BadgePercent, CalendarDays, Gift, MapPin, Star } from "lucide-react";
import { categories, products } from "@nairobi/shared";
import { AnimatedHero } from "@/components/animated-hero";
import { FeaturedProductCard, ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

const featured = products.filter((product) => product.isFeatured);

export default function HomePage() {
  return (
    <main>
      <AnimatedHero />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Pickup", "Order ahead and skip the counter."],
            ["Delivery", "Branch-aware zones and live status."],
            ["Catering", "Quote requests with deposit flow."],
            ["Rewards", "1 KES spent earns 1 point."]
          ].map(([title, copy]) => (
            <div className="rounded-md border border-black/10 bg-white p-5 shadow-sm" key={title}>
              <h2 className="text-lg font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-black/65">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-black uppercase tracking-normal text-cherry">Webstore</p>
              <h2 className="mt-2 text-3xl font-black">Featured for today</h2>
            </div>
            <Link href="/menu">
              <Button variant="secondary">
                View menu
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {featured.slice(0, 2).map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-black uppercase tracking-normal text-mint">Categories</p>
            <h2 className="mt-2 text-3xl font-black">Built for dessert runs and office orders</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              className="rounded-md border border-black/10 bg-white p-5 shadow-sm transition hover:border-cherry"
              href="/menu"
              key={category.id}
            >
              <h3 className="text-xl font-black">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-black/65">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-ink py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 lg:grid-cols-3">
          <Link className="rounded-md bg-white/8 p-5 transition hover:bg-white/12" href="/gift-cards">
            <Gift className="text-citrus" size={28} />
            <h2 className="mt-4 text-2xl font-black">Gift cards</h2>
            <p className="mt-2 text-white/70">Digital cards for birthdays, office rewards, and surprise dessert runs.</p>
          </Link>
          <Link className="rounded-md bg-white/8 p-5 transition hover:bg-white/12" href="/catering">
            <CalendarDays className="text-mint" size={28} />
            <h2 className="mt-4 text-2xl font-black">Catering portal</h2>
            <p className="mt-2 text-white/70">Guest count estimates, packages, quote requests, and deposits.</p>
          </Link>
          <Link className="rounded-md bg-white/8 p-5 transition hover:bg-white/12" href="/loyalty">
            <BadgePercent className="text-cherry" size={28} />
            <h2 className="mt-4 text-2xl font-black">Loyalty wallet</h2>
            <p className="mt-2 text-white/70">Points, tiers, referrals, birthday rewards, and future challenges.</p>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="font-black uppercase tracking-normal text-cherry">Top sellers</p>
          <h2 className="mt-2 text-3xl font-black">Ready in the cart</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {featured.slice(2, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <aside className="rounded-md border border-black/10 bg-white p-5 shadow-sm">
          <MapPin className="text-cherry" size={28} />
          <h2 className="mt-4 text-2xl font-black">Westlands branch</h2>
          <p className="mt-2 leading-7 text-black/65">
            Phase 1 is operationally focused on one active branch, while every order, staff action, product availability,
            and metric is already branch-aware for future expansion.
          </p>
          <div className="mt-5 rounded-md bg-cloud p-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Star className="text-citrus" size={18} />
              4.9 customer experience target
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
