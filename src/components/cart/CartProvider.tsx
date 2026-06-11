import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { calculateCartTotals } from '@/src/lib/commerce';
import type { CartCustomization, CartItem, CartTotals, FulfillmentType, Product } from '@/src/types';

interface CartContextValue {
  items: CartItem[];
  fulfillment: FulfillmentType;
  promoCode: string;
  totals: CartTotals;
  itemCount: number;
  addItem: (product: Product, quantity?: number, customizations?: CartCustomization[]) => void;
  updateQuantity: (productId: string, quantity: number, customizations?: CartCustomization[]) => void;
  removeItem: (productId: string, customizations?: CartCustomization[]) => void;
  setFulfillment: (fulfillment: FulfillmentType) => void;
  setPromoCode: (promoCode: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function customizationKey(customizations?: CartCustomization[]) {
  return (customizations ?? [])
    .map((item) => `${item.modifierGroupId}:${item.optionId}`)
    .sort()
    .join('|');
}

function sameLine(item: CartItem, productId: string, customizations?: CartCustomization[]) {
  return item.product.id === productId && customizationKey(item.customizations) === customizationKey(customizations);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('pickup');
  const [promoCode, setPromoCodeState] = useState('');

  const totals = useMemo(() => calculateCartTotals(items, fulfillment, promoCode), [items, fulfillment, promoCode]);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      fulfillment,
      promoCode,
      totals,
      itemCount,
      addItem(product, quantity = 1, customizations = []) {
        setItems((current) => {
          const existing = current.find((item) => sameLine(item, product.id, customizations));
          if (!existing) return [...current, { product, quantity, customizations }];
          return current.map((item) =>
            sameLine(item, product.id, customizations) ? { ...item, quantity: item.quantity + quantity } : item
          );
        });
      },
      updateQuantity(productId, quantity, customizations = []) {
        setItems((current) =>
          current
            .map((item) => (sameLine(item, productId, customizations) ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0)
        );
      },
      removeItem(productId, customizations = []) {
        setItems((current) => current.filter((item) => !sameLine(item, productId, customizations)));
      },
      setFulfillment,
      setPromoCode(code) {
        setPromoCodeState(code.trim().toUpperCase());
      },
      clearCart() {
        setItems([]);
        setPromoCodeState('');
        setFulfillment('pickup');
      }
    }),
    [items, fulfillment, promoCode, totals, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return value;
}
