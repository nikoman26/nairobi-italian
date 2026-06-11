import { CheckCircle2, Clock, CookingPot, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_ORDERS } from "../../data";
import { formatKes } from "@/src/lib/commerce";

export function StorefrontTrack() {
  const order = MOCK_ORDERS[0];
  const steps = [
    [CheckCircle2, 'Placed', true],
    [CheckCircle2, 'Paid', true],
    [CookingPot, 'Preparing', true],
    [Clock, 'Ready', false],
    [MapPin, order.fulfillment === 'delivery' ? 'Delivered' : 'Picked up', false]
  ] as const;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Badge className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
          Order tracking
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">{order.id}</h1>
        <p className="mt-4 text-lg text-slate-400">
          {order.customerName} · {formatKes(order.total)} · ETA {order.etaMinutes} minutes
        </p>
        <div className="mt-8 grid gap-4">
          {steps.map(([Icon, label, active]) => (
            <div key={label} className={`flex items-center gap-4 rounded-xl border p-4 ${active ? 'border-green-500/20 bg-green-500/10' : 'border-white/10 bg-[#161618]'}`}>
              <span className={`grid h-11 w-11 place-items-center rounded-lg ${active ? 'bg-green-500 text-black' : 'bg-white/5 text-slate-500'}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <strong className="text-white">{label}</strong>
                <p className="text-sm text-slate-500">{active ? 'Completed or in progress' : 'Waiting for kitchen update'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
