import { describe, expect, it } from 'vitest';
import { MOCK_PRODUCTS } from '@/src/data';
import { calculateCartTotals, calculateLineTotal } from './commerce';

describe('commerce helpers', () => {
  it('calculates cart totals with modifiers, promo, delivery fee, and points', () => {
    const italianIce = MOCK_PRODUCTS.find(product => product.id === 'bolt-italian-ice');
    if (!italianIce) throw new Error('Missing imported Italian Ice product');

    const item = {
      product: italianIce,
      quantity: 2,
      customizations: [
        { modifierGroupId: 'size', optionId: 'large' },
        { modifierGroupId: 'toppings', optionId: 'fresh-mango' }
      ]
    };

    expect(calculateLineTotal(item)).toBe(1240);

    const totals = calculateCartTotals([item], 'delivery', 'KARIBU10');

    expect(totals.subtotal).toBe(1240);
    expect(totals.discount).toBe(124);
    expect(totals.deliveryFee).toBe(250);
    expect(totals.total).toBe(1366);
    expect(totals.pointsEarned).toBe(1366);
  });

  it('does not apply a fixed promo before minimum spend is met', () => {
    const strawberryKiss = MOCK_PRODUCTS.find(product => product.id === 'bolt-strawberry-kiss');
    if (!strawberryKiss) throw new Error('Missing imported Strawberry Kiss product');

    const totals = calculateCartTotals([{ product: strawberryKiss, quantity: 2 }], 'pickup', 'OFFICE500');

    expect(totals.subtotal).toBe(900);
    expect(totals.discount).toBe(0);
    expect(totals.total).toBe(900);
  });
});
