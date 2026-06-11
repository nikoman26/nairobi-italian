import { describe, expect, it } from 'vitest';
import {
  BOLT_FOOD_SOURCE_URL,
  BOLT_MENU_CATEGORIES,
  BOLT_MENU_PRODUCTS,
  BOLT_RESTAURANT_PROFILE
} from './boltMenu';

describe('Bolt menu seed', () => {
  it('keeps the imported menu grouped with image links', () => {
    expect(BOLT_FOOD_SOURCE_URL).toContain('food.bolt.eu');
    expect(BOLT_RESTAURANT_PROFILE.address).toContain('New Muthaiga Mall');
    expect(BOLT_MENU_CATEGORIES).toEqual(['Drinks', 'Bites', 'Hot Drinks', 'Desserts', 'Combos']);
    expect(BOLT_MENU_PRODUCTS).toHaveLength(32);
    expect(BOLT_MENU_PRODUCTS.every(product => product.imageUrl.startsWith('https://images.bolt.eu/'))).toBe(true);
  });

  it('seeds choice groups for menu items that imply variations', () => {
    const gelato = BOLT_MENU_PRODUCTS.find(product => product.id === 'bolt-gelato');
    const perfectPair = BOLT_MENU_PRODUCTS.find(product => product.id === 'bolt-perpect-pair');
    const kidsCombo = BOLT_MENU_PRODUCTS.find(product => product.id === 'bolt-little-explorer-combo');

    expect(gelato?.modifierGroupIds).toContain('gelato-flavor');
    expect(perfectPair?.modifierGroupIds).toEqual(['combo-matcha-choice', 'combo-panini-choice']);
    expect(kidsCombo?.modifierGroupIds).toEqual(['kids-drink-choice']);
  });
});
