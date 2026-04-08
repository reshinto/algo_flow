---
name: tdd
description: TDD workflow adapted for AlgoFlow's 4-part algorithm test matrix (correctness, step generation, pipeline stories, E2E)
user-invocable: true
---

# TDD

## Task

Implement features using test-driven development following AlgoFlow's specific test matrix.

## Instructions

1. Identify the feature type: new algorithm, new component, store change, or bug fix
2. Write tests FIRST following the matrix below
3. Implement the minimum code to pass
4. Refactor while keeping tests green
5. Run the full quality gate before considering done

## Test Matrix by Feature Type

### New Algorithm

Write tests in this order:

1. **Correctness test** (`<algorithm>.test.ts`)

   - Test pure `execute()` function with known inputs/outputs
   - Test edge cases: empty input, single element, already-solved, worst case
   - Use meaningful variable names (no `i`, `j`, `k`)

2. **Step generation test** (`step-generator.test.ts`)

   - Test `generateSteps()` produces expected step count
   - Test step types match expected sequence
   - Test final `visualState` matches expected result
   - Test `highlightedLines` are present for all supported languages

3. **Pipeline story** (`<AlgorithmName>Pipeline.stories.tsx`)

   - Place in `src/algorithms/<category>/<technique>/<algo>/__tests__/`
   - Story renders the full pipeline with sample input

4. **E2E coverage** — auto-discovers from registry. See `rules/testing.md` for spec file convention.

### New Component

1. Unit test for component logic (props, state, events)
2. Storybook story per significant state variant
3. Accessibility test: keyboard navigation, ARIA labels

### Store Change

1. Test slice state transitions for all new actions
2. Test selector return values
3. Test cross-slice interactions if applicable

### Bug Fix

1. Write a failing test that reproduces the bug
2. Fix the bug
3. Verify the test passes

## Rules

- Tests go before implementation — no exceptions
- Coverage thresholds per `rules/testing.md` (80/75/80/80)
- Use `vitest` for unit tests, Playwright for E2E
- Pipeline stories in algorithm `__tests__/` directory
