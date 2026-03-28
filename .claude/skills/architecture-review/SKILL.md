---
name: architecture-review
description: Evaluate architectural decisions for Zustand store design, Vite build optimization, and security-by-design patterns
user-invocable: true
---

# Architecture Review

## Task

Evaluate a proposed or existing architectural change for store design correctness, build performance, and security compliance.

## Instructions

1. Identify the change scope: store slice, component tree, build config, or cross-cutting
2. Review against each area below
3. Provide actionable recommendations

## Review Areas

### Zustand Store Architecture

- Each slice has a single responsibility — no cross-slice state mutations
- Immer middleware used for all state updates (no manual spreading)
- Selectors are memoized to prevent unnecessary re-renders
- Cross-slice coordination uses root store composition, not direct slice imports
- New actions are scoped to a single slice
- State shape is flat where possible — avoid deep nesting

### Vite Build Optimization

- Code splitting uses `React.lazy` + `Suspense` for route-level or heavy components
- Source file loading uses Vite `?raw` glob imports (statically analyzable paths)
- No dynamic `import()` with string interpolation — Vite can't analyze these
- Tree-shaking verified: unused exports don't inflate bundle
- Large dependencies evaluated for lazy loading or lighter alternatives
- Bundle analysis with `rollup-plugin-visualizer` when adding new deps

### Security-by-Design

- No `eval()`, `Function()`, or `innerHTML` in any component
- Monaco editor content treated as untrusted — no execution of user input
- User-provided algorithm inputs (array editors, grid editors) validated before `generateSteps()`
- CSP-compliant patterns: no inline scripts, no `unsafe-eval`
- Educational content rendered safely — no `dangerouslySetInnerHTML`
- Dependencies audited: `npm audit` clean or vulnerabilities documented

### Registry Pattern Integrity

- New algorithms self-register via `registry.register()` at import time
- No circular dependencies between registry, algorithms, and components
- Generic components remain generic — no algorithm-specific logic leaks

## Output Format

- APPROVED: [decision] - rationale for why it's sound
- CONCERN: [area] - risk description + specific mitigation
- BLOCKED: [issue] - must resolve before proceeding
