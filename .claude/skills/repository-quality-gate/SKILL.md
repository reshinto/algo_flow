---
name: repository-quality-gate
description: Run the full quality gate suite (lint, format, typecheck, tests, storybook) and report pass/fail status
user-invocable: true
---

# Repository Quality Gate

## Task

Run all quality checks and block git operations until all pass.

## Checks (in order)

1. **Lint**: `npm run lint`
   - Must exit 0
   - No warnings allowed in CI

2. **Format**: `npm run format:check`
   - Must exit 0
   - All files must conform to Prettier config

3. **Type Check**: `npm run typecheck`
   - Must exit 0
   - No TypeScript errors

4. **Unit Tests**: `npm run test`
   - Must exit 0
   - All tests pass
   - Coverage meets thresholds (80/75/80/80)

5. **Storybook Build**: `npm run storybook:build` (when storybook is configured)
   - Must exit 0
   - All stories compile

## Gate Rules

- ALL checks must pass before: git add, git commit, git push, PR creation
- If any check fails, report the failure and fix before retrying
- Do not use --no-verify or skip hooks
