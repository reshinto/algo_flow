---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
  - "e2e/**"
  - "vitest.config.*"
---

## Testing Rules

### Unit Tests (Vitest)

- Unit tests must target actual algorithm implementations, not only step generators
- Every algorithm needs: correctness tests (pure execute) + step generation tests
- Test tracker methods produce correct ExecutionStep with correct type/metrics
- Test store slice state transitions for all actions
- Test custom hooks with `renderHook`
- Meaningful test variable names (no single chars)

### Coverage Thresholds

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

### E2E (Playwright)

- The E2E suite uses `@playwright/test`; spec files live in `e2e/specs/`, shared helpers in `e2e/helpers/`, config at `e2e/playwright.config.ts`
- Run manually: `npm run e2e` (headless/CI), `npm run e2e:headed` (visible browser), `npm run e2e:debug` (Playwright inspector)
- The `webServer` config in `e2e/playwright.config.ts` auto-starts Vite on port 5174 — no manual dev server needed
- The `session-end-e2e-check.sh` Stop hook runs the suite automatically in headless mode whenever any `.tsx`, `.css`, `.html`, or `e2e/specs/` file is modified — it blocks git operations on failure
- When adding a new algorithm, no manual E2E update is needed for basic smoke testing — per-category spec files auto-discover algorithms from the registry. Add a test in `e2e/specs/input-editors.spec.ts` only if the algorithm has a custom input editor
- Per-category spec files use `test.describe.configure({ mode: "serial" })` and `@playwright/test` `test()`/`expect()` patterns — not the old `check()`/`results[]` custom runner pattern
- Test at 3 viewports: desktop (1280), tablet (768), mobile (375)
- Assert on visual elements, not implementation details
- NEVER use hardcoded delays (`waitForTimeout`, `sleep`, `setTimeout`-based waits) — always wait for a specific element, selector, or DOM condition using `waitFor`, `waitForSelector`, or `waitForFunction`. Hardcoded waits degrade performance and create flaky tests. Enforced by PostToolUse hook `ban-hardcoded-waits.sh`

### What to Test for Each Algorithm

- Pure algorithm correctness (input/output)
- Step count and step types for known inputs
- Final visual state matches expected
- Educational content is non-empty for all sections
- Source files exist for all supported languages
