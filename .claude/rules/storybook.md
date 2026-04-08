---
paths:
  - "**/*.stories.tsx"
  - ".storybook/**"
---

## Storybook Rules

- Pipeline stories (`*.Pipeline.stories.tsx`) live in the algorithm's `__tests__/` directory alongside test files
- Component stories remain co-located with their components in `src/components/visualization/<category>/`
- Every component gets at least one story per significant state variant
- Visual regression via `@storybook/test-runner`
- Test language switching in CodePanel stories
- Test responsive behavior in layout stories
