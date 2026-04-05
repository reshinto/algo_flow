# Stacks & Queues Expansion Design

**Date:** 2026-04-05
**Status:** Draft
**Scope:** Expand stacks-queues category from 1 to 28 algorithms with 3 new tracker variants

## Context

The stacks-queues category currently has only `valid-parentheses` under `validation/`. This is the thinnest category in AlgoFlow despite stacks and queues being fundamental data structures taught in every CS course. The goal is comprehensive coverage of classic stack and queue algorithms, balanced across both data structures (16 stack, 12 queue), organized by technique.

4 monotonic stack algorithms already exist in `arrays/stack-based/` (next-greater-element, daily-temperatures, largest-rectangle-histogram, trapping-rain-water) — these will NOT be duplicated.

## Algorithm Inventory (28 total, 27 new)

### validation (3)

| Algorithm | Default Input | Tracker | Difficulty |
|-----------|--------------|---------|------------|
| valid-parentheses *(existing)* | `"({[]})"` | StackQueueTracker | Easy |
| min-remove-to-make-valid | `"a(b(c)d"` | StackQueueTracker | Medium |
| longest-valid-parentheses | `"(()())"` | StackQueueTracker | Hard |

### monotonic-stack (3)

| Algorithm | Default Input | Tracker | Difficulty |
|-----------|--------------|---------|------------|
| online-stock-span | `[100, 80, 60, 70, 60, 75, 85]` | NumericStackTracker | Medium |
| remove-k-digits | `{ num: "1432219", k: 3 }` | StackQueueTracker | Medium |
| sum-of-subarray-minimums | `[3, 1, 2, 4]` | NumericStackTracker | Medium |

### expression-evaluation (3)

| Algorithm | Default Input | Tracker | Difficulty |
|-----------|--------------|---------|------------|
| evaluate-reverse-polish | `["2","1","+","3","*"]` | ExpressionTracker | Medium |
| basic-calculator | `"1 + (2 - 3)"` | ExpressionTracker | Hard |
| infix-to-postfix | `"a+b*(c-d)"` | ExpressionTracker | Medium |

### stack-design (4)

| Algorithm | Default Input | Tracker | Difficulty |
|-----------|--------------|---------|------------|
| min-stack | `[5, 3, 7, 1, 8]` | NumericStackTracker | Medium |
| asteroid-collision | `[5, 10, -5]` | NumericStackTracker | Medium |
| decode-string | `"3[a2[c]]"` | StackQueueTracker | Medium |
| max-frequency-stack | `[5, 7, 5, 7, 4, 5]` | NumericStackTracker | Hard |

### stack-applications (3)

| Algorithm | Default Input | Tracker | Difficulty |
|-----------|--------------|---------|------------|
| simplify-path | `"/a/./b/../../c/"` | StackQueueTracker | Medium |
| backspace-string-compare | `{ s: "ab#c", t: "ad#c" }` | StackQueueTracker | Easy |
| remove-all-adjacent-duplicates | `"abbaca"` | StackQueueTracker | Easy |

### queue-operations (4)

| Algorithm | Default Input | Tracker | Difficulty |
|-----------|--------------|---------|------------|
| sliding-window-maximum | `{ nums: [1,3,-1,-3,5,3,6,7], k: 3 }` | QueueTracker | Hard |
| implement-queue-using-stacks | `[1, 2, 3, 4, 5]` | QueueTracker | Easy |
| implement-stack-using-queues | `[1, 2, 3, 4, 5]` | QueueTracker | Easy |
| number-of-recent-calls | `[1, 100, 3001, 3002]` | QueueTracker | Easy |

### queue-design (4)

| Algorithm | Default Input | Tracker | Difficulty |
|-----------|--------------|---------|------------|
| design-circular-queue | `{ operations: ["enqueue 1","enqueue 2","dequeue","enqueue 3"], capacity: 3 }` | QueueTracker | Medium |
| design-circular-deque | `{ operations: ["pushBack 1","pushFront 2","popBack","pushBack 3"], capacity: 3 }` | QueueTracker | Medium |
| task-scheduler | `{ tasks: ["A","A","A","B","B","B"], cooldown: 2 }` | QueueTracker | Medium |
| moving-average-from-stream | `{ values: [1, 10, 3, 5], windowSize: 3 }` | QueueTracker | Easy |

