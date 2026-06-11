import { describe, expect, it } from 'vitest';
import { MOCK_PRODUCTS } from '@/src/data';
import { clearCartSnapshot, readCartSnapshot, saveCartSnapshot } from './cartStorage';

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

describe('cartStorage', () => {
  it('saves, reads, and clears a local cart snapshot', () => {
    const storage = new MemoryStorage();

    saveCartSnapshot(
      {
        items: [{ product: MOCK_PRODUCTS[0], quantity: 2 }],
        fulfillment: 'delivery',
        promoCode: 'KARIBU10'
      },
      storage
    );

    expect(readCartSnapshot(storage)).toMatchObject({
      fulfillment: 'delivery',
      promoCode: 'KARIBU10',
      items: [{ quantity: 2 }]
    });

    clearCartSnapshot(storage);

    expect(readCartSnapshot(storage)).toEqual({
      items: [],
      fulfillment: 'pickup',
      promoCode: ''
    });
  });
});
