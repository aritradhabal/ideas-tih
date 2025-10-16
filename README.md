## Overview

A lightweight React + TypeScript app for browsing products, viewing product details, managing a local product list, and listing users. It uses React Router for routing, TanStack Query for server-state fetching/caching, Zustand for client-state (with localStorage persistence), Tailwind CSS for styling, and a local `json-server` for API testing. When the API is unavailable, the app falls back to the bundled `src/assets/db.json`.

## Tech stack

- **React 19 + Vite + TypeScript**
- **React Router 6**
- **TanStack Query (react-query v5)**: caching server data
- **Zustand 5**: app state; with `persist` to localStorage
- **Tailwind CSS 4**, **Radix UI** primitives, and small UI utilities
- **json-server**: mock REST API for local testing

## Project structure (overview)

```text
ideas-tih-project/
  public/
  src/
    api/
      createProduct.ts
      getProductDetails.ts
      getProducts.ts
      getUsers.ts
    assets/
      db.json
    components/
      ProductCard.tsx
      ProductDetailsCard.tsx
      ProfilePageCard.tsx
      ui/
        breadcrumb.tsx
        button.tsx
        card.tsx
        checkbox.tsx
        hover-card.tsx
        label.tsx
        separator.tsx
        sonner.tsx
    lib/
      utils.ts
    pages/
      HomePage.tsx
      Navbar.tsx
      ProductDetailsPage.tsx
      ProductPage.tsx
      ProfilePage.tsx
      SettingsPage.tsx
    store/
      updateProductsStore.ts
      useProductStore.ts
    App.tsx
    RouteHandler.tsx
    index.css
    main.tsx
  package.json
  vite.config.ts
  tsconfig.app.json
  README.md
```

## API and environment

```bash
# .env.example
VITE_API_URL=http://localhost:3000
```

## Local development

```bash
pnpm install
pnpm dev
```

## Testing with json-server

```bash
pnpm dlx json-server src/assets/db.json
```

## Build and preview

```bash
pnpm build
pnpm preview
```
