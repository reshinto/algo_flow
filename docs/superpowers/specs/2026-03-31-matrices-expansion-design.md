# Matrices Algorithm Category Expansion Design Spec

**Date:** 2026-03-31
**Status:** Approved
**Scope:** Expand matrices from 1 algorithm to 20 across 5 technique subcategories

## Problem

The matrices category has only 1 algorithm (Spiral Order). Other mature categories have 25-30+. This expansion brings matrices to parity with comprehensive coverage of traversal, transformation, search, construction, and layer operations.

## Architecture

### Technique-Specific Sub-Trackers

4 new trackers, all extending `BaseTracker`, all emitting `MatrixVisualState` (kind: `"matrix"`):

| Tracker                   | File                                          | Purpose                                   |
| ------------------------- | --------------------------------------------- | ----------------------------------------- |
| MatrixTracker (exists)    | `src/trackers/matrix-tracker.ts`              | Traversal: collect, direction, boundary   |
| MatrixTransformTracker    | `src/trackers/matrix-transform-tracker.ts`    | Swap, mark, zero, flip cells              |
| MatrixSearchTracker       | `src/trackers/matrix-search-tracker.ts`       | Compare, find, eliminate regions          |
| MatrixConstructionTracker | `src/trackers/matrix-construction-tracker.ts` | Place, compute, verify cells              |
| MatrixLayerTracker        | `src/trackers/matrix-layer-tracker.ts`        | Layer selection, processing, accumulation |

### Type Extensions (`src/types/execution.ts`)

**New MatrixCellState values:**
`"swapping"`, `"swapped"`, `"zeroed"`, `"marked"`, `"flipped"`, `"comparing"`, `"found"`, `"searching"`, `"eliminated"`, `"placed"`, `"computing"`, `"layer-active"`, `"layer-processed"`

**New StepType values:**
`"swap-cells"`, `"mark-cell"`, `"zero-cell"`, `"flip-cell"`, `"compare-cell"`, `"mark-found"`, `"eliminate-region"`, `"place-value"`, `"compute-value"`, `"select-layer"`, `"process-layer"`, `"accumulate"`

**New optional fields on MatrixVisualState:**

- `operationLabel?: string` - status bar label
- `swapSource?: [number, number] | null` - transform swap source
- `swapTarget?: [number, number] | null` - transform swap target
- `searchRegion?: { topRow: number; bottomRow: number; leftCol: number; rightCol: number } | null`
- `searchTarget?: number | null`
- `fillOrder?: number[]` - construction fill sequence
- `activeLayer?: number | null` - current ring index
- `totalLayers?: number`
- `phase?: string` - general operation phase
- `scalarResult?: number | null` - scalar return value
- `originalCells?: MatrixCell[][] | null` - before/after comparison

## Algorithm List (20 total)

### 1. Traversal (4) - MatrixTracker

| #   | Algorithm               | Directory                            | Complexity            |
| --- | ----------------------- | ------------------------------------ | --------------------- |
| 1   | Spiral Order (exists)   | `traversal/spiral-order/`            | O(m\*n) / O(1)        |
| 2   | Diagonal Traversal      | `traversal/diagonal-traversal/`      | O(m\*n) / O(min(m,n)) |
| 3   | Zigzag Traversal        | `traversal/zigzag-traversal/`        | O(m\*n) / O(min(m,n)) |
| 4   | Anti-Diagonal Traversal | `traversal/anti-diagonal-traversal/` | O(m\*n) / O(1)        |

### 2. Transformation (5) - MatrixTransformTracker

| #   | Algorithm         | Directory                           | Complexity     |
| --- | ----------------- | ----------------------------------- | -------------- |
| 5   | Rotate Matrix 90  | `transformation/rotate-matrix/`     | O(n^2) / O(1)  |
| 6   | Transpose Matrix  | `transformation/transpose-matrix/`  | O(m\*n) / O(1) |
| 7   | Set Matrix Zeroes | `transformation/set-matrix-zeroes/` | O(m\*n) / O(1) |
| 8   | Flip Image        | `transformation/flip-image/`        | O(m\*n) / O(1) |
| 9   | Game of Life      | `transformation/game-of-life/`      | O(m\*n) / O(1) |

### 3. Search (4) - MatrixSearchTracker

