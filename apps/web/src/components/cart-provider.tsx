"use client";

import {
  buildCartItem,
  calculateCartTotals,
  formatKes,
  getProduct,
  type Cart,
  type CartTotals,
  type FulfillmentType,
  type Product
} from "@nairobi/shared";
import React, { createContext, useContext, useMemo, useState } from "react";

interface CartContextValue {
  cart: Cart;
  totals: CartTotals;
  lineCount: number;
  addProduct: (product: Product, optionIds?: string[], quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  applyPromo: (code: string) => void;
  setFulfillmentType: (type: FulfillmentType) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "nairobi-webstore-cart";

const defaultCart: Cart = {
  branchId: "branch-westlands",
  fulfillmentType: "pickup",
  deliveryZoneId: "zone-standard",
  items: []
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadCart(): Cart {
  if (typeof window === "undefined") {
    return defaultCart;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultCart, ...JSON.parse(saved) } : defaultCart;
  } catch {
    return defaultCart;
  }
}

function persistCart(cart: Cart) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCartState] = useState<Cart>(loadCart);

  const setCart = (nextCart: Cart) => {
    setCartState(nextCart);
    persistCart(nextCart);
  };

  const totals = useMemo(() => calculateCartTotals(cart), [cart]);
  const lineCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      totals,
      lineCount,
      addProduct(product, optionIds = [], quantity = 1) {
        const newLine = buildCartItem(product.id, quantity, optionIds);
        const existing = cart.items.find((item) => item.id === newLine.id);
        const items = existing
          ? cart.items.map((item) =>
              item.id === newLine.id ? { ...item, quantity: item.quantity + quantity } : item
            )
          : [...cart.items, newLine];
        setCart({ ...cart, items });
      },
      updateQuantity(lineId, quantity) {
        const items = cart.items
          .map((item) => (item.id === lineId ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0);
        setCart({ ...cart, items });
      },
      removeLine(lineId) {
        setCart({ ...cart, items: cart.items.filter((item) => item.id !== lineId) });
      },
      applyPromo(code) {
        setCart({ ...cart, promoCode: code.trim() || undefined });
      },
      setFulfillmentType(type) {
        setCart({ ...cart, fulfillmentType: type });
      },
      clearCart() {
        setCart(defaultCart);
      }
    }),
    [cart, totals, lineCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return value;
}

export function getLinePresentation(line: Cart["items"][number]) {
  const product = getProduct(line.productId);
  return {
    product,
    title: product.name,
    imageUrl: product.imageUrl,
    lineTotal: calculateCartTotals({
      ...defaultCart,
      items: [line]
    }).subtotal,
    priceLabel: formatKes(product.price)
  };
}
