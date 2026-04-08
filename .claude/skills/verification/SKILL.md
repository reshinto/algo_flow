---
name: verification
description: Pre-completion verification with algorithm-specific completeness checks
user-invocable: true
---

# Verification

## Task

Verify all algorithm work is complete and correct before claiming done, committing, or creating a PR.

## Steps

### 1. Algorithm Completeness (if algorithm was added/changed)

- [ ] Pure algorithm implementation exists (`<algorithm>.ts`)
- [ ] Source files for all supported languages per `rules/algorithms.md`
- [ ] Step generator produces correct step count and types
- [ ] All 7 educational content sections present and non-empty
- [ ] Line mappings accurate per source file for all languages
- [ ] Algorithm self-registers via `registry.register()` in `index.ts`
- [ ] Imported in `src/algorithms/index.ts` barrel
- [ ] Correctness unit tests pass
- [ ] Step generation unit tests pass
- [ ] Pipeline story in algorithm `__tests__/` directory
- [ ] E2E auto-discovers from registry — see `rules/testing.md` for spec convention

### 2. Coverage Check

```bash
npm run test -- --coverage
```

Verify thresholds per `rules/testing.md` (80/75/80/80).

### 3. Branch Safety

- Confirm not on `main` or `master`
- Confirm branch name follows `<type>/<description>` convention

### 4. Non-Persistence Check

- No `localStorage` writes for input or grid state
- No URL parameter encoding for state
- State resets on algorithm switch and page reload

## Rules

- Run ALL verification steps — do not skip any
- Evidence before assertions — show command output, not just "tests pass"
- If any step fails, fix before proceeding
- The full quality gate (lint, format, typecheck, test, storybook) runs automatically as a Stop hook at session end — no need to run it here