| #   | Algorithm                  | Directory                            | Complexity                |
| --- | -------------------------- | ------------------------------------ | ------------------------- |
| 10  | Search 2D Matrix           | `search/search-2d-matrix/`           | O(log(m\*n)) / O(1)       |
| 11  | Search 2D Matrix II        | `search/search-2d-matrix-ii/`        | O(m+n) / O(1)             |
| 12  | Kth Smallest Sorted Matrix | `search/kth-smallest-sorted-matrix/` | O(n\*log(max-min)) / O(1) |
| 13  | Island Count               | `search/island-count/`               | O(m*n) / O(m*n)           |

### 4. Construction (4) - MatrixConstructionTracker

| #   | Algorithm         | Directory                        | Complexity     |
| --- | ----------------- | -------------------------------- | -------------- |
| 14  | Spiral Matrix II  | `construction/spiral-matrix-ii/` | O(n^2) / O(1)  |
| 15  | Toeplitz Matrix   | `construction/toeplitz-matrix/`  | O(m\*n) / O(1) |
| 16  | Pascal's Triangle | `construction/pascals-triangle/` | O(n^2) / O(1)  |
| 17  | Valid Sudoku      | `construction/valid-sudoku/`     | O(1) / O(1)    |

### 5. Layer Operations (3) - MatrixLayerTracker

| #   | Algorithm             | Directory                                 | Complexity     |
| --- | --------------------- | ----------------------------------------- | -------------- |
| 18  | Rotate Layer by Layer | `layer-operations/rotate-layer-by-layer/` | O(n^2) / O(1)  |
| 19  | Matrix Diagonal Sum   | `layer-operations/matrix-diagonal-sum/`   | O(n) / O(1)    |
| 20  | Reshape Matrix        | `layer-operations/reshape-matrix/`        | O(m\*n) / O(1) |

## Per-Algorithm Deliverables

Each algorithm produces 10 files:

- `index.ts` - AlgorithmDefinition + registry.register()
- `step-generator.ts` - ExecutionStep[] using technique tracker
- `educational.ts` - 7-section EducationalContent
- `<algorithm>.test.ts` - 8+ correctness tests
- `step-generator.test.ts` - 6+ step generation tests
- `<Algorithm>Pipeline.stories.tsx` - 3-4 visual snapshots
- `sources/<algorithm>.ts` - TypeScript with @step markers
- `sources/<algorithm>.py` - Python with @step markers
- `sources/<Algorithm>.java` - Java with @step markers
- Entry in `src/types/fn-import.d.ts`

## Files Modified

- `src/types/execution.ts` - MatrixCellState, StepType, MatrixVisualState extensions
- `src/trackers/index.ts` - Export 4 new trackers
- `src/types/fn-import.d.ts` - 19 new function declarations
- `src/components/visualization/MatrixVisualizer.tsx` - New cell state colors, optional overlays
- `e2e/algoflow_e2e.mjs` - 19 new algorithm entries (auto-discovered)

## Implementation Phases with Model Assignment

| Phase    | Description                                                    | Claude Model | Rationale                                    |
| -------- | -------------------------------------------------------------- | ------------ | -------------------------------------------- |
| Phase 0  | Foundation (types, trackers, visualizer)                       | Opus         | Architectural decisions, type system design  |
| Phase 1  | Traversal (3 new algorithms)                                   | Sonnet       | Implementation following established pattern |
| Phase 2  | Transformation (tracker + 5 algorithms)                        | Sonnet       | Implementation with new tracker template     |
| Phase 3  | Search (tracker + 4 algorithms)                                | Sonnet       | Implementation following tracker pattern     |
| Phase 4  | Construction (tracker + 4 algorithms)                          | Sonnet       | Implementation following tracker pattern     |
| Phase 5  | Layer Operations (tracker + 3 algorithms)                      | Sonnet       | Implementation following tracker pattern     |
| Phase 6  | Code Review                                                    | Opus         | Quality review, architectural consistency    |
| Phase 7  | QA Testing                                                     | Sonnet       | Run all tests, fix failures                  |
| Phase 8  | Visual Browser Preview (MCP Playwright)                        | Opus         | Judgment calls on visual correctness         |
| Phase 9  | E2E Testing                                                    | Sonnet       | Run E2E, fix failures                        |
| Phase 10 | Documentation Updates                                          | Sonnet       | Update docs, README                          |
| Phase 11 | Quality Gate + Git (lint, format, typecheck, commit, push, PR) | Opus         | Final review, PR creation                    |

## Master Checklist

### Phase 0: Foundation