### queue-applications (4)

| Algorithm | Default Input | Tracker | Difficulty |
|-----------|--------------|---------|------------|
| generate-binary-numbers | `{ count: 10 }` | QueueTracker | Easy |
| interleave-first-half-queue | `[1, 2, 3, 4, 5, 6]` | QueueTracker | Medium |
| first-non-repeating-char-stream | `"aabcbcd"` | QueueTracker | Medium |
| flatten-nested-list-iterator | `[[1,[2]],3,[4,[5,6]]]` | QueueTracker | Medium |

**Difficulty spread:** 7 Easy, 15 Medium, 4 Hard (+ 1 existing Easy)

## Tracker Variants (4 total)

### StackQueueTracker (existing, unchanged)
- **For:** String/character-based stack problems
- **Algorithms:** valid-parentheses, min-remove-to-make-valid, longest-valid-parentheses, decode-string, simplify-path, backspace-string-compare, remove-all-adjacent-duplicates, remove-k-digits
- **Constructor:** `(inputString: string, lineMap: LineMap)`

### NumericStackTracker (new)
- **File:** `src/trackers/numeric-stack-tracker.ts`
- **For:** Number array + stack problems
- **Algorithms:** online-stock-span, sum-of-subarray-minimums, min-stack, asteroid-collision, max-frequency-stack
- **Constructor:** `(inputArray: number[], lineMap: LineMap)`
- **Key methods:** `initialize()`, `processElement(idx)`, `pushIndex(idx)`, `popAndResolve(poppedIdx, resolvedValue)`, `maintainMonotonic(poppedIdx)`, `pushAuxiliary(value)`, `popAuxiliary()`, `complete(resultArray)`
- **Visual state fields used:** `inputArray`, `stackElements`, `auxiliaryStack`, `resultArray`, `monotonicOrder`

### ExpressionTracker (new)
- **File:** `src/trackers/expression-tracker.ts`
- **For:** Token-based expression parsing and evaluation
- **Algorithms:** evaluate-reverse-polish, basic-calculator, infix-to-postfix
- **Constructor:** `(tokens: string[], lineMap: LineMap)`
- **Key methods:** `initialize()`, `processToken(idx)`, `pushOperand(value)`, `pushOperator(op)`, `popAndEvaluate(op, operandA, operandB, result)`, `outputToken(token)`, `complete(result)`
- **Visual state fields used:** `inputChars` (tokens), `stackElements`, `outputElements`

### QueueTracker (new)
- **File:** `src/trackers/queue-tracker.ts`
- **For:** Queue, deque, and circular buffer problems
- **Algorithms:** sliding-window-maximum, implement-queue-using-stacks, implement-stack-using-queues, number-of-recent-calls, design-circular-queue, design-circular-deque, task-scheduler, moving-average-from-stream, generate-binary-numbers, interleave-first-half-queue, first-non-repeating-char-stream, flatten-nested-list-iterator
- **Constructor:** `(inputArray: (string | number)[], lineMap: LineMap)`
- **Key methods:** `initialize()`, `enqueue(value)`, `dequeue()`, `enqueueFront(value)`, `dequeueRear()`, `peekFront()`, `processElement(idx)`, `transferToAuxiliary()`, `initCircularBuffer(capacity)`, `circularEnqueue(value)`, `circularDequeue()`, `complete()`
- **Visual state fields used:** `queueElements`, `stackElements` (for two-stack queue), `circularBuffer`, `inputArray`

## Visual State Extensions

### New optional fields on `StackQueueVisualState`

```typescript
export interface StackQueueVisualState {
  kind: "stack-queue";
  stackElements: StackElement[];
  inputChars: InputChar[];
  inputIndex: number;
  statusMessage: string | null;

  // New optional fields
  inputArray?: NumericInputElement[];
  queueElements?: StackElement[];
  auxiliaryStack?: StackElement[];
  outputElements?: OutputElement[];
  resultArray?: ResultElement[];
  monotonicOrder?: "increasing" | "decreasing" | null;
  circularBuffer?: CircularBufferState;
  phase?: string;
}
```

### New supporting types

