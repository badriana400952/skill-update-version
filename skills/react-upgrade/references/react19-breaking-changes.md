# React 19 Breaking Changes & Migration Reference

Source: Official React 19 Upgrade Guide (https://react.dev/blog/2024/04/25/react-19-upgrade-guide)

## 1. Removed APIs

### `ReactDOM.render` and `ReactDOM.hydrate`
- **Removed**: `ReactDOM.render(<App />, container)`
- **Replacement**:
  ```tsx
  import { createRoot } from 'react-dom/client';
  const root = createRoot(container);
  root.render(<App />);
  ```
- **Hydration Replacement**:
  ```tsx
  import { hydrateRoot } from 'react-dom/client';
  const root = hydrateRoot(container, <App />);
  ```

### `unmountComponentAtNode`
- **Removed**: `ReactDOM.unmountComponentAtNode(container)`
- **Replacement**: `root.unmount()`

### `findDOMNode`
- **Removed**: `ReactDOM.findDOMNode(instance)`
- **Replacement**: Use DOM refs (`useRef()`).

### `defaultProps` for Function Components
- **Removed**: Declaring `Component.defaultProps = { ... }` on function components.
- **Replacement**: Use ES6 default argument values:
  ```tsx
  function UserProfile({ name = 'Anonymous', role = 'User' }: Props) {
    return <div>{name} ({role})</div>;
  }
  ```
  *(Note: `defaultProps` on Class components is still supported but discouraged).*

### Legacy Context API (`childContextTypes`, `contextTypes`)
- **Removed**: Completely removed.
- **Replacement**: Use `React.createContext` and `useContext` or `use(Context)`.

### String Refs
- **Removed**: `<input ref="myInput" />` and `this.refs.myInput`.
- **Replacement**: Use callback refs or `React.createRef()` / `useRef()`.

### `react-dom/test-utils`
- **Moved**: `act` is now exported directly from `react`:
  ```tsx
  import { act } from 'react';
  ```

---

## 2. Deprecations & Modernized Patterns

### `forwardRef`
- In React 19, `ref` is passed directly as a prop in function components.
- `forwardRef` will be deprecated in future releases, but existing code continues to work in 19.
- Recommended migration:
  ```tsx
  // New pattern in React 19
  function CustomInput({ ref, label, ...props }: { ref?: React.Ref<HTMLInputElement>, label: string }) {
    return (
      <label>
        {label}
        <input ref={ref} {...props} />
      </label>
    );
  }
  ```

### `<Context.Provider>` -> `<Context>`
- You can now render `<Context value={...}>` instead of `<Context.Provider value={...}>`:
  ```tsx
  const ThemeContext = createContext('light');

  function App({ children }) {
    return <ThemeContext value="dark">{children}</ThemeContext>;
  }
  ```

### Cleanup Function in Ref Callbacks
- In React 19, if a ref callback returns a function, React treats it as a cleanup function:
  ```tsx
  <div ref={(node) => {
    // setup
    return () => {
      // cleanup when node unmounts
    };
  }} />
  ```
- **Hazard**: If you write an arrow function that implicitly returns a value:
  ```tsx
  // ⚠️ BUG in React 19 if map.set returns something that isn't a function
  <div ref={node => map.set(id, node)} />

  // ✅ SAFE: Use explicit block or void
  <div ref={node => { map.set(id, node); }} />
  ```

---

## 3. TypeScript Changes (`@types/react` v19)

- `React.FC` / `React.FunctionComponent` does not include `children` implicitly (this was already true in v18 typings, reinforced in v19).
- `useRef` generic typing:
  - In React 18: `useRef<HTMLInputElement>(null)` returned a `RefObject` with read-only `.current`.
  - In React 19: `useRef` always returns a mutable object. `useRef<HTMLInputElement | null>(null)` is standard.
- Removed legacy types: `React.ReactHTML`, `React.ReactSVG`, `React.ChildContextProvider`.
