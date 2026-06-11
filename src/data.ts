import type {
  Branch,
  CateringPackage,
  CateringRequest,
  DashboardMetric,
  InventoryItem,
  ModifierGroup,
  Order,
  Product,
  ProductCategory,
  Promotion,
  Referral,
  User,
  UserPhoto
} from './types';
import {
  BOLT_FOOD_SOURCE_URL,
  BOLT_MENU_CATEGORIES,
  BOLT_MENU_MODIFIER_GROUPS,
  BOLT_MENU_PRODUCTS,
  BOLT_RESTAURANT_PROFILE,
  BOLT_STORE_IMAGE_URL
} from './data/boltMenu';

export const BRANCHES: Branch[] = [
  {
    id: 'westlands',
    name: BOLT_RESTAURANT_PROFILE.name,
    area: 'New Muthaiga',
    address: BOLT_RESTAURANT_PROFILE.address,
    phone: BOLT_RESTAURANT_PROFILE.phone,
    openUntil: '6:45 PM weekdays, 7:45 PM weekends',
    isActive: true,
    heroImageUrl: BOLT_STORE_IMAGE_URL,
    cuisine: BOLT_RESTAURANT_PROFILE.cuisine,
    latitude: BOLT_RESTAURANT_PROFILE.latitude,
    longitude: BOLT_RESTAURANT_PROFILE.longitude,
    openingHours: [...BOLT_RESTAURANT_PROFILE.openingHours],
    sourceUrl: BOLT_FOOD_SOURCE_URL
  }
];

export const CATEGORIES: ProductCategory[] = BOLT_MENU_CATEGORIES;

export const MODIFIER_GROUPS: ModifierGroup[] = BOLT_MENU_MODIFIER_GROUPS;

export const MOCK_PRODUCTS: Product[] = BOLT_MENU_PRODUCTS;

function productById(productId: string) {
  const product = MOCK_PRODUCTS.find(item => item.id === productId);
  if (!product) {
    throw new Error(`Missing seeded product: ${productId}`);
  }
  return product;
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-karibu',
    code: 'KARIBU10',
    name: 'Karibu Welcome',
    type: 'percent',
    value: 10,
    active: true
  },
  {
    id: 'promo-office',
    code: 'OFFICE500',
    name: 'Office Treat',
    type: 'fixed',
    value: 500,
    minimumSpend: 4000,
    active: true
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'David Musau',
  email: 'davemusau00@gmail.com',
  phone: '+254 123 456 789',
  points: 1250,
  lifetimeSpend: 38400,
  tier: 'Silver',
  role: 'customer',
  referralCode: 'DAVE-NBO-24',
  referralsCount: 3,
  savedAddresses: [
    {
      id: 'addr-office',
      label: 'Office',
      line1: 'Waiyaki Way',
      area: 'Westlands',
      city: 'Nairobi',
      notes: 'Reception desk'
    },
    {
      id: 'addr-home',
      label: 'Home',
      line1: 'Muringa Road',
      area: 'Kilimani',
      city: 'Nairobi'
    }
  ]
};

