# Next.js Compatibility Matrix

| Next.js Version | Node.js Requirement | Default / Supported React | Default Router | ESLint Config |
| :--- | :--- | :--- | :--- | :--- |
| **Next.js 13** | Node 16.14.0+ | React 18.2.0 | Pages or App Router (Beta->Stable) | `eslint-config-next@13` |
| **Next.js 14** | Node 18.17.0+ | React 18.2.0 / 18.3.1 | App Router / Pages Router | `eslint-config-next@14` |
| **Next.js 15** | Node 18.18.0+ / 20+ | React 19 (React 18 supported for Pages Router) | App Router (Default Turbo) / Pages Router | `eslint-config-next@15` |

## Dependent Packages Compatibility

- **`next-auth`**: For Next.js 15, use `@auth/nextjs` (v5 beta) or `next-auth@^4.24.8+`.
- **`sharp`**: Required for production image optimization (`npm i sharp`).
- **`@svgr/webpack`**: Ensure updated if transforming SVGs in Webpack/Turbopack.
- **`tailwind`**: Tailwind v3 and v4 work with Next.js 14 & 15. Ensure `postcss` is installed.
