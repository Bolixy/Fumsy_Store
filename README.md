# Funmsy Store

A React storefront for Funmsy Store: splash screen, home/shop/product/about
pages, a WhatsApp checkout, and an admin dashboard for prices, stock,
orders and visit stats — backed by Supabase.

## What's included

- **Splash screen** — brand loader shown on first open (like Jumia/Opay).
- **Home, Shop, Product detail, About, Checkout** — separate routed pages,
  each built from its own component files (`src/pages/...`).
- **Cart** — slide-out drawer, persisted in the browser.
- **WhatsApp checkout** — order is saved to the database, then WhatsApp
  opens with the order pre-filled, addressed to **+234 816 964 4795**.
- **Admin dashboard** (`/admin`) — sign in to:
  - Edit product prices and toggle stock
  - View total site visits and visits by page
  - View and manage customer orders (pending / confirmed / fulfilled / cancelled)

## 1. Install and run locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
cd funmsy-store
npm install
npm run dev
```

The site opens at `http://localhost:5173`. It will work right away using
placeholder prices — but the admin dashboard, order saving, and visit
tracking need Supabase connected (next step).

## 2. Connect Supabase (free)

Supabase gives you a free hosted database + login system, so your
prices, orders and visit stats are real and permanent — not just stored
in one browser.

1. Go to [supabase.com](https://supabase.com) and create a free account
   and a new project.
2. In your project, open **SQL Editor**, paste in the contents of
   [`supabase/schema.sql`](./supabase/schema.sql), and run it. This creates
   the `products`, `orders` and `visits` tables with the right permissions,
   and seeds starting prices.
3. Open **Project Settings > API**. Copy your **Project URL** and
   **anon public key**.
4. In the project folder, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   and paste your URL and key in.
5. Restart `npm run dev`.

## 3. Create your admin login

The admin dashboard uses Supabase's own login system, so there's no
password stored in the code.

1. In Supabase, go to **Authentication > Users > Add user**.
2. Enter the email and password you want to use to log into `/admin`.
3. Go to `/admin` on your site and sign in with that email and password.

You can add more admin users the same way later.

## 4. Change the WhatsApp number

The number is set in one place: `src/lib/whatsapp.js`

```js
export const STORE_WHATSAPP_NUMBER = "2348169644795";
```

Use the full international format with no leading zero and no `+`.

## 5. Edit products

Product names, photos, descriptions and sizes live in
`src/lib/products-seed.js` — edit that file and add images to
`src/assets/products/` to add or change items. **Prices and stock**, on
the other hand, are meant to be changed live from `/admin` without
touching code.

## 6. Deploy

This is a standard Vite + React app, so it deploys to any static host:

- **Vercel / Netlify** — connect your GitHub repo, set the build command
  to `npm run build`, output directory `dist`, and add your
  `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` as environment variables
  in the host's dashboard.
- Or build locally and upload the `dist` folder:
  ```bash
  npm run build
  ```

## Project structure

```
src/
  App.jsx                 # routes + layout
  main.jsx                # entry point
  index.css               # design tokens (colors, type, buttons)
  lib/
    supabaseClient.js      # Supabase connection
    api.js                 # products/orders/visits data functions
    products-seed.js       # product catalog (name, image, description)
    productImages.js       # auto-imports product photos
    whatsapp.js             # WhatsApp link + WhatsApp number
  context/
    CartContext.jsx        # shopping bag state
    AuthContext.jsx        # admin login state
    VisitTracker.jsx        # logs a page view on route change
  components/
    LoadingScreen/          # splash screen
    Navbar/, Footer/, Logo/
    ProductCard/, CartDrawer/
  pages/
    Home/, Products/, ProductDetail/, About/, Checkout/
    Admin/
      AdminLogin.jsx
      AdminDashboard.jsx    # tabbed shell
      AdminStats.jsx        # visits + revenue overview
      AdminProducts.jsx     # price & stock editor
      AdminOrders.jsx       # order list + status updates
supabase/
  schema.sql               # run once in Supabase's SQL editor
```
