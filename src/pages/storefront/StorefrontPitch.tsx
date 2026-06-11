import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  ChefHat,
  Gift,
  HandCoins,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  MonitorSmartphone,
  PackageCheck,
  ReceiptText,
  Repeat,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  UsersRound,
  WalletCards
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { pitchDemoLink } from '@/src/components/layout/PitchModeNav';
import { MOCK_PRODUCTS } from '@/src/data';
import { formatKes } from '@/src/lib/commerce';

type PitchFeature = {
  title: string;
  ownerValue: string;
  demo: string;
  href: string;
  icon: LucideIcon;
  status: 'Ready to show' | 'Mocked for the pitch' | 'Next build phase';
};

type RoadmapStep = {
  phase: string;
  title: string;
  description: string;
  items: string[];
};

type StoryCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const features: PitchFeature[] = [
  {
    title: 'Online webstore',
    ownerValue: 'Customers can browse, customize, and order without waiting for a DM reply.',
    demo: 'Show the menu, add a signature item, apply a promotion, and move into checkout.',
    href: '/menu',
    icon: ShoppingBag,
    status: 'Ready to show'
  },
  {
    title: 'Build-your-own desserts',
    ownerValue: 'Turns a fun dessert idea into a higher-value order with toppings, sauces, and sizes.',
    demo: 'Build a custom treat and explain how every add-on increases the basket.',
    href: '/builder',
    icon: Sparkles,
    status: 'Ready to show'
  },
  {
    title: 'Catering and deposits',
    ownerValue: 'Captures birthdays, schools, offices, weddings, and event leads in one place.',
    demo: 'Select a catering package, adjust guest count, and show the deposit estimate.',
    href: '/catering',
    icon: CalendarDays,
    status: 'Ready to show'
  },
  {
    title: 'Loyalty and referrals',
    ownerValue: 'Gives regular customers a reason to come back and bring friends.',
    demo: 'Show the rewards wallet, points, tiers, referrals, and future birthday rewards.',
    href: '/loyalty',
    icon: Gift,
    status: 'Ready to show'
  },
  {
    title: 'Owner dashboard',
    ownerValue: 'Gives the owner one place to see sales, orders, customers, and store activity.',
    demo: 'Open dashboard, orders, inventory, CRM, and analytics as the business control room.',
    href: '/admin',
    icon: BarChart3,
    status: 'Ready to show'
  },
  {
    title: 'Tablet POS',
    ownerValue: 'Connects walk-in sales to the same menu and pricing logic as online orders.',
    demo: 'Add items on the tablet-style till and show cash or M-Pesa checkout actions.',
    href: '/pos',
    icon: ReceiptText,
    status: 'Ready to show'
  }
];

const futureShowcase: PitchFeature[] = [
  {
    title: 'Kitchen screen',
    ownerValue: 'Helps staff see what to prepare next, what is late, and what is ready.',
    demo: 'Use the order queue screens as the starting point for this next operational layer.',
    href: '/admin/orders',
    icon: ChefHat,
    status: 'Next build phase'
  },
  {
    title: 'Delivery partners',
    ownerValue: 'Keeps direct orders open while still preparing for Glovo, Uber Eats, and Bolt Food.',
    demo: 'Explain that the current checkout is the foundation for future delivery handoff.',
    href: '/checkout',
    icon: Truck,
    status: 'Next build phase'
  },
  {
    title: 'WhatsApp and SMS marketing',
    ownerValue: 'Brings back customers with birthday treats, abandoned cart nudges, and seasonal offers.',
    demo: 'Show loyalty and CRM as the customer list these campaigns will use.',
    href: '/admin/crm',
    icon: Megaphone,
    status: 'Mocked for the pitch'
  },
  {
    title: 'Corporate accounts',
    ownerValue: 'Makes office orders, invoices, and repeat deliveries easier to sell and manage.',
    demo: 'Use catering and account pages to explain the corporate ordering direction.',
    href: '/catering',
    icon: UsersRound,
    status: 'Mocked for the pitch'
  },
  {
    title: 'Inventory and supplier alerts',
    ownerValue: 'Reduces stockouts by warning the team before cups, cream, cones, or toppings run low.',
    demo: 'Open inventory and show how low-stock signals become reorder reminders.',
    href: '/admin/inventory',
    icon: PackageCheck,
    status: 'Ready to show'
  },
  {
    title: 'AI recommendations',
    ownerValue: 'Suggests what to promote based on weather, time of day, past orders, and season.',
    demo: 'Use analytics as the place where these smarter recommendations will appear.',
    href: '/admin/analytics',
    icon: Lightbulb,
    status: 'Next build phase'
  }
];

