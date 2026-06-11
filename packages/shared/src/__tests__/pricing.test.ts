import { describe, expect, it } from "vitest";
import {
  buildCartItem,
  calculateCartTotals,
  calculateCateringDeposit,
  calculateCateringEstimate,
  cateringPackages,
  resolveLoyaltyTier
} from "../index";

describe("commerce pricing", () => {
  it("calculates modifier, promotion, delivery, and loyalty totals", () => {
    const totals = calculateCartTotals({
      branchId: "branch-westlands",
      fulfillmentType: "delivery",
      deliveryZoneId: "zone-standard",
      promoCode: "KARIBU10",
      items: [buildCartItem("prod-mango-ice", 2, ["size-regular", "top-mango"])]
    });

    expect(totals.subtotal).toBe(1380);
    expect(totals.discount).toBe(138);
    expect(totals.deliveryFee).toBe(250);
    expect(totals.total).toBe(1492);
    expect(totals.loyaltyPointsEarned).toBe(1492);
  });

  it("protects fixed office discount minimum spend", () => {
    const totals = calculateCartTotals({
      branchId: "branch-westlands",
      fulfillmentType: "pickup",
      promoCode: "OFFICE500",
      items: [buildCartItem("prod-pistachio-gelato", 2)]
    });

    expect(totals.discount).toBe(0);
    expect(totals.total).toBe(1040);
  });

  it("resolves loyalty tiers from lifetime spend", () => {
    expect(resolveLoyaltyTier(1000)).toBe("Bronze");
    expect(resolveLoyaltyTier(20000)).toBe("Silver");
    expect(resolveLoyaltyTier(70000)).toBe("Gold");
    expect(resolveLoyaltyTier(140000)).toBe("Platinum");
    expect(resolveLoyaltyTier(260000)).toBe("VIP");
  });

  it("estimates catering totals and deposit due", () => {
    const estimate = calculateCateringEstimate(cateringPackages[0], 40);
    expect(estimate).toBeGreaterThanOrEqual(cateringPackages[0].startingPrice);
    expect(calculateCateringDeposit(estimate)).toBe(Math.round(estimate * 0.4));
  });
});