```typescript
export type NumericInputState = "default" | "current" | "processed" | "result-pending" | "resolved";
export interface NumericInputElement {
  value: number;
  index: number;
  state: NumericInputState;
}

export type OutputElementState = "default" | "new" | "computed";
export interface OutputElement {
  value: string;
  state: OutputElementState;
}

export type ResultElementState = "default" | "pending" | "resolved";
export interface ResultElement {
  value: number | null;
  index: number;
  state: ResultElementState;
}

export interface CircularBufferState {
  elements: (string | number | null)[];
  frontIndex: number;
  rearIndex: number;
  capacity: number;
}
```

### New StepTypes

Add to the `StepType` union: `"peek"`, `"evaluate"`, `"output"`, `"maintain-monotonic"`, `"enqueue-front"`, `"dequeue-rear"`, `"transfer"`, `"resolve"`.

## Visualizer Extensions

The `StackQueueVisualizer` at `src/components/visualization/StackQueueVisualizer.tsx` conditionally renders new sections:

```
+---------------------------------------------+
|  Input Row (inputChars OR inputArray)        |
+---------------------------------------------+
|                                              |
|   Stack          Queue        Auxiliary      |
|   [col]      [horizontal]      [col]        |
|                                              |
+---------------------------------------------+
|  Output Row (outputElements / resultArray)   |
+---------------------------------------------+
|  Circular Buffer (ring visualization)        |
+---------------------------------------------+
|  Status + Phase + Monotonic badge            |
+---------------------------------------------+
```

**Rendering rules:**
- `inputArray` present -> numbered indexed cells instead of character boxes
- `queueElements` present -> horizontal row, front/rear labels, left-to-right
- `auxiliaryStack` present -> second stack column beside main stack with label
- `outputElements` present -> horizontal token row below main area
- `resultArray` present -> indexed cells with pending/resolved coloring
- `circularBuffer` present -> ring/circle with front/rear pointer arrows and capacity slots
- `monotonicOrder` set -> small badge near stack ("Monotonic Decreasing")
- `phase` set -> label near status message
- All sections use existing CSS variables and Framer Motion with `useReducedMotion`

**New color mappings:**
- `NumericInputState`: reuse InputCharState palette + `result-pending: "--color-viz-comparing"`, `resolved: "--color-viz-sorted"`
- `OutputElementState`: `default: "--color-viz-default"`, `new: "--color-viz-current"`, `computed: "--color-viz-sorted"`
- `ResultElementState`: `default: "--color-viz-default"`, `pending: "--color-viz-comparing"`, `resolved: "--color-viz-sorted"`

## InputEditor Updates

Current: `InputEditor.tsx` hardcodes `StringInputEditor` for `STACKS_QUEUES`.
Updated: Switch to generic introspection pattern (same as sets, matrices, linked-lists).

The InputEditor inspects `defaultInput` shape:
- `inputString: string` -> `StringInputEditor`
- `number[]` or `string[]` -> `ArrayInputEditor`
- Complex objects -> `GenericIntrospectEditor`

## fn-import.d.ts Naming

**Collision avoidance** — existing exports that conflict:
- `taskSchedulerHeap` (line 257) -> our export: `taskSchedulerQueue`
- `slidingWindowMaxDeque` (line 158) -> our export: `slidingWindowMaxMonotonic`
- `dailyTemperatures` (line 162) -> NOT adding (exists in arrays/stack-based)
- `trappingRainWater` (line 156) -> NOT adding (exists in arrays/stack-based)
- `largestRectangleHistogram` (line 157) -> NOT adding (exists in arrays/stack-based)

**27 new exports to add under `// Stacks & Queues` section:**
- `minRemoveToMakeValid`
- `longestValidParentheses`
- `onlineStockSpan`
- `removeKDigits`
- `sumOfSubarrayMinimums`
- `evaluateReversePolish`
- `basicCalculator`
- `infixToPostfix`
- `minStack` (the operation runner, not the data structure class)
- `asteroidCollision`
- `decodeString`
- `maxFrequencyStack`
- `simplifyPath`
- `backspaceStringCompare`
- `removeAllAdjacentDuplicates`
- `slidingWindowMaxMonotonic`
- `implementQueueUsingStacks`
- `implementStackUsingQueues`
- `numberOfRecentCalls`
- `designCircularQueue`
- `designCircularDeque`
- `taskSchedulerQueue`
- `movingAverageFromStream`
- `generateBinaryNumbers`
- `interleaveFirstHalfQueue`
- `firstNonRepeatingCharStream`
- `flattenNestedListIterator`

