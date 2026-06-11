import { describe, expect, it } from 'vitest';
import { MOCK_PRODUCTS } from '@/src/data';
import type { StoredOrder } from '@/src/types';
import {
  clearStoredOrders,
  createOrderId,
  getStoredOrder,
  listStoredOrders,
  parseStoredOrder,
  saveStoredOrder,
  serializeStoredOrder
} from './orderRepository';

class MemoryStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }
}

function buildOrder(id: string, createdAt: string): StoredOrder {
  return {
    id,
    branchId: 'westlands',
    customer: {
      name: 'Amina Otieno',
      phone: '+254700000100',
      email: 'amina@example.com'
    },
    items: [{ product: MOCK_PRODUCTS[0], quantity: 1 }],
    totals: {
      subtotal: 350,
      discount: 0,
      deliveryFee: 0,
      total: 350,
      pointsEarned: 350
    },
    fulfillment: {
      type: 'pickup',
      notes: 'Counter pickup'
    },
    payment: {
      id: `PAY-${id}`,
      method: 'M-Pesa',
      status: 'confirmed',
      phone: '+254700000100',
      checkoutRequestId: `ws_${id}`,
      requestedAt: createdAt,
      confirmedAt: createdAt
    },
    status: 'preparing',
    channel: 'webstore',
    createdAt,
    etaMinutes: 18
  };
}

describe('orderRepository', () => {
  it('generates readable local order IDs', () => {
    expect(createOrderId(new Date('2026-06-11T09:00:00.000Z'), 'ABCD')).toBe('NIE-260611-ABCD');
  });

  it('serializes, saves, reads, sorts, and clears local orders', () => {
    const storage = new MemoryStorage();
    const older = buildOrder('NIE-260611-OLD1', '2026-06-11T08:00:00.000Z');
    const newer = buildOrder('NIE-260611-NEW1', '2026-06-11T09:00:00.000Z');

    expect(parseStoredOrder(serializeStoredOrder(older))?.id).toBe(older.id);

    saveStoredOrder(older, storage);
    saveStoredOrder(newer, storage);

    expect(listStoredOrders(storage).map(order => order.id)).toEqual([newer.id, older.id]);
    expect(getStoredOrder('nie-260611-old1', storage)?.id).toBe(older.id);

    clearStoredOrders(storage);
    expect(listStoredOrders(storage)).toEqual([]);
  });
});
