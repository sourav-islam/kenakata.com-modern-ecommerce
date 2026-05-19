# KenaKata.com — Modern E-Commerce Storefront

A production-ready e-commerce platform built with Next.js 16 App Router, featuring advanced product filtering, real-time cart management, secure checkout, and comprehensive user account functionality.

---

## 📋 Project Overview

**KenaKata.com** is a full-featured e-commerce storefront that demonstrates modern web development best practices using Next.js 16 and the App Router paradigm. The platform provides:

- **Product Catalog**: Browse, filter, and sort products by category, price, and title
- **Shopping Cart**: Real-time cart updates with persistent localStorage storage
- **User Authentication**: Secure login/register flows with token-based sessions
- **Checkout System**: Multi-step checkout with address and payment form validation
- **User Profiles**: Personalized account management and order history
- **Categories**: Curated product organization with category-specific filtering
- **Dark Mode**: Theme toggle with system preference detection
- **Responsive Design**: Mobile-first UI built with Tailwind CSS

---

## 🏗️ Architecture Explanation

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React 19, TypeScript | SSR/SSG rendering, type safety |
| **Styling** | Tailwind CSS v4, Lucide React | Utility-first CSS, icon library |
| **State** | React Context + Zustand | Global state management (cart, auth) |
| **Validation** | Zod | Runtime schema validation |
| **Forms** | React Hook Form | Efficient form state handling |
| **Theme** | next-themes | Dark/light mode toggle |
| **API** | Custom `apiClient` | Centralized HTTP requests |

### Folder Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Auth routes (login, register)
│   ├── (store)/                  # Store routes (products, categories, cart)
│   ├── checkout/                 # Checkout page
│   ├── orders/                   # Orders history page
│   ├── profile/                  # User profile page
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
│
├── components/                   # Reusable React components
│   ├── auth/                     # Login/register forms
│   ├── checkout/                 # Checkout form & UI
│   ├── common/                   # Header, footer, theme toggle
│   ├── cart/                     # Cart items, promo codes
│   ├── home/                     # Homepage sections
│   ├── orders/                   # Orders display
│   ├── product/                  # Product cards, filters, gallery
│   ├── profile/                  # Profile information display
│   └── ui/                       # Reusable UI primitives
│
├── lib/
│   ├── api/                      # API client & data fetching
│   │   ├── auth.ts               # Auth endpoints
│   │   ├── categories.ts         # Category endpoints
│   │   ├── products.ts           # Product endpoints
│   │   └── client.ts             # HTTP client wrapper
│   ├── store/                    # Global state (Context)
│   │   ├── AuthContext.tsx       # Auth provider & hook
│   │   └── CartContext.tsx       # Cart provider & hook
│   ├── utils/                    # Utility functions
│   │   └── helpers.ts            # formatPrice, getSafeImageUrl, etc.
│   └── validations/              # Zod schemas
│       └── checkout.ts           # Form validation schemas
│
├── types/                        # TypeScript interfaces
│   └── index.ts                  # Shared type definitions
│
└── middleware.ts                 # Request middleware (auth guard)
```

### Rendering Strategy

#### Page-Level Decisions

| Route | Strategy | Rationale |
|-------|----------|-----------|
| `/` (Home) | **SSG + ISR** | Static with revalidation for featured products |
| `/products` | **SSR** | Dynamic filters require server-side data |
| `/categories` | **SSG** | Rarely changes; prerendered for speed |
| `/cart` | **Client-side** | Real-time updates; localStorage-driven |
| `/checkout` | **Client-side** | Form state doesn't require server data |
| `/profile` | **SSR** | Auth-protected; requires user context |
| `/orders` | **SSR** | Personalized data; requires auth |

#### Server vs. Client Components

- **Server Components**: Data fetching pages (products, categories)
- **Client Components**: Interactive forms (checkout, cart updates, filters)
- **Hybrid**: Product pages use async server fetch + client-side interactions

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <https://github.com/sourav-islam/kenakata.com-modern-ecommerce.git>
cd kenakata.com-modern-ecommerce

# Install dependencies
npm install
# or
yarn install
pnpm install

# Set up environment variables (see below)
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
NEXT_PUBLIC_SITE_NAME=KenaKata
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Image Optimization
NEXT_IMAGE_OPTIMIZATION=true

# Analytics (optional)
NEXT_PUBLIC_GA_ID=

# Debugging
DEBUG=false
```

### Development Server

```bash
npm run dev
# or
yarn dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

---

## 🔐 Environment Variable Documentation

### Required Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | String | Backend API endpoint | `https://api.escuelajs.co/api/v1` |