Each must be verified against the full 320-entry file before writing.

## E2E Considerations

- E2E auto-discovers all algorithms from filesystem — no manual test registration needed
- `e2e/helpers/inputs.ts` needs entries for algorithms with non-standard input shapes:
  - `sliding-window-maximum` (`{ nums, k }`)
  - `backspace-string-compare` (`{ s, t }`)
  - `design-circular-queue` (`{ operations, capacity }`)
  - `design-circular-deque` (`{ operations, capacity }`)
  - `task-scheduler` (`{ tasks, cooldown }`)
  - `moving-average-from-stream` (`{ values, windowSize }`)
  - `generate-binary-numbers` (`{ count }`)
  - `remove-k-digits` (`{ num, k }`)

## Implementation Phases

| Phase | What | Model | Rationale |
|-------|------|-------|-----------|
| 1. Foundation | Types, 3 trackers, tracker barrel exports | Sonnet | Mechanical pattern-following |
| 2. Visualizer | Extend StackQueueVisualizer with conditional sections | Sonnet | UI component, pattern-based |
| 3. Batch 1 | validation (2) + stack-applications (3) — StackQueueTracker | Sonnet | Closest to existing pattern |
| 4. Batch 2 | monotonic-stack (3) + stack-design (4) — NumericStackTracker | Sonnet | New tracker usage |
| 5. Batch 3 | expression-evaluation (3) — ExpressionTracker | Sonnet | Unique token logic |
| 6. Batch 4 | queue-operations (4) + queue-design (4) + queue-applications (4) — QueueTracker | Sonnet | Largest batch, all queue-based |
| 7. InputEditor | Update STACKS_QUEUES case for diverse inputs | Sonnet | Small targeted change |
| 8. Code Review | Review all implementations against plan and coding standards | Opus | Deep analysis needed |
| 9. QA Testing | lint, format, typecheck, unit tests, storybook build | Opus | Judgment on failures |
| 10. Browser Preview | MCP Claude preview — navigate all new algorithms | Opus | Visual judgment |
| 11. E2E Tests | Run E2E suite, fix breakage | Opus | Diagnostic reasoning |

## Per-Algorithm File Checklist

Each new algorithm produces 9 files:
1. `index.ts` — AlgorithmDefinition + registry.register()
2. `step-generator.ts` — step generation with tracker
3. `step-generator.test.ts` — step generation tests
4. `educational.ts` — all 7 educational sections
5. `<algorithm>.test.ts` — correctness tests
6. `<Algorithm>Pipeline.stories.tsx` — Storybook pipeline story
7. `sources/<algorithm>.ts` — TypeScript source with `@step:` markers
8. `sources/<algorithm>.py` — Python source with `@step:` markers
9. `sources/<Algorithm>.java` — Java source with `@step:` markers

Plus: 1 entry in `src/types/fn-import.d.ts`

**Total new files:** 27 algorithms x 9 files + 3 tracker files + tracker barrel update + type extensions + visualizer extension + InputEditor update = **~250 files**

## Verification Plan

1. `npm run lint` -> `npm run format` -> `npm run typecheck` -> `npm test` (all pass)
2. `npm run storybook:build` (27 new pipeline stories compile)
3. Browser preview: navigate to each new algorithm, verify step generation, playback, visualization
4. E2E tests auto-discover and test all 28 stacks-queues algorithms
5. No duplicate entries in fn-import.d.ts
6. No name collisions with existing algorithms in other categories

## Critical Files

- `src/types/execution.ts` — extend StackQueueVisualState, add StepTypes, add supporting types
- `src/trackers/stack-queue-tracker.ts` — reference for new tracker variants
- `src/trackers/index.ts` — export new trackers
- `src/components/visualization/StackQueueVisualizer.tsx` — extend rendering
- `src/components/input-editor/InputEditor.tsx` — update STACKS_QUEUES case
- `src/types/fn-import.d.ts` — 27 new entries, no duplicates
- `e2e/helpers/inputs.ts` — entries for non-standard input shapes
