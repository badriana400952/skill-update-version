# Upgrade Execution Checklist & Quality Gates

Use this checklist to enforce quality gates at every stage of the migration.

## Stage 1: Pre-Upgrade Baselines
- [ ] Working tree clean or user informed of uncommitted changes.
- [ ] Active Node.js and package manager versions recorded and verified against target framework engine prerequisites.
- [ ] Baseline checks executed (if runnable):
  - [ ] Type check baseline (`tsc --noEmit`)
  - [ ] Lint baseline
  - [ ] Build baseline
  - [ ] Test suite baseline
- [ ] Existing failures logged so they are not attributed to the upgrade.

## Stage 2: Planning & Dependency Triage
- [ ] Target framework version confirmed as stable release.
- [ ] Official migration guides and release notes reviewed (offline references or web search).
- [ ] Peer dependencies audited for compatibility:
  - React ecosystem: `@types/react`, `@types/react-dom`, UI libraries (MUI, Radix, Chakra), state managers (Redux, Zustand), routing (React Router).
  - Next.js ecosystem: `eslint-config-next`, `@next/bundle-analyzer`, sharp, next-auth.
  - Vue ecosystem: `vue-router`, `pinia`, `vuex`, `@vue/compiler-sfc`, `@vitejs/plugin-vue`.
- [ ] Codemods identified with explicit invocation arguments.
- [ ] Migration Plan document drafted and reviewed.

## Stage 3: Incremental Application
- [ ] Backup / Git commit created before major changes.
- [ ] Core framework packages updated in `package.json`.
- [ ] Package manager lockfile updated (`install`).
- [ ] Official codemods executed.
- [ ] Diff inspected: verify codemod did not introduce formatting damage or unwanted logic changes.
- [ ] Manual code refactor applied for remaining breaking changes.
- [ ] Configuration files updated (`next.config.*`, `vite.config.*`, `tsconfig.json`, `eslint.config.*`).

## Stage 4: Post-Upgrade Verification
- [ ] Type check passes with 0 new errors.
- [ ] Lint check passes or only expected lint updates needed.
- [ ] Production build succeeds (`npm run build`).
- [ ] Tests pass (`npm test`).
- [ ] Final migration report generated with:
  - Starting version vs Target version
  - List of modified files & rationale
  - Breaking changes handled
  - Dependencies updated
  - Remaining manual items or notes for team
