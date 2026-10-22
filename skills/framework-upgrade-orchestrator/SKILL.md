---
name: framework-upgrade-orchestrator
description: Use when analyzing an existing codebase to determine its frontend framework (React, Next.js, Vue) and routing the upgrade process to the appropriate specialized upgrade skill without hallucinating breaking changes.
---

# Framework Upgrade Orchestrator

## Overview

The `framework-upgrade-orchestrator` is the entry point for safely upgrading legacy frontend projects. It detects the current framework, versions, package managers, and architectural paradigms, then delegates the migration work to specialist skills:
- `react-upgrade` for React & React DOM projects (Vite, CRA, custom Webpack, React 17 -> 18 -> 19).
- `nextjs-upgrade` for Next.js projects (Next.js 12 -> 13 -> 14 -> 15, Pages Router & App Router).
- `vue-upgrade` for Vue projects (Vue 2 -> Vue 3, Vue CLI -> Vite, Options API -> Composition API).
- `framework-upgrade` for general or unified framework migration flows.

---

## 🛡️ Core Rules & Anti-Hallucination Directives

1. **Never Invent API Changes or Versions**: Rely solely on official documentation, verified release notes, and real-time inspection. If documentation cannot be accessed via web search or local references, state the limitation explicitly.
2. **Never Swap Architectures Unbidden**:
   - In Next.js, never automatically convert a Pages Router project to App Router unless explicitly requested.
   - In Vue, never rewrite Options API components to Composition API (`<script setup>`) unless explicitly requested.
   - In React, never rewrite standard Class/Function components into Server Components or experimental paradigms without approval.
3. **Stepwise Major Version Bumps**: Upgrade one major version at a time (e.g., Next 13 -> 14 -> 15, Vue 2.6 -> 2.7 -> 3.x) if recommended by the framework maintainers.
4. **Preserve Business Logic**: Never modify application business rules, state shapes, or domain calculations merely to adopt a "modern style".
5. **No Blind Dependency Bumps**: Never update all packages to `@latest` simultaneously. Peer dependencies will break. Pinpoint and upgrade framework peers incrementally.

---

## 4-Phase Migration Lifecycle

```
┌─────────────────────┐     ┌────────────────────────┐     ┌────────────────────────┐     ┌──────────────────────┐
│  Phase 1: Inspect   │ ──> │ Phase 2: Official Docs │ ──> │ Phase 3: Migration Plan│ ──> │ Phase 4: Verification│
│ (Detect & Triage)   │     │   (Diff & Changes)     │     │ (Smallest Safe Edits)  │     │ (Build, Lint, Tests) │
└─────────────────────┘     └────────────────────────┘     └────────────────────────┘     └──────────────────────┘
```

### Phase 1: Project Inspection & Triage

1. **Locate and inspect manifests**:
   - Read `package.json`, lockfiles (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`).
   - Identify active package manager: `npm`, `pnpm`, `yarn`, or `bun`.
   - Identify Node.js engine constraints (`engines.node` in `package.json`, `.nvmrc`, `.node-version`).
2. **Detect Framework & Runtime Footprint**:
   - **React**: Look for `react`, `react-dom`, `@types/react`. Check if standalone SPA (Vite/Webpack) or meta-framework.
   - **Next.js**: Look for `next`. Inspect folder structure (`pages/` vs `app/`, `next.config.js`/`.mjs`/`.ts`).
   - **Vue**: Look for `vue`, `vue-router`, `vuex`/`pinia`. Check Vue 2 vs Vue 3 in `package.json`.
   - **Monorepos**: Detect Turborepo, Nx, Lerna, or pnpm workspaces. Identify all affected workspace packages.
3. **Audit Current Health**:
   - Run existing typecheck (`tsc --noEmit`), lint (`npm run lint`), or test suites if configured. Note any pre-existing failures so they are not confused with migration regressions.

### Phase 2: Target Version Resolution & Specialist Handoff

1. Determine target version:
   - If user specified a version (e.g. "upgrade to Next.js 15" or "upgrade to React 19"), use that specific target.
   - If user asks for "latest", inspect official npm registry or official docs to find the latest **stable** (non-alpha, non-canary, non-release-candidate) version.
2. Route to the appropriate specialist skill:
   - For React core upgrades: invoke/refer to `react-upgrade/SKILL.md`.
   - For Next.js upgrades: invoke/refer to `nextjs-upgrade/SKILL.md`. (Next.js upgrades also coordinate React version requirements).
   - For Vue.js upgrades: invoke/refer to `vue-upgrade/SKILL.md`.
   - For mixed/general libraries: follow `framework-upgrade/SKILL.md`.

### Phase 3: Migration Plan & Incremental Execution

1. Build a structured Markdown Migration Plan before editing any files:
   - Breaking Changes affecting this codebase.
   - Deprecated APIs identified with specific line numbers and file paths.
   - Codemods available (e.g., `@next/codemod`, `npx codemod@latest react/19`).
   - Third-party packages requiring updates (peer dependency blockers).
   - Validation criteria and automated tests.
2. Present the plan to the user or proceed incrementally if already authorized.

### Phase 4: Upgrade, Verification & Final Report

1. Update package manifests and install dependencies using the detected package manager.
2. Run official codemods first (if applicable), then inspect git diff immediately.
3. Apply manual code adjustments for remaining breaking changes.
4. Execute automated verification:
   - `package-manager install` (check peer dependencies)
   - Typecheck (`npx tsc --noEmit` or equivalent)
   - Lint check (`npm run lint`)
   - Build test (`npm run build`)
   - Automated unit/integration tests (`npm test`)
5. Deliver a final audit report with remaining risks and manual steps if any.

---

## Reference Guides

- Triage Workflow & Monorepos: [references/triage-workflow.md](references/triage-workflow.md)
- Execution Checklist & Safety Gates: [references/execution-checklist.md](references/execution-checklist.md)
