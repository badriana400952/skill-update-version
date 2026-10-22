# Project Triage Workflow & Framework Detection

This guide defines how an AI agent should systematically inspect any repository before proposing or executing an upgrade.

## 1. Automated Detection Matrix

| Framework | Detection Signatures | Key Configuration Files |
| :--- | :--- | :--- |
| **Next.js** | `"next"` in `dependencies` | `next.config.js`, `next.config.mjs`, `next.config.ts`, `app/` or `src/app/` (App Router), `pages/` or `src/pages/` (Pages Router) |
| **React (SPA/Vite)** | `"react"` & `"react-dom"` in `dependencies`, `"vite"` in `devDependencies` | `vite.config.ts`, `vite.config.js`, `index.html` at root |
| **React (CRA)** | `"react-scripts"` in `dependencies` | `src/index.tsx`, `public/index.html` |
| **React (Custom Webpack)** | `"react"`, `"webpack"`, `"babel-loader"` or `"ts-loader"` | `webpack.config.js` |
| **Vue 2** | `"vue": "^2.x"` in `dependencies` | `vue.config.js`, `main.js` (`new Vue({ ... }).$mount('#app')`) |
| **Vue 3** | `"vue": "^3.x"` in `dependencies` | `vite.config.js`, `main.ts` / `main.js` (`createApp(App).mount('#app')`) |
| **Nuxt 2** | `"nuxt": "^2.x"` | `nuxt.config.js` |
| **Nuxt 3** | `"nuxt": "^3.x"` | `nuxt.config.ts`, `app.vue` |

---

## 2. Monorepo & Workspace Handling

If the root directory contains any of the following:
- `pnpm-workspace.yaml` (pnpm monorepo)
- `"workspaces"` field in root `package.json` (npm/yarn/bun workspaces)
- `turbo.json` (Turborepo)
- `nx.json` (Nx)
- `lerna.json` (Lerna)

Follow these rules:
1. Scan all workspace packages: `apps/*`, `packages/*`, `services/*`.
2. Determine whether each package shares framework versions or has independent versioning.
3. Identify internal shared packages (e.g. shared UI component libraries, tsconfig, eslint configs) which must be upgraded in sync with consumer apps.
4. Always execute commands with workspace awareness (e.g., `pnpm --filter <app-name> run build` or `npm --workspace=<app-name> run test`).

---

## 3. Package Manager Detection & Command Mapping

Never guess the package manager or mix package managers:
- If `pnpm-lock.yaml` is present -> Use `pnpm`
- If `yarn.lock` is present -> Use `yarn`
- If `bun.lockb` is present -> Use `bun`
- If `package-lock.json` is present or no lockfile -> Use `npm`

| Operation | npm | pnpm | yarn (v1 / classic) | yarn (v2+ / berry) | bun |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Install exact | `npm i <pkg>@<ver>` | `pnpm add <pkg>@<ver>` | `yarn add <pkg>@<ver>` | `yarn add <pkg>@<ver>` | `bun add <pkg>@<ver>` |
| Run script | `npm run <script>` | `pnpm <script>` | `yarn <script>` | `yarn <script>` | `bun run <script>` |
| Execute binary | `npx <pkg>` | `pnpm dlx <pkg>` | `npx <pkg>` | `yarn dlx <pkg>` | `bunx <pkg>` |
| Check outdated | `npm outdated` | `pnpm outdated` | `yarn outdated` | `yarn outdated` | `bun outdated` |
