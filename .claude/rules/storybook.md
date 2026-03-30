---
paths:
  - "**/*.stories.tsx"
  - ".storybook/**"
---

## Storybook Rules

- Pipeline stories (`*.Pipeline.stories.tsx`) live in algorithm directories, not `src/components/`
- Component stories remain co-located with their components in `src/components/`
- Every component gets at least one story per significant state variant
- Visual regression via `@storybook/test-runner`
- Test language switching in CodePanel stories
- Test responsive behavior in layout stories
