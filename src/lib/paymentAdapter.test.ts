import { describe, expect, it } from 'vitest';
import {
  cancelMockMpesaPayment,
  confirmMockMpesaPayment,
  createMockCheckoutRequestId,
  requestMockMpesaPayment
} from './paymentAdapter';

describe('paymentAdapter', () => {
  it('creates stable mock checkout request IDs when seeded', () => {
    expect(createMockCheckoutRequestId(new Date('2026-06-11T09:00:00.000Z'), 'ABC123')).toBe('ws_CO_20260611_ABC123');
  });

  it('moves a mock M-Pesa payment from pending to confirmed', async () => {
    const pending = await requestMockMpesaPayment({
      phone: '+254700000100',
      amount: 1366,
      delayMs: 0
    });

    expect(pending.status).toBe('pending');
    expect(pending.method).toBe('M-Pesa');
    expect(pending.phone).toBe('+254700000100');
    expect(pending.checkoutRequestId).toMatch(/^ws_CO_/);

    const confirmed = await confirmMockMpesaPayment(pending, 0);

    expect(confirmed.status).toBe('confirmed');
    expect(confirmed.confirmedAt).toBeTruthy();
  });

  it('can mark a pending mock M-Pesa payment as cancelled', async () => {
    const pending = await requestMockMpesaPayment({
      phone: '+254700000100',
      amount: 1366,
      delayMs: 0
    });

    const cancelled = cancelMockMpesaPayment(pending);

    expect(cancelled.status).toBe('cancelled');
    expect(cancelled.failureReason).toContain('cancelled');
  });
});
