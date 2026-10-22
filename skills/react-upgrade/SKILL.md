---
name: react-upgrade
description: Use when upgrading React applications (React 16, 17, or 18 to React 18 or React 19), updating ReactDOM, migrating deprecated Hooks/APIs, updating TypeScript typings, and running official React codemods.
---

# React Upgrade Specialist Skill

## Overview

This skill specializes in upgrading React codebases across major versions (notably **React 17 -> React 18** and **React 18 -> React 19**). It applies official React documentation guidelines, leverages React codemods, fixes breaking changes, updates TypeScript types, and prevents regressions.

---

## 🎯 Target Version Guidance

- **React 18**: Target version for legacy React 16/17 applications that need Concurrent features (`createRoot`, `useId`, `useTransition`, automatic batching).
- **React 19**: Target version for React 18 applications wanting modern features (ref as prop, `useActionState`, `useOptimistic`, `use` hook, Context as Provider, React Server Components compatibility, removal of `defaultProps` on functions, removal of `ReactDOM.render`).

*(Note: "React 14" was never an official release; React jumped from 0.14 to 15.0 in 2016. If a user asks for React 14, clarify if they mean Next.js 14 or React 18/19).*

---

## ⚡ React 19 Critical Breaking Changes Checklist

When targeting React 19, inspect the codebase for:

1. **`ref` as a Prop**:
   - `forwardRef` is deprecated. Function components now accept `ref` directly as a regular prop:
     ```tsx
     // React 18
     const MyInput = forwardRef((props, ref) => <input {...props} ref={ref} />);
     // React 19
     function MyInput({ ref, ...props }) {
       return <input {...props} ref={ref} />;
     }
     ```
2. **Context as Provider**:
   - `<Context>` can now be rendered directly instead of `<Context.Provider>`:
     ```tsx
     // React 19
     <ThemeContext value="dark">{children}</ThemeContext>
     ```
3. **`defaultProps` Removal**:
   - `defaultProps` on Function Components is completely removed. Use ES6 default parameters:
     ```tsx
     // React 19
     function Button({ variant = 'primary', children }) { ... }
     ```
4. **`ReactDOM.render` & `unmountComponentAtNode` Removal**:
   - Must use `createRoot` and `root.unmount()` from `react-dom/client`.
5. **Legacy String Refs & `findDOMNode` Removed**:
   - Replace with callback refs or `useRef()`.
6. **Ref Cleanup Functions**:
   - Returning a value from a ref callback now acts as a cleanup callback. Beware of implicit returns from arrow functions (e.g. `ref={el => (instance = el)}` is fine, but `ref={el => map.set(id, el)}` returns a value and React will warn/error if it thinks it's a cleanup function).
7. **TypeScript Types (`@types/react` v19)**:
   - `React.FC` no longer includes implicit `children`.
   - `useRef()` requires an initial argument, or explicit generic `useRef<HTMLInputElement | null>(null)`.

---

## 🛠️ Official Codemod Workflow

Before writing manual transformations, run the official React 19 codemods:

```bash
# Run the React 19 codemod recipe to automate common migrations
npx codemod@latest react/19/migration-recipe
```

Individual codemods available:
- `replace-reactdom-render`: Migrates `ReactDOM.render` to `createRoot`.
- `replace-string-ref`: Migrates string refs to `useRef`.
- `replace-act-import`: Updates `act` imports from `react-dom/test-utils` to `react`.
- `prop-types-typescript`: Migrates `propTypes` and `defaultProps` to TypeScript defaults.

Inspect the git diff immediately after running codemods before accepting changes.

---

## 📋 Step-by-Step Upgrade Workflow

### Step 1: Audit Current React Usages
Search for deprecated patterns:
```bash
# Search for ReactDOM.render
git grep "ReactDOM.render"
# Search for defaultProps
git grep "defaultProps"
# Search for findDOMNode
git grep "findDOMNode"
# Search for react-dom/test-utils
git grep "react-dom/test-utils"
```

### Step 2: Check Peer Dependencies
Audit UI libraries that tightly couple to React internals:
- Component libraries (MUI, Ant Design, Chakra UI, Radix UI, Headless UI)
- Form libraries (React Hook Form, Formik)
- State management (Redux Toolkit, Zustand, Recoil)
- Styling solutions (styled-components, Emotion)
Check if existing versions officially support the target React version or require an update.

### Step 3: Bump Packages in `package.json`
For React 19:
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

### Step 4: Run Codemods & Fix Remaining TypeScript / Lint Errors
- Run `tsc --noEmit` and review all type mismatches.
- Fix any function components that relied on `defaultProps`.
- Fix ref typing mismatches (`RefObject` vs `MutableRefObject`).

### Step 5: Test & Verify
- Run test suites (ensure `@testing-library/react` is updated to a compatible version, e.g. v16+ for React 19).
- Run production build (`npm run build`).

---

## 📚 References
- React 19 Detailed Breaking Changes: [references/react19-breaking-changes.md](references/react19-breaking-changes.md)
- React 18 Breaking Changes: [references/react18-breaking-changes.md](references/react18-breaking-changes.md)
- Codemod Detailed Guide: [references/codemod-guide.md](references/codemod-guide.md)
- Compatibility Matrix: [references/compatibility-matrix.md](references/compatibility-matrix.md)
