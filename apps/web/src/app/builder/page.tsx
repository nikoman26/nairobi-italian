import { WandSparkles } from "lucide-react";
import { BuilderForm } from "@/components/builder-form";

export const metadata = {
  title: "Build Your Own Dessert | Nairobi Italian Ice & Eats"
};

export default function BuilderPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-md bg-mint/10 px-3 py-2 text-sm font-black text-mint">
          <WandSparkles size={16} />
          Custom builder
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Build your own dessert.</h1>
        <p className="mt-4 text-lg leading-8 text-black/65">
          Choose a base, size, toppings, and sauces while the system updates price and nutrition estimates in real time.
        </p>
      </div>
      <BuilderForm />
    </main>
  );
}
