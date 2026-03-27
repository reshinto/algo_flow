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

### Storybook

- Every component gets at least one story per significant state variant
- Visual regression via `@storybook/test-runner`
- Test language switching in CodePanel stories
- Test responsive behavior in layout stories

### E2E (Playwright)

- The E2E test suite lives in `e2e/algoflow_e2e.mjs` at the project root
- Run manually: `npm run e2e` (headless/CI) or `npm run e2e:headed` (visible browser)
- The `session-end-e2e-check.sh` Stop hook runs the suite automatically in headless mode whenever any `.tsx`, `.css`, `.html`, or `e2e/algoflow_e2e.mjs` file is modified — it starts the dev server if one is not already running and blocks git operations on failure
- When adding a new algorithm or visualizer component, add it to the `algorithms` array in `e2e/algoflow_e2e.mjs` with all 14 checks (select, playback ×6, language tabs ×3, keyboard ×3, educational drawer ×2) plus an entry in `inputTests` if it has an input editor
- Test at 3 viewports: desktop (1280), tablet (768), mobile (375)
- Assert on visual elements, not implementation details

### What to Test for Each Algorithm

- Pure algorithm correctness (input/output)
- Step count and step types for known inputs
- Final visual state matches expected
- Educational content is non-empty for all sections
- Source files exist for all supported languages
