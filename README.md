<div align="center">

<br/>

<img src="https://angular.io/assets/images/logos/angular/angular.svg" width="72" alt="Angular" />

<br/><br/>

# 🛒 FreshCart

**A production-ready e-commerce platform built with Angular 21 & SSR**

<br/>

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev)

[![SSR](https://img.shields.io/badge/SSR-Enabled-22C55E?style=for-the-badge)](https://angular.dev/guide/ssr)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)]()


<br/>

### [🚀 View Live Demo →]() &nbsp;&nbsp;|&nbsp;&nbsp; [📂 GitHub Repo →]()

<br/>

---

</div>

## 📖 About

**FreshCart** is a scalable, feature-rich e-commerce web application built on **Angular 21 with Server-Side Rendering (SSR)**. It replicates a complete, real-world shopping experience — from browsing and filtering products, to cart management, Stripe-powered checkout, and order tracking — all wrapped in a clean, responsive UI.

The project follows an **enterprise-grade Angular architecture**: feature-based modules, three distinct layout zones (Guest / Auth / User), lazy-loaded routes, and centralized HTTP handling via interceptors.

<br/>

---

## ✨ Features at a Glance

<br/>

🛍️ &nbsp;**Smart Shopping** — Product browsing with filters (category, brand, subcategory), pagination, and real-time search

🛒 &nbsp;**Cart & Wishlist** — Add/remove products, update quantities, real-time price calculation, persistent state

💳 &nbsp;**Checkout Flow** — Address management, cash payment, Stripe online payment integration

🔐 &nbsp;**Authentication** — Login, Sign Up, Forgot Password with route guards protecting access zones

📦 &nbsp;**Order Tracking** — Full order history and status tracking from the user dashboard

👤 &nbsp;**Profile Management** — Update account info, manage addresses, change password

⚡ &nbsp;**SSR** — Server-Side Rendering for fast initial load and SEO-friendly pages

<br/>

---

## 📸 Application Preview

> *Browse the live demo to see all pages in action.*
>
> 👉 **[freshcart-e-commerce-app.netlify.app]()**

```
🏠 Home  ──►  🔍 Browse & Filter  ──►  📄 Product Details
                                               │
                              ┌────────────────┤
                              ▼                ▼
                         ❤️  Wishlist      🛒  Cart
                                               │
                         ┌─────────────────────┘
                         ▼
                    🔐  Login / Register
                         │
                         ▼
                    ✅  Checkout
                    ├── 💵  Cash Payment
                    └── 💳  Stripe Online Payment
                         │
                         ▼
                    📦  Order Confirmation  ──►  🗂️  Order History
```

<br/>

---

## 🗺️ Pages & Routes

### 🌐 Public — Guest Layout

| Route | Page | Description |
|:---|:---|:---|
| `/` | **Home** | Dynamic product discovery and featured items |
| `/products` | **Products** | Full listing with category, brand & subcategory filters |
| `/products/:id` | **Product Details** | Individual product page with full info and add-to-cart |
| `/search` | **Search** | Real-time product search |
| `/categories` | **Categories** | Browse by category hierarchy |
| `/brands` | **Brands** | Browse products by brand |
| `/cart` | **Cart** | View and manage cart items, quantities, and totals |
| `/wishlist` | **Wishlist** | Save and manage favourite products |
| `/contact` | **Contact** | Contact form |
| `/privacy` | **Privacy Policy** | Static informational page |
| `/terms` | **Terms** | Terms & conditions |

### 🔒 Protected — User Layout &nbsp;`(loggedGuard)`

| Route | Page | Description |
|:---|:---|:---|
| `/checkout` | **Checkout** | Address selection, cash or online payment |
| `/orders` | **Orders** | Full order history and tracking |
| `/profile` | **Profile** | Account info, addresses, password update |

### 🔑 Auth — Auth Layout &nbsp;`(guestGuard)`

| Route | Page | Description |
|:---|:---|:---|
| `/login` | **Login** | Email / password authentication |
| `/signup` | **Sign Up** | New account registration |
| `/forgot-password` | **Forgot Password** | Password reset flow |

<br/>

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── core/
│   │   ├── guard/
│   │   │   ├── guest/          # guestGuard — blocks logged-in users from auth pages
│   │   │   └── logged/         # loggedGuard — protects authenticated routes
│   │   └── interceptors/       # Token injection & centralized error handling
│   │
│   ├── layout/
│   │   ├── guest-layout/       # Navbar + footer for public pages
│   │   ├── auth-layout/        # Minimal layout for login / signup
│   │   └── user-layout/        # Dashboard layout for authenticated users
│   │
│   ├── features/
│   │   ├── home/
│   │   ├── products/
│   │   ├── search/
│   │   ├── categories/
│   │   ├── brands/
│   │   ├── cart/
│   │   ├── wishlist/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── profile/
│   │   ├── auth/
│   │   ├── contact/
│   │   └── static/             # 404, Privacy, Terms
│   │
│   └── shared/                 # Reusable components and pipes
```

**Design principles:**
- All feature modules are **lazy-loaded** via standalone components for optimal bundle size
- Route guards protect **layout groups** — not individual routes — for clean separation of concerns
- **HTTP interceptors** handle token injection and error management in one place
- Fully **reactive data flow** with RxJS throughout the application

<br/>

---

## ⚔️ Challenges & Learnings

Building FreshCart came with a few meaningful technical challenges that shaped the final architecture:

- **SSR Integration** — Adapting an Angular SPA to work with Server-Side Rendering required careful handling of browser-only APIs (like `localStorage` and `window`), ensuring they're only accessed in the client context to avoid hydration errors on the server.

- **State Management** — Without a dedicated store like NgRx, managing shared state (cart count, auth status, wishlist) across deeply nested components relied heavily on RxJS `BehaviorSubject` services — keeping data reactive and consistent without over-engineering.

- **Routing Architecture** — Structuring three distinct layout zones (Guest / Auth / User) with lazy-loaded feature modules and guard-protected groups required careful route configuration to avoid guard conflicts and ensure smooth navigation across all access levels.

<br/>

---

## 🧰 Tech Stack

### ⚡ Core

| Library | Version | Purpose |
|:---|:---|:---|
| Angular + SSR + Router + Forms | 21 | Core framework with server-side rendering |
| TypeScript | 5.9 | Type-safe development |
| Express | 5 | SSR server |

### 🎨 UI & Styling

| Library | Version | Purpose |
|:---|:---|:---|
| TailwindCSS | 4 | Utility-first styling |
| Flowbite | 4 | Component library |
| FontAwesome | 7 | Icons |
| Swiper.js | 12 | Carousels & sliders |
| ngx-toastr | — | Toast notifications |
| SweetAlert2 | — | Modal dialogs |

### 🔁 State & Data

| Library | Purpose |
|:---|:---|
| RxJS 7.8 | Reactive state & async flows |
| @rxweb/reactive-form-validators | Advanced form validation |
| ngx-pagination | Paginated product listings |

### 🛠️ Tooling & Deployment

| Tool | Purpose |
|:---|:---|
| Angular CLI 21 | Project scaffolding & build |
| Vitest | Unit testing |
| PostCSS + Prettier | CSS processing & code formatting |
| Netlify + @netlify/angular-runtime | Production deployment |

<br/>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18`
- **npm** `>= 11`
- **Angular CLI** `21`

```bash
npm install -g @angular/cli@21
```


### Development Server

```bash
ng serve
```

Open **[http://localhost:4200](http://localhost:4200)** — hot-reloads on every file change.

### Production Build

```bash
ng build
```

Artifacts go to `dist/`. SSR server entry point: `dist/e-commerce/server/server.mjs`

### Run SSR Server Locally

```bash
npm run serve:ssr:e-commerce
```

### Run Tests

```bash
ng test
```

<br/>

---

---

<div align="center">

<br/>

Built with ❤️ by [Abdelrahman Hamed]


<br/>

</div>