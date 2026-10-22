# Next.js 14 Breaking Changes & Migration Details

Source: Official Next.js 14 Upgrade Guide (https://nextjs.org/docs/app/building-your-application/upgrading/version-14)

## 1. Node.js Minimum Version
- Next.js 14 requires Node.js `18.17.0` minimum.

## 2. Server Actions Stabilization
- In Next.js 13, Server Actions required `experimental: { serverActions: true }`.
- In Next.js 14, Server Actions are stable by default. Remove `experimental.serverActions` from `next.config.js`.

## 3. Metadata Changes
- Viewport and colorScheme metadata options are separated from the main `metadata` export to a dedicated `viewport` export:
  ```tsx
  // Next.js 14
  import type { Viewport } from 'next';
  export const viewport: Viewport = {
    themeColor: 'black',
    width: 'device-width',
    initialScale: 1,
  };
  ```

## 4. Deprecated `next/image` props removed
- Legacy image components and properties (`layout="fill"`, `objectFit`) must be replaced with `fill`, `style={{ objectFit: 'cover' }}`.
