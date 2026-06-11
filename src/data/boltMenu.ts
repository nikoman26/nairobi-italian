import type { ModifierGroup, Product, ProductCategory } from '@/src/types';

export const BOLT_FOOD_SOURCE_URL = 'https://food.bolt.eu/en/320-nairobi/p/742568-nairobi-italian-ice-eats/';

export const BOLT_MENU_IMPORTED_AT = '2026-06-12';

export const BOLT_STORE_IMAGE_URL =
  'https://images.bolt.eu/store/2026/2026-06-05/b21e72cf-32f1-486c-a94b-30aede09c763.jpeg';

export const BOLT_RESTAURANT_PROFILE = {
  name: 'Nairobi Italian Ice & Eats',
  address: 'New Muthaiga Mall Thigiri Ridge Road, 00100, Nairobi',
  phone: '+254715847882',
  cuisine: 'Wrap',
  latitude: -1.23619,
  longitude: 36.7931,
  openingHours: [
    'Mo 11:30-18:45',
    'Tu 11:30-18:45',
    'We 11:30-18:45',
    'Th 11:30-18:45',
    'Fr 11:45-18:45',
    'Sa 11:30-19:45',
    'Su 12:30-19:45'
  ]
} as const;

export const BOLT_MENU_CATEGORIES: ProductCategory[] = ['Drinks', 'Bites', 'Hot Drinks', 'Desserts', 'Combos'];

export const BOLT_MENU_MODIFIER_GROUPS: ModifierGroup[] = [
  {
    id: 'size',
    name: 'Dessert serving size',
    min: 1,
    max: 1,
    options: [
      { id: 'single', name: 'Single', price: 0 },
      { id: 'medium', name: 'Medium', price: 0 },
      { id: 'large', name: 'Large', price: 150 }
    ]
  },
  {
    id: 'toppings',
    name: 'Toppings',
    min: 0,
    max: 4,
    options: [
      { id: 'fresh-strawberry', name: 'Fresh Strawberry', price: 120 },
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
      { id: 'strawberry-sauce', name: 'Strawberry Sauce', price: 80 },
      { id: 'chocolate-sauce', name: 'Chocolate Sauce', price: 80 },
      { id: 'caramel-sauce', name: 'Caramel Sauce', price: 100 },
      { id: 'dark-chocolate', name: 'Dark Chocolate', price: 100 }
    ]
  },
  {
    id: 'gelato-flavor',
    name: 'Gelato flavor',
    min: 1,
    max: 1,
    options: [
      { id: 'vanilla-gelato', name: 'Vanilla', price: 0 },
      { id: 'pistachio-gelato', name: 'Pistachio', price: 0 },
      { id: 'chocolate-gelato', name: 'Chocolate', price: 0 },
      { id: 'specialty-gelato', name: 'Specialty flavor', price: 0 }
    ]
  },
  {
    id: 'combo-matcha-choice',
    name: 'Matcha choice',
    min: 1,
    max: 1,
    options: [
      { id: 'combo-caramel-matcha', name: 'Caramel Matcha', price: 0 },
      { id: 'combo-coconut-matcha', name: 'Coconut Matcha', price: 0 },
      { id: 'combo-vanilla-matcha', name: 'Vanilla Matcha', price: 0 },
      { id: 'combo-pina-colada-matcha', name: 'Pina Colada Matcha', price: 0 },
      { id: 'combo-strawberry-matcha', name: 'Strawberry Matcha', price: 0 },
      { id: 'combo-blush-matcha', name: 'Blush Matcha', price: 0 }
    ]
  },
  {
    id: 'combo-panini-choice',
    name: 'Panini choice',
    min: 1,
    max: 1,
    options: [
      { id: 'combo-mozzarella-pesto-panini', name: 'Mozzarella Pesto Panini', price: 0 },
      { id: 'combo-turkey-pesto-panini', name: 'Turkey Pesto Panini', price: 0 }
    ]
  },
  {
    id: 'combo-cookie-choice',
    name: 'Cookie choice',
    min: 1,
    max: 1,
    options: [
      { id: 'combo-chocolate-chip-cookie', name: 'Brown Butter Chocolate Chip Cookie', price: 0 },
      { id: 'combo-white-macadamia-cookie', name: 'White Chocolate Macadamia and Coconut Cookie', price: 0 },
      { id: 'combo-oatmeal-cookie', name: 'Brown Butter Oatmeal Cookie', price: 0 }
    ]
  },
  {
    id: 'kids-drink-choice',
    name: 'Kids drink choice',
    min: 1,
    max: 1,
    options: [
      { id: 'kids-strawberry-kiss', name: 'Strawberry Kiss', price: 0 },
      { id: 'kids-choco-dream', name: 'Choco Dream', price: 0 }
    ]
  }
];