### Notes

- All `NEXT_PUBLIC_*` variables are exposed to the browser; do NOT store secrets here
- Store sensitive backend URLs and API keys in `.env` (server-only)
- localStorage keys are used for persistence across page reloads

---

## 🎯 Rendering Strategy Decisions

### Why Server Components for Products & Categories?

**Chosen**: Server-side rendering with `async` components

**Rationale**:
- Database queries happen on server (reduced client JS)
- SEO benefits: content is pre-rendered in HTML
- Real-time data freshness with `revalidate` options
- Faster Time to Interactive (TTI)

### Why Client Components for Cart & Checkout?

**Chosen**: Client-side React for interactivity

**Rationale**:
- Cart updates are real-time and frequent
- User input (form fills) requires immediate feedback
- localStorage persistence is browser-only
- Separates data fetching from UI updates

### Why Hybrid for Product Detail Pages?

**Chosen**: Server fetch → Client-side interactions

**Rationale**:
- Server fetches product data (fast, no hydration lag)
- Client renders quantity selector, "Add to cart" button (interactive)
- Combines benefits: SEO + responsiveness

---

## ⚖️ Tradeoffs Made

### 1. **localStorage vs. Database**

| Approach | Pros | Cons | Choice |
|----------|------|------|--------|
| **localStorage** (chosen) | No backend calls, instant, works offline | Limited storage (5-10MB), user-specific, no sync | ✅ Cart |
| **Database** | Persistent, sync across devices | Requires auth, slower, server costs | Orders only |

**Decision**: Used localStorage for cart (fast, cheap) but designed API structure for database persistence later.

### 2. **Context API vs. Zustand**

| Approach | Pros | Cons | Choice |
|----------|------|------|--------|
| **Context** (chosen) | Built-in React, minimal setup | Re-render overhead, verbose | ✅ Auth, Cart |
| **Zustand** | Lean, fine-grained updates | Extra dependency | For future: product filters |

**Decision**: Used Context for simplicity and team familiarity, but structured for easy Zustand migration.

### 3. **Client-Side Validation vs. Server**

| Approach | Pros | Cons | Choice |
|----------|------|------|--------|
| **Client-side** (chosen) | Fast UX, instant feedback | Security risk if relied upon alone | ✅ Forms |
| **Server-side** | Secure, enforced | Slow feedback, requires round-trip | Planned for checkout |

**Decision**: Client validation for UX; should add server-side for production.

### 4. **Placeholder Images**

| Approach | Pros | Cons | Choice |
|----------|------|------|--------|
| **placehold.co** (chosen) | Stable, reliable, no auth | External dependency | ✅ Fallbacks |
| **placeimg.com** | Free, varied | Unstable, DNS failures | ❌ Removed |

**Decision**: Switched from unstable `placeimg.com` to `placehold.co` after debugging 500 errors.

---

## 🚀 Performance Considerations

### Image Optimization

- **Next.js Image Component**: Automatic format conversion, srcset generation
- **Remote Patterns**: Allowlist for trusted image hosts to prevent abuse
- **Fallback Handling**: Graceful degradation to placeholder images on 404
- **Lazy Loading**: Images load on-demand, saving bandwidth

```ts
// Example: Safe image URL handler
export function getSafeImageUrl(images: string[]): string {
  if (!images?.length) return "https://placehold.co/400x400/f1f5f9/64748b?text=No+Image";
  const url = images[0];
  // Block unstable hosts
  if (url.includes("placeimg.com")) return FALLBACK_IMAGE;
  return url;
}
```

### Bundle Size

- **Tree-shaking**: Unused imports removed by Next.js
- **Code Splitting**: Route-based chunks loaded on demand
- **No Large Dependencies**: Prefer Lucide (lightweight SVG) over Heroicons

Current bundle size (estimated):
- HTML: ~45 KB
- CSS: ~32 KB (Tailwind)
- JS: ~280 KB (React + Next.js)

### Caching Strategy

```ts
// Server-side caching for categories (24 hours)
export async function getCategories() {
  return apiClient.get<Category[]>("/categories", {
    next: { revalidate: 86400 }, // ISR: revalidate every 24h
  });
}
```

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | SSG + Image opt |
| **FID** (First Input Delay) | < 100ms | Code splitting |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Reserved image space |

---

## 🛠️ Challenges Faced

### 1. **Hook Call Violations** ❌→✅

**Problem**: `useCart()` called at module scope in `Header.tsx`, causing:
```
Error: Invalid hook call. Hooks can only be called inside of the body of a function component.
```

