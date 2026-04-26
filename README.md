# 🏡 Veloura Rugs — Artistry Carpets & Rugs

A premium e-commerce storefront for authentic, hand-knotted Afghan rugs and carpets. Built with **vanilla HTML, CSS, and JavaScript** — no frameworks — powered by **Vite** for blazing-fast development and deployed to **GitHub Pages**.

🔗 **Live Site:** [https://farhanahmad4709-hub.github.io/Veloura-Rugs/](https://farhanahmad4709-hub.github.io/Veloura-Rugs/)

---

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog** — Browse 100+ rugs with hover image swap, quick view modal, and detailed product pages
- **Smart Filtering** — Filter by size, style, color, and price range with a responsive sidebar
- **Collection Pages** — Curated collections (All Rugs, Rug Pads, Clearance) with banner images
- **Search** — Full-screen search bar with real-time product matching and thumbnail previews
- **Shopping Cart** — Slide-out cart sidebar with quantity controls, item totals, and checkout flow
- **Wishlist** — Save favorite rugs (persisted in localStorage)

### 💰 Currency & Pricing
- **Multi-Currency Support** — PKR (base), USD, EUR, GBP, CAD, AUD
- **Live Conversion** — Prices stored in PKR, converted on-the-fly at realistic exchange rates
- **Currency Selector** — Accessible from the footer, persisted across sessions

### 👤 User Accounts
- **Registration & Login** — Client-side auth with localStorage persistence
- **30-Day Sessions** — Cookie-based session management
- **Account Dashboard** — View order history, edit address/profile
- **Order Tracking** — Simulated order status progression (Processing → Shipped → Delivered)

### 🎨 Design & UX
- **Premium Aesthetics** — Dark green & gold color palette, Cormorant Garamond + Jost typography
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile
- **Smooth Animations** — Hero zoom, fade-up reveals, hover effects, micro-interactions
- **Chat Widget** — Floating chatbot with message bubbles and auto-reply
- **Marquee Banners** — Top promotional bar and bottom trust badge marquee

### 📄 Content Pages
- **About Us** — Brand story with impact statistics
- **Contact** — Contact form with data persistence
- **FAQ** — Expandable accordion-style Q&A
- **Policies** — Shipping, Returns, Privacy Policy pages
- **Reviews** — Customer review section with star ratings, review form, and rating breakdown

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | HTML5 (semantic) |
| **Styling** | Vanilla CSS (~4,400 lines) with CSS custom properties |
| **Logic** | Vanilla JavaScript (ES Modules) |
| **Build Tool** | Vite 6.x |
| **Deployment** | GitHub Pages via `gh-pages` |
| **Fonts** | Google Fonts (Cormorant Garamond, Jost) |
| **Icons** | Font Awesome 6.4 (CDN) |
| **State** | localStorage + cookies |

---

## 📁 Project Structure

```
Veloura-Rugs/
├── index.html                 # Main HTML entry (header, footer, overlays)
├── package.json               # npm scripts & dependencies
├── vite.config.js             # Vite config (base path, dev server)
├── requirements.txt           # Project requirements & setup guide
├── .gitignore                 # Git ignore rules
│
├── public/                    # Static assets (copied as-is by Vite)
│   ├── data/
│   │   └── products.json      # Product catalog data (26KB)
│   └── images/                # Logo, poster, favicons
│       ├── logo.png           # Primary brand logo
│       ├── logo1.png          # Alternate logo
│       ├── Poster_2.png       # Hero background image
│       ├── favicon.ico        # Browser favicon
│       └── ...                # Apple/Android/MS icon variants
│
└── src/                       # Application source code
    ├── main.js                # App bootstrap, currency config, UI setup
    ├── router.js              # Hash-based SPA router
    ├── store.js               # State management (cart, wishlist, auth, orders)
    ├── utils.js               # SVG rug pattern generator
    │
    ├── pages/                 # Page renderers (each exports a render function)
    │   ├── home.js            # Homepage (hero, collections, featured products)
    │   ├── collections.js     # Collections overview grid
    │   ├── collectionDetail.js # Product listing with filters & pagination
    │   ├── productDetail.js   # Single product page with accordion
    │   ├── about.js           # About us page
    │   ├── contact.js         # Contact form
    │   ├── login.js           # Login page
    │   ├── register.js        # Registration page
    │   ├── account.js         # Account dashboard & profile editor
    │   ├── wishlist.js        # Saved items page
    │   ├── checkout.js        # Checkout flow & order confirmation
    │   ├── faq.js             # FAQ accordion
    │   └── policy.js          # Shipping, returns, privacy policies
    │
    └── styles/
        └── index.css          # Global stylesheet (design system + all pages)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/farhanahmad4709-hub/Veloura-Rugs.git

# 2. Navigate into the project
cd Veloura-Rugs

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will open at `http://localhost:3000/Veloura-Rugs/`

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Dev** | `npm run dev` | Start Vite dev server on port 3000 |
| **Build** | `npm run build` | Production build to `dist/` |
| **Preview** | `npm run preview` | Preview the production build locally |
| **Deploy** | `npm run deploy` | Build and deploy to GitHub Pages |

---

## 🏗️ Architecture

### Routing
The app uses a **hash-based SPA router** (`src/router.js`). All navigation uses `#/` prefixed URLs:

| Route | Page |
|-------|------|
| `#/` | Homepage |
| `#/collections` | Collections overview |
| `#/collection/:slug` | Collection detail (e.g., `all-rugs`, `clearance`) |
| `#/product/:slug` | Product detail page |
| `#/about` | About us |
| `#/contact` | Contact page |
| `#/login` | Login |
| `#/register` | Registration |
| `#/account` | Account dashboard |
| `#/wishlist` | Wishlist |
| `#/checkout` | Checkout |
| `#/faq` | FAQ |
| `#/policy/:type` | Policy pages (shipping, returns, privacy) |

### State Management
All state is managed in `src/store.js` using **localStorage** with the following keys:

| Key | Purpose |
|-----|---------|
| `veloura_cart` | Shopping cart items |
| `veloura_wishlist` | Saved wishlist items |
| `veloura_user` | Current logged-in user |
| `veloura_accounts` | All registered accounts |
| `veloura_orders` | Order history |
| `veloura_contacts` | Contact form submissions |
| `veloura_newsletter` | Newsletter subscriptions |
| `veloura_session` | Session cookie (30-day expiry) |

### Currency System
- **Base currency:** PKR (Pakistani Rupee)
- All product prices in `products.json` are stored in PKR
- Conversion happens client-side via `window.formatPrice(price)`
- Selected currency persisted in `localStorage` as `selectedCurrency`

| Currency | Rate (relative to PKR) |
|----------|----------------------|
| PKR | 1.0 |
| USD | 1/280 |
| EUR | 0.92/280 |
| GBP | 0.79/280 |
| CAD | 1.36/280 |
| AUD | 1.53/280 |

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--green` | `#1b3a2f` | Primary brand color, headers, buttons |
| `--green-mid` | `#2d5a44` | Hover states |
| `--gold` | `#b8933a` | Accent, badges, decorative elements |
| `--gold-lt` | `#d4af62` | Light accent, footer highlights |
| `--bg` | `#f7f2ea` | Page background |
| `--cream` | `#f0e8d6` | Section backgrounds |
| `--ink` | `#1c1409` | Primary text |
| `--muted` | `#7a6e5e` | Secondary text |

### Typography

| Font | Usage |
|------|-------|
| **Cormorant Garamond** | Display headings, brand text, prices |
| **Jost** | Body text, UI elements, navigation |

---

## 📦 Product Data

Products are loaded from `public/data/products.json` and duplicated at runtime to ~100 items for testing. Each product has:

```json
{
  "id": "unique-id",
  "name": "Afghan Kazak Hand Knotted Area Rug",
  "slug": "afghan-kazak-rug-3x5",
  "price": 3995,
  "comparePrice": 8990,
  "vendor": "Veloura Rugs",
  "size": "3x5",
  "style": "Traditional",
  "color": "Red",
  "collection": "all-rugs",
  "images": ["url1", "url2"],
  "description": "..."
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|-----------|--------|
| `> 1024px` | Desktop (full nav, 4-column grid) |
| `901–1024px` | Small desktop (condensed nav) |
| `768–900px` | Tablet (hamburger menu, 2-column grid) |
| `480–768px` | Large phone (simplified header, stacked layout) |
| `< 480px` | Small phone (single column, compact UI) |

---

## 🚢 Deployment

The site deploys to GitHub Pages using the `gh-pages` package:

```bash
npm run deploy
```

This runs `vite build` and publishes the `dist/` folder to the `gh-pages` branch. The base path is configured as `/Veloura-Rugs/` in `vite.config.js`.

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

<p align="center">
  <strong>Veloura Rugs</strong> — Artistry Carpets & Rugs 🧶
</p>
