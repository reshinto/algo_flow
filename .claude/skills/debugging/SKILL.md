---
name: debugging
description: Systematic debugging with AlgoFlow-specific diagnostic paths for step generation, visualization, playback, and source loading
user-invocable: true
---

# Debugging

## Task

Systematically debug issues using AlgoFlow-specific diagnostic paths before proposing fixes.

## Instructions

1. Identify the symptom category below
2. Follow the diagnostic path for that category
3. Isolate the root cause with evidence
4. Propose a minimal fix

## Diagnostic Paths

### Step Generation Bugs

Symptoms: wrong step count, incorrect step types, missing steps, incorrect final state

1. Check tracker method calls — are all operations producing steps?
2. Verify `ExecutionStep.type` values match expected sequence
3. Compare step count against known-good inputs (use unit tests)
4. Check `visualState.kind` matches expected category
5. Verify line mappings (`highlightedLines`) match actual source file lines
6. Test edge cases: empty input, single element, already sorted, worst case

### Visualization Bugs

Symptoms: wrong colors, missing elements, animation glitches, layout issues

1. Check `VisualState` discriminated union — is correct `kind` returned?
2. Verify the right visualizer component is selected for the `kind`
3. Check Framer Motion config — spring parameters, exit transitions
4. Verify `prefers-reduced-motion` fallback works
5. Check Tailwind design tokens — using CSS custom properties, not raw hex?
6. Test all 3 breakpoints: desktop (1280px), tablet (768px), mobile (375px)

### Playback Bugs

Symptoms: stuck playback, wrong step displayed, speed not changing, reset not working

1. Check Zustand `playback-slice` state transitions
2. Verify step index is within bounds (0 to steps.length - 1)
3. Check `setInterval` timing in `usePlaybackEngine`
4. Look for stale selectors — are they memoized correctly?
5. Verify reset action resets index to 0 AND clears interval

### Source Loading / Highlighting Bugs

Symptoms: empty code panel, wrong language, misaligned highlighting

1. Verify Vite `?raw` glob import returns content (not `{}`)
2. Check file paths in glob pattern — are they statically analyzable?
3. Verify `LineHighlight` mappings per language match actual source file line numbers
4. Check all 6 languages have source files AND line mappings
5. Test language tab switching — does `useAlgorithmSource` update correctly?

### Grid Editing Bugs (Pathfinding)

Symptoms: walls not toggling, start/end not moving, state persisting

1. Check Zustand `algorithm-slice.input` — is grid state stored there?
2. Verify no `localStorage` writes (non-persistence rule)
3. Check wall toggle: can't place on start/end nodes
4. Check start/end drag: can't place on walls, must stay in bounds
5. Verify state resets on algorithm switch

### Build / Import Bugs

Symptoms: module not found, circular dependencies, tree-shaking issues

1. Check `@/` alias resolution in `tsconfig.json`
2. Verify no circular dependencies: `registry` → `algorithms` → `registry`
3. Check Vite glob patterns — are paths statically analyzable? (no string interpolation)
4. Run `npx tsc -b --noEmit` for type errors
5. Check barrel imports in `src/algorithms/index.ts`

## Rules

- Diagnose before fixing — understand the root cause first
- One fix at a time — don't combine multiple changes
- Write a failing test that reproduces the bug before fixing
- Verify the fix doesn't break other tests