- [ ] Create branch `feat/matrices-expand-algorithms` from main
- [ ] Extend `MatrixCellState` in `src/types/execution.ts`
- [ ] Add new `StepType` values in `src/types/execution.ts`
- [ ] Add optional fields to `MatrixVisualState` in `src/types/execution.ts`
- [ ] Create `MatrixTransformTracker` in `src/trackers/`
- [ ] Create `MatrixSearchTracker` in `src/trackers/`
- [ ] Create `MatrixConstructionTracker` in `src/trackers/`
- [ ] Create `MatrixLayerTracker` in `src/trackers/`
- [ ] Add tracker tests for all 4 new trackers
- [ ] Export new trackers from `src/trackers/index.ts`
- [ ] Update `MatrixVisualizer.tsx` for new cell states and overlays
- [ ] Verify typecheck passes after foundation changes

### Phase 1: Traversal (3 new algorithms)

- [ ] Diagonal Traversal (all 10 files)
- [ ] Zigzag Traversal (all 10 files)
- [ ] Anti-Diagonal Traversal (all 10 files)
- [ ] Add fn-import.d.ts entries for 3 traversal algorithms

### Phase 2: Transformation (5 algorithms)

- [ ] Rotate Matrix 90 (all 10 files)
- [ ] Transpose Matrix (all 10 files)
- [ ] Set Matrix Zeroes (all 10 files)
- [ ] Flip Image (all 10 files)
- [ ] Game of Life (all 10 files)
- [ ] Add fn-import.d.ts entries for 5 transformation algorithms

### Phase 3: Search (4 algorithms)

- [ ] Search 2D Matrix (all 10 files)
- [ ] Search 2D Matrix II (all 10 files)
- [ ] Kth Smallest Sorted Matrix (all 10 files)
- [ ] Island Count (all 10 files)
- [ ] Add fn-import.d.ts entries for 4 search algorithms

### Phase 4: Construction (4 algorithms)

- [ ] Spiral Matrix II (all 10 files)
- [ ] Toeplitz Matrix (all 10 files)
- [ ] Pascal's Triangle (all 10 files)
- [ ] Valid Sudoku (all 10 files)
- [ ] Add fn-import.d.ts entries for 4 construction algorithms

### Phase 5: Layer Operations (3 algorithms)

- [ ] Rotate Layer by Layer (all 10 files)
- [ ] Matrix Diagonal Sum (all 10 files)
- [ ] Reshape Matrix (all 10 files)
- [ ] Add fn-import.d.ts entries for 3 layer-operations algorithms

### Phase 6: Code Review

- [ ] Review all new trackers for architectural consistency
- [ ] Review all algorithms for naming conventions compliance
- [ ] Review all tests for adequate coverage
- [ ] Review all educational content for completeness
- [ ] Review all source files for @step marker accuracy
- [ ] Check for TypeScript strict mode violations (noUncheckedIndexedAccess)
- [ ] Check for single-char variable names
- [ ] Check for missing imports or conflicting names

### Phase 7: QA Testing

- [ ] Run `npm run typecheck` - all pass
- [ ] Run `npm run lint` - all pass
- [ ] Run `npm run format` - all pass
- [ ] Run `npm test` - all pass
- [ ] Verify coverage thresholds: 80/75/80/80
- [ ] Run `npm run storybook:build` - all stories render
- [ ] Fix any failures iteratively

### Phase 8: Visual Browser Preview

- [ ] Open app in browser via MCP Playwright
- [ ] Navigate to each of the 20 matrix algorithms
- [ ] Verify step playback works (forward, backward, reset)
- [ ] Verify code highlighting syncs with steps
- [ ] Verify educational drawer content
- [ ] Verify language tab switching (TS, Python, Java)
- [ ] Fix any visual issues

### Phase 9: E2E Testing

- [ ] Run E2E tests for all 20 matrix algorithms
- [ ] Verify all 14 checks pass per algorithm
- [ ] Fix any E2E failures
- [ ] Verify no regressions in other categories

### Phase 10: Documentation Updates

- [ ] Update README if matrices section exists
- [ ] Update any algorithm count references
- [ ] Verify all barrel exports are correct

### Phase 11: Quality Gate + Git

- [ ] Run full quality gate: lint + format + typecheck + tests
- [ ] Auto-fix any lint/format/type issues
- [ ] `git add` all changes
- [ ] `git commit` with descriptive message
- [ ] `git push` to remote
- [ ] Create GitHub PR

## Verification

1. `npm run typecheck` - all new types compile
2. `npm run lint && npm run format` - code quality
3. `npm test` - all correctness + step generation tests pass
4. `npm run storybook:build` - all pipeline stories render
5. E2E tests pass for all 20 matrix algorithms
6. Coverage thresholds: 80% statements, 75% branches, 80% functions, 80% lines
7. Visual browser preview of each algorithm
