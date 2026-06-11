import {
  modifierGroups,
  products,
  promotions
} from "./seed";
import type {
  Cart,
  CartItem,
  CartTotals,
  CateringPackage,
  LoyaltyTier,
  ModifierOption,
  Product,
  Promotion
} from "./types";

export const KES = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0
});

export function formatKes(amount: number): string {
  return KES.format(amount);
}

export function getProduct(productId: string): Product {
  const product = products.find((item) => item.id === productId);
  if (!product) {
    throw new Error(`Unknown product: ${productId}`);
  }
  return product;
}

export function getModifierOption(optionId: string): ModifierOption {
  for (const group of modifierGroups) {
    const option = group.options.find((item) => item.id === optionId);
    if (option) {
      return option;
    }
  }
  throw new Error(`Unknown modifier option: ${optionId}`);
}

export function calculateCartItemPrice(item: CartItem): number {
  const product = getProduct(item.productId);
  const modifiersTotal = item.modifiers.reduce((sum, modifier) => {
    return sum + getModifierOption(modifier.optionId).price;
  }, 0);

  return (product.price + modifiersTotal) * item.quantity;
}

export function estimateDeliveryFee(cart: Pick<Cart, "fulfillmentType" | "deliveryZoneId">): number {
  if (cart.fulfillmentType !== "delivery" && cart.fulfillmentType !== "scheduled") {
    return 0;
  }

  if (cart.deliveryZoneId === "zone-premium") {
    return 450;
  }

  return 250;
}

export function resolvePromotion(code?: string): Promotion | undefined {
  if (!code) {
    return undefined;
  }

  return promotions.find(
    (promotion) => promotion.isActive && promotion.code.toLowerCase() === code.toLowerCase()
  );
}

export function calculateDiscount(subtotal: number, promotion?: Promotion): number {
  if (!promotion) {
    return 0;
  }

  if (promotion.code === "OFFICE500" && subtotal < 4000) {
    return 0;
  }

  if (promotion.type === "percent") {
    return Math.round(subtotal * (promotion.value / 100));
  }

  return Math.min(promotion.value, subtotal);
}

export function calculateLoyaltyPoints(totalPaid: number): number {
  return Math.max(0, Math.floor(totalPaid));
}

export function resolveLoyaltyTier(lifetimeSpend: number): LoyaltyTier {
  if (lifetimeSpend >= 250000) return "VIP";
  if (lifetimeSpend >= 120000) return "Platinum";
  if (lifetimeSpend >= 50000) return "Gold";
  if (lifetimeSpend >= 15000) return "Silver";
  return "Bronze";
}

export function calculateCartTotals(cart: Cart): CartTotals {
  const subtotal = cart.items.reduce((sum, item) => sum + calculateCartItemPrice(item), 0);
  const discount = calculateDiscount(subtotal, resolvePromotion(cart.promoCode));
  const deliveryFee = estimateDeliveryFee(cart);
  const tax = 0;
  const total = Math.max(0, subtotal - discount + deliveryFee + tax);

  return {
    subtotal,
    discount,
    deliveryFee,
    tax,
    total,
    loyaltyPointsEarned: calculateLoyaltyPoints(total)
  };
}

export function buildCartItem(productId: string, quantity = 1, optionIds: string[] = []): CartItem {
  return {
    id: `${productId}-${optionIds.join("-") || "base"}`,
    productId,
    quantity,
    modifiers: optionIds.map((optionId) => ({
      groupId: modifierGroups.find((group) => group.options.some((option) => option.id === optionId))?.id ?? "custom",
      optionId
    }))
  };
}

export function calculateCateringEstimate(pkg: CateringPackage, guestCount: number): number {
  const billableGuests = Math.max(pkg.minGuests, guestCount);
  const perGuestRate = Math.max(450, Math.round(pkg.startingPrice / pkg.minGuests));
  return Math.max(pkg.startingPrice, billableGuests * perGuestRate);
}

export function calculateCateringDeposit(estimate: number): number {
  return Math.round(estimate * 0.4);
}
