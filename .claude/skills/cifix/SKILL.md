# CI Fix

Run the full CI quality gate and fix all failures until everything passes green.

## Steps

1. Run `npm run lint` — fix all ESLint errors
2. Run `npm run format` — fix all Prettier formatting issues
3. Run `npm run typecheck` — fix all TypeScript type errors
4. Run `npm test` — fix all unit test failures
5. Run `npm run e2e` — fix any failing or flaky E2E tests
6. Repeat the sequence until all five commands exit clean
7. Stage and commit all changes with a descriptive message

## Rules

- Do not stop after fixing one category — run all steps every time
- Do not use `--no-verify` or skip hooks
- For E2E tests, the dev server starts automatically via hooks — do not start it manually
- Fix root causes; do not suppress errors with `eslint-disable` or `@ts-ignore` unless genuinely necessary
