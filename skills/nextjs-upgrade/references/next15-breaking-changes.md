# Next.js 15 Breaking Changes & Migration Details

Source: Official Next.js 15 Release Notes & Upgrade Guide (https://nextjs.org/docs/app/getting-started/upgrading)

## 1. Asynchronous Request-Specific APIs

In Next.js 15, APIs that read incoming request context must be awaited:
- `cookies()`
- `headers()`
- `draftMode()`
- `params` in Page, Layout, Route, and generateMetadata
- `searchParams` in Page

### Migration Patterns

#### Headers & Cookies
```tsx
// Before (Next.js 14)
import { cookies } from 'next/headers';
export function MyServerComponent() {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  return <div>{theme?.value}</div>;
}

// After (Next.js 15)
import { cookies } from 'next/headers';
export async function MyServerComponent() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');
  return <div>{theme?.value}</div>;
}
```

#### Page Parameters (`params` & `searchParams`)
```tsx
// Before (Next.js 14)
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
};

export default function Page({ params, searchParams }: Props) {
  return <h1>Slug: {params.slug}</h1>;
}

// After (Next.js 15)
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return <h1>Slug: {params.slug}</h1>;
}
```

#### Client Component with `use()`
If reading params inside a Client Component:
```tsx
'use client';
import { use } from 'react';

export default function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <div>ID: {id}</div>;
}
```

---

## 2. Default Caching Behavior Changes

In Next.js 14, `fetch` requests were cached by default. In Next.js 15:
- `fetch` is **uncached** by default (`cache: 'no-store'`).
- To re-enable caching for a fetch request:
  ```ts
  fetch('https://api.example.com/data', { cache: 'force-cache' });
  ```
- Or configure segment-level caching:
  ```ts
  export const dynamic = 'force-static';
  ```
- `GET` Route Handlers are now uncached by default. To make a GET route static:
  ```ts
  export const dynamic = 'force-static';
  ```

---

## 3. Configuration Changes (`next.config.js`)

- `experimental.serverComponentsExternalPackages` is moved to `serverExternalPackages`:
  ```js
  // Next.js 14
  experimental: {
    serverComponentsExternalPackages: ['package-name'],
  }

  // Next.js 15
  serverExternalPackages: ['package-name'],
  ```
- `bundlePagesRouterDependencies` is now enabled by default.

---

## 4. Node.js Minimum Version
- Next.js 15 requires Node.js `18.18.0` or higher (Node 20.x or 22.x LTS strongly recommended).
