"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarDays, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AnimatedHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          alt="Colorful cups of frozen dessert"
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1800&q=85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </div>
      <div className="mx-auto grid min-h-[620px] max-w-7xl content-end px-4 pb-10 pt-24 md:min-h-[680px] md:pb-16">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-white"
          initial={{ opacity: 0, y: 22 }}
          transition={{ duration: 0.65 }}
        >
          <p className="mb-4 inline-flex rounded-md bg-white/15 px-3 py-2 text-sm font-semibold backdrop-blur">
            Westlands webstore now accepting pickup, delivery, and catering deposits
          </p>
          <h1 className="text-5xl font-black leading-none tracking-normal md:text-7xl">
            Nairobi Italian Ice & Eats
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium text-white/88 md:text-xl">
            A mobile-first dessert store for Italian ice, gelato, office boxes, gift cards, loyalty rewards, and event catering.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/menu">
              <Button size="lg">
                <ShoppingBag size={20} />
                Open webstore
              </Button>
            </Link>
            <Link href="/catering">
              <Button size="lg" variant="secondary">
                <CalendarDays size={20} />
                Book catering
              </Button>
            </Link>
          </div>
          <Link
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-citrus"
            href="/track"
          >
            Track an order <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
