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
  status: 'Ready to preview' | 'Concept preview' | 'Future investment phase';
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
    demo: 'Preview the menu, add a signature item, apply a promotion, and move into checkout.',
    href: '/menu',
    icon: ShoppingBag,
    status: 'Ready to preview'
  },
  {
    title: 'Build-your-own desserts',
    ownerValue: 'Turns a fun dessert idea into a higher-value order with toppings, sauces, and sizes.',
    demo: 'Preview how a custom treat can increase the order value through add-ons.',
    href: '/builder',
    icon: Sparkles,
    status: 'Ready to preview'
  },
  {
    title: 'Catering and deposits',
    ownerValue: 'Captures birthdays, schools, offices, weddings, and event leads in one place.',
    demo: 'Preview package selection, guest count estimates, and deposit readiness.',
    href: '/catering',
    icon: CalendarDays,
    status: 'Ready to preview'
  },
  {
    title: 'Loyalty and referrals',
    ownerValue: 'Gives regular customers a reason to come back and bring friends.',
    demo: 'Preview the rewards wallet, points, tiers, referrals, and birthday reward path.',
    href: '/loyalty',
    icon: Gift,
    status: 'Ready to preview'
  },
  {
    title: 'Owner dashboard',
    ownerValue: 'Gives leadership one place to see sales, orders, customers, and store activity.',
    demo: 'Preview dashboard, orders, inventory, CRM, and analytics as the business control room.',
    href: '/admin',
    icon: BarChart3,
    status: 'Ready to preview'
  },
  {
    title: 'Tablet POS',
    ownerValue: 'Connects walk-in sales to the same menu and pricing logic as online orders.',
    demo: 'Preview a tablet-style till with cash and M-Pesa checkout actions.',
    href: '/pos',
    icon: ReceiptText,
    status: 'Ready to preview'
  }
];

const futureShowcase: PitchFeature[] = [
  {
    title: 'Kitchen screen',
    ownerValue: 'Helps staff see what to prepare next, what is late, and what is ready.',
    demo: 'A future operations layer for order timing, preparation status, and staff coordination.',
    href: '/admin/orders',
    icon: ChefHat,
    status: 'Future investment phase'
  },
  {
    title: 'Delivery partners',
    ownerValue: 'Keeps direct orders open while still preparing for Glovo, Uber Eats, and Bolt Food.',
    demo: 'A future integration layer for delivery handoff while keeping direct orders owned.',
    href: '/checkout',
    icon: Truck,
    status: 'Future investment phase'
  },
  {
    title: 'WhatsApp and SMS marketing',
    ownerValue: 'Brings back customers with birthday treats, abandoned cart nudges, and seasonal offers.',
    demo: 'A concept preview of campaigns powered by the loyalty and customer database.',
    href: '/admin/crm',
    icon: Megaphone,
    status: 'Concept preview'
  },
  {
    title: 'Corporate accounts',
    ownerValue: 'Makes office orders, invoices, and repeat deliveries easier to sell and manage.',
    demo: 'A concept preview for office ordering, invoices, and recurring business customers.',
    href: '/catering',
    icon: UsersRound,
    status: 'Concept preview'
  },
  {
    title: 'Inventory and supplier alerts',
    ownerValue: 'Reduces stockouts by warning the team before cups, cream, cones, or toppings run low.',
    demo: 'Preview how low-stock signals can become reorder reminders.',
    href: '/admin/inventory',
    icon: PackageCheck,
    status: 'Ready to preview'
  },
  {
    title: 'AI recommendations',
    ownerValue: 'Suggests what to promote based on weather, time of day, past orders, and season.',
    demo: 'A future intelligence layer for smarter promotions and production planning.',
    href: '/admin/analytics',
    icon: Lightbulb,
    status: 'Future investment phase'
  }
];

