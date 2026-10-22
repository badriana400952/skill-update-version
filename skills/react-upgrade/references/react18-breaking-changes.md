# React 18 Breaking Changes Reference

Source: Official React 18 Upgrade Guide (https://react.dev/blog/2022/03/29/react-v18)

## 1. Concurrency & Root API
- Legacy `ReactDOM.render` is deprecated in React 18 and triggers console warnings.
- New root API:
  ```tsx
  import { createRoot } from 'react-dom/client';
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  root.render(<App />);
  ```

## 2. Automatic Batching
- React 18 batches state updates inside promises, `setTimeout`, native event handlers, and fetch callbacks.
- If synchronous re-rendering is strictly required for legacy code, use `flushSync`:
  ```tsx
  import { flushSync } from 'react-dom';
  flushSync(() => {
    setCount(c => c + 1);
  });
  ```

## 3. StrictMode Double-Mount in Development
- In development, React 18 StrictMode mounts, unmounts, and remounts components to detect effects missing cleanup.
- Common issue: Effects fetching data or subscribing without aborting or cleaning up cause double-calls.
- Fix: Always clean up subscriptions or use abort controllers in `useEffect`.

## 4. TypeScript Typings
- `React.FC` no longer provides an implicit `children` prop in `@types/react@^18`.
- Fix: Explicitly add `children?: React.ReactNode` to component props interfaces.
