[← Back to README](../README.md)

# Architecture

AlgoFlow uses a **registry-driven** architecture with **pre-computed execution steps**.

## Contents

- [Tech Stack](#tech-stack)
- [Data Flow](#data-flow)
- [Core Pattern](#core-pattern)
- [State Management](#state-management)
- [Custom Hooks](#custom-hooks)
- [Responsive Design](#responsive-design)
- [Input Editors](#input-editors)
- [Educational Drawer](#educational-drawer)
- [Project Structure](#project-structure)

## Tech Stack

| Layer       | Technology                             | Purpose                                       |
| ----------- | -------------------------------------- | --------------------------------------------- |
| Framework   | Vite + React 19 + TypeScript (strict)  | Build tooling, UI, type safety                |
| Styling     | Tailwind CSS v4                        | Black-first theme (zinc-950/zinc-900)         |
| State       | Zustand (4 slices + immer)             | Global state management                       |
| Code Editor | Monaco Editor                          | Read-only code display with line highlighting |
| Layout      | react-resizable-panels                 | 3-panel IDE layout on desktop                 |
| Animation   | Framer Motion                          | Bar swaps, grid waves, spring transitions     |
| Testing     | Vitest + Testing Library + Storybook 8 | Unit, visual, and integration testing         |

## Data Flow

```mermaid
flowchart LR
    A["Algorithm Module<br/><code>index.ts</code>"] -- "registry.register()" --> B["AlgorithmRegistry"]
    B -- "selectAlgorithm()" --> C["Zustand Store"]
    C -- "generateSteps(input)" --> D["ExecutionStep[]"]
    D -- "step[currentIndex]" --> E{"VisualState.kind"}
    E -- "array" --> F["ArrayVisualizer"]
    E -- "graph" --> G["GraphVisualizer"]
    E -- "grid" --> H["GridVisualizer"]
    E -- "dp-table" --> I["DPTableVisualizer"]
    E -- "tree / linked-list<br/>heap / stack-queue<br/>hash-map / string<br/>matrix / set" --> J["Other Visualizers"]
```

## Core Pattern

1. Each algorithm **self-registers** via `registry.register(definition)` at import time
2. `generateSteps(input)` produces a full `ExecutionStep[]` array eagerly
3. **Playback is an index pointer** into the step array — instant scrubbing, deterministic replay
4. Category-specific **trackers** build steps with correct visual state and per-language line mappings
5. A **discriminated union** on `VisualState.kind` dispatches to the matching visualizer component

> [!NOTE]
> All UI components are generic — no algorithm-specific logic in the view layer. Adding a new algorithm requires zero changes to any component.

### ExecutionStep

The central data type for playback. Each step is an immutable snapshot:

| Field              | Type                      | Purpose                                       |
| ------------------ | ------------------------- | --------------------------------------------- |
| `index`            | `number`                  | Position in the step array                    |
| `type`             | `StepType`                | Categorizes the step for line-map resolution  |
| `description`      | `string`                  | Human-readable text for the explanation panel |
| `highlightedLines` | `LineHighlight[]`         | Per-language source lines to highlight        |
| `variables`        | `Record<string, unknown>` | Runtime variable snapshot at this step        |
| `visualState`      | `VisualState`             | Discriminated union consumed by visualizers   |
| `metrics`          | `StepMetrics`             | Cumulative operation counts                   |

Defined in `src/types/execution.ts`.

### Trackers

Each algorithm category has a dedicated tracker that extends `BaseTracker`. Trackers provide domain-specific methods (e.g., `compare`, `swap` for sorting) that internally call `pushStep()` to record an `ExecutionStep` with the correct visual state.

All trackers extend `BaseTracker` (`src/trackers/base-tracker.ts`), which provides:

| Member            | Visibility  | Purpose                                                  |
| ----------------- | ----------- | -------------------------------------------------------- |
| `pushStep(input)` | `protected` | Records an `ExecutionStep` with resolved line highlights |
| `getSteps()`      | `public`    | Returns the accumulated `ExecutionStep[]`                |
| `getMetrics()`    | `public`    | Returns a snapshot of cumulative `StepMetrics`           |
| `lineMap`         | `protected` | Maps step keys to per-language line numbers              |
| `metrics`         | `protected` | Running operation counts (comparisons, swaps, etc.)      |

Constructor: `new BaseTracker(lineMap: LineMap)` where `LineMap = Record<string, Record<SupportedLanguage, number[]>>`.

See [contributing.md](contributing.md#available-trackers) for the full tracker table with methods per category.

### Source Files & Line Mapping

Algorithm source files (`sources/*.ts`, `*.py`, `*.java`) support two Vite import suffixes — `?raw` for Monaco display and `?fn` for executable tests. The `?fn` suffix is powered by `vite-plugin-fn-import.ts` at the project root, a custom Vite plugin that strips `@step:` markers and transpiles TypeScript source files into executable ESM modules.

The `buildLineMapFromSources(algorithmId)` utility (`src/utils/source-loader.ts`) parses `@step:` markers from all language source files for a given algorithm and returns a `LineMap` mapping each step key to per-language line numbers. Step generators pass this to their tracker constructor.

See the [full annotation guide](contributing.md#the-step-annotation-system) and [import conventions](contributing.md#step-1-write-the-source-files) in the contributing docs.

## State Management

Zustand with 4 slices merged into a single `AppStore`, using immer middleware for immutable updates:

| Slice         | Owns                                              | Key Actions                                                |
| ------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| **algorithm** | Selected algorithm, input data, grid state        | `selectAlgorithm`, `updateInput`, `updateGrid`             |
| **playback**  | Current step index, play/pause, speed, step array | `play`, `pause`, `stepForward`, `stepBackward`, `setSpeed` |
| **editor**    | Monaco editor ref, selected language              | `setLanguage`, `setEditorRef`                              |
| **UI**        | Drawer visibility, panel sizes, mobile tab        | `toggleDrawer`, `setActiveTab`                             |

```mermaid
flowchart TD
    subgraph AppStore
        ALG["algorithm-slice"]
        PB["playback-slice"]
        ED["editor-slice"]
        UI["ui-slice"]
    end

    ALG -- "generates steps on<br/>algorithm select" --> PB
    PB -- "current step drives<br/>line highlights" --> ED
    UI -- "controls panel<br/>visibility" --> ALG
```

Access state in components via:

```typescript
const isPlaying = useAppStore((state) => state.isPlaying);
const selectAlgorithm = useAppStore((state) => state.selectAlgorithm);
```

## Responsive Design

| Tier        | Breakpoint   | Layout                                                           |
| ----------- | ------------ | ---------------------------------------------------------------- |
| **Desktop** | >= 1024px    | 3-panel resizable layout (code, visualization, explanation)      |
| **Tablet**  | 768 – 1023px | Tab-based single-panel switcher ("Visualize", "Code", "Details") |
| **Mobile**  | < 768px      | Tab-based single-panel switcher (compact controls)               |

Breakpoint values are defined in `BREAKPOINTS` (`src/utils/constants.ts`). Layout switching uses `useResponsiveLayout` with `useSyncExternalStore` for tear-free viewport-aware rendering.

## Input Editors

Each algorithm category has a tailored input editor rendered above the visualization:

| Category            | Input Type                                                 |
| ------------------- | ---------------------------------------------------------- |
| Sorting             | Comma-separated array                                      |
| Searching           | Sorted array + target value                                |
| Arrays              | Array (+ optional params: window size, target, K, etc.)    |
| Dynamic Programming | Target index number                                        |
| Pathfinding         | Interactive mini-grid (click walls, drag start/end, reset) |
| Heaps               | Comma-separated array                                      |
| Linked Lists        | Comma-separated values                                     |
| Stacks & Queues     | Bracket string                                             |
| Hash Maps           | Array + target number                                      |
| Strings             | Text string + pattern string                               |
| Matrices            | Textarea (one row per line, comma-separated)               |
| Sets                | Two comma-separated arrays (A and B)                       |

> [!IMPORTANT]
> All input edits are **temporary and non-persistent**. Edits reset on algorithm switch or page reload. No localStorage, URL state, or server persistence.

## Educational Drawer

A slide-over drawer (toggled via "L" key or header button) displays 7 sections of learning content per algorithm: Overview, How It Works, Time & Space Complexity, Best & Worst Case, Real-World Uses, Strengths & Limitations, When to Use It.

## Custom Hooks

| Hook                   | Purpose                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `usePlaybackEngine`    | Manages play/pause interval, speed changes, and timed step advancement              |
| `useKeyboardShortcuts` | Binds global keyboard events to playback and UI actions                             |
| `useResponsiveLayout`  | Returns viewport tier via `useSyncExternalStore` for breakpoint-based layout shifts |

All hooks are in `src/hooks/`.

## Project Structure

> [!NOTE]
> All UI is generic — algorithm-specific logic lives exclusively in `src/algorithms/` and `src/trackers/`.

```
e2e/                        # E2E browser tests (Playwright)
docs/                       # Documentation
src/
├── algorithms/              # Self-registering algorithm definitions + pipeline stories
│   ├── sorting/             # Bubble Sort
│   ├── searching/           # Binary Search
│   ├── graph/               # BFS
│   ├── pathfinding/         # Dijkstra
│   ├── dynamic-programming/ # Fibonacci (Tabulation + Memoization)
│   ├── arrays/              # Sliding Window
│   ├── trees/               # BST In-Order Traversal
│   ├── linked-lists/        # Reverse Linked List
│   ├── heaps/               # Build Min Heap
│   ├── stacks-queues/       # Valid Parentheses
│   ├── hash-maps/           # Two Sum
│   ├── strings/             # KMP Search
│   ├── matrices/            # Spiral Order Traversal
│   └── sets/                # Set Intersection
├── components/
│   ├── code-panel/          # Monaco editor with language tabs
│   ├── educational/         # Slide-over educational drawer
│   ├── explanation-panel/   # Step details, metrics, variables
│   ├── input-editor/        # Category-specific input editors
│   ├── layout/              # AppShell, Header, PanelLayout, MobileLayout
│   ├── playback/            # PlaybackControls with progress bar
│   ├── shared/              # Button, Badge, IconButton, Select
│   └── visualization/       # Visualizer components + co-located component stories
├── hooks/                   # usePlaybackEngine, useKeyboardShortcuts, useResponsiveLayout
├── registry/                # AlgorithmRegistry singleton
├── store/                   # Zustand slices (algorithm, playback, editor, UI)
├── trackers/                # Category-specific step trackers (one per category)
├── types/                   # TypeScript type definitions
└── utils/                   # Constants, source file loader
```

---

## See Also

- [Contributing](contributing.md) — adding algorithms, trackers, languages, and troubleshooting
- [Testing](testing.md) — unit tests, E2E, Storybook, Chromatic
- [Deployment](deployment.md) — Docker, CI/CD pipelines
