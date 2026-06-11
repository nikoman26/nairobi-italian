export type CurrencyCode = "KES";

export type OrderChannel =
  | "webstore"
  | "pos"
  | "catering"
  | "corporate"
  | "marketplace";

export type FulfillmentType = "pickup" | "delivery" | "scheduled" | "corporate";

export type PaymentProvider = "mpesa" | "card" | "cash" | "gift_card" | "corporate_credit";

export type PaymentStatus = "pending" | "authorized" | "paid" | "failed" | "refunded";

export type OrderStatus =
  | "draft"
  | "placed"
  | "paid"
  | "accepted"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "completed"
  | "cancelled";

export type LoyaltyTier = "Bronze" | "Silver" | "Gold" | "Platinum" | "VIP";

export interface Branch {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  timezone: "Africa/Nairobi";
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  calories?: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  minSelections: number;
  maxSelections: number;
  options: ModifierOption[];
}

export interface NutritionInfo {
  calories: number;
  sugarGrams: number;
  dairyFree: boolean;
  vegan: boolean;
}

export interface Product {
  id: string;
  branchIds: string[];
  categoryId: string;
  modifierGroupIds: string[];
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  allergens: string[];
  nutrition: NutritionInfo;
  isAvailable: boolean;
  isFeatured: boolean;
}

export interface CartModifierSelection {
  groupId: string;
  optionId: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  modifiers: CartModifierSelection[];
}

export interface Cart {
  branchId: string;
  fulfillmentType: FulfillmentType;
  items: CartItem[];
  promoCode?: string;
  deliveryZoneId?: string;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  loyaltyPointsEarned: number;
}

export interface Address {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  line1: string;
  area: string;
  city: "Nairobi";
  notes?: string;
}

export interface Customer {
  id: string;
  branchId: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  createdAt: string;
}

export interface LoyaltyAccount {
  id: string;
  customerId: string;
  points: number;
  lifetimeSpend: number;
  tier: LoyaltyTier;
  birthdayRewardAvailable: boolean;
}

export interface Promotion {
  id: string;
  code: string;
  name: string;
  description: string;
  type: "percent" | "fixed";
  value: number;
  isActive: boolean;
}

export interface GiftCard {
  id: string;
  code: string;
  balance: number;
  purchaserEmail: string;
  recipientEmail: string;
  expiresAt?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  branchId: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  amount: number;
  reference: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  modifiers: CartModifierSelection[];
  lineTotal: number;
}

export interface Order {
  id: string;
  branchId: string;
  customerId?: string;
  channel: OrderChannel;
  fulfillmentType: FulfillmentType;
  status: OrderStatus;
  items: OrderItem[];
  totals: CartTotals;
  paymentStatus: PaymentStatus;
  scheduledFor?: string;
  deliveryAddress?: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CateringPackage {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  minGuests: number;
  recommendedFor: string[];
}

export interface CateringRequest {
  id: string;
  branchId: string;
  packageId: string;
  contactName: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  location: string;
  notes?: string;
  estimatedTotal: number;
  depositDue: number;
  status: "new" | "quoted" | "deposit_paid" | "confirmed" | "completed";
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  branchId: string;
  name: string;
  unit: string;
  onHand: number;
  parLevel: number;
  reorderPoint: number;
  supplierName: string;
  expiresAt?: string;
}

export interface StaffUser {
  id: string;
  branchId: string;
  name: string;
  email: string;
  role: "owner" | "manager" | "cashier" | "kitchen" | "driver";
  pinEnabled: boolean;
}

export interface DashboardMetrics {
  branchId: string;
  dailyRevenue: number;
  monthlyRevenue: number;
  averageOrderValue: number;
  repeatCustomerRate: number;
  inventoryAlerts: number;
  openOrders: number;
}
