import type { PaymentAttempt } from '@/src/types';

type MockPaymentInput = {
  phone: string;
  amount: number;
  method?: PaymentAttempt['method'];
  delayMs?: number;
};

function wait(delayMs: number) {
  return new Promise((resolve) => globalThis.setTimeout(resolve, delayMs));
}

export function createPaymentId(now = new Date()) {
  return `PAY-${now.getTime().toString(36).toUpperCase()}`;
}

export function createMockCheckoutRequestId(now = new Date(), suffix?: string) {
  const entropy =
    suffix ??
    Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase();

  return `ws_CO_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${entropy}`;
}

export async function requestMockMpesaPayment({
  phone,
  amount,
  method = 'M-Pesa',
  delayMs = 650
}: MockPaymentInput): Promise<PaymentAttempt> {
  await wait(delayMs);

  return {
    id: createPaymentId(),
    method,
    status: 'pending',
    phone,
    checkoutRequestId: createMockCheckoutRequestId(),
    requestedAt: new Date().toISOString(),
    message: `STK request sent for KES ${amount.toLocaleString('en-KE')}.`
  };
}

export async function confirmMockMpesaPayment(attempt: PaymentAttempt, delayMs = 900): Promise<PaymentAttempt> {
  await wait(delayMs);

  return {
    ...attempt,
    status: 'confirmed',
    confirmedAt: new Date().toISOString(),
    message: 'Payment confirmed in the preview environment.'
  };
}

export function cancelMockMpesaPayment(attempt: PaymentAttempt): PaymentAttempt {
  return {
    ...attempt,
    status: 'cancelled',
    failureReason: 'Customer cancelled the simulated STK prompt.',
    message: 'Payment cancelled in the preview environment.'
  };
}