export const MOCK_PHOTOS: UserPhoto[] = [
  {
    id: 'ph1',
    userId: 'u1',
    userName: 'David Musau',
    productId: 'bolt-italian-ice',
    photoUrl: productById('bolt-italian-ice').imageUrl,
    status: 'approved',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ph2',
    userId: 'u2',
    userName: 'Sarah M.',
    productId: 'bolt-caramel-matcha',
    photoUrl: productById('bolt-caramel-matcha').imageUrl,
    status: 'approved',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'ph3',
    userId: 'u3',
    userName: 'John K.',
    productId: 'bolt-sweet-escape',
    photoUrl: productById('bolt-sweet-escape').imageUrl,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

export const MOCK_REFERRALS: Referral[] = [
  {
    id: 'r1',
    referrerId: 'u1',
    referredEmail: 'friend@example.com',
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'r2',
    referrerId: 'u1',
    referredEmail: 'colleague@work.com',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-1024',
    branchId: 'westlands',
    customerName: 'Amina Otieno',
    customerEmail: 'amina@example.com',
    items: [
      { product: productById('bolt-sweet-escape'), quantity: 1 },
      { product: productById('bolt-strawberry-matcha'), quantity: 3 }
    ],
    total: 2850,
    status: 'preparing',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    fulfillment: 'delivery',
    paymentMethod: 'M-Pesa',
    channel: 'webstore',
    etaMinutes: 22
  },
  {
    id: 'ORD-1025',
    branchId: 'westlands',
    customerName: 'Jackson Lee',
    customerEmail: 'jackson@example.com',
    items: [
      { product: productById('bolt-nairobi-club'), quantity: 1 },
      { product: productById('bolt-classic-lemonade'), quantity: 2 }
    ],
    total: 1650,
    status: 'ready',
    createdAt: new Date(Date.now() - 1000 * 60 * 9).toISOString(),
    fulfillment: 'pickup',
    paymentMethod: 'Card',
    channel: 'pos',
    etaMinutes: 0
  },
  {
    id: 'ORD-1026',
    branchId: 'westlands',
    customerName: 'Wanjiku & Co.',
    customerEmail: 'office@example.com',
    items: [{ product: productById('bolt-perpect-pair'), quantity: 4 }],
    total: 5600,
    status: 'paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    fulfillment: 'corporate',
    paymentMethod: 'Corporate Credit',
    channel: 'corporate',
    etaMinutes: 35
  }
];

export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: 'birthday',
    name: 'Birthday Ice Bar',
    description: 'Assorted Italian ice, gelato cups, sauces, and toppings for private events.',
    startingPrice: 18000,
    minGuests: 25,
    idealFor: ['Birthdays', 'School events', 'Family parties']
  },
  {
    id: 'corporate',
    name: 'Corporate Dessert Drop',
    description: 'Packaged dessert cups delivered to offices with optional branded labels.',
    startingPrice: 24000,
    minGuests: 40,
    idealFor: ['Offices', 'Launches', 'Team rewards']
  },
  {
    id: 'cart',
    name: 'Celebration Cart',
    description: 'A staffed frozen dessert cart for premium events and weddings.',
    startingPrice: 55000,
    minGuests: 80,
    idealFor: ['Weddings', 'Corporate galas', 'Outdoor events']
  }
];

export const CATERING_REQUESTS: CateringRequest[] = [
  {
    id: 'CAT-204',
    packageId: 'corporate',
    contactName: 'Mumbi Holdings',
    eventType: 'Office launch',
    guestCount: 85,
    eventDate: '2026-06-28',
    estimatedTotal: 51000,
    depositDue: 20400,
    status: 'quoted'
  },
  {
    id: 'CAT-205',
    packageId: 'birthday',
    contactName: 'Njeri K.',
    eventType: 'Birthday',
    guestCount: 35,
    eventDate: '2026-07-05',
    estimatedTotal: 25200,
    depositDue: 10080,
    status: 'new'
  }
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'inv-mango-puree',
    branchId: 'westlands',
    name: 'Mango puree',
    unit: 'litres',
    onHand: 18,
    parLevel: 30,
    reorderPoint: 12,
    supplier: 'Fresh Nairobi Produce',
    expiresAt: '2026-06-18'
  },
  {
    id: 'inv-dessert-cups',
    branchId: 'westlands',
    name: '12oz dessert cups',
    unit: 'pieces',
    onHand: 780,
    parLevel: 1200,
    reorderPoint: 500,
    supplier: 'EcoPack Kenya'
  },
  {
    id: 'inv-cream',
    branchId: 'westlands',
    name: 'Dairy cream',
    unit: 'litres',
    onHand: 9,
    parLevel: 24,
    reorderPoint: 10,
    supplier: 'Highlands Dairy',
    expiresAt: '2026-06-16'
  },
  {
    id: 'inv-cones',
    branchId: 'westlands',
    name: 'Waffle cones',
    unit: 'pieces',
    onHand: 190,
    parLevel: 350,
    reorderPoint: 120,
    supplier: 'Bakers Hub'
  }
];

export const DASHBOARD_METRICS: DashboardMetric[] = [
  { label: 'Daily Revenue', value: 'KES 45,232', trend: '+20.1% from yesterday', tone: 'green' },
  { label: 'Open Orders', value: '18', trend: '6 preparing now', tone: 'orange' },
  { label: 'Rewards Customers', value: '12,234', trend: '+19 since last hour', tone: 'blue' },
  { label: 'Average Order Value', value: 'KES 1,420', trend: '+8.4% this week', tone: 'green' }
];
