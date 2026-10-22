---
name: framework-upgrade
description: Analyze, plan, and migrate existing React, Next.js, and Vue projects to a requested or latest stable version using official documentation, version-specific migration guides, and verified project checks.
---

# Framework Upgrade Skill

## Objective

Safely upgrade existing projects to a target framework version while preserving existing business logic, architecture, and behavior.

## Supported frameworks

- React and React DOM
- Next.js
- Vue.js
- Related official framework tooling and type definitions

## Mandatory workflow

### 1. Inspect the project

Before modifying anything:
- Read `package.json` and the lockfile.
- Identify the package manager.
- Detect current framework and runtime versions.
- Inspect TypeScript, build tools, linting, and test configuration.
- Identify routing architecture and application entry points.
- Identify dependencies that may be incompatible with the target version.
- Inspect existing business logic and public APIs.

Do not assume the project architecture.

### 2. Establish the target version

If the user requests a specific version, use that version.

If the user requests the latest version:
- Verify the latest stable release from official sources.
- Do not automatically select alpha, beta, experimental, or canary.
- Check supported Node.js and package manager versions.
- Check peer dependency compatibility.

Never invent version numbers.

### 3. Read official documentation

Use the official sources first:
- **React**: https://react.dev/
- **React upgrade guide**: https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- **Next.js**: https://nextjs.org/docs
- **Next.js upgrade guide**: https://nextjs.org/docs/app/getting-started/upgrading
- **Vue**: https://vuejs.org/
- **Vue migration guide**: https://v3-migration.vuejs.org/

Find documentation relevant to both the current and target versions.

Identify:
- Breaking changes
- Deprecated and removed APIs
- Changed hooks and function signatures
- Changed component lifecycle behavior
- Configuration changes
- Runtime and TypeScript changes
- Required dependency upgrades
- Official codemods and migration tools

If official documentation cannot be accessed, state that limitation and do not claim verification.

### 4. Map changes to the codebase

For each documented change:
- Find affected files and usages.
- Explain the current behavior.
- Explain the target-version behavior.
- Propose the smallest safe change.
- Check whether third-party packages are affected.
- Preserve existing business logic unless changes are necessary.

Do not replace working APIs merely because a newer alternative exists. Verify whether replacement is required.

### 5. Prepare a migration plan

Classify findings as:
- Breaking change
- Deprecated API
- Optional improvement
- Dependency incompatibility
- Potential regression

List affected files, migration steps, risks, and validation commands.

Prefer incremental upgrades across major versions when required by official migration guides or dependency constraints.

### 6. Apply changes safely

- Preserve existing project conventions.
- Use official codemods where appropriate.
- Review codemod output before accepting it.
- Do not overwrite configuration without inspecting it.
- Do not remove dependencies without checking their usage.
- Do not silently change routing architecture.
- Do not claim that a command succeeded unless it actually ran.

### 7. Verify the migration

Run available checks appropriate to the project:
- Package installation
- Type checking
- Linting
- Production build
- Unit and integration tests

Inspect runtime errors and migration warnings when possible.

Fix regressions introduced by the migration. Distinguish migration failures from pre-existing failures.

### 8. Final report

Report:
1. Original and target versions
2. Official documentation consulted
3. Breaking changes found
4. Files modified and reasons
5. Dependencies upgraded or blocked
6. Commands executed and actual results
7. Remaining risks and manual actions

Never claim full compatibility without sufficient verification.