const roadmap: RoadmapStep[] = [
  {
    phase: 'Now',
    title: 'Investment-ready preview',
    description: 'A polished first version that demonstrates direct orders, loyalty, catering, admin, and POS in one story.',
    items: ['Customer website', 'Webstore', 'Checkout flow', 'Catering leads', 'Loyalty wallet', 'Admin dashboard', 'POS preview']
  },
  {
    phase: 'Next',
    title: 'Make it run the shop',
    description: 'Connect the platform to real business tools so staff can use it every day.',
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
    question: 'Why invest in this now?',
    answer: 'Because it gives Nairobi Italian a digital foundation for direct sales, customer ownership, catering growth, and smoother operations before the business scales further.'
  },
  {
    question: 'What is a preview today?',
    answer: 'Payments, saved accounts, delivery integrations, WhatsApp campaigns, and AI features are shown as investment-ready concepts for the next production layers.'
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
    title: 'For Nairobi Italian leadership',
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
  'Connects customer buying with staff operations in one investment story.'
];

const currentState = [
  'Ready today: a polished product preview for the storefront, webstore, builder, catering, loyalty, admin, and POS.',
  'Concept preview today: saved accounts, real payments, delivery partner handoff, WhatsApp/SMS campaigns, and AI recommendations.',
  'Next to connect: real backend records, M-Pesa and card payments, staff access, webhook confirmations, and operational monitoring.'
];

const nextMilestones = [
  'Launch the hosted preview and review the investment story with Nairobi Italian leadership.',
  'Connect real checkout, order, customer, loyalty, and admin data.',
  'Add M-Pesa STK Push, card payments, and reliable payment confirmation.',
  'Move products, orders, customers, inventory, and branches into a live database.',
  'Add staff login, permissions, activity history, and operational safeguards.',
  'Pilot with one branch, measure direct orders, then expand into delivery zones, corporate accounts, and smarter analytics.'
];

const statusStyles = {
  'Ready to preview': 'border-green-500/20 bg-green-500/10 text-green-300',
  'Concept preview': 'border-blue-500/20 bg-blue-500/10 text-blue-300',
  'Future investment phase': 'border-[#FF6B35]/20 bg-[#FF6B35]/10 text-[#FF6B35]'
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
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">What this preview shows</span>
        <p className="mt-2 text-sm leading-6 text-slate-300">{feature.demo}</p>
      </div>
      <Link
        to={pitchDemoLink(feature.href)}
        className="mt-auto inline-flex items-center pt-5 text-sm font-semibold text-[#FF6B35] transition-colors hover:text-[#ff8a5d]"
      >
        Open this preview
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
              Nairobi Italian investment preview
            </Badge>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
              A digital growth platform built for Nairobi Italian Ice & Eats.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              This investment creates a direct-to-customer sales system for online orders, custom desserts,
              catering, loyalty, daily operations, and future branch growth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={pitchDemoLink('/menu')}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#FF6B35] px-5 text-sm font-bold text-black transition-colors hover:bg-[#ff8a5d]"
              >
                Preview the webstore
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to={pitchDemoLink('/admin')}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Preview the dashboard
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
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Investment message</p>
                <h2 className="text-xl font-bold text-white">Built for revenue, loyalty, and smoother operations.</h2>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                ['Direct sales first', 'Customers can order, customize, book catering, buy gifts, and return through rewards.'],
                ['Operations in one view', 'Storefront, dashboard, inventory, CRM, and POS work together as one business system.'],
                ['Clear investment path', 'The preview separates what is ready now from what should be connected next.']
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
              <h2 className="text-3xl font-bold text-white md:text-5xl">One platform creates value across the whole business.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                This proposal gives leadership a clearer sales channel, gives customers an easier way to buy, and gives staff
                better tools for handling daily demand.
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
              Ready to preview today
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">The current preview already tells a complete business story.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Nairobi Italian can see how a customer orders, how catering leads are captured, how loyalty supports repeat visits,
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
              Future investment opportunities
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Make the growth path visible without pretending everything is live today.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              These items are proposed future layers for the platform. They show where the business can invest next
              once the core webstore, operations, and customer flows are approved.
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
                Nairobi Italian would not simply be buying a website. This is the first version of an owned sales,
                customer, catering, and operations channel.
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
                Suggested walkthrough
              </Badge>
              <h2 className="text-3xl font-bold text-white md:text-5xl">A simple route through the platform preview.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                This sequence helps Nairobi Italian see the platform as one connected investment instead of separate screens.
              </p>
            </div>
            <div className="space-y-3">
              {[
                ['1', 'Start with the customer', 'Preview how a customer can browse and buy a treat directly.'],
                ['2', 'Increase the basket size', 'Preview toppings, sizes, sauces, and add-ons in the dessert builder.'],
                ['3', 'Capture bigger-ticket sales', 'Preview how events become catering quotes and deposit opportunities.'],
                ['4', 'Encourage repeat visits', 'Preview points, referrals, birthdays, and rewards.'],
                ['5', 'Review the business view', 'Preview admin, analytics, inventory, CRM, orders, then finish with POS.']
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
            <h2 className="text-3xl font-bold text-white md:text-5xl">The platform uses menu-style examples the business can recognize.</h2>
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
              <h3 className="text-2xl font-bold text-white">Business case in plain language</h3>
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
              Investment roadmap
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-5xl">From preview to daily business tool.</h2>
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
            <h2 className="text-3xl font-bold text-white md:text-5xl">Clear about what is live, previewed, and next.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              The preview is polished and useful for decision-making, while payments, saved records, and integrations
              are the next production steps after approval.
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
              <h2 className="text-3xl font-bold text-white md:text-5xl">The practical path after approval.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                These steps turn the preview into a production business system.
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
              <h2 className="mt-4 text-3xl font-bold text-white">The investment case is clear.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Nairobi Italian Ice & Eats can use this platform as the first step toward direct sales, loyalty,
                catering revenue, smoother staff operations, and future growth.
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
