---
name: strict-typescript-review
description: Review code for strict TypeScript compliance including noUncheckedIndexedAccess, discriminated unions, tuple types, and runtime validation
user-invocable: true
---

# Strict TypeScript Review

## Task

Review code changes for strict TypeScript compliance, proper type patterns, and runtime validation at system boundaries.

## Instructions

1. Identify changed or new TypeScript files
2. Check each file against the checklist below
3. Flag violations with specific fix suggestions

## Checklist

### No `any` Types

- Zero `any` usage — use `unknown` with explicit type narrowing
- No `@ts-ignore` or `@ts-expect-error` without a comment explaining why
- Generic type parameters have constraints where possible

### Strict Index Access

- `noUncheckedIndexedAccess` compliance: array indexing returns `T | undefined`
- Coordinate/pair arrays use explicit tuple types: `[number, number][]` not `number[][]`
- Map/Record lookups handle the `undefined` case
- Destructuring from indexed access includes undefined checks

### Discriminated Unions

- `VisualState.kind` switches are exhaustive (use `never` in default case)
- `ExecutionStep.type` handled for all variants
- No type assertions (`as Type`) to bypass union narrowing — use type guards instead
- New union members added to all existing switch/if chains

### Vite + React 19 Patterns

- Source file imports use Vite `?raw` glob patterns
- No `fetch()` or dynamic `import()` with string interpolation for source loading
- `React.lazy` used with `Suspense` boundary for code-split components
- Hook dependency arrays are complete — no missing deps
- `satisfies` operator used for type-safe constant definitions

### Runtime Validation

- User input from editors validated before passing to algorithm execution
- Source file content validated after glob import (file might not exist)
- Type guards at system boundaries: external data → validated internal types
- No trusting `JSON.parse()` output without validation

## Output Format

- PASS: [file:line] - correct usage
- WARN: [file:line] - suboptimal pattern, not a bug
- FAIL: [file:line] - violation + suggested fix
