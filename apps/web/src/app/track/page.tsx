import { CheckCircle2, Clock, CookingPot, MapPin } from "lucide-react";
import { sampleOrders } from "@nairobi/shared";

export const metadata = {
  title: "Track Order | Nairobi Italian Ice & Eats"
};

export default function TrackPage() {
  const order = sampleOrders[0];
  const steps = [
    [CheckCircle2, "Placed", true],
    [CheckCircle2, "Paid", true],
    [CookingPot, "Preparing", true],
    [Clock, "Ready", false],
    [MapPin, "Delivered", false]
  ] as const;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="inline-flex items-center gap-2 rounded-md bg-mint/10 px-3 py-2 text-sm font-black text-mint">
        <MapPin size={16} />
        Live order tracking
      </p>
      <h1 className="mt-4 text-4xl font-black md:text-6xl">Order {order.id}</h1>
      <p className="mt-4 text-lg text-black/65">Status: {order.status.replaceAll("_", " ")}</p>
      <div className="mt-8 grid gap-4">
        {steps.map(([Icon, label, active]) => (
          <div className={`flex items-center gap-4 rounded-md border p-4 ${active ? "border-mint bg-mint/10" : "border-black/10 bg-white"}`} key={label}>
            <span className={`grid h-11 w-11 place-items-center rounded-md ${active ? "bg-mint text-white" : "bg-cloud text-black/40"}`}>
              <Icon size={20} />
            </span>
            <strong>{label}</strong>
          </div>
        ))}
      </div>
    </main>
  );
}
