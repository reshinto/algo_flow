[← Back to README](../README.md)

# Contributing to AlgoFlow

This guide walks you through everything you need to set up, understand, and extend AlgoFlow — from first clone to merged PR.

## Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Branch Strategy](#branch-strategy)
- [Quality Gate](#quality-gate)
- [Commit Messages](#commit-messages)
- [Pull Request Checklist](#pull-request-checklist)
- [Adding a New Algorithm](#adding-a-new-algorithm) (Steps 1–6)
- [Adding a New Language](#adding-a-new-language)
- [Common Pitfalls & Troubleshooting](#common-pitfalls--troubleshooting)
- [Coding Standards](#coding-standards)

## Prerequisites

| Requirement | Version | Notes                                         |
| ----------- | ------- | --------------------------------------------- |
| Node.js     | 22+     | Use `nvm use` — the repo includes an `.nvmrc` |
| npm         | 10+     | Ships with Node 22                            |
| Git         | 2.30+   | Required for branch workflow                  |

> [!TIP]
> The `.npmrc` file sets `legacy-peer-deps=true` to resolve React 19 peer dependency conflicts. You do not need to pass any extra flags to `npm install`.

## Getting Started

```bash
git clone <repo-url>
cd algo_flow
nvm use          # switches to Node 22
npm install
npm run dev      # http://localhost:5173
```

To verify everything works:

```bash
npm run typecheck && npm run lint && npm run format:check && npm run test
```

## Branch Strategy

> [!IMPORTANT]
> Every new task **must** start on a fresh branch rebased from `main`. This is enforced by a session hook that blocks commits to `main`.

```bash
git checkout main && git pull
git checkout -b <type>/<short-description>
```

Branch name prefixes:

| Prefix      | Use for                    |
| ----------- | -------------------------- |
| `feat/`     | New features or algorithms |
| `fix/`      | Bug fixes                  |
| `chore/`    | Dependencies, config, docs |
| `refactor/` | Code restructuring         |

## Quality Gate

Four checks must pass before any commit. The session Stop hook enforces this automatically:

```bash
npm run typecheck    # TypeScript strict mode
npm run lint         # ESLint
npm run format:check # Prettier
npm run test         # Vitest unit tests
```

If any check fails, fix the issue before committing. Do **not** bypass hooks.

> [!TIP]
> For full CI parity before opening a PR, also run `npm run e2e` (if UI files changed) and `npm run storybook:build` (if components changed).

## Commit Messages

- Use imperative mood: "Add binary search" not "Added binary search"
- No references to AI, Claude, assistants, automation, or "generated" — the `block-ai-attribution.sh` hook enforces this

## Pull Request Checklist

- [ ] All quality gate checks pass
- [ ] E2E tests pass if UI files changed (`npm run e2e`)
- [ ] Storybook builds if components changed (`npm run storybook:build`)
- [ ] New algorithm with input editor? Added entry to `inputTests` in `e2e/algoflow_e2e.mjs` (see [E2E updates](#updating-e2e-tests))

---

## Adding a New Algorithm

This is the most common contribution. Each algorithm lives in its own directory with 5 required files. Use **Bubble Sort** (`src/algorithms/sorting/bubble-sort/`) as a reference implementation.

### Directory Structure

```
src/algorithms/<category>/<algorithm>/
├── step-generator.ts                      # Produces ExecutionStep[] using a tracker
├── educational.ts                         # 7 learning sections
├── index.ts                               # AlgorithmDefinition + registry.register()
├── <algorithm>.test.ts                    # Algorithm correctness tests
├── step-generator.test.ts                 # Step generation tests
├── <Algorithm>Pipeline.stories.tsx        # Storybook pipeline story
└── sources/
    ├── <algorithm>.ts                     # TypeScript source with @step: markers
    ├── <algorithm>.py                     # Python source with @step: markers
    └── <Algorithm>.java                   # Java source with @step: markers
```

### Step 1: Write the Source Files

Source files in `sources/` serve a **dual purpose**:

- **`?raw`** import — raw string displayed in the Monaco code panel (with `@step:` markers intact)
- **`?fn`** import — executable ESM module used for algorithm execution and unit tests (markers stripped automatically by the `vite-plugin-fn-import` plugin)

> [!IMPORTANT]
> The `?fn` suffix is a custom Vite plugin convention. When importing the algorithm function for execution, use:
>
> ```typescript
> import { myAlgorithm } from "./sources/my-algorithm.ts?fn";
> ```
>
> For raw display strings, use `?raw`:
>
> ```typescript
> import typescriptSource from "./sources/my-algorithm.ts?raw";
> ```

#### The `@step:` Annotation System

Every source file must include `// @step:<key>` comments (or `# @step:<key>` for Python) that mark which lines to highlight during each execution step. The `buildLineMapFromSources()` utility parses these markers and produces a per-language line map.

**Rules:**

- Place `// @step:<key>` at the end of the line to highlight
- Multiple keys on one line: `// @step:init,setup`
- Keys must match the `lineMapKey` or `type` used in your step generator's tracker calls
- Every language file must use the **same step keys** — the system maps equivalent logic across languages

**Example** (Bubble Sort TypeScript source):

```typescript
function bubbleSort(inputArray: number[]): number[] {
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  for (let outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
    // @step:outer-loop,mark-sorted
    let swappedThisPass = false; // @step:outer-loop

    for (let innerIndex = 0; innerIndex < arrayLength - 1 - outerIndex; innerIndex++) {
      // @step:inner-loop
      if (sortedArray[innerIndex]! > sortedArray[innerIndex + 1]!) {
        // @step:compare
        const temporaryValue = sortedArray[innerIndex]!; // @step:swap
        sortedArray[innerIndex] = sortedArray[innerIndex + 1]!; // @step:swap
        sortedArray[innerIndex + 1] = temporaryValue; // @step:swap
      }
    }

    if (!swappedThisPass) break; // @step:early-exit
  }

  return sortedArray; // @step:complete
}
```

### Step 2: Write the Step Generator

The step generator uses a **category-specific tracker** to build `ExecutionStep[]`. Each tracker extends `BaseTracker` and provides domain methods.

```typescript
import { SortingTracker } from "@/trackers";
import { buildLineMapFromSources } from "@/utils/source-loader";
import { ALGORITHM_ID } from "@/utils/constants";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MY_ALGORITHM!);

export function generateMyAlgorithmSteps(input: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...input], LINE_MAP);

  tracker.initialize({
    /* variables */
  });

  // Run the algorithm, calling tracker methods at each logical step
  tracker.compare(indexA, indexB, {
    /* variables */
  });
  tracker.swap(indexA, indexB, {
    /* variables */
  });
  tracker.markSorted(index, {
    /* variables */
  });

  tracker.complete({ result: [...input] });
  return tracker.getSteps();
}
```

> [!NOTE]
> The `variables` object passed to tracker methods is included in each `ExecutionStep` and displayed in the explanation panel. Include values that help learners understand the algorithm's state: loop indices, comparison results, running totals, etc.

#### Available Trackers

| Category            | Tracker              | Key Methods                                                                                                                                                                            |
| ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sorting             | `SortingTracker`     | `initialize`, `compare`, `swap`, `markSorted`, `complete`                                                                                                                              |
| Searching           | `SearchingTracker`   | `initialize`, `check`, `narrowRange`, `found`, `notFound`, `complete`                                                                                                                  |
| Graph               | `GraphTracker`       | `initialize`, `visit`, `enqueue`, `dequeue`, `complete`                                                                                                                                |
| Pathfinding         | `PathfindingTracker` | `initialize`, `visit`, `updateDistance`, `reconstructPath`, `complete`                                                                                                                 |
| Dynamic Programming | `DPTracker`          | `initialize`, `compute`, `lookup`, `complete`                                                                                                                                          |
| Arrays              | `ArrayTracker`       | `initialize`, `moveWindow`, `expandWindow`, `shrinkWindow`, `visit`, `swap`, `compareTwo`, `markElement`, `setWindowActive`, `setSecondaryArray`, `updateSecondaryElement`, `complete` |
| Trees               | `TreeTracker`        | `initialize`, `visit`, `traverse`, `complete`                                                                                                                                          |
| Linked Lists        | `LinkedListTracker`  | `initialize`, `traverse`, `reverse`, `complete`                                                                                                                                        |
| Heaps               | `HeapTracker`        | `initialize`, `compare`, `swap`, `siftDown`, `complete`                                                                                                                                |
| Stacks & Queues     | `StackQueueTracker`  | `initialize`, `push`, `pop`, `check`, `complete`                                                                                                                                       |
| Hash Maps           | `HashMapTracker`     | `initialize`, `insert`, `lookup`, `found`, `complete`                                                                                                                                  |
| Strings             | `StringTracker`      | `initialize`, `compare`, `match`, `buildTable`, `complete`                                                                                                                             |
| Matrices            | `MatrixTracker`      | `initialize`, `visit`, `collect`, `updateBounds`, `complete`                                                                                                                           |
| Sets                | `SetTracker`         | `initialize`, `insert`, `check`, `found`, `complete`                                                                                                                                   |

All trackers share `initialize`, `complete`, and `getSteps()` from `BaseTracker`. Check the tracker source in `src/trackers/` for the full method signatures and parameters.

### Step 3: Write the Educational Content

Every algorithm requires an `educational.ts` exporting an `EducationalContent` object with **7 sections**:

```typescript
import type { EducationalContent } from "@/types";

export const myAlgorithmEducational: EducationalContent = {
  overview: "What the algorithm is and why it matters...",
  howItWorks: "Step-by-step explanation of the logic...",
  timeAndSpace: "Time: O(n log n) average. Space: O(n)...",
  bestAndWorst: "Best case: already sorted O(n). Worst case: reverse sorted O(n²)...",
  realWorldUses: "Used in database sorting, file organization...",
  strengthsAndLimitations: "Strengths: simple, in-place. Limitations: slow for large inputs...",
  whenToUse: "Use when: input is small. Avoid when: performance matters at scale...",
};
```

Markdown formatting is supported (bold, headers, code blocks, lists, Mermaid diagrams). Example with rich formatting:

```typescript
howItWorks: `
### Phase 1: Build
Iterate through the array and **compare adjacent elements**.

### Phase 2: Swap
If elements are out of order, swap them:

| Pass | Comparisons | Swaps |
|------|-------------|-------|
| 1    | n - 1       | up to n - 1 |

> Repeat until no swaps occur in a full pass.
`,
```

### Step 4: Write the Registration Module

The `index.ts` file assembles the `AlgorithmDefinition` and self-registers:

```typescript
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { myAlgorithm } from "./sources/my-algorithm.ts?fn"; // executable
import { generateMyAlgorithmSteps } from "./step-generator";
import { myAlgorithmEducational } from "./educational";

import typescriptSource from "./sources/my-algorithm.ts?raw"; // display
import pythonSource from "./sources/my-algorithm.py?raw";
import javaSource from "./sources/MyAlgorithm.java?raw";

const definition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.MY_ALGORITHM!,
    name: "My Algorithm",
    category: CATEGORY.MY_CATEGORY!,
    description: "A brief description",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [5, 3, 8, 1],
  },
  execute: myAlgorithm,
  generateSteps: generateMyAlgorithmSteps,
  educational: myAlgorithmEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(definition);
```

### Step 5: Register and Add Stories

1. Add your algorithm's constants to `src/utils/constants.ts`. `ALGORITHM_ID` is auto-generated from directory names (e.g., `ALGORITHM_ID.MY_ALGORITHM` maps to `"my-algorithm"`). `CATEGORY` is derived from `CATEGORY_LABELS` (e.g., `CATEGORY.SORTING` maps to `"sorting"`). If adding a new category, add its display label to `CATEGORY_LABELS` first.
2. Import the new algorithm in `src/algorithms/index.ts` — this triggers self-registration
3. Add a Storybook pipeline story in the algorithm directory: `src/algorithms/<category>/<algorithm>/<Algorithm>Pipeline.stories.tsx`

> [!NOTE]
> Pipeline stories (end-to-end visualization stories) live with their algorithm. Component stories (e.g., `ArrayVisualizer.stories.tsx`, `Button.stories.tsx`) remain co-located with their components in `src/components/`.

> [!WARNING]
> Forgetting the import in `src/algorithms/index.ts` is the most common mistake. The algorithm will silently not appear in the UI because `registry.register()` never executes.

### Step 6: Add Tests

Every algorithm needs two test files:

- **`<algorithm>.test.ts`** — pure algorithm correctness (input → output)
- **`step-generator.test.ts`** — step count, step types, final visual state

See `src/algorithms/sorting/bubble-sort/` for reference test files.

### Updating E2E Tests

The E2E suite auto-discovers algorithms from the filesystem via `discoverAlgorithms()`. No manual array update is needed for basic smoke testing (select + step generation). You only need to update `e2e/algoflow_e2e.mjs` if the algorithm has a custom input editor — add an entry to the `inputTests` object.

---

## Adding a New Language

1. Add the language to the `SupportedLanguage` type in `src/types/algorithm.ts`
2. Add display label and Monaco language mapping in `src/utils/constants.ts`
3. Create source files for each algorithm in their `sources/` directory (with matching `@step:` keys)
4. Add line mappings for the new language in `src/utils/source-loader.ts` (`LANGUAGE_EXTENSIONS`)

---

## Common Pitfalls & Troubleshooting

> [!WARNING]
> **Algorithm doesn't appear in the UI?** You forgot to import it in `src/algorithms/index.ts`. The registry only fires when the module is imported.

<details>
<summary><strong>Line highlighting doesn't work / shows wrong lines</strong></summary>

- Check that your source files have `// @step:<key>` markers
- Verify the step keys match the `type` or `lineMapKey` in your tracker calls
- Ensure all language files use the same step keys
- Run `buildLineMapFromSources()` in a test to inspect the parsed output

</details>

<details>
<summary><strong>TypeScript errors about <code>T | undefined</code> on array access</strong></summary>

The project uses `noUncheckedIndexedAccess: true`. Array indexing returns `T | undefined`, not `T`. Solutions:

- Use non-null assertion (`arr[i]!`) when you are certain the index is valid
- Use explicit tuple types (`[number, number][]`) instead of `number[][]` for coordinate pairs

</details>

<details>
<summary><strong><code>?fn</code> import not working</strong></summary>

The `?fn` suffix only works for `.ts` files in `sources/` directories. It is powered by a custom Vite plugin (`vite-plugin-fn-import.ts`). Python and Java files are always imported via `?raw` only.

</details>

<details>
<summary><strong>E2E tests fail locally but pass in CI</strong></summary>

- Ensure you have a dev server running (`npm run dev`) or use `npm run e2e` which auto-starts one
- Check that your local Node version matches 22 (`node --version`)
- Clear Playwright cache: `npx playwright install chromium`

</details>

<details>
<summary><strong>Peer dependency warnings during <code>npm install</code></strong></summary>

This is expected. The `.npmrc` file sets `legacy-peer-deps=true` due to React 19 addon compatibility. These warnings are safe to ignore.

</details>

---

## Coding Standards

Key rules to know before writing code:

| Rule                              | Details                                                               |
| --------------------------------- | --------------------------------------------------------------------- |
| **No single-character variables** | Use `elementIndex`, `outerIndex`, `currentNode` — never `i`, `j`, `k` |
| **No `any` types**                | Use `unknown` with type narrowing                                     |
| **`const` over `let`**            | Never use `var`                                                       |

Formatting (double quotes, 2-space indent, trailing commas, semicolons, 100-char print width) and import ordering (external libs → `@/` paths → relative paths) are enforced automatically by Prettier and ESLint. Use `import type { ... }` for type-only imports.

## See Also

- [Architecture](architecture.md) — tech stack, data flow, state management, project structure
- [Testing](testing.md) — unit tests, E2E, Storybook, Chromatic setup
- [Deployment](deployment.md) — Docker, CI/CD pipelines
