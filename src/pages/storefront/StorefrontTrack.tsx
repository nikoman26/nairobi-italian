import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock, CookingPot, MapPin, ReceiptText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculateLineTotal, formatKes, getModifierOption } from "@/src/lib/commerce";
import { getStoredOrder, listStoredOrders } from "@/src/lib/orderRepository";
import { MOCK_ORDERS } from "../../data";
import type { Order, PaymentAttempt, StoredOrder } from "../../types";

function legacyOrderToStored(order: Order): StoredOrder {
  const payment: PaymentAttempt = {
    id: `preview-${order.id}`,
    method: order.paymentMethod === 'Card' ? 'Card' : 'M-Pesa',
    status: order.status === 'pending' ? 'pending' : 'confirmed',
    phone: '+254 700 000 100',
    checkoutRequestId: `preview_${order.id}`,
    requestedAt: order.createdAt,
    confirmedAt: order.status === 'pending' ? undefined : order.createdAt,
    message: 'Sample order shown for presentation before a customer places an order.'
  };

  return {
    id: order.id,
    branchId: order.branchId,
    customer: {
      name: order.customerName,
      phone: '+254 700 000 100',
      email: order.customerEmail
    },
    items: order.items,
    totals: {
      subtotal: order.total,
      discount: 0,
      deliveryFee: 0,
      total: order.total,
      pointsEarned: Math.floor(order.total)
    },
    fulfillment: { type: order.fulfillment },
    payment,
    status: order.status,
    channel: 'webstore',
    createdAt: order.createdAt,
    etaMinutes: order.etaMinutes ?? 20
  };
}

function stepState(order: StoredOrder) {
  const paid = ['paid', 'preparing', 'ready', 'out-for-delivery', 'delivered'].includes(order.status);
  const preparing = ['preparing', 'ready', 'out-for-delivery', 'delivered'].includes(order.status);
  const ready = ['ready', 'out-for-delivery', 'delivered'].includes(order.status);
  const complete = order.status === 'delivered';

  return [
    [CheckCircle2, 'Placed', true],
    [CheckCircle2, 'Paid', paid],
    [CookingPot, 'Preparing', preparing],
    [Clock, 'Ready', ready],
    [MapPin, order.fulfillment.type === 'delivery' ? 'Delivered' : 'Picked up', complete]
  ] as const;
}

export function StorefrontTrack() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedOrderId = searchParams.get('order') ?? '';
  const storedOrders = listStoredOrders();
  const requestedOrder = requestedOrderId ? getStoredOrder(requestedOrderId) : undefined;
  const latestStoredOrder = storedOrders[0];
  const sampleOrder = useMemo(() => legacyOrderToStored(MOCK_ORDERS[0]), []);
  const order = requestedOrder ?? (!requestedOrderId ? latestStoredOrder ?? sampleOrder : undefined);
  const [searchValue, setSearchValue] = useState(requestedOrderId);
  const notFound = Boolean(requestedOrderId && !requestedOrder);
  const isSample = order?.id === sampleOrder.id && !latestStoredOrder && !requestedOrderId;

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextId = searchValue.trim();
    if (!nextId) return;

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('order', nextId);
    navigate(`/track?${nextParams.toString()}`);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Badge className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
          Order tracking
        </Badge>
        <div className="grid gap-5 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              {order ? order.id : 'Find your order'}
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              {order
                ? `${order.customer.name} - ${formatKes(order.totals.total)} - ETA ${order.etaMinutes} minutes`
                : 'Enter the receipt number from checkout to view status, ETA, payment, and items.'}
            </p>
          </div>
          <form onSubmit={submitSearch} className="rounded-xl border border-white/10 bg-[#161618] p-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Order ID</label>
            <div className="mt-2 flex gap-2">
              <input
                value={searchValue}
                onChange={event => setSearchValue(event.target.value)}
                placeholder="NIE-260611-ABCD"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-2 text-sm text-white outline-none focus:border-[#FF6B35]"
              />
              <Button type="submit" className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {notFound ? (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-5">
            <h2 className="text-xl font-bold text-white">Order not found on this device.</h2>
            <p className="mt-2 text-sm text-red-100">
              Local preview orders are stored in this browser. Use the order ID from the receipt, or place a new mock order from the webstore.
            </p>
            <Link to="/menu" className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-[#FF6B35] px-3 text-sm font-semibold text-black transition-colors hover:bg-[#FF6B35]/90">
              Open webstore
            </Link>
          </div>
        ) : null}

        {isSample ? (
          <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-100">
            This is a sample presentation order. A real customer order will appear here immediately after checkout.
          </div>
        ) : null}

        {order ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            <section className="space-y-4">
              {stepState(order).map(([Icon, label, active]) => (
                <div key={label} className={`flex items-center gap-4 rounded-xl border p-4 ${active ? 'border-green-500/20 bg-green-500/10' : 'border-white/10 bg-[#161618]'}`}>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${active ? 'bg-green-500 text-black' : 'bg-white/5 text-slate-500'}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <strong className="text-white">{label}</strong>
                    <p className="text-sm text-slate-500">{active ? 'Completed or in progress' : 'Waiting for the next update'}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-xl border border-white/5 bg-[#161618] p-5">
                <h2 className="text-xl font-bold text-white">Items</h2>
                <div className="mt-4 space-y-3">
                  {order.items.map(item => (
                    <article key={`${item.product.id}-${JSON.stringify(item.customizations ?? [])}`} className="flex gap-3 rounded-lg border border-white/5 bg-white/5 p-3">
                      <img src={item.product.imageUrl} alt={item.product.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-white">{item.quantity} x {item.product.name}</h3>
                          <strong className="font-mono text-white">{formatKes(calculateLineTotal(item))}</strong>
                        </div>
                        {item.customizations?.length ? (
                          <p className="mt-1 text-sm text-slate-400">
                            {item.customizations.map(customization => getModifierOption(customization.optionId)?.name).filter(Boolean).join(', ')}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <aside className="h-fit rounded-xl border border-white/10 bg-[#161618] p-5 shadow-2xl lg:sticky lg:top-28">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#FF6B35]/15 text-[#FF6B35]">
                <ReceiptText className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">Order summary</h2>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <strong className="capitalize text-white">{order.status.replaceAll('-', ' ')}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment</span>
                  <strong className="capitalize text-green-300">{order.payment.status}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fulfillment</span>
                  <strong className="capitalize text-white">{order.fulfillment.type}</strong>
                </div>
                {order.fulfillment.address ? (
                  <div className="rounded-lg border border-white/10 bg-[#0A0A0B] p-3 text-slate-400">
                    {order.fulfillment.address}
                  </div>
                ) : null}
                {order.fulfillment.notes ? (
                  <div className="rounded-lg border border-white/10 bg-[#0A0A0B] p-3 text-slate-400">
                    {order.fulfillment.notes}
                  </div>
                ) : null}
                <div className="flex justify-between border-t border-white/10 pt-3 text-lg">
                  <span className="font-bold text-white">Total</span>
                  <strong className="font-mono text-[#FF6B35]">{formatKes(order.totals.total)}</strong>
                </div>
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    </div>
  );
}
