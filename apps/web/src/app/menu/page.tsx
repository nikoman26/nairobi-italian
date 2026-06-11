import { ShoppingBag } from "lucide-react";
import { WebstoreCatalog } from "@/components/webstore-catalog";

export const metadata = {
  title: "Webstore | Nairobi Italian Ice & Eats"
};

export default function MenuPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-md bg-cherry/10 px-3 py-2 text-sm font-black text-cherry">
          <ShoppingBag size={16} />
          Webstore
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Menu ordering that is ready for pickup, delivery, and scheduled drops.</h1>
        <p className="mt-4 text-lg leading-8 text-black/65">
          Dynamic catalog, branch-aware availability, modifiers, cross-sells, nutrition, allergens, and cart integration are all wired into the storefront.
        </p>
      </div>
      <WebstoreCatalog />
    </main>
  );
}
