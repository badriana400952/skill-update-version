# Vue 3 Breaking Changes Reference

Source: Official Vue 3 Migration Guide (https://v3-migration.vuejs.org/)

## 1. Global API Changes

In Vue 2, global configurations and plugins were attached directly to the static `Vue` object, polluting tests and isolated apps:
```js
// Vue 2
import Vue from 'vue';
Vue.use(MyPlugin);
Vue.component('MyComponent', { ... });
Vue.directive('my-directive', { ... });
Vue.prototype.$custom = 'hello';
```

In Vue 3, every configuration is scoped to an app instance created with `createApp`:
```js
// Vue 3
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.use(MyPlugin);
app.component('MyComponent', { ... });
app.directive('my-directive', { ... });
app.config.globalProperties.$custom = 'hello';
app.mount('#app');
```

---

## 2. Template Directives & Modifiers

### `v-model`
- Default prop name changed from `value` to `modelValue`.
- Default event name changed from `input` to `update:modelValue`.
- `.sync` is removed and replaced by named `v-model:propName`:
  ```html
  <!-- Vue 2 -->
  <MyModal :visible.sync="showModal" />

  <!-- Vue 3 -->
  <MyModal v-model:visible="showModal" />
  ```

### `key` on `v-for` and `<template>`
- In Vue 2, `<template v-for>` required keys on child elements.
- In Vue 3, `key` must be put on the `<template>` tag itself:
  ```html
  <!-- Vue 3 -->
  <template v-for="item in items" :key="item.id">
    <span>{{ item.text }}</span>
  </template>
  ```

### `v-if` vs `v-for` Priority
- In Vue 2, `v-for` took precedence over `v-if` on the same element.
- In Vue 3, `v-if` has higher precedence.
- Recommendation: Never put both on the same tag; use a computed property or wrap with `<template v-for>`.

---

## 3. Removed APIs

### Instance Event Bus (`$on`, `$off`, `$once`)
- Vue 3 removes `$on`, `$off`, and `$once` from the component instance.
- Replacement: If an application-wide event bus is strictly required, use a tiny external emitter such as `mitt` or `tiny-emitter`.

### `$listeners` Merged into `$attrs`
- In Vue 3, `$attrs` contains both attributes and event listeners.
- Any `:class` or `:style` binding in `$attrs` also automatically falls through to the root element.

### `$scopedSlots` Merged into `$slots`
- All slots in Vue 3 are exposed as functions via `$slots`.
- Replace `$scopedSlots.default(...)` with `$slots.default(...)`.

### `Vue.set` and `Vue.delete`
- Vue 3's reactivity is backed by JavaScript `Proxy`. Adding or deleting properties on reactive objects is detected automatically:
  ```js
  // Vue 2
  Vue.set(this.user, 'age', 30);

  // Vue 3
  this.user.age = 30;
  ```

### Filters (`| capitalize`)
- Filter syntax is completely removed in Vue 3.
- Replace with computed properties or plain JavaScript formatting methods.

---

## 4. Lifecycle Hook Renaming

| Vue 2 Hook | Vue 3 Options API Hook | Vue 3 Composition API Hook |
| :--- | :--- | :--- |
| `beforeCreate` | `beforeCreate` | In `setup()` body |
| `created` | `created` | In `setup()` body |
| `beforeMount` | `beforeMount` | `onBeforeMount` |
| `mounted` | `mounted` | `onMounted` |
| `beforeUpdate` | `beforeUpdate` | `onBeforeUpdate` |
| `updated` | `updated` | `onUpdated` |
| **`beforeDestroy`** | **`beforeUnmount`** | **`onBeforeUnmount`** |
| **`destroyed`** | **`unmounted`** | **`onUnmounted`** |
| `errorCaptured` | `errorCaptured` | `onErrorCaptured` |
