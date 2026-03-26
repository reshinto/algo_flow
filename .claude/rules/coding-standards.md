## Coding Standards

### Naming

- No single-character variable names (no `i`, `j`, `k`, `n`, `x`)
- No variable names made from combinations of single characters
- Use meaningful names everywhere: tests, temporary variables, loop iterators
- Examples: `elementIndex`, `outerIndex`, `currentNode`, `arrayLength`

### Code Quality

- Centralize reused strings and metadata in `src/utils/constants.ts`
- Enforce DRY - extract shared logic into utilities or hooks
- Comment intent and purpose where useful, without bloated commentary
- No `any` types - use `unknown` with type narrowing when needed
- Prefer `const` over `let`, never use `var`

### Formatting (Prettier-enforced)

- Double quotes for strings
- 2-space indentation (no tabs)
- Trailing whitespace removal
- Trailing commas everywhere
- 100 character print width
- Semicolons required

### Imports

- Use `@/` path alias for src-relative imports
- Use `type` imports for type-only imports (`import type { ... }`)
- Group imports: external libs, then `@/` paths, then relative paths

### TypeScript

- Strict mode enabled
- `noUncheckedIndexedAccess: true`
- Array destructuring from `number[][]` yields `number | undefined` — use explicit tuple types (`[number, number][]`) for coordinate/pair arrays to avoid index type errors
- Use discriminated unions over type assertions
- Prefer interfaces for object types, types for unions/intersections
