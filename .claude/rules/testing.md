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

- Full user journeys: algorithm selection, playback, input editing
- Test at 3 viewports: desktop (1280), tablet (768), mobile (375)
- Assert on visual elements, not implementation details

### What to Test for Each Algorithm

- Pure algorithm correctness (input/output)
- Step count and step types for known inputs
- Final visual state matches expected
- Educational content is non-empty for all sections
- Source files exist for all supported languages