const sourceTags = ['Bolt Food', 'Imported menu'];

export const BOLT_MENU_PRODUCTS: Product[] = [
  {
    id: 'bolt-caramel-matcha',
    branchId: 'westlands',
    name: 'Caramel Matcha',
    description: 'Caramel sauce, blended with milk and topped with smooth matcha.',
    price: 700,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/e1e07e35-053b-4123-8191-2788eb588c3b.png',
    isPopular: true,
    inStock: true,
    tags: ['Matcha', 'Milk', ...sourceTags],
    allergens: ['Milk']
  },
  {
    id: 'bolt-coconut-matcha',
    branchId: 'westlands',
    name: 'Coconut Matcha',
    description: 'Creamy coconut milk with coconut syrup, topped with matcha and coconut cold foam.',
    price: 700,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/c6400988-bcdc-42de-a5d2-3de5161fad96.png',
    isPopular: true,
    inStock: true,
    tags: ['Matcha', 'Coconut', ...sourceTags]
  },
  {
    id: 'bolt-vanilla-matcha',
    branchId: 'westlands',
    name: 'Vanilla Matcha',
    description: 'Milk with vanilla syrup, smooth matcha, topped with vanilla cold foam.',
    price: 700,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/18475bd9-ec89-46f7-b9e7-0a6c3ff4ef28.png',
    inStock: true,
    tags: ['Matcha', 'Milk', ...sourceTags],
    allergens: ['Milk']
  },
  {
    id: 'bolt-pina-colada-matcha',
    branchId: 'westlands',
    name: 'Pina Colada Matcha',
    description: 'Creamy coconut milk blended with sweet pineapple juice, topped with matcha and layer of crushed pineapple.',
    price: 700,
    category: 'Drinks',
    imageUrl: BOLT_STORE_IMAGE_URL,
    inStock: true,
    tags: ['Matcha', 'Coconut', 'Pineapple', 'No item image on Bolt page', ...sourceTags]
  },
  {
    id: 'bolt-strawberry-matcha',
    branchId: 'westlands',
    name: 'Strawberry Matcha',
    description: 'Made with our strawberry sauce on the bottom, milk and topped with matcha.',
    price: 700,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/cce6d1ed-ab68-4f89-8a45-11a4f4a3fb66.png',
    isPopular: true,
    inStock: true,
    tags: ['Matcha', 'Strawberry', 'Milk', ...sourceTags],
    allergens: ['Milk']
  },
  {
    id: 'bolt-blush-matcha',
    branchId: 'westlands',
    name: 'Blush Matcha',
    description: 'Our signature matcha base topped with our pink cold foam for a smooth, lightly sweet, and beautifully refreshing treat.',
    price: 700,
    category: 'Drinks',
    imageUrl: BOLT_STORE_IMAGE_URL,
    inStock: true,
    tags: ['Matcha', 'Cold foam', 'No item image on Bolt page', ...sourceTags]
  },
  {
    id: 'bolt-strawberry-kiss',
    branchId: 'westlands',
    name: 'Strawberry Kiss',
    description: 'Strawberry sauce, milk topped with strawberry cold foam.',
    price: 450,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/4e35be30-aced-458e-b00c-7080e2e1b398.png',
    inStock: true,
    tags: ['Strawberry', 'Milk', ...sourceTags],
    allergens: ['Milk']
  },
  {
    id: 'bolt-choco-dream',
    branchId: 'westlands',
    name: 'Choco Dream',
    description: 'Chocolate sauce, milk topped with chocolate cold foam.',
    price: 450,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/43bded28-a769-43f0-925e-b91950a691ca.png',
    inStock: true,
    tags: ['Chocolate', 'Milk', ...sourceTags],
    allergens: ['Milk']
  },
  {
    id: 'bolt-pina-colada',
    branchId: 'westlands',
    name: 'Pina Colada',
    description: 'Coconut milk, pineapple juice topped with crushed pineapple.',
    price: 450,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/28ecbb72-7f72-4092-9ce3-c531351be8dd.png',
    inStock: true,
    tags: ['Coconut', 'Pineapple', ...sourceTags]
  },
  {
    id: 'bolt-hibiscus-lemonade',
    branchId: 'westlands',
    name: 'Hibiscus Lemonade',
    description: 'A refreshing blend of tart, vibrant hibiscus tea mixed with sweet, crisp lemon juice over ice.',
    price: 350,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/8bb63754-6bec-4db8-b5ad-6acdaaf65a25.png',
    inStock: true,
    tags: ['Lemonade', 'Hibiscus', ...sourceTags]
  },
  {
    id: 'bolt-classic-lemonade',
    branchId: 'westlands',
    name: 'Classic Lemonade',
    description: 'A timeless, thirst-quenching drink made from freshly squeezed lemons, water, and just the right amount of sugar.',
    price: 350,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/60a49859-f348-451f-a893-08fc9a363f2d.png',
    inStock: true,
    tags: ['Lemonade', ...sourceTags]
  },
  {
    id: 'bolt-arnold-palmer',
    branchId: 'westlands',
    name: 'Arnold Palmer',
    description: '',
    price: 350,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/b484702a-5cf9-4269-b4dd-1448cf4663d6.png',
    inStock: true,
    tags: ['Lemonade', 'Tea', ...sourceTags]
  },
  {
    id: 'bolt-water',
    branchId: 'westlands',
    name: 'Water',
    description: '500ml.',
    price: 200,
    category: 'Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/10ef05dc-9e8a-4410-8375-796001a214b6.png',
    inStock: true,
    tags: ['500ml', ...sourceTags]
  },
  {
    id: 'bolt-nairobi-club',
    branchId: 'westlands',
    name: 'Nairobi Club',
    description: 'Shredded turkey, salami with pork, pesto, lettuce, tomato, gouda, onion, mayo and our special sub sauce.',
    price: 950,
    category: 'Bites',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/2cb614f3-e17d-48a8-a740-bf82c4409736.png',
    isPopular: true,
    inStock: true,
    tags: ['Turkey', 'Salami', 'Pesto', ...sourceTags],
    allergens: ['Milk', 'Wheat']
  },
  {
    id: 'bolt-mozzarella-pesto-panini',
    branchId: 'westlands',
    name: 'Mozzarella Pesto Panini',
    description: 'Sourdough bread, melted mozzarella cheese, basil pesto, sundried tomatoes, and fresh spinach grilled to perfection for a warm, flavorful bite.',
    price: 850,
    category: 'Bites',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/15ed9f0d-58f7-4cca-9b63-2fec0f1e44f4.png',
    inStock: true,
    tags: ['Panini', 'Vegetarian', 'Pesto', ...sourceTags],
    allergens: ['Milk', 'Wheat']
  },
  {
    id: 'bolt-turkey-pesto-panini',
    branchId: 'westlands',
    name: 'Turkey Pesto Panini',
    description: 'Fresh mozzarella, turkey, and rich basil pesto.',
    price: 900,
    category: 'Bites',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/ae8c9200-6e7c-4f47-b4ab-9260c63077e7.png',
    inStock: true,
    tags: ['Panini', 'Turkey', 'Pesto', ...sourceTags],
    allergens: ['Milk', 'Wheat']
  },
  {
    id: 'bolt-tuna-wrap',
    branchId: 'westlands',
    name: 'Tuna Wrap',
    description: 'Creamy tuna salad with a hint of lemon, crisp lettuce, juicy tomatoes, red onion, and a touch of mayo, all wrapped in a soft, toasted tortilla. Fresh, light, and packed with flavor.',
    price: 850,
    category: 'Bites',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/2f4327e8-5bcc-4e18-8b5e-3a45a096abce.png',
    inStock: true,
    tags: ['Wrap', 'Tuna', ...sourceTags],
    allergens: ['Fish', 'Wheat']
  },
  {
    id: 'bolt-african-tea',
    branchId: 'westlands',
    name: 'African Tea (Tea & Milk)',
    description: 'A rich, comforting blend of black tea leaves brewed directly in hot milk and fragrant spices.',
    price: 150,
    category: 'Hot Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/10da826d-f837-44a8-a4ea-18409c81c961.png',
    inStock: true,
    tags: ['Tea', 'Milk', ...sourceTags],
    allergens: ['Milk']
  },
  {
    id: 'bolt-hot-chocolate',
    branchId: 'westlands',
    name: 'Hot Chocolate',
    description: 'A smooth, creamy hot beverage made by melting rich chocolate into warm, velvety milk.',
    price: 150,
    category: 'Hot Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/e198bf5f-06c8-421d-9445-d7578205f4de.png',
    inStock: true,
    tags: ['Chocolate', 'Milk', ...sourceTags],
    allergens: ['Milk']
  },
  {
    id: 'bolt-matcha-latte',
    branchId: 'westlands',
    name: 'Matcha Latte',
    description: 'Vibrant, finely ground green tea powder whisked into smooth steamed milk for a balanced flavor.',
    price: 200,
    category: 'Hot Drinks',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/d3d497f4-b198-4a19-8394-05b7d9fc7faf.png',
    inStock: true,
    tags: ['Matcha', 'Milk', ...sourceTags],
    allergens: ['Milk']
  },
  {
    id: 'bolt-italian-ice',
    branchId: 'westlands',
    name: 'Italian Ice',
    description: 'Italian ice a smooth, dairy-free frozen dessert made with water, sugar, and real fruit or fruit flavorings light, refreshing, and bursting with flavor.',
    price: 350,
    category: 'Desserts',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/b69f9487-a612-44bf-9966-d66127e40f5b.png',
    isPopular: true,
    inStock: true,
    tags: ['Dairy-free', 'Frozen dessert', ...sourceTags],
    allergens: [],
    modifierGroupIds: ['size', 'toppings', 'sauces']
  },
  {
    id: 'bolt-gelato',
    branchId: 'westlands',
    name: 'Gelato',
    description: 'Creamy Italian style ice cream available in vanilla, pistachio, chocolate and specialty flavors.',
    price: 400,
    category: 'Desserts',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/8a011152-f826-4c3f-ba21-1fdea25c4350.png',
    isPopular: true,
    inStock: true,
    tags: ['Gelato', 'Flavors', ...sourceTags],
    allergens: ['Milk'],
    modifierGroupIds: ['gelato-flavor', 'size', 'toppings', 'sauces']
  },
  {
    id: 'bolt-brown-butter-chocolate-chip-cookies',
    branchId: 'westlands',
    name: 'Brown Butter Chocolate Chip Cookies',
    description: 'Rich, chewy cookies featuring deeply toasted brown butter and pools of melted semi-sweet chocolate chips.',
    price: 200,
    category: 'Desserts',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/7c2499d8-9799-406e-9b6f-eeb866d40101.png',
    inStock: true,
    tags: ['Cookie', 'Chocolate', ...sourceTags],
    allergens: ['Milk', 'Wheat']
  },
  {
    id: 'bolt-white-chocolate-macadamia-coconut-cookies',
    branchId: 'westlands',
    name: 'White Chocolate Macadamia and Coconut Cookies',
    description: 'Soft, sweet cookies packed with creamy white chocolate, crunchy macadamia nuts, and toasted coconut flakes. Picture is illustrative.',
    price: 200,
    category: 'Desserts',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/42d75d15-ef7d-417b-a3b7-15a3e46189e4.jpeg',
    inStock: true,
    tags: ['Cookie', 'Macadamia', 'Coconut', 'Picture illustrative', ...sourceTags],
    allergens: ['Milk', 'Tree nuts', 'Wheat']
  },
  {
    id: 'bolt-brown-butter-oatmeal-cookies',
    branchId: 'westlands',
    name: 'Brown Butter Oatmeal Cookies',
    description: 'Warmly spiced, hearty oatmeal cookies elevated with the rich, nutty aroma of browned butter.',
    price: 200,
    category: 'Desserts',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/06eaf39b-11b3-4fe3-a262-369f38cc7b3c.png',
    inStock: true,
    tags: ['Cookie', 'Oatmeal', ...sourceTags],
    allergens: ['Milk', 'Wheat']
  },
  {
    id: 'bolt-cinnamon-roll-traditional-jumbo',
    branchId: 'westlands',
    name: 'Cinnamon Rolls (Traditional) Jumbo',
    description: 'Soft, fresh baked jumbo rolls with rich, indulgent toppings.',
    price: 500,
    category: 'Desserts',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/a811e59c-cd09-4e99-b18e-c2ae61669be2.png',
    isPopular: true,
    inStock: true,
    tags: ['Cinnamon roll', 'Jumbo', ...sourceTags],
    allergens: ['Milk', 'Wheat']
  },
  {
    id: 'bolt-cinnamon-roll-oreo-jumbo',
    branchId: 'westlands',
    name: 'Cinnamon Rolls (Oreo) Jumbo',
    description: 'Soft, fresh baked jumbo rolls with rich, indulgent toppings.',
    price: 650,
    category: 'Desserts',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/3bbdcd87-2fa4-4817-a480-e21fe3f851a6.png',
    inStock: true,
    tags: ['Cinnamon roll', 'Oreo', 'Jumbo', ...sourceTags],
    allergens: ['Milk', 'Wheat']
  },
  {
    id: 'bolt-cinnamon-roll-biscoff-jumbo',
    branchId: 'westlands',
    name: 'Cinnamon Rolls (Biscoff) Jumbo',
    description: 'Soft, fresh baked jumbo rolls with rich, indulgent toppings.',
    price: 650,
    category: 'Desserts',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/d1eebb2f-d0c2-4d87-bacf-e1d465371642.png',
    inStock: true,
    tags: ['Cinnamon roll', 'Biscoff', 'Jumbo', ...sourceTags],
    allergens: ['Milk', 'Wheat']
  },
  {
    id: 'bolt-sweet-escape',
    branchId: 'westlands',
    name: 'Sweet Escape (Italian Ice Medium + Cinnamon Roll Traditional)',
    description: 'A sweet and satisfying duo refreshing , fruity Italian Ice paired with our warm, fresh-baked cinnamon roll. Picture is illustrative.',
    price: 750,
    category: 'Combos',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/a42d7977-ab9d-4e57-8341-d59912baaaea.jpeg',
    isPopular: true,
    inStock: true,
    tags: ['Combo', 'Picture illustrative', ...sourceTags],
    allergens: ['Milk', 'Wheat']
  },
  {
    id: 'bolt-perpect-pair',
    branchId: 'westlands',
    name: 'Perpect Pair (Large Matcha + Any Panini)',
    description: 'The ultimate matcha and savory combo for a balanced and delicious experience. Picture is illustrative.',
    price: 1400,
    category: 'Combos',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/a9b1edd7-6f6e-4748-8738-532ef6ad578e.jpeg',
    inStock: true,
    tags: ['Combo', 'Matcha', 'Panini', 'Picture illustrative', ...sourceTags],
    allergens: ['Milk', 'Wheat'],
    modifierGroupIds: ['combo-matcha-choice', 'combo-panini-choice']
  },
  {
    id: 'bolt-treat-yourself',
    branchId: 'westlands',
    name: 'Treat Yourself (Gelato Single + Cookie)',
    description: 'Indulge in a scoop of creamy gelato paired with one of our freshly baked cookies. Picture is illustrative.',
    price: 550,
    category: 'Combos',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/be500ece-e359-411a-9ae3-4c9900f7f2ba.jpeg',
    inStock: true,
    tags: ['Combo', 'Gelato', 'Cookie', 'Picture illustrative', ...sourceTags],
    allergens: ['Milk', 'Wheat'],
    modifierGroupIds: ['gelato-flavor', 'combo-cookie-choice']
  },
  {
    id: 'bolt-little-explorer-combo',
    branchId: 'westlands',
    name: 'Little Explorer Combo (Mini Grilled Cheese + Strawberry Kiss/Choco Dream) Kids Size',
    description: 'A fun and tasty combo made just for little adventurers. Picture is illustrative.',
    price: 650,
    category: 'Combos',
    imageUrl: 'https://images.bolt.eu/store/2026/2026-06-05/0f71f221-63d8-47be-8ae7-ec4415959a82.jpeg',
    inStock: true,
    tags: ['Combo', 'Kids', 'Picture illustrative', ...sourceTags],
    allergens: ['Milk', 'Wheat'],
    modifierGroupIds: ['kids-drink-choice']
  }
];
