---
name: nextjs-upgrade
description: Use when upgrading Next.js applications (Next.js 12, 13, 14 to Next.js 15), handling Pages Router vs App Router migrations safely, migrating async request APIs (cookies, headers, params), caching changes, and executing official @next/codemod.
---

# Next.js Upgrade Specialist Skill

## Overview

This skill handles upgrades for Next.js applications across major versions (e.g., **Next.js 13 -> 14**, and **Next.js 14 -> 15**). It coordinates framework dependencies (including React 18 vs React 19), updates configuration files, adapts route handlers and server components, and executes `@next/codemod`.

---

## 🛑 Golden Rule: Do NOT Force App Router Migration

**CRITICAL POLICY**: If a project uses the **Pages Router** (`pages/` directory), **NEVER** convert it wholesale to the **App Router** (`app/` directory) unless the user explicitly commands: *"Migrate this project from Pages Router to App Router."*
- Next.js 14 and 15 fully support Pages Router.
- Upgrading Next.js versions can and should be done within the Pages Router if that is what the project uses.

---

## ⚡ Next.js 15 Major Breaking Changes Checklist

When targeting **Next.js 15**, inspect the codebase for:

1. **Async Request APIs (Runtime Breaking Change)**:
   - In Next.js 15, `cookies()`, `headers()`, and dynamic route `params` / `searchParams` in page components and route handlers are **asynchronous** (`Promise`).
   - Old (Next.js 14):
     ```tsx
     import { cookies, headers } from 'next/headers';
     const cookieStore = cookies();
     const token = cookieStore.get('token');
     ```
   - New (Next.js 15):
     ```tsx
     import { cookies, headers } from 'next/headers';
     const cookieStore = await cookies();
     const token = cookieStore.get('token');
     ```
   - Page & Layout Props:
     ```tsx
     // Next.js 14
     export default function Page({ params, searchParams }: { params: { id: string } }) { ... }

     // Next.js 15
     export default async function Page({
       params,
       searchParams,
     }: {
       params: Promise<{ id: string }>;
       searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
     }) {
       const { id } = await params;
       ...
     }
     ```
2. **Caching Defaults Shift**:
   - `fetch()` requests are now **uncached by default** (`cache: 'no-store'`). In Next.js 14 they were cached (`force-cache`) by default.
   - `GET` Route Handlers are no longer cached by default.
   - Client-side navigation no longer reuses cached page data by default (`staleTimes: { dynamic: 0 }`).
3. **React 19 Requirement**:
   - Next.js 15 App Router defaults to React 19. Ensure `react` and `react-dom` are upgraded to `@19` alongside `@types/react` and `@types/react-dom`.
4. **`next/font` & External Package Externalization**:
   - Bundling defaults and `serverExternalPackages` moved under the main config object.
5. **Config & Tooling**:
   - Turbopack is the default for development (`next dev --turbo`).
   - ESLint 9 support (flat config) and `eslint-config-next@15`.

---

## 🛠️ Official Codemod Workflow

Use the official Next.js upgrade codemod CLI:

```bash
# Automated Next.js upgrade codemod
npx @next/codemod@latest upgrade latest
```

Or for a specific version:
```bash
npx @next/codemod@latest upgrade 15
```

Individual Next.js 15 codemods:
- `next-async-request-api`: Automatically converts synchronous `cookies()`, `headers()`, and page `params`/`searchParams` to async/await.
- `next-lint`: Updates ESLint configuration.

---

## 📋 Step-by-Step Upgrade Workflow

### Step 1: Detect Router Paradigm & Dependencies
- Check if project is Pages Router (`pages/`), App Router (`app/`), or Hybrid.
- Check current versions of `next`, `react`, `react-dom`, `eslint-config-next`.
- Check Node.js version (Next.js 15 requires Node.js 18.18.0 or 20.x+).

### Step 2: Bump Dependencies in `package.json`
```bash
# Example for npm with Next.js 15
npm install next@latest react@latest react-dom@latest
npm install -D eslint-config-next@latest @types/react@latest @types/react-dom@latest
```

### Step 3: Run the Async Request Codemod
```bash
npx @next/codemod@latest next-async-request-api .
```
Inspect the diff to verify that all async changes in route handlers and server components are correct.

### Step 4: Verify Caching Behavior
If specific endpoints or components relied on the old default fetch caching, add explicit `{ cache: 'force-cache' }` or export `dynamic = 'force-static'`.

### Step 5: Test & Validate
1. Run `npx tsc --noEmit` to verify TypeScript contracts.
2. Run `npm run lint`.
3. Run `npm run build` to ensure static page generation and server bundles compile without error.
4. Run integration / E2E tests if available.

---

## 📚 References
- Next.js 15 Breaking Changes: [references/next15-breaking-changes.md](references/next15-breaking-changes.md)
- Next.js 14 Breaking Changes: [references/next14-breaking-changes.md](references/next14-breaking-changes.md)
- Codemod Detailed Guide: [references/codemod-guide.md](references/codemod-guide.md)
- Pages Router vs App Router Rules: [references/pages-vs-app-router.md](references/pages-vs-app-router.md)
- Compatibility Matrix: [references/compatibility-matrix.md](references/compatibility-matrix.md)
