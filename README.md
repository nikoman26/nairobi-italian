# Nairobi Italian Ice & Eats Digital Ecosystem

Revenue-first Vite/React prototype for Nairobi Italian Ice & Eats.

## Implemented Surface

- Customer storefront with home, webstore menu, custom dessert builder, cart, checkout, catering, gift cards, loyalty, account, gallery, and order tracking.
- Shared cart/pricing logic for webstore and POS, including modifiers, promo codes, delivery fees, and loyalty points.
- Admin dashboard with orders, inventory, CRM/loyalty, analytics, settings, and gallery moderation.
- Tablet-style POS with touch product grid, live cart totals, quantity controls, cash and M-Pesa actions.
- PWA shell with manifest, icon, service worker, SEO title, and theme metadata.

## Run Locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Verify

```bash
npm run typecheck
npm run build
```

## Vercel Hobby Deployment

This repo is prepared as a static Vite deployment for Vercel Hobby. Use these project settings if you configure it manually:

- Root Directory: `.`
- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: `22.x`

The deployment is intentionally static for V1, with no Vercel Functions required. Deep links such as `/webstore`, `/checkout`, `/admin`, and `/pos` are handled by the catch-all rewrite in `vercel.json`. Generated folders, local logs, stale scaffold workspaces, and environment files are excluded from Vercel CLI uploads through `.vercelignore` to stay well under Hobby upload limits.

For a CLI preview deployment after connecting your Vercel account:

```bash
npx vercel deploy
```

For production:

```bash
npx vercel deploy --prod
```

## Notes

The root Vite app is the active implementation target. The data model is branch-aware and structured around the Phase 1 plan: menu commerce, catering deposits, customer loyalty, POS/admin operations, inventory visibility, analytics, and integration readiness for M-Pesa, cards, delivery marketplaces, WhatsApp, SMS, and accounting.
