# React Codemod Guide

Official automated transformation tools for React upgrades.

## React 19 Codemods

The React team partnered with the Codemod team to provide official automated migrations:

### Running the Full Migration Recipe
```bash
npx codemod@latest react/19/migration-recipe
```
This runs the composite recipe including:
1. `replace-reactdom-render`: Upgrades legacy `ReactDOM.render` to `createRoot`.
2. `replace-string-ref`: Converts string refs (`this.refs.foo`) to `React.createRef` or callback refs.
3. `prop-types-typescript`: Converts `defaultProps` on function components into default parameter values.
4. `use-context-hook`: Updates deprecated context usage.

### Running Individual Codemods
If you prefer fine-grained control:
```bash
# Replace ReactDOM.render with createRoot
npx codemod@latest react/19/replace-reactdom-render

# Remove defaultProps on function components
npx codemod@latest react/19/remove-default-props

# Update act imports from react-dom/test-utils to react
npx codemod@latest react/19/replace-act-import
```

## Safety Protocol When Running Codemods
1. Ensure git working tree is clean: `git status`.
2. Run codemod on a specific directory or whole project.
3. Review changes: `git diff`.
4. Run `tsc --noEmit` and tests to verify syntax and behavior.
5. Commit with a clear commit message: `chore: run react 19 codemod`.
