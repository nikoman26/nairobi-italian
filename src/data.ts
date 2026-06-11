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

export const BRANCHES: Branch[] = [
  {
    id: 'westlands',
    name: 'Nairobi Italian Ice & Eats',
    area: 'Westlands',
    address: 'Waiyaki Way, Westlands, Nairobi',
    phone: '+254 700 000 100',
    openUntil: '10:00 PM',
    isActive: true
  }
];

export const CATEGORIES: ProductCategory[] = [
  'Italian Ice',
  'Gelato',
  'Ice Cream',
  'Milkshakes',
  'Smoothies',
  'Desserts',
  'Pastries',
  'Sandwiches',
  'Coffee',
  'Cold Drinks',
  'Seasonal Specials'
];

export const MODIFIER_GROUPS: ModifierGroup[] = [
  {
    id: 'size',
    name: 'Size',
    min: 1,
    max: 1,
    options: [
      { id: 'small', name: 'Small', price: 0 },
      { id: 'regular', name: 'Regular', price: 150 },
      { id: 'large', name: 'Large', price: 300 }
    ]
  },
  {
    id: 'toppings',
    name: 'Toppings',
    min: 0,
    max: 4,
    options: [
      { id: 'fresh-mango', name: 'Fresh Mango', price: 120 },
      { id: 'cookie-crumble', name: 'Cookie Crumble', price: 100 },
      { id: 'toasted-coconut', name: 'Toasted Coconut', price: 90 },
      { id: 'chocolate-shards', name: 'Chocolate Shards', price: 140 }
    ]
  },
  {
    id: 'sauces',
    name: 'Sauces',
    min: 0,
    max: 2,
    options: [
      { id: 'salted-caramel', name: 'Salted Caramel', price: 100 },
      { id: 'berry-coulis', name: 'Berry Coulis', price: 80 },
      { id: 'dark-chocolate', name: 'Dark Chocolate', price: 100 }
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    branchId: 'westlands',
    name: 'Strawberry Mango Italian Ice',
    description: 'Refreshing dairy-free Italian ice with real strawberries and mango.',
    price: 350,
    category: 'Italian Ice',
    imageUrl: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?q=80&w=2938&auto=format&fit=crop',
    isPopular: true,
    inStock: true,
    tags: ['Dairy-free', 'Top seller'],
    allergens: [],
    calories: 180,
    modifierGroupIds: ['size', 'toppings', 'sauces'],
    recommendedWith: ['p4', 'p8']
  },
  {
    id: 'p2',
    branchId: 'westlands',
    name: 'Madagascar Vanilla Gelato',
    description: 'Rich and creamy gelato made with single-origin Madagascar vanilla beans.',
    price: 450,
    category: 'Gelato',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?q=80&w=2682&auto=format&fit=crop',
    isPopular: true,
    inStock: true,
    tags: ['Creamy', 'Premium'],
    allergens: ['Milk'],
    calories: 310,
    modifierGroupIds: ['size', 'toppings', 'sauces'],
    recommendedWith: ['p5']
  },
  {
    id: 'p3',
    branchId: 'westlands',
    name: 'Cookies & Cream Milkshake',
    description: 'Thick hand-spun milkshake layered with crushed chocolate cookies.',
    price: 500,
    category: 'Milkshakes',
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=2787&auto=format&fit=crop',
    isPopular: false,
    inStock: true,
    tags: ['Rich', 'Classic'],
    allergens: ['Milk', 'Wheat'],
    calories: 520,
    modifierGroupIds: ['sauces', 'toppings']
  },
  {
    id: 'p4',
    branchId: 'westlands',
    name: 'Double Chocolate Brownie',
    description: 'Warm fudge brownie topped with sea salt.',
    price: 300,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=2787&auto=format&fit=crop',
    isPopular: false,
    inStock: true,
    tags: ['Bakery'],
    allergens: ['Wheat', 'Milk'],
    calories: 380
  },
  {
    id: 'p5',
    branchId: 'westlands',
    name: 'Iced Caramel Macchiato',
    description: 'Fresh espresso over ice, mixed with milk and vanilla syrup, topped with caramel.',
    price: 400,
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2024&auto=format&fit=crop',
    isPopular: true,
    inStock: true,
    tags: ['Coffee', 'Cold'],
    allergens: ['Milk'],
    calories: 240,
    modifierGroupIds: ['sauces']
  },
  {
    id: 'p6',
    branchId: 'westlands',
    name: 'Office Italian Ice Box',
    description: 'Twelve assorted Italian ice cups for meetings, birthdays, and team treats.',
    price: 4200,
    category: 'Seasonal Specials',
    imageUrl: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?q=80&w=2787&auto=format&fit=crop',
    isPopular: true,
    inStock: true,
    tags: ['Corporate', 'Catering'],
    allergens: [],
    calories: 180
  },
  {
    id: 'p7',
    branchId: 'westlands',
    name: 'Tropical Green Smoothie',
    description: 'Mango, pineapple, spinach, and lime blended cold.',
    price: 480,
    category: 'Smoothies',
    imageUrl: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=2940&auto=format&fit=crop',
    isPopular: false,
    inStock: true,
    tags: ['Vegan', 'Fresh'],
    allergens: [],
    calories: 210
  },
  {
    id: 'p8',
    branchId: 'westlands',
    name: 'Butter Croissant',
    description: 'Flaky pastry baked for coffee pairings and morning pickups.',
    price: 280,
    category: 'Pastries',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2787&auto=format&fit=crop',
    isPopular: false,
    inStock: true,
    tags: ['Bakery'],
    allergens: ['Wheat', 'Milk'],
    calories: 290
  }
];

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
    productId: 'p1',
    photoUrl: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=2687&auto=format&fit=crop',
    status: 'approved',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ph2',
    userId: 'u2',
    userName: 'Sarah M.',
    productId: 'p2',
    photoUrl: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?q=80&w=2682&auto=format&fit=crop',
    status: 'approved',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'ph3',
    userId: 'u3',
    userName: 'John K.',
    photoUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=2787&auto=format&fit=crop',
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
      { product: MOCK_PRODUCTS[5], quantity: 1 },
      { product: MOCK_PRODUCTS[0], quantity: 3 }
    ],
    total: 5210,
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
      { product: MOCK_PRODUCTS[1], quantity: 4 },
      { product: MOCK_PRODUCTS[4], quantity: 2 }
    ],
    total: 2600,
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
    items: [{ product: MOCK_PRODUCTS[5], quantity: 2 }],
    total: 7900,
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
