import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Leaf, ShieldAlert } from "lucide-react";
import { categories, formatKes, modifierGroups, products } from "@nairobi/shared";
import { ProductAddPanel } from "./product-add-panel";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  return {
    title: product ? `${product.name} | Nairobi Italian Ice & Eats` : "Product"
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) notFound();

  const category = categories.find((item) => item.id === product.categoryId);
  const groups = modifierGroups.filter((group) => product.modifierGroupIds.includes(group.id));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Link className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-black/60 hover:text-cherry" href="/menu">
        <ArrowLeft size={16} />
        Back to webstore
      </Link>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_440px]">
        <section>
          <img alt={product.name} className="h-[420px] w-full rounded-md object-cover shadow-soft" src={product.imageUrl} />
          <div className="mt-6">
            <p className="font-black uppercase tracking-normal text-cherry">{category?.name}</p>
            <h1 className="mt-2 text-4xl font-black md:text-6xl">{product.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-black/65">{product.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span className="rounded-md bg-mint/10 px-3 py-2 text-sm font-bold text-mint" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-md border border-black/10 bg-white p-5">
              <Leaf className="text-mint" size={24} />
              <h2 className="mt-3 text-xl font-black">Nutrition estimate</h2>
              <p className="mt-2 text-black/65">
                {product.nutrition.calories} calories, {product.nutrition.sugarGrams}g sugar
                {product.nutrition.dairyFree ? ", dairy-free" : ""}.
              </p>
            </div>
            <div className="rounded-md border border-black/10 bg-white p-5">
              <ShieldAlert className="text-cherry" size={24} />
              <h2 className="mt-3 text-xl font-black">Allergens</h2>
              <p className="mt-2 text-black/65">{product.allergens.length ? product.allergens.join(", ") : "No major allergens listed."}</p>
            </div>
          </div>
        </section>
        <ProductAddPanel basePrice={formatKes(product.price)} groups={groups} product={product} />
      </div>
    </main>
  );
}