**Root Cause**: Hook invoked outside component body during module initialization.

**Solution**:
```tsx
// ❌ WRONG
const { cart } = useCart();
export function Header() { ... }

// ✅ CORRECT
export function Header() {
  const { cart } = useCart(); // Inside component
  ...
}
```

**Learning**: Hooks must ALWAYS be inside component function scope.

---

### 2. **NaN in Cart Summary** ❌→✅

**Problem**: Order summary showed `$NaN` for subtotal, tax, total.

**Root Cause**: Component destructured `total` from useCart() directly instead of from `cart` object.

**Solution**:
```tsx
// ❌ WRONG
const { items, total, itemCount } = useCart();

// ✅ CORRECT
const { cart, items } = useCart();
const { total, itemCount } = cart; // Derived from memoized cart
```

**Learning**: Computed values should live in state, not derived separately.

---

### 3. **Server Component + Client Event Handlers** ❌→✅

**Problem**: 
```
Error: Event handlers cannot be passed to Client Component props.
<Image ... onError={(e) => { ... }} />
```

**Root Cause**: `onError` is a client-only event handler; can't pass from server component.

**Solution**: Removed client-only handler; relied on Next.js Image fallback or static placeholder.

```tsx
// ❌ WRONG
<Image
  src={imageUrl}
  onError={(e) => { e.target.src = "..."; }} // Client handler
/>

// ✅ CORRECT
<Image
  src={imageUrl} // Already validated; no fallback needed
/>
```

**Learning**: Server components must use server-only rendering; client interactivity belongs in client components.

---

### 4. **Image 404s from Broken Hosts** ❌→✅

**Problem**: 
```
GET /_next/image?url=https%3A%2F%2Fplaceimg.com%2F640%2F480%2Ftech
TypeError: fetch failed ENOTFOUND placeimg.com
```

**Root Cause**: `placeimg.com` was unreliable (DNS failures, unstable service).

**Solution**: Added host blocklist in `cleanImageUrl()`:

```ts
const blockedHosts = new Set(["placeimg.com"]);
if (blockedHosts.has(parsed.hostname)) {
  return "https://placehold.co/400x400/..."; // Stable fallback
}
```

**Learning**: External services can fail; always have fallbacks.

---

### 5. **404 on `/categories` Route** ❌→✅

**Problem**: Clicking "Categories" in header → 404 page not found.

**Root Cause**: Route file didn't exist; `/categories` page was missing from app structure.

**Solution**: Created `src/app/(store)/categories/page.tsx` with server component fetching categories.

**Learning**: Next.js requires explicit route files; no auto-discovery like some frameworks.

---

### 6. **Metadata on "use client" Components** ❌→✅

**Problem**:
```
Error: You are attempting to export "metadata" from a component marked with "use client"
```

**Root Cause**: `metadata` is server-only; can't coexist with `use client` directive.

**Solution**: Removed `use client` from categories page; kept it as async server component.

```tsx
// ❌ WRONG
"use client";
export const metadata = { ... };

// ✅ CORRECT
// No "use client" directive
export const metadata = { ... };
```

**Learning**: Server-only features (metadata, data fetching) require server components.

---

## 🔮 Future Improvements

### Short Term (1-2 sprints)

- [ ] **Real Order Management**: Persist orders to database; fetch order history
- [ ] **Payment Integration**: Stripe/PayPal checkout flow
- [ ] **Email Notifications**: Order confirmation & shipping updates
- [ ] **Wishlist Feature**: Save favorite products
- [ ] **Product Reviews**: User ratings and comments

### Medium Term (2-4 sprints)

- [ ] **Search**: Full-text product search with Elasticsearch or Algolia
- [ ] **Recommendations**: "Customers Also Bought" engine
- [ ] **Admin Dashboard**: Inventory, sales analytics, user management
- [ ] **Performance**: CDN integration, edge caching
- [ ] **Monitoring**: Sentry for error tracking, LogRocket for UX issues

### Long Term (Q3+)

- [ ] **Mobile App**: React Native or Flutter for iOS/Android
- [ ] **Internationalization (i18n)**: Multi-language support (en, es, fr, bn)
- [ ] **Multi-Vendor**: Seller dashboard, commission tracking
- [ ] **Microservices**: Separate auth, catalog, orders services
- [ ] **GraphQL**: Replace REST API for flexible queries


---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod Validation](https://zod.dev)
- [Lucide Icons](https://lucide.dev)


**Built with ❤️ using Next.js, React, and Tailwind CSS.**
