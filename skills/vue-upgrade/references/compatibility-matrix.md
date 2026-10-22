# Vue Compatibility Matrix

| Vue Version | Node.js | Recommended Build Tool | Vue Router | State Manager | TypeScript Tool |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Vue 2.6** | Node 12 - 16 | Vue CLI / Webpack 4/5 | `vue-router@3` | `vuex@3` | `vue-tsc` (partial) |
| **Vue 2.7** | Node 14 - 18 | Vite or Vue CLI | `vue-router@3` | `pinia@2` / `vuex@3` | `vue-tsc` |
| **Vue 3.x** | Node 18.18+ / 20+ | Vite (`@vitejs/plugin-vue`) | `vue-router@4` | `pinia@2` / `vuex@4` | `vue-tsc@^2` |

## Migration Stepping Stone: Vue 2.7
If a direct jump from Vue 2.6 to Vue 3 is too large due to heavy third-party plugins:
1. Upgrade to **Vue 2.7** first (`npm install vue@2.7.16`).
2. Vue 2.7 backports Composition API, `<script setup>`, and Vite support into Vue 2.
3. Test and stabilize.
4. Then take the final step to Vue 3.