const roadmap: RoadmapStep[] = [
  {
    phase: 'Now',
    title: 'Presentable revenue MVP',
    description: 'A polished demo that shows direct orders, loyalty, catering, admin, and POS in one story.',
    items: ['Customer website', 'Webstore', 'Checkout flow', 'Catering leads', 'Loyalty wallet', 'Admin dashboard', 'POS demo']
  },
  {
    phase: 'Next',
    title: 'Make it run the shop',
    description: 'Connect the demo to real business tools so staff can use it every day.',
    items: ['Real payments', 'Saved orders', 'Staff access', 'Inventory updates', 'Kitchen screen', 'Delivery zones']
  },
  {
    phase: 'Later',
    title: 'Grow into a smarter brand',
    description: 'Use the data from orders and customers to plan production, marketing, and expansion.',
    items: ['WhatsApp campaigns', 'Subscriptions', 'Corporate portal', 'Forecasting', 'AI recommendations', 'Franchise controls']
  }
];

const ownerQuestions = [
  {
    question: 'How does this make money?',
    answer: 'It gives customers more ways to buy directly: single orders, custom desserts, office boxes, catering deposits, gift cards, and repeat rewards.'
  },
  {
    question: 'What does the client need to understand?',
    answer: 'This is more than a website. It is the first version of a business system that can connect sales, staff, customers, inventory, and marketing.'
  },
  {
    question: 'What is mocked today?',
    answer: 'Payments, saved accounts, delivery integrations, WhatsApp campaigns, and AI features are presented as the next layers to connect after the pitch.'
  }
];

const highValueActions: StoryCard[] = [
  {
    title: 'Buy without waiting',
    description: 'Customers can browse the menu, customize treats, and place orders directly instead of starting in DMs.',
    icon: ShoppingBag
  },
  {
    title: 'Book bigger orders',
    description: 'Events, offices, schools, and weddings can move from casual interest to a quote and deposit conversation.',
    icon: CalendarDays
  },
  {
    title: 'Come back more often',
    description: 'Points, referrals, gift cards, and saved customer history help turn first visits into repeat customers.',
    icon: Repeat
  },
  {
    title: 'See the shop clearly',
    description: 'Orders, stock signals, customer activity, sales, and POS activity are presented as one connected business view.',
    icon: Store
  }
];

const audienceValue: StoryCard[] = [
  {
    title: 'For the owner',
    description: 'More owned sales, better margin control, less dependence on manual chats, and a clearer picture of daily performance.',
    icon: HandCoins
  },
  {
    title: 'For customers',
    description: 'A fast mobile experience for ordering, customizing, tracking, gifting, earning rewards, and reordering favorites.',
    icon: MonitorSmartphone
  },
  {
    title: 'For staff',
    description: 'A practical operating view for order queues, POS sales, inventory awareness, loyalty, customers, and analytics.',
    icon: UsersRound
  },
  {
    title: 'For future partners',
    description: 'A scalable story: prove one branch, then expand into delivery partners, corporate accounts, richer loyalty, and analytics.',
    icon: HeartHandshake
  }
];

const strategicDifferentiators = [
  'Built around direct sales, deposits, loyalty, and repeat purchases.',
  'The webstore is central to the experience, not an afterthought.',
  'Branch-aware from the start so the business can grow beyond one location.',
  'Grounded in Nairobi needs: KES pricing, M-Pesa readiness, catering, delivery, and office orders.',
  'Shows both customer buying and staff operations in the same pitch.'
];

