# Next.js Codemod Guide

Official automated upgrade tools provided by the Next.js team (`@next/codemod`).

## Standard Automated Upgrade Command
The primary entry point to upgrade a Next.js project:

```bash
# Upgrade to latest Next.js version and run all applicable codemods
npx @next/codemod@latest upgrade latest

# Or target a specific version (e.g. Next.js 15)
npx @next/codemod@latest upgrade 15
```

## Specific Next.js 15 Codemods

### 1. `next-async-request-api`
Transforms synchronous usage of `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` into awaited asynchronous equivalents:
```bash
npx @next/codemod@latest next-async-request-api .
```

### 2. `turbopack-config`
Migrates Webpack configurations to Turbopack-compatible config format:
```bash
npx @next/codemod@latest turbopack-config .
```

### 3. Legacy Image / Font Migration
```bash
# Migrates next/legacy/image to next/image
npx @next/codemod@latest next-image-to-legacy-image .
npx @next/codemod@latest next-image-experimental .

# Migrates @next/font to built-in next/font
npx @next/codemod@latest built-in-next-font .
```

## Post-Codemod Safety Checklist
1. Review git diff: `git diff`.
2. Ensure no non-async functions were broken by having `await` injected inside them without an `async` signature.
3. Check dynamic route types in TypeScript (`params: Promise<...>`).
