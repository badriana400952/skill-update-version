# Vue 3 Migration Build (`@vue/compat`) Strategy

The Migration Build (`@vue/compat`) allows large Vue 2 applications to run on Vue 3 with configurable compatibility modes, providing runtime console warnings for deprecated APIs.

## 1. Installation
```bash
npm install vue@^3.4.0 @vue/compat@^3.4.0
npm install -D @vue/compiler-sfc@^3.4.0
```

## 2. Compiler Configuration

### Vite
In `vite.config.js`:
```js
import vue from '@vitejs/plugin-vue';

export default {
  resolve: {
    alias: {
      vue: '@vue/compat',
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2, // Enable Vue 2 compatibility mode globally
          },
        },
      },
    }),
  ],
};
```

### Vue CLI / Webpack
In `vue.config.js`:
```js
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat');
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2,
            },
          },
        };
      });
  },
};
```

## 3. Disabling Compatibility Flags Incrementally
Once the app runs on `@vue/compat`, eliminate deprecation warnings by disabling compat flags in `main.js` or per component:

```js
import { configureCompat } from 'vue';

// Disable compatibility for features once fixed
configureCompat({
  GLOBAL_MOUNT: false,
  RENDER_FUNCTION: false,
});
```

When all warnings are gone, switch `vue` alias back to normal `vue` and uninstall `@vue/compat`.
