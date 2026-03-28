---
name: verification
description: Pre-completion verification with AlgoFlow's quality gate sequence and algorithm-specific completeness checks
user-invocable: true
---

# Verification

## Task

Verify all work is complete and correct before claiming done, committing, or creating a PR.

## Steps

### 1. Quality Gate (must all pass)

Run in sequence, fix iteratively:

```bash
npm run lint
npm run format:check
npm run typecheck
npm test
npm run storybook:build
```

### 2. Algorithm Completeness (if algorithm was added/changed)

- [ ] Pure algorithm implementation exists (`<algorithm>.ts`)
- [ ] Source files for all 3 languages: TypeScript, Python, Java
- [ ] Step generator produces correct step count and types
- [ ] All 7 educational content sections present and non-empty
- [ ] Line mappings accurate per source file for all languages
- [ ] Algorithm self-registers via `registry.register()` in `index.ts`
- [ ] Imported in `src/algorithms/index.ts` barrel
- [ ] Correctness unit tests pass
- [ ] Step generation unit tests pass
- [ ] Pipeline story in algorithm directory (not `src/components/`)
- [ ] E2E entry with all 14 checks in `e2e/algoflow_e2e.mjs`

### 3. Coverage Check

```bash
npm run test -- --coverage
```

Verify thresholds: Statements 80%, Branches 75%, Functions 80%, Lines 80%.

### 4. Branch Safety

- Confirm not on `main` or `master`
- Confirm branch name follows `<type>/<description>` convention

### 5. Non-Persistence Check

- No `localStorage` writes for input or grid state
- No URL parameter encoding for state
- State resets on algorithm switch and page reload

## Rules

- Run ALL verification steps — do not skip any
- Evidence before assertions — show command output, not just "tests pass"
- If any step fails, fix before proceeding
