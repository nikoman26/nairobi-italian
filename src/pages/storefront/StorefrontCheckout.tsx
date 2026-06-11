import { useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, CreditCard, Loader2, MapPin, RotateCcw, ShoppingBag, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/src/components/cart/CartProvider";
import { calculateLineTotal, formatKes, getModifierOption } from "@/src/lib/commerce";
import { createOrderId, saveStoredOrder } from "@/src/lib/orderRepository";
import { cancelMockMpesaPayment, confirmMockMpesaPayment, requestMockMpesaPayment } from "@/src/lib/paymentAdapter";
import { pitchDemoLink } from "@/src/components/layout/PitchModeNav";
import type { CheckoutCustomerDetails, FulfillmentDetails, FulfillmentType, PaymentAttempt, PaymentStatus, StoredOrder } from "../../types";

const fulfillmentOptions: { value: FulfillmentType; label: string; description: string }[] = [
  { value: 'pickup', label: 'Pickup', description: 'Ready at Westlands branch.' },
  { value: 'delivery', label: 'Delivery', description: 'Address captured before payment.' },
  { value: 'scheduled', label: 'Scheduled', description: 'Choose a future pickup or delivery time.' }
];

const initialCustomer: CheckoutCustomerDetails = {
  name: '',
  phone: '',
  email: ''
};

function etaFor(fulfillment: FulfillmentType) {
  if (fulfillment === 'pickup') return 18;
  if (fulfillment === 'scheduled') return 45;
  return 35;
}

function paymentStatusCopy(status: PaymentStatus) {
  if (status === 'request-sent') return 'Sending secure M-Pesa request...';
  if (status === 'pending') return 'STK prompt is pending on the customer phone.';
  if (status === 'confirmed') return 'Payment confirmed and receipt created.';
  if (status === 'cancelled') return 'The mock payment was cancelled.';
  if (status === 'failed') return 'The mock payment failed.';
  return 'Ready to send M-Pesa STK push.';
}

function inputClass(hasError = false) {
  return `rounded-lg border bg-[#0A0A0B] px-3 py-3 text-white outline-none transition-colors ${
    hasError ? 'border-red-500/70 focus:border-red-400' : 'border-white/10 focus:border-[#FF6B35]'
  }`;
}

export function StorefrontCheckout() {
  const { items, fulfillment, promoCode, setFulfillment, totals, clearCart, addItems } = useCart();
  const location = useLocation();
  const [customer, setCustomer] = useState(initialCustomer);
  const [address, setAddress] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentAttempt, setPaymentAttempt] = useState<PaymentAttempt | null>(null);
  const [createdOrder, setCreatedOrder] = useState<StoredOrder | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [reordered, setReordered] = useState(false);
  const paymentRunRef = useRef(0);

  const hasPitchFlag = new URLSearchParams(location.search).get('pitch') === '1';
  const checkoutLink = (path: string) => (hasPitchFlag ? pitchDemoLink(path) : path);
  const fieldErrors = useMemo(() => new Set(errors.map(error => error.split(':')[0])), [errors]);
  const isPaying = paymentStatus === 'request-sent' || paymentStatus === 'pending';

  function updateCustomer(field: keyof CheckoutCustomerDetails, value: string) {
    setCustomer(current => ({ ...current, [field]: value }));
  }

  function validateCheckout() {
    const nextErrors: string[] = [];
    const phoneForPayment = paymentPhone.trim() || customer.phone.trim();

    if (items.length === 0) nextErrors.push('cart:Add at least one item before checkout.');
    if (customer.name.trim().length < 2) nextErrors.push('name:Enter the customer name.');
    if (!/^\+?\d[\d\s-]{7,}$/.test(customer.phone.trim())) nextErrors.push('phone:Enter a valid phone number.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) nextErrors.push('email:Enter a valid email address.');
    if (!/^\+?\d[\d\s-]{7,}$/.test(phoneForPayment)) nextErrors.push('paymentPhone:Enter the M-Pesa phone number.');
    if (fulfillment === 'delivery' && address.trim().length < 8) nextErrors.push('address:Enter the delivery address.');
    if (fulfillment === 'scheduled' && !scheduledAt) nextErrors.push('scheduledAt:Choose a scheduled date and time.');

    setErrors(nextErrors);
    return nextErrors.length === 0;
  }

  async function confirmOrder() {
    if (!validateCheckout()) return;

    const phoneForPayment = paymentPhone.trim() || customer.phone.trim();
    const runId = paymentRunRef.current + 1;
    paymentRunRef.current = runId;
    setPaymentStatus('request-sent');
    setPaymentAttempt(null);

    const pendingAttempt = await requestMockMpesaPayment({ phone: phoneForPayment, amount: totals.total });
    if (paymentRunRef.current !== runId) return;
    setPaymentAttempt(pendingAttempt);
    setPaymentStatus('pending');

    const confirmedAttempt = await confirmMockMpesaPayment(pendingAttempt);
    if (paymentRunRef.current !== runId) return;
    const createdAt = new Date().toISOString();
    const fulfillmentDetails: FulfillmentDetails = {
      type: fulfillment,
      address: fulfillment === 'delivery' ? address.trim() : address.trim() || undefined,
      scheduledAt: fulfillment === 'scheduled' ? scheduledAt : undefined,
      notes: notes.trim() || undefined
    };
    const orderItems = items.map(item => ({
      ...item,
      customizations: item.customizations ? [...item.customizations] : undefined
    }));
    const order: StoredOrder = {
      id: createOrderId(),
      branchId: 'westlands',
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        email: customer.email.trim()
      },
      items: orderItems,
      totals,
      fulfillment: fulfillmentDetails,
      payment: confirmedAttempt,
      status: 'preparing',
      channel: 'webstore',
      promoCode: promoCode || undefined,
      createdAt,
      etaMinutes: etaFor(fulfillment)
    };

    saveStoredOrder(order);
    setPaymentAttempt(confirmedAttempt);
    setPaymentStatus('confirmed');
    setCreatedOrder(order);
    clearCart();
  }

  function cancelPayment() {
    if (!paymentAttempt) return;
    paymentRunRef.current += 1;
    const cancelled = cancelMockMpesaPayment(paymentAttempt);
    setPaymentAttempt(cancelled);
    setPaymentStatus('cancelled');
  }

  if (createdOrder) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <section className="rounded-xl border border-green-500/20 bg-green-500/10 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge className="mb-4 bg-green-500/15 text-green-300 border border-green-500/20 uppercase tracking-wider text-[10px]">
                  Receipt
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{createdOrder.id}</h1>
                <p className="mt-3 text-slate-300">
                  Payment confirmed for {createdOrder.customer.name}. ETA {createdOrder.etaMinutes} minutes.
                </p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-xl bg-green-400 text-black">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>
          </section>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            <section className="rounded-xl border border-white/5 bg-[#161618] p-5">
              <h2 className="text-xl font-bold text-white">Order items</h2>
              <div className="mt-5 space-y-4">
                {createdOrder.items.map(item => (
                  <article key={`${item.product.id}-${JSON.stringify(item.customizations ?? [])}`} className="flex gap-4 rounded-lg border border-white/5 bg-white/5 p-3">
                    <img src={item.product.imageUrl} alt={item.product.name} className="h-20 w-20 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-white">{item.quantity} x {item.product.name}</h3>
                        <strong className="font-mono text-white">{formatKes(calculateLineTotal(item))}</strong>
                      </div>
                      {item.customizations?.length ? (
                        <p className="mt-2 text-sm text-slate-400">
                          {item.customizations.map(customization => getModifierOption(customization.optionId)?.name).filter(Boolean).join(', ')}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="h-fit rounded-xl border border-white/10 bg-[#161618] p-5 shadow-2xl">
              <h2 className="text-xl font-bold text-white">Receipt summary</h2>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment</span>
                  <strong className="text-green-300 capitalize">{createdOrder.payment.status}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fulfillment</span>
                  <strong className="capitalize text-white">{createdOrder.fulfillment.type}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total</span>
                  <strong className="font-mono text-[#FF6B35]">{formatKes(createdOrder.totals.total)}</strong>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#0A0A0B] p-3 text-slate-400">
                  {createdOrder.payment.message}
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <Link to={checkoutLink(`/track?order=${createdOrder.id}`)} className="inline-flex h-9 items-center justify-center rounded-lg bg-[#FF6B35] px-3 text-sm font-semibold text-black transition-colors hover:bg-[#FF6B35]/90">
                  <MapPin className="mr-2 h-4 w-4" />
                  Track order
                </Link>
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => {
                    addItems(createdOrder.items);
                    setReordered(true);
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reorder into cart
                </Button>
                {reordered ? (
                  <Link to={checkoutLink('/cart')} className="text-center text-sm font-semibold text-green-300 hover:text-green-200">
                    Reorder added. Review cart
                  </Link>
                ) : null}
                <Link to={checkoutLink('/menu')} className="inline-flex h-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                  Return to webstore
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="space-y-6">
          <div>
            <Badge className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 uppercase tracking-wider text-[10px]">
              Checkout
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              M-Pesa-ready checkout for pickup, delivery, and scheduled orders.
            </h1>
          </div>

          {errors.length ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <strong className="block text-white">Please fix these details before payment.</strong>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {errors.map(error => (
                  <li key={error}>{error.split(':')[1] ?? error}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <section className="rounded-xl border border-white/5 bg-[#161618] p-5">
            <h2 className="text-lg font-bold text-white">Fulfillment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {fulfillmentOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFulfillment(option.value)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    fulfillment === option.value ? 'border-[#FF6B35] bg-[#FF6B35]/10' : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <strong className="text-white">{option.label}</strong>
                  <span className="mt-1 block text-sm text-slate-500">{option.description}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-white/5 bg-[#161618] p-5">
            <h2 className="text-lg font-bold text-white">Customer details</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                className={inputClass(fieldErrors.has('name'))}
                placeholder="Full name"
                value={customer.name}
                onChange={event => updateCustomer('name', event.target.value)}
              />
              <input
                className={inputClass(fieldErrors.has('phone'))}
                placeholder="Phone number"
                value={customer.phone}
                onChange={event => updateCustomer('phone', event.target.value)}
              />
              <input
                className={`${inputClass(fieldErrors.has('email'))} md:col-span-2`}
                placeholder="Email address"
                value={customer.email}
                onChange={event => updateCustomer('email', event.target.value)}
              />
            </div>
          </section>

          <section className="rounded-xl border border-white/5 bg-[#161618] p-5">
            <h2 className="text-lg font-bold text-white">Order details</h2>
            <div className="mt-4 grid gap-3">
              {fulfillment === 'delivery' ? (
                <input
                  className={inputClass(fieldErrors.has('address'))}
                  placeholder="Delivery address in Nairobi"
                  value={address}
                  onChange={event => setAddress(event.target.value)}
                />
              ) : null}
              {fulfillment === 'scheduled' ? (
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    type="datetime-local"
                    className={inputClass(fieldErrors.has('scheduledAt'))}
                    value={scheduledAt}
                    onChange={event => setScheduledAt(event.target.value)}
                  />
                  <input
                    className={inputClass(false)}
                    placeholder="Address or pickup handoff note"
                    value={address}
                    onChange={event => setAddress(event.target.value)}
                  />
                </div>
              ) : null}
              <textarea
                className="min-h-24 rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-3 text-white outline-none transition-colors focus:border-[#FF6B35]"
                placeholder={fulfillment === 'pickup' ? 'Pickup note, e.g. name at counter' : 'Delivery or preparation notes'}
                value={notes}
                onChange={event => setNotes(event.target.value)}
              />
            </div>
          </section>

          <section className="rounded-xl border border-white/5 bg-[#161618] p-5">
            <h2 className="text-lg font-bold text-white">Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button type="button" className="rounded-lg border border-[#FF6B35] bg-[#FF6B35]/10 p-4 text-left">
                <Smartphone className="h-6 w-6 text-[#FF6B35]" />
                <strong className="mt-3 block text-white">M-Pesa STK Push</strong>
                <span className="mt-1 block text-sm text-slate-500">Realistic preview flow before live credentials are connected.</span>
              </button>
              <button type="button" className="rounded-lg border border-white/10 bg-white/5 p-4 text-left opacity-70">
                <CreditCard className="h-6 w-6 text-blue-400" />
                <strong className="mt-3 block text-white">Visa / Mastercard</strong>
                <span className="mt-1 block text-sm text-slate-500">Adapter slot ready for provider onboarding.</span>
              </button>
            </div>
            <input
              className={`mt-4 w-full ${inputClass(fieldErrors.has('paymentPhone'))}`}
              placeholder="M-Pesa phone number, if different from customer phone"
              value={paymentPhone}
              onChange={event => setPaymentPhone(event.target.value)}
            />
          </section>
        </section>

        <aside className="h-fit rounded-xl border border-white/10 bg-[#161618] p-5 shadow-2xl lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold text-white">Pay {formatKes(totals.total)}</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Items</span>
              <strong className="font-mono text-white">{items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fulfillment</span>
              <strong className="capitalize text-white">{fulfillment}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Discount</span>
              <strong className="font-mono text-green-400">-{formatKes(totals.discount)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Points</span>
              <strong className="font-mono text-green-400">{totals.pointsEarned.toLocaleString()}</strong>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0A0A0B] p-3 text-slate-400">
              {paymentAttempt?.checkoutRequestId ? (
                <span className="block font-mono text-xs text-slate-500">{paymentAttempt.checkoutRequestId}</span>
              ) : null}
              {paymentStatusCopy(paymentStatus)}
            </div>
          </div>
          <Button
            disabled={items.length === 0 || isPaying}
            className="mt-5 w-full bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90"
            onClick={confirmOrder}
          >
            {isPaying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Smartphone className="mr-2 h-4 w-4" />}
            {isPaying ? 'Processing M-Pesa' : 'Pay with mock M-Pesa'}
          </Button>
          {paymentStatus === 'pending' ? (
            <Button
              variant="ghost"
              className="mt-2 w-full text-slate-400 hover:bg-red-500/10 hover:text-red-300"
              onClick={cancelPayment}
            >
              Cancel mock prompt
            </Button>
          ) : null}
          <Link to={checkoutLink('/track')} className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-lg text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
            <MapPin className="h-4 w-4 mr-2" />
            Track order status
          </Link>
          <Link to={checkoutLink('/cart')} className="mt-1 inline-flex h-8 w-full items-center justify-center rounded-lg text-sm font-medium text-slate-500 transition-colors hover:bg-white/5 hover:text-white">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Return to cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
