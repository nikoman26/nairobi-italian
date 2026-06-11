import { Heart, History, MapPin, UserRound, WalletCards } from "lucide-react";

export const metadata = {
  title: "Account | Nairobi Italian Ice & Eats"
};

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-md bg-cherry/10 px-3 py-2 text-sm font-black text-cherry">
          <UserRound size={16} />
          Customer account
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Profiles, order history, addresses, wallet, subscriptions, and referrals.</h1>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[
          [History, "Order history", "Reorder favorites and view receipts."],
          [MapPin, "Saved addresses", "Delivery locations for home and office."],
          [WalletCards, "Rewards wallet", "Points, gift cards, and credits."],
          [Heart, "Wishlist", "Desserts saved for later."]
        ].map(([Icon, title, copy]) => {
          const AccountIcon = Icon as typeof History;
          return (
            <article className="rounded-md border border-black/10 bg-white p-5 shadow-sm" key={String(title)}>
              <AccountIcon className="text-mint" size={28} />
              <h2 className="mt-4 text-xl font-black">{String(title)}</h2>
              <p className="mt-2 text-sm leading-6 text-black/65">{String(copy)}</p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
