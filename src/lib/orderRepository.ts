import type { StoredOrder } from '@/src/types';

const ORDERS_KEY = 'nairobi-italian:orders:v1';

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function browserStorage(): StorageLike | undefined {
  if (typeof window === 'undefined') return undefined;
  return window.localStorage;
}

function safeParseOrders(raw: string | null): StoredOrder[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((order): order is StoredOrder => Boolean(order?.id && order?.customer && order?.payment));
  } catch {
    return [];
  }
}

export function createOrderId(now = new Date(), randomPart?: string) {
  const datePart = now
    .toISOString()
    .slice(2, 10)
    .replaceAll('-', '');
  const entropy =
    randomPart ??
    Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase();

  return `NIE-${datePart}-${entropy}`;
}

export function serializeStoredOrder(order: StoredOrder) {
  return JSON.stringify(order);
}

export function parseStoredOrder(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return parsed?.id ? (parsed as StoredOrder) : undefined;
  } catch {
    return undefined;
  }
}

export function listStoredOrders(storage: StorageLike | undefined = browserStorage()) {
  const orders = safeParseOrders(storage?.getItem(ORDERS_KEY) ?? null);
  return orders.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function getStoredOrder(orderId: string, storage: StorageLike | undefined = browserStorage()) {
  const normalizedId = orderId.trim().toLowerCase();
  return listStoredOrders(storage).find((order) => order.id.toLowerCase() === normalizedId);
}

export function saveStoredOrder(order: StoredOrder, storage: StorageLike | undefined = browserStorage()) {
  if (!storage) return order;

  const existing = listStoredOrders(storage).filter((item) => item.id !== order.id);
  storage.setItem(ORDERS_KEY, JSON.stringify([order, ...existing].slice(0, 20)));
  return order;
}

export function clearStoredOrders(storage: StorageLike | undefined = browserStorage()) {
  storage?.removeItem(ORDERS_KEY);
}
