# Vue Router & State Management Migration

## 1. Vue Router 3 to Vue Router 4

### Initialization & Creation
```js
// Vue Router 3 (Vue 2)
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [ ... ]
});
export default router;
```

```js
// Vue Router 4 (Vue 3)
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [ ... ]
});
export default router;
```

### Catch-All / 404 Route Syntax
- Vue Router 3: `{ path: '*', component: NotFound }`
- Vue Router 4: `{ path: '/:pathMatch(.*)*', component: NotFound }`

### `isReady()` Promise
- For SSR or async route initialization, use `await router.isReady()` before mounting.

---

## 2. State Management: Vuex 3 to Vuex 4 vs Pinia

### Vuex 4 (Smallest Change)
If keeping Vuex without changing component syntax:
```js
// Vuex 4
import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return { count: 0 };
  },
  mutations: {
    increment(state) { state.count++; }
  }
});
```
And in `main.js`:
```js
app.use(store);
```

### Migrating to Pinia (Recommended for Vue 3)
Pinia is the official Vue 3 state management library. It is modular and supports TypeScript natively.
```ts
// stores/counter.ts
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    }
  }
});
```
In `main.js`:
```js
import { createPinia } from 'pinia';
app.use(createPinia());
```
