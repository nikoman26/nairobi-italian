"use client";

import Link from "next/link";
import { Gift, IceCreamBowl, Menu, ShoppingBag, Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

const navItems = [
  { href: "/menu", label: "Webstore" },
  { href: "/builder", label: "Builder" },
  { href: "/catering", label: "Catering" },
  { href: "/loyalty", label: "Loyalty" }
];

export function SiteNav() {
  const { lineCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-cherry text-white">
            <IceCreamBowl aria-hidden size={24} />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-black uppercase tracking-normal">Nairobi</span>
            <span className="block text-xs font-semibold text-black/60">Italian Ice & Eats</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              className="rounded-md px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5 hover:text-ink"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <Link href="/gift-cards" title="Gift cards">
            <Button aria-label="Gift cards" size="icon" variant="secondary">
              <Gift size={18} />
            </Button>
          </Link>
          <Link href="/account" title="Account">
            <Button aria-label="Account" size="icon" variant="secondary">
              <UserRound size={18} />
            </Button>
          </Link>
          <Link href="/cart">
            <Button aria-label={`Cart with ${lineCount} items`} className="relative" size="icon" variant="dark">
              <ShoppingBag size={18} />
              {lineCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-citrus px-1 text-xs font-black text-ink">
                  {lineCount}
                </span>
              ) : null}
            </Button>
          </Link>
          <Link className="md:hidden" href="/menu" title="Open menu">
            <Button aria-label="Open menu" size="icon" variant="ghost">
              <Menu size={18} />
            </Button>
          </Link>
          <Link className="hidden sm:block" href="/menu">
            <Button>
              <Sparkles size={18} />
              Order
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