const currentState = [
  'Ready today: a polished front-end product demo for the storefront, webstore, builder, catering, loyalty, admin, and POS.',
  'Mocked today: saved accounts, real payments, delivery partner handoff, WhatsApp/SMS campaigns, and AI recommendations.',
  'Next to connect: real backend records, M-Pesa and card payments, staff access, webhook confirmations, and operational monitoring.'
];

const nextMilestones = [
  'Deploy the static demo and validate the story with the Nairobi Italian owner.',
  'Connect real checkout, order, customer, loyalty, and admin data.',
  'Add M-Pesa STK Push, card payments, and reliable payment confirmation.',
  'Move products, orders, customers, inventory, and branches into a live database.',
  'Add staff login, permissions, activity history, and operational safeguards.',
  'Pilot with one branch, measure direct orders, then expand into delivery zones, corporate accounts, and smarter analytics.'
];

const statusStyles = {
  'Ready to show': 'border-green-500/20 bg-green-500/10 text-green-300',
  'Mocked for the pitch': 'border-blue-500/20 bg-blue-500/10 text-blue-300',
  'Next build phase': 'border-[#FF6B35]/20 bg-[#FF6B35]/10 text-[#FF6B35]'
};

function StatusBadge({ status }: { status: PitchFeature['status'] }) {
  return (
    <span className={`rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

function FeatureCard({ feature }: { feature: PitchFeature }) {
  const Icon = feature.icon;

  return (
    <article className="flex h-full flex-col rounded-xl border border-white/10 bg-[#161618] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#FF6B35]/20 bg-[#FF6B35]/10 text-[#FF6B35]">
          <Icon className="h-5 w-5" />
        </div>
        <StatusBadge status={feature.status} />
      </div>
      <h3 className="mt-5 text-xl font-bold text-white">{feature.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{feature.ownerValue}</p>
      <div className="mt-5 rounded-lg border border-white/10 bg-[#0A0A0B] p-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Pitch guide</span>
        <p className="mt-2 text-sm leading-6 text-slate-300">{feature.demo}</p>
      </div>
      <Link
        to={pitchDemoLink(feature.href)}
        className="mt-auto inline-flex items-center pt-5 text-sm font-semibold text-[#FF6B35] transition-colors hover:text-[#ff8a5d]"
      >
        Open demo area
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </article>
  );
}

export function StorefrontPitch() {
  const showcaseProducts = MOCK_PRODUCTS.filter(product => product.isPopular).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?q=80&w=2787&auto=format&fit=crop"
            alt="Assorted frozen desserts prepared for sharing"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/90 to-[#0A0A0B]/55" />
        </div>

        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <Badge className="mb-5 border border-[#FF6B35]/20 bg-[#FF6B35]/10 text-[#FF6B35]">
              Client pitch room
            </Badge>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
              A simple way to show Nairobi Italian what this system can do for the business.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Nairobi Italian now has the foundation for a direct-to-customer sales platform: mobile storefront,
              webstore, catering funnel, loyalty experience, owner dashboard, and POS demo in one guided story.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={pitchDemoLink('/menu')}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#FF6B35] px-5 text-sm font-bold text-black transition-colors hover:bg-[#ff8a5d]"
              >
                Start with the webstore
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to={pitchDemoLink('/admin')}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Show owner dashboard
                <BarChart3 className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="rounded-xl border border-white/10 bg-[#161618]/90 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#FF6B35] text-black">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Presentation promise</p>
                <h2 className="text-xl font-bold text-white">Speak like an owner, not a developer.</h2>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                ['Lead with revenue', 'Show how customers buy, book, return, and refer.'],
                ['Show the system', 'Move from storefront to admin to POS so the owner sees the full operation.'],
                ['Be honest', 'Label what works today and what gets connected in the next build.']
              ].map(([title, copy]) => (
                <div key={title} className="rounded-lg border border-white/10 bg-[#0A0A0B] p-4">
                  <strong className="text-white">{title}</strong>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{copy}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <nav className="sticky top-16 z-40 border-b border-white/10 bg-[#0A0A0B]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {[
            ['Story', '#story'],
            ['Value', '#value'],
            ['Webstore', '/menu'],
            ['Builder', '/builder'],
            ['Catering', '/catering'],
            ['Loyalty', '/loyalty'],
            ['Admin', '/admin'],
            ['POS', '/pos']
          ].map(([label, href]) => {
            const className = "inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white transition-colors hover:bg-white/10";

            return href.startsWith('#') ? (
              <a key={href} href={href} className={className}>
                {label}
              </a>
            ) : (
              <Link key={href} to={pitchDemoLink(href)} className={className}>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      <section id="story" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge className="mb-4 border border-[#FF6B35]/20 bg-[#FF6B35]/10 text-[#FF6B35]">
              Why this matters
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Own the customer relationship, not just the counter sale.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Food and dessert brands lose margin, customer data, and repeat orders when sales live only in walk-ins,
              social DMs, or third-party apps. This platform gives Nairobi Italian a direct channel for everyday orders,
              catering leads, loyalty, and staff operations.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {highValueActions.map(item => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-xl border border-white/10 bg-[#161618] p-5">
                  <Icon className="h-6 w-6 text-[#FF6B35]" />
                  <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="value" className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            [HandCoins, 'Direct sales', 'Online ordering, custom desserts, and giftable offers keep sales closer to the brand.'],
            [Repeat, 'Repeat customers', 'Loyalty, referrals, accounts, and order history give people a reason to come back.'],
            [Store, 'Daily operations', 'POS, order queue, inventory signals, and staff dashboards support the shop floor.'],
            [MonitorSmartphone, 'Growth-ready', 'PWA, branch-aware data, and integration points prepare the business for expansion.']
          ].map(([Icon, title, copy]) => {
            const ValueIcon = Icon as LucideIcon;
            return (
              <article key={String(title)} className="rounded-xl border border-white/10 bg-[#161618] p-5">
                <ValueIcon className="h-6 w-6 text-[#FF6B35]" />
                <h2 className="mt-4 text-lg font-bold text-white">{String(title)}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{String(copy)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#161618] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Badge className="mb-4 border border-white/10 bg-white/5 text-slate-300">
                Value proposition
              </Badge>
              <h2 className="text-3xl font-bold text-white md:text-5xl">Different people see different value in the same system.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                The pitch should make the owner feel the business benefit first, then show how customers, staff, and future partners
                all fit into the same growth story.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {audienceValue.map(item => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="rounded-xl border border-white/10 bg-[#0A0A0B] p-5">
                    <Icon className="h-6 w-6 text-[#FF6B35]" />
                    <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0A0A0B] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 border border-green-500/20 bg-green-500/10 text-green-300">
              What is ready to demonstrate
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">The current demo already tells a complete business story.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              The client can see how a customer orders, how catering leads are captured, how loyalty supports repeat visits,
              and how staff can manage the work behind the scenes.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map(feature => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Badge className="mb-4 border border-blue-500/20 bg-blue-500/10 text-blue-300">
              Future feature showroom
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Make the future visible without pretending it is all live today.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              These items come from the development brief and are presented as clear next steps: useful for the pitch,
              honest for the client, and practical for the next build.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {futureShowcase.map(feature => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#161618] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge className="mb-4 border border-[#FF6B35]/20 bg-[#FF6B35]/10 text-[#FF6B35]">
                Why this stands out
              </Badge>
              <h2 className="text-3xl font-bold text-white md:text-5xl">This is built around revenue, not just pages.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                The strongest client message from the written pitch is that Nairobi Italian is not only getting a website.
                It is getting the first version of an owned sales and operations channel.
              </p>
            </div>
            <div className="grid gap-3">
              {strategicDifferentiators.map((item, index) => (
                <div key={item} className="grid gap-4 rounded-xl border border-white/10 bg-[#0A0A0B] p-4 sm:grid-cols-[44px_1fr]">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-white/5 font-bold text-[#FF6B35]">
                    {index + 1}
                  </div>
                  <p className="self-center text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0A0A0B] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge className="mb-4 border border-[#FF6B35]/20 bg-[#FF6B35]/10 text-[#FF6B35]">
                Suggested pitch flow
              </Badge>
              <h2 className="text-3xl font-bold text-white md:text-5xl">A simple route through the demo.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                Use this order when presenting so the client sees a connected business system instead of separate screens.
              </p>
            </div>
            <div className="space-y-3">
              {[
                ['1', 'Start with the customer', 'Open the webstore and show a normal customer buying a treat.'],
                ['2', 'Raise the order value', 'Move to the builder and explain toppings, sizes, sauces, and add-ons.'],
                ['3', 'Show bigger-ticket sales', 'Open catering and show how events become quotes and deposits.'],
                ['4', 'Show repeat business', 'Open loyalty and explain points, referrals, birthdays, and rewards.'],
                ['5', 'Show the owner view', 'Open admin, analytics, inventory, CRM, orders, then finish with POS.']
              ].map(([number, title, copy]) => (
                <div key={number} className="grid gap-4 rounded-xl border border-white/10 bg-[#0A0A0B] p-4 sm:grid-cols-[44px_1fr]">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#FF6B35] font-bold text-black">{number}</div>
                  <div>
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <Badge className="mb-4 border border-white/10 bg-white/5 text-slate-300">
              Product proof
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">The pitch uses real menu-style examples, not empty boxes.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {showcaseProducts.map(product => (
                <article key={product.id} className="overflow-hidden rounded-xl border border-white/10 bg-[#161618]">
                  <img src={product.imageUrl} alt={product.name} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF6B35]">{product.category}</span>
                    <h3 className="mt-2 font-bold text-white">{product.name}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{product.description}</p>
                    <strong className="mt-3 block font-mono text-white">{formatKes(product.price)}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="h-fit rounded-xl border border-white/10 bg-[#161618] p-5">
            <div className="flex items-center gap-3">
              <WalletCards className="h-7 w-7 text-[#FF6B35]" />
              <h3 className="text-2xl font-bold text-white">Owner translation</h3>
            </div>
            <div className="mt-5 space-y-4">
              {ownerQuestions.map(item => (
                <div key={item.question} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <h4 className="font-bold text-white">{item.question}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#161618] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 border border-white/10 bg-white/5 text-slate-300">
              Roadmap in owner language
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">From demo to daily business tool.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {roadmap.map(step => (
              <article key={step.phase} className="rounded-xl border border-white/10 bg-[#0A0A0B] p-5">
                <span className="rounded-md bg-[#FF6B35] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                  {step.phase}
                </span>
                <h3 className="mt-5 text-2xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {step.items.map(item => (
                    <span key={item} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0A0A0B] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge className="mb-4 border border-blue-500/20 bg-blue-500/10 text-blue-300">
              Honest current state
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Clear about what is live, mocked, and next.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              This section translates the technical truth into client-safe language. The demo is polished and useful for
              decision-making, while payments, saved records, and integrations are the next production steps.
            </p>
          </div>
          <div className="grid gap-4">
            {currentState.map(item => (
              <div key={item} className="flex gap-4 rounded-xl border border-white/10 bg-[#161618] p-5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B35]" />
                <p className="text-sm leading-6 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#161618] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge className="mb-4 border border-green-500/20 bg-green-500/10 text-green-300">
                Next milestones
              </Badge>
              <h2 className="text-3xl font-bold text-white md:text-5xl">The practical path after the pitch.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                These are the next steps from the written pitch, phrased as business progress rather than engineering chores.
              </p>
            </div>
            <div className="grid gap-3">
              {nextMilestones.map((item, index) => (
                <div key={item} className="grid gap-4 rounded-xl border border-white/10 bg-[#0A0A0B] p-4 sm:grid-cols-[44px_1fr]">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#FF6B35] font-bold text-black">
                    {index + 1}
                  </div>
                  <p className="self-center text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#FF6B35]/20 bg-[#FF6B35]/10 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <BadgeCheck className="h-8 w-8 text-[#FF6B35]" />
              <h2 className="mt-4 text-3xl font-bold text-white">Close the pitch with confidence.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                The clearest message: this is not just a pretty website. It is the first step toward a direct sales,
                loyalty, catering, staff, and growth platform for Nairobi Italian Ice & Eats.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#FF6B35] px-5 text-sm font-bold text-black transition-colors hover:bg-[#ff8a5d]"
            >
              Return to storefront
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
