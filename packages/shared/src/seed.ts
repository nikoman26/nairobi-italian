import type {
  Branch,
  CateringPackage,
  Category,
  Customer,
  InventoryItem,
  LoyaltyAccount,
  ModifierGroup,
  Order,
  Product,
  Promotion,
  StaffUser
} from "./types";

export const branches: Branch[] = [
  {
    id: "branch-westlands",
    name: "Nairobi Italian Ice & Eats - Westlands",
    slug: "westlands",
    address: "Westlands, Nairobi",
    phone: "+254 700 000 100",
    timezone: "Africa/Nairobi",
    isActive: true
  }
];

export const categories: Category[] = [
  {
    id: "cat-italian-ice",
    name: "Italian Ice",
    slug: "italian-ice",
    description: "Bright, dairy-free frozen desserts served smooth and refreshing.",
    displayOrder: 1
  },
  {
    id: "cat-gelato",
    name: "Gelato",
    slug: "gelato",
    description: "Dense, creamy scoops with classic and Nairobi-inspired flavours.",
    displayOrder: 2
  },
  {
    id: "cat-shakes",
    name: "Milkshakes & Smoothies",
    slug: "shakes-smoothies",
    description: "Blended drinks for dessert runs, office treats, and hot afternoons.",
    displayOrder: 3
  },
  {
    id: "cat-eats",
    name: "Eats & Pastries",
    slug: "eats-pastries",
    description: "Sandwiches, pastries, coffee, and quick bites.",
    displayOrder: 4
  }
];

export const modifierGroups: ModifierGroup[] = [
  {
    id: "mod-size",
    name: "Size",
    minSelections: 1,
    maxSelections: 1,
    options: [
      { id: "size-small", name: "Small", price: 0, calories: 0 },
      { id: "size-regular", name: "Regular", price: 150, calories: 80 },
      { id: "size-large", name: "Large", price: 300, calories: 160 }
    ]
  },
  {
    id: "mod-toppings",
    name: "Toppings",
    minSelections: 0,
    maxSelections: 4,
    options: [
      { id: "top-mango", name: "Fresh Mango", price: 120, calories: 45 },
      { id: "top-cookie", name: "Cookie Crumble", price: 100, calories: 90 },
      { id: "top-coconut", name: "Toasted Coconut", price: 90, calories: 70 },
      { id: "top-chocolate", name: "Chocolate Shards", price: 140, calories: 110 }
    ]
  },
  {
    id: "mod-sauces",
    name: "Sauces",
    minSelections: 0,
    maxSelections: 2,
    options: [
      { id: "sauce-caramel", name: "Salted Caramel", price: 100, calories: 95 },
      { id: "sauce-berry", name: "Berry Coulis", price: 80, calories: 40 },
      { id: "sauce-chocolate", name: "Dark Chocolate", price: 100, calories: 105 }
    ]
  }
];

export const products: Product[] = [
  {
    id: "prod-mango-ice",
    branchIds: ["branch-westlands"],
    categoryId: "cat-italian-ice",
    modifierGroupIds: ["mod-size", "mod-toppings"],
    slug: "mango-passion-italian-ice",
    name: "Mango Passion Italian Ice",
    description: "Dairy-free mango and passion fruit ice with a clean tropical finish.",
    price: 420,
    imageUrl: "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=1000&q=80",
    tags: ["Dairy-free", "Top seller"],
    allergens: [],
    nutrition: { calories: 180, sugarGrams: 32, dairyFree: true, vegan: true },
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "prod-strawberry-ice",
    branchIds: ["branch-westlands"],
    categoryId: "cat-italian-ice",
    modifierGroupIds: ["mod-size", "mod-toppings", "mod-sauces"],
    slug: "strawberry-lime-ice",
    name: "Strawberry Lime Ice",
    description: "Strawberry, lime, and a touch of mint for a bright afternoon cooler.",
    price: 390,
    imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1000&q=80",
    tags: ["Seasonal", "Refreshing"],
    allergens: [],
    nutrition: { calories: 165, sugarGrams: 29, dairyFree: true, vegan: true },
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "prod-pistachio-gelato",
    branchIds: ["branch-westlands"],
    categoryId: "cat-gelato",
    modifierGroupIds: ["mod-size", "mod-toppings", "mod-sauces"],
    slug: "pistachio-gelato",
    name: "Pistachio Gelato",
    description: "Creamy pistachio gelato with roasted nut depth and a silky finish.",
    price: 520,
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=80",
    tags: ["Premium", "Creamy"],
    allergens: ["Milk", "Tree nuts"],
    nutrition: { calories: 310, sugarGrams: 24, dairyFree: false, vegan: false },
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "prod-vanilla-shake",
    branchIds: ["branch-westlands"],
    categoryId: "cat-shakes",
    modifierGroupIds: ["mod-sauces", "mod-toppings"],
    slug: "madagascar-vanilla-shake",
    name: "Madagascar Vanilla Shake",
    description: "Thick vanilla shake blended with gelato and finished with whipped cream.",
    price: 650,
    imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80",
    tags: ["Classic", "Rich"],
    allergens: ["Milk"],
    nutrition: { calories: 520, sugarGrams: 58, dairyFree: false, vegan: false },
    isAvailable: true,
    isFeatured: false
  },
  {
    id: "prod-croissant",
    branchIds: ["branch-westlands"],
    categoryId: "cat-eats",
    modifierGroupIds: [],
    slug: "butter-croissant",
    name: "Butter Croissant",
    description: "Flaky pastry baked for coffee pairings and breakfast runs.",
    price: 280,
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80",
    tags: ["Bakery"],
    allergens: ["Wheat", "Milk"],
    nutrition: { calories: 290, sugarGrams: 6, dairyFree: false, vegan: false },
    isAvailable: true,
    isFeatured: false
  },
  {
    id: "prod-office-box",
    branchIds: ["branch-westlands"],
    categoryId: "cat-italian-ice",
    modifierGroupIds: [],
    slug: "office-italian-ice-box",
    name: "Office Italian Ice Box",
    description: "A 12-cup assorted Italian ice box for meetings, birthdays, and teams.",
    price: 4200,
    imageUrl: "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=1000&q=80",
    tags: ["Catering", "Corporate"],
    allergens: [],
    nutrition: { calories: 180, sugarGrams: 32, dairyFree: true, vegan: true },
    isAvailable: true,
    isFeatured: true
  }
];

