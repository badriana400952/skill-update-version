# General Framework Upgrade Guidelines

1. **Anti-Hallucination Directives**:
   - Never assume an API parameter or hook behavior from memory if you are uncertain.
   - Cross-check against official release notes and official migration guides.
   - If offline or documentation is unreachable, use the local curated references in `references/`.

2. **Dependency Resolution Strategy**:
   - Check peer dependencies before executing `install`.
   - If peer dependency conflicts occur (e.g., npm ERESOLVE):
     - Check if the blocking package has a newer version supporting the target framework.
     - If an ecosystem package is abandoned, document it as a blocking risk instead of blindly passing `--force` or `--legacy-peer-deps` without notifying the user.

3. **Incremental Commits**:
   - Commit before starting the migration.
   - Commit after dependencies update and codemod application.
   - Commit after manual fixes and verified test passing.
