# Pages Router vs App Router: Migration Boundaries

## Absolute Rule
**Do not migrate a Pages Router project to App Router during a version upgrade unless explicitly instructed by the user.**

Next.js maintains first-class support for both routers side-by-side. Upgrading Next.js 13/14 to 15 within the Pages Router is 100% valid, stable, and often the safest path.

---

## Architectural Comparison

| Feature | Pages Router (`pages/`) | App Router (`app/`) |
| :--- | :--- | :--- |
| **Directory** | `pages/` or `src/pages/` | `app/` or `src/app/` |
| **Data Fetching** | `getServerSideProps`, `getStaticProps`, `getInitialProps` | Async Server Components, direct `fetch`, Server Actions |
| **Routing Model** | File-path based (`pages/about.tsx`) | Folder-based with `page.tsx` (`app/about/page.tsx`) |
| **Component Model** | Standard Client Components (executed on server during SSR) | React Server Components by default (`'use client'` opt-in) |
| **Layouts** | `_app.tsx`, custom `getLayout` pattern | Nested `layout.tsx`, `template.tsx` |
| **Header/Cookie API**| `req.headers`, `req.cookies` in `getServerSideProps` | `import { cookies, headers } from 'next/headers'` |

---

## Gradual (Coexistence) Migration Strategy

If the user *does* request migrating to App Router:
1. **Never migrate in one giant PR**: Keep both directories active. Next.js natively routes `app/` with priority over `pages/`.
2. **Step 1**: Upgrade Next.js version first while still on Pages Router. Verify build and tests pass.
3. **Step 2**: Create `app/` directory and create the root layout: `app/layout.tsx`.
4. **Step 3**: Migrate low-risk static leaves first (e.g., `/privacy-policy`, `/terms`).
5. **Step 4**: Migrate complex dynamic routes one-by-one.
6. **Step 5**: Clean up old `pages/` files only when all routes are transferred.