export const promotions: Promotion[] = [
  {
    id: "promo-karibu",
    code: "KARIBU10",
    name: "Karibu Welcome",
    description: "10% off a first webstore order.",
    type: "percent",
    value: 10,
    isActive: true
  },
  {
    id: "promo-office",
    code: "OFFICE500",
    name: "Office Treat",
    description: "KES 500 off orders above KES 4,000.",
    type: "fixed",
    value: 500,
    isActive: true
  }
];

export const cateringPackages: CateringPackage[] = [
  {
    id: "catpack-birthday",
    name: "Birthday Ice Bar",
    description: "Assorted Italian ice, gelato cups, sauces, and toppings for private events.",
    startingPrice: 18000,
    minGuests: 25,
    recommendedFor: ["Birthdays", "School events", "Family parties"]
  },
  {
    id: "catpack-corporate",
    name: "Corporate Dessert Drop",
    description: "Packaged dessert cups delivered to offices with optional branded labels.",
    startingPrice: 24000,
    minGuests: 40,
    recommendedFor: ["Offices", "Launches", "Team rewards"]
  },
  {
    id: "catpack-wedding",
    name: "Celebration Cart",
    description: "A staffed frozen dessert cart for premium events and weddings.",
    startingPrice: 55000,
    minGuests: 80,
    recommendedFor: ["Weddings", "Corporate galas", "Outdoor events"]
  }
];

export const customers: Customer[] = [
  {
    id: "cust-amina",
    branchId: "branch-westlands",
    name: "Amina Otieno",
    email: "amina@example.com",
    phone: "+254 711 000 111",
    createdAt: "2026-06-01T08:00:00.000Z",
    addresses: [
      {
        id: "addr-amina-office",
        label: "Office",
        recipientName: "Amina Otieno",
        phone: "+254 711 000 111",
        line1: "Waiyaki Way",
        area: "Westlands",
        city: "Nairobi",
        notes: "Reception desk"
      }
    ]
  }
];

export const loyaltyAccounts: LoyaltyAccount[] = [
  {
    id: "loyalty-amina",
    customerId: "cust-amina",
    points: 3840,
    lifetimeSpend: 38400,
    tier: "Gold",
    birthdayRewardAvailable: true
  }
];

export const inventoryItems: InventoryItem[] = [
  {
    id: "inv-mango-puree",
    branchId: "branch-westlands",
    name: "Mango puree",
    unit: "litres",
    onHand: 18,
    parLevel: 30,
    reorderPoint: 12,
    supplierName: "Fresh Nairobi Produce",
    expiresAt: "2026-06-18"
  },
  {
    id: "inv-cups",
    branchId: "branch-westlands",
    name: "12oz dessert cups",
    unit: "pieces",
    onHand: 780,
    parLevel: 1200,
    reorderPoint: 500,
    supplierName: "EcoPack Kenya"
  },
  {
    id: "inv-cream",
    branchId: "branch-westlands",
    name: "Dairy cream",
    unit: "litres",
    onHand: 9,
    parLevel: 24,
    reorderPoint: 10,
    supplierName: "Highlands Dairy",
    expiresAt: "2026-06-16"
  }
];

export const staffUsers: StaffUser[] = [
  {
    id: "staff-manager",
    branchId: "branch-westlands",
    name: "Nia Kamau",
    email: "nia@nairobiice.local",
    role: "manager",
    pinEnabled: true
  },
  {
    id: "staff-cashier",
    branchId: "branch-westlands",
    name: "Brian Mwangi",
    email: "brian@nairobiice.local",
    role: "cashier",
    pinEnabled: true
  }
];

export const sampleOrders: Order[] = [
  {
    id: "ord-1001",
    branchId: "branch-westlands",
    customerId: "cust-amina",
    channel: "webstore",
    fulfillmentType: "delivery",
    status: "preparing",
    paymentStatus: "paid",
    createdAt: "2026-06-11T08:35:00.000Z",
    updatedAt: "2026-06-11T08:44:00.000Z",
    totals: {
      subtotal: 5460,
      discount: 500,
      deliveryFee: 250,
      tax: 0,
      total: 5210,
      loyaltyPointsEarned: 5210
    },
    items: [
      {
        id: "line-1001-1",
        productId: "prod-office-box",
        productName: "Office Italian Ice Box",
        quantity: 1,
        unitPrice: 4200,
        modifiers: [],
        lineTotal: 4200
      },
      {
        id: "line-1001-2",
        productId: "prod-mango-ice",
        productName: "Mango Passion Italian Ice",
        quantity: 3,
        unitPrice: 420,
        modifiers: [],
        lineTotal: 1260
      }
    ],
    notes: "Deliver before 11:00 AM."
  }
];
