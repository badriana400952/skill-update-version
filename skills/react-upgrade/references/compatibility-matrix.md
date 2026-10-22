# React Compatibility Matrix

| React Version | Minimum Node.js | Minimum TypeScript | React DOM Package | Typical Test Library | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **React 17** | Node 12+ | TS 3.8+ | `react-dom@^17` | `@testing-library/react@^12` | New JSX transform introduced |
| **React 18** | Node 16+ | TS 4.4+ | `react-dom@^18` | `@testing-library/react@^13/14` | Concurrency, `createRoot`, automatic batching |
| **React 19** | Node 18.18+ / 20+ | TS 5.0+ | `react-dom@^19` | `@testing-library/react@^16+` | Actions, ref as prop, removal of defaultProps & legacy root |

## Ecosystem Compatibility for React 19

| Package | React 19 Compatible Version | Notes / Workaround |
| :--- | :--- | :--- |
| `@types/react` | `^19.0.0` | Required when bumping React |
| `@testing-library/react`| `>= 16.0.0` | Older versions fail on `act` or `ReactDOM.render` |
| `react-router-dom` | `>= 6.28.0` / v7 | Check peer dependency warnings |
| `framer-motion` | `>= 11.11.0` | Ensure motion supports React 19 types |
| `@mui/material` | `>= 6.0.0` (with MUI v6) | Check if peer dependency flags are needed if staying on v5 |
| `styled-components` | `>= 6.1.13` | Check compiler compatibility |
