import { MODIFIER_GROUPS, PROMOTIONS } from '@/src/data';
import type { CartItem, CartTotals, CateringPackage, FulfillmentType, ModifierOption, Promotion } from '@/src/types';

export function formatKes(amount: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(amount);
}

export function getModifierOption(optionId: string): ModifierOption | undefined {
  for (const group of MODIFIER_GROUPS) {
    const option = group.options.find((item) => item.id === optionId);
    if (option) return option;
  }

  return undefined;
}

export function calculateLineTotal(item: CartItem) {
  const modifiersTotal = (item.customizations ?? []).reduce((sum, customization) => {
    return sum + (getModifierOption(customization.optionId)?.price ?? 0);
  }, 0);

  return (item.product.price + modifiersTotal) * item.quantity;
}

export function resolvePromotion(code?: string): Promotion | undefined {
  if (!code) return undefined;
  return PROMOTIONS.find((promotion) => promotion.active && promotion.code.toLowerCase() === code.toLowerCase());
}

export function calculateDiscount(subtotal: number, promotion?: Promotion) {
  if (!promotion) return 0;
  if (promotion.minimumSpend && subtotal < promotion.minimumSpend) return 0;
  if (promotion.type === 'percent') return Math.round(subtotal * (promotion.value / 100));
  return Math.min(subtotal, promotion.value);
}

export function deliveryFeeFor(fulfillment: FulfillmentType) {
  return fulfillment === 'delivery' || fulfillment === 'scheduled' ? 250 : 0;
}

export function calculateCartTotals(items: CartItem[], fulfillment: FulfillmentType, promoCode?: string): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  const discount = calculateDiscount(subtotal, resolvePromotion(promoCode));
  const deliveryFee = deliveryFeeFor(fulfillment);
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return {
    subtotal,
    discount,
    deliveryFee,
    total,
    pointsEarned: Math.floor(total)
  };
}

export function estimateCateringTotal(pkg: CateringPackage, guestCount: number) {
  const billableGuests = Math.max(pkg.minGuests, guestCount);
  const perGuestRate = Math.max(450, Math.round(pkg.startingPrice / pkg.minGuests));
  return Math.max(pkg.startingPrice, billableGuests * perGuestRate);
}

export function estimateCateringDeposit(total: number) {
  return Math.round(total * 0.4);
}

export function stockTone(onHand: number, reorderPoint: number) {
  if (onHand <= reorderPoint) return 'text-red-400 bg-red-500/10 border-red-500/20';
  if (onHand <= reorderPoint * 1.5) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
  return 'text-green-400 bg-green-500/10 border-green-500/20';
}
