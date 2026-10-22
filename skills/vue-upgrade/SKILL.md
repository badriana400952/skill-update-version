---
name: vue-upgrade
description: Use when upgrading Vue.js applications (Vue 2 to Vue 3, Vue 3 minor bumps), handling Composition API transitions, Vue Router 3 to 4, Vuex to Pinia, Vite build tool migrations, and configuring @vue/compat.
---

# Vue.js Upgrade Specialist Skill

## Overview

This skill handles upgrades for Vue applications, focusing on the major architectural transition from **Vue 2 -> Vue 3**, as well as modern Vue 3 minor upgrades (3.3 -> 3.4 -> 3.5). It enforces safe migration patterns, prevents unwanted destruction of working Options API code, and provides clear migration-build (`@vue/compat`) strategies.

---

## 🛑 Golden Rule: Do NOT Force `<script setup>` Refactoring

**CRITICAL POLICY**: Vue 3 **fully supports the Options API** (`data()`, `methods`, `computed`, `props`, `mounted`).
- Do **NOT** rewrite existing, working Options API components into Composition API (`<script setup>`) unless explicitly requested by the user.
- The primary goal of an upgrade is framework version compatibility, not stylistic rewrites.

---

## ⚡ Vue 3 Major Breaking Changes Checklist

When migrating from Vue 2 to Vue 3, inspect and adapt:

1. **Global API Redesign**:
   - `new Vue()` is replaced by `createApp()`:
     ```js
     // Vue 2
     import Vue from 'vue';
     import App from './App.vue';
     new Vue({ render: h => h(App) }).$mount('#app');

     // Vue 3
     import { createApp } from 'vue';
     import App from './App.vue';
     const app = createApp(App);
     app.mount('#app');
     ```
   - `Vue.prototype.$http = ...` -> `app.config.globalProperties.$http = ...`
   - `Vue.use(plugin)` -> `app.use(plugin)`
   - `Vue.component('MyComp', ...)` -> `app.component('MyComp', ...)`
2. **Template Directives & `v-model`**:
   - `v-model` prop defaults to `modelValue` (instead of `value`), event is `update:modelValue` (instead of `input`).
   - `.sync` modifier is removed. Use `v-model:propName` instead:
     ```html
     <!-- Vue 2 -->
     <MyDialog :visible.sync="isOpen" />
     <!-- Vue 3 -->
     <MyDialog v-model:visible="isOpen" />
     ```
   - `v-if` has higher priority than `v-for` when placed on the same element in Vue 3 (reversed from Vue 2).
   - Key on `<template v-for>`: `key` must now be placed on the `<template>` tag itself.
3. **Removed APIs**:
   - Event bus methods removed from Vue instances: `$on`, `$off`, `$once`. Use an external emitter (e.g. `mitt`) if needed.
   - `$listeners` removed (merged into `$attrs`).
   - `$scopedSlots` removed (merged into `$slots`).
   - `Vue.set` and `Vue.delete` removed (Vue 3 Proxy-based reactivity does not require them; use standard property assignment `obj.newProp = val`).
   - Filter pipes `{{ msg | capitalize }}` removed. Use computed properties or method calls.
4. **Lifecycle Hooks Renamed**:
   - `beforeDestroy` -> `beforeUnmount`
   - `destroyed` -> `unmounted`
5. **Ecosystem Libraries**:
   - `vue-router` v3 -> `vue-router` v4 (`createRouter`, `createWebHistory`).
   - `vuex` v3 -> `vuex` v4 or migration to `pinia`.

---

## 🛠️ Migration Build (`@vue/compat`) Strategy

For medium-to-large Vue 2 codebases, never attempt a 100% blind rewrite overnight. Use the official migration build:

```bash
npm install vue@^3.1.0 @vue/compat@^3.1.0
```

Configure compiler alias in `vite.config.js` or `vue.config.js`:
```js
resolve: {
  alias: {
    vue: '@vue/compat'
  }
}
```
This runs Vue 3 while emitting runtime warnings for deprecated Vue 2 APIs, allowing incremental fixes component-by-component.

---

## 📋 Step-by-Step Upgrade Workflow

### Step 1: Audit Vue 2 Codebase
Check for deprecated APIs:
```bash
git grep "\$listeners"
git grep "\$scopedSlots"
git grep "\$on("
git grep "beforeDestroy"
git grep "Vue.set"
git grep "Vue.prototype"
```

### Step 2: Update Core Manifest
Update `package.json`:
- `vue`: `^3.5.0`
- `@vue/compiler-sfc`: `^3.5.0`
- `vue-router`: `^4.4.0` (if used)
- `pinia`: `^2.2.0` (or `vuex`: `^4.1.0` if maintaining vuex)
- `@vitejs/plugin-vue`: `^5.0.0` (if using Vite)

### Step 3: Migrate Application Entry Point (`main.js` / `main.ts`)
Transform `new Vue()` to `createApp(App)`. Apply router and plugins to the app instance.

### Step 4: Fix Template & Lifecycle Changes
- Replace `.sync` with `v-model:name`.
- Rename `beforeDestroy` and `destroyed` hooks.
- Replace `$listeners` with `$attrs`.
- Remove filters and convert to helper functions or computed properties.

### Step 5: Test & Validate
1. Run typecheck: `vue-tsc --noEmit`.
2. Run build: `npm run build`.
3. Run component / unit tests: `npm test`.

---

## 📚 References
- Vue 3 Breaking Changes: [references/vue3-breaking-changes.md](references/vue3-breaking-changes.md)
- Vue Router & State Migration: [references/vue-router-and-state.md](references/vue-router-and-state.md)
- Migration Build Guide: [references/migration-build-guide.md](references/migration-build-guide.md)
- Compatibility Matrix: [references/compatibility-matrix.md](references/compatibility-matrix.md)
