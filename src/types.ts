export type ProductCategory =
  | 'Italian Ice'
  | 'Gelato'
  | 'Ice Cream'
  | 'Milkshakes'
  | 'Smoothies'
  | 'Desserts'
  | 'Pastries'
  | 'Sandwiches'
  | 'Coffee'
  | 'Cold Drinks'
  | 'Seasonal Specials';

export type FulfillmentType = 'pickup' | 'delivery' | 'scheduled' | 'corporate';
export type PaymentMethod = 'M-Pesa' | 'Card' | 'Cash' | 'Gift Card' | 'Corporate Credit';
export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'VIP';

export interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  openUntil: string;
  isActive: boolean;
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  min: number;
  max: number;
  options: ModifierOption[];
}

export interface Product {
  id: string;
  branchId: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  isPopular?: boolean;
  inStock?: boolean;
  tags?: string[];
  allergens?: string[];
  calories?: number;
  modifierGroupIds?: string[];
  recommendedWith?: string[];
}

export interface CartCustomization {
  modifierGroupId: string;
  optionId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: CartCustomization[];
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  pointsEarned: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  lifetimeSpend: number;
  tier: LoyaltyTier;
  role: 'customer' | 'admin' | 'staff';
  referralCode?: string;
  referralsCount?: number;
  savedAddresses?: Address[];
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  area: string;
  city: 'Nairobi';
  notes?: string;
}

export interface UserPhoto {
  id: string;
  userId: string;
  userName: string;
  productId?: string;
  photoUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredEmail: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface Order {
  id: string;
  branchId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  fulfillment: FulfillmentType;
  paymentMethod: PaymentMethod;
  channel: 'webstore' | 'pos' | 'catering' | 'corporate' | 'marketplace';
  etaMinutes?: number;
}

export interface Promotion {
  id: string;
  code: string;
  name: string;
  type: 'percent' | 'fixed';
  value: number;
  minimumSpend?: number;
  active: boolean;
}

export interface CateringPackage {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  minGuests: number;
  idealFor: string[];
}

export interface CateringRequest {
  id: string;
  packageId: string;
  contactName: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  estimatedTotal: number;
  depositDue: number;
  status: 'new' | 'quoted' | 'deposit-paid' | 'confirmed';
}

export interface InventoryItem {
  id: string;
  branchId: string;
  name: string;
  unit: string;
  onHand: number;
  parLevel: number;
  reorderPoint: number;
  supplier: string;
  expiresAt?: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
  tone: 'green' | 'orange' | 'blue';
}
