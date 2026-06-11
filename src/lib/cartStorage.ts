import type { CartItem, FulfillmentType } from '@/src/types';

const CART_STORAGE_KEY = 'nairobi-italian:cart:v1';

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export interface CartSnapshot {
  items: CartItem[];
  fulfillment: FulfillmentType;
  promoCode: string;
}

export const emptyCartSnapshot: CartSnapshot = {
  items: [],
  fulfillment: 'pickup',
  promoCode: ''
};

function browserStorage(): StorageLike | undefined {
  if (typeof window === 'undefined') return undefined;
  return window.localStorage;
}

function isFulfillmentType(value: unknown): value is FulfillmentType {
  return typeof value === 'string' && ['pickup', 'delivery', 'scheduled', 'corporate'].includes(value);
}

export function readCartSnapshot(storage: StorageLike | undefined = browserStorage()): CartSnapshot {
  if (!storage) return emptyCartSnapshot;

  try {
    const parsed = JSON.parse(storage.getItem(CART_STORAGE_KEY) ?? '');
    return {
      items: Array.isArray(parsed?.items) ? parsed.items : [],
      fulfillment: isFulfillmentType(parsed?.fulfillment) ? parsed.fulfillment : 'pickup',
      promoCode: typeof parsed?.promoCode === 'string' ? parsed.promoCode : ''
    };
  } catch {
    return emptyCartSnapshot;
  }
}

export function saveCartSnapshot(snapshot: CartSnapshot, storage: StorageLike | undefined = browserStorage()) {
  storage?.setItem(CART_STORAGE_KEY, JSON.stringify(snapshot));
}

export function clearCartSnapshot(storage: StorageLike | undefined = browserStorage()) {
  storage?.removeItem(CART_STORAGE_KEY);
}
