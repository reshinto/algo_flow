[← Back to README](../README.md)

# AlgoFlow Glossary

A plain-language reference for the terms and concepts you will encounter while working on AlgoFlow. Each entry explains what a term means, where it is defined in the codebase, and where it is used.

> **Prerequisites:** Basic familiarity with React, TypeScript, and Zustand is assumed. If you are new to the project, read [architecture.md](./architecture.md) first.

---

## Contents

- [Core Concepts](#core-concepts)
  - [AlgorithmRegistry](#algorithmregistry)
  - [AlgorithmDefinition\<TInput\>](#algorithmdefinitiontinput)
  - [ExecutionStep](#executionstep)
  - [VisualState](#visualstate)
  - [Tracker](#tracker)
  - [LineMap](#linemap)
  - [StepType](#steptype)
  - [Playback](#playback)
  - [Tabulation](#tabulation)
  - [Memoization](#memoization)
  - [1D Space Optimization](#1d-space-optimization)
  - [SCC (Strongly Connected Component)](#scc-strongly-connected-component)
  - [MST (Minimum Spanning Tree)](#mst-minimum-spanning-tree)
  - [Augmenting Path](#augmenting-path)
  - [Residual Graph](#residual-graph)
  - [Topological Order](#topological-order)
  - [Bridge (Cut Edge)](#bridge-cut-edge)
  - [Articulation Point (Cut Vertex)](#articulation-point-cut-vertex)
  - [Bipartite Graph](#bipartite-graph)
  - [Eulerian Circuit](#eulerian-circuit)
  - [Union-Find (Disjoint Set Union)](#union-find-disjoint-set-union)
- [Type System](#type-system)
  - [AlgorithmMeta](#algorithmmeta)
  - [SupportedLanguage](#supportedlanguage)
  - [ComplexitySpec](#complexityspec)
  - [EducationalContent](#educationalcontent)
  - [StepMetrics](#stepmetrics)
  - [LineHighlight](#linehighlight)
- [Build System](#build-system)
  - [?raw import](#raw-import)
  - [?fn import](#fn-import)
  - [@step: markers](#step-markers)
  - [buildLineMapFromSources()](#buildlinemapfromsources)
  - [Pipeline Story](#pipeline-story)
- [UI Terms](#ui-terms)
  - [AppStore](#appstore)
  - [Visualizer](#visualizer)
  - [Educational Drawer](#educational-drawer)
  - [Command Palette](#command-palette)

---

## Core Concepts

### AlgorithmRegistry

A singleton class that acts as the central catalog of all algorithms in the app. Algorithms call `registry.register()` at module import time, so simply importing an algorithm file is enough to make it available to the UI. The registry never needs to be manually populated — it discovers algorithms through side-effectful imports.

**Defined in:** `src/registry/index.ts`
**Used by:** the algorithm selector (Command Palette), the store's algorithm slice, and anywhere the app needs to list or look up algorithms at runtime.

Methods:

- `register(definition)` — adds an `AlgorithmDefinition` to the catalog
- `get(id)` — retrieves one definition by its kebab-case ID
- `getAll()` — returns all registered definitions
- `getByCategory(category)` — filters by category (e.g. `"sorting"`)
- `getCategories()` — returns all unique category strings

---

### AlgorithmDefinition\<TInput\>

The complete registration object for one algorithm. When you implement a new algorithm you export one of these and pass it to `registry.register()`. The generic parameter `TInput` describes the shape of the algorithm's user-editable input (e.g. an array of numbers for sorting algorithms).

**Defined in:** `src/types/algorithm.ts`
**Used by:** `AlgorithmRegistry`, the store's algorithm slice, step generators, the Code Panel, and the Educational Drawer.

Fields:
| Field | Type | Purpose |
|---|---|---|
| `meta` | `AlgorithmMeta` | Display name, complexity, default input |
| `execute` | function | Pure algorithm implementation |
| `generateSteps` | function | Produces the full `ExecutionStep[]` array |
| `educational` | `EducationalContent` | Seven-section learning content |
| `sources` | object | Per-language raw source strings for Monaco |

---

### ExecutionStep

An immutable snapshot of a single tick in an algorithm's execution. The full algorithm run is pre-computed into an array of these before playback begins. Stepping forward or backward is simply moving an index pointer — nothing is re-executed at playback time.

**Defined in:** `src/types/execution.ts`
**Used by:** step generators (produced), the playback store slice (consumed), all Visualizer components, the Code Panel (for line highlighting), and the variables panel.

Fields:
| Field | Type | Purpose |
|---|---|---|
| `index` | number | Position in the step array |
| `type` | `StepType` | Semantic label for the operation (e.g. `"compare"`) |
| `description` | string | Human-readable description shown in the UI |
| `highlightedLines` | `LineHighlight[]` | Which lines to highlight in each language |
| `variables` | `Record<string, unknown>` | Current algorithm state (loop vars, pointers, etc.) |
| `visualState` | `VisualState` | Data driving the visualizer for this step |
| `metrics` | `StepMetrics` | Cumulative operation counts |

---

### VisualState

A discriminated union that describes what the visualizer should render at a given step. The `kind` field determines which visualizer component handles the data and what other fields are present on the object.

**Defined in:** `src/types/execution.ts`
**Used by:** the central dispatch logic that routes to the correct Visualizer component, and all 17 Visualizer components themselves.

The 17 `kind` values are:

| `kind`              | Visualizer            |
| ------------------- | --------------------- |
| `array`             | ArrayVisualizer       |
| `graph`             | GraphVisualizer       |
| `grid`              | GridVisualizer        |
| `dp-table`          | DpTableVisualizer     |
| `tree`              | TreeVisualizer        |
| `linked-list`       | LinkedListVisualizer  |
| `heap`              | HeapVisualizer        |
| `stack-queue`       | StackQueueVisualizer  |
| `hash-map`          | HashMapVisualizer     |
| `string`            | StringVisualizer      |
| `string-palindrome` | PalindromeVisualizer  |
| `string-frequency`  | FrequencyVisualizer   |
| `string-transform`  | TransformVisualizer   |
| `string-trie`       | TrieVisualizer        |
| `string-distance`   | DistanceVisualizer    |
| `matrix`            | MatrixVisualizer      |
| `set`               | SetVisualizer         |

---

### TreeNodeState

A string-literal union describing the visual state of a single node in the `TreeVisualizer`. Each value maps to a distinct highlight color so learners can distinguish node roles at a glance.

**Defined in:** `src/types/execution.ts` (as part of the `tree` VisualState shape)

The 8 `TreeNodeState` values are:

| Value         | Meaning                                                    |
| ------------- | ---------------------------------------------------------- |
| `default`     | Unvisited node in its initial state                        |
| `visiting`    | Node currently being entered or opened                     |
| `visited`     | Node whose subtree has been fully processed                |
| `current`     | The node being actively examined at this step              |
| `found`       | Target node that satisfies the search condition            |
| `comparing`   | Node being compared against another node or value          |
| `target`      | A reference node used as a comparison anchor               |
| `highlighted` | Auxiliary highlight for path reconstruction or emphasis    |

The `tree` VisualState also carries a `childrenIds` field on each `TreeNode`, which lists child node IDs for n-ary tree support. Binary trees use at most two entries; n-ary trees (e.g., tries, segment trees) may have many.

---

### Tracker

An abstract base class used inside `generateSteps()` to build up the `ExecutionStep[]` array. Each tracker subclass provides domain-specific recording methods that internally call `pushStep()`. You construct a tracker, call its methods as you trace through your algorithm logic, and at the end collect the completed step array.

There are 34 category-specific tracker subclasses (e.g. `SortingTracker`, `ArrayTracker`, `GraphTracker`). You never use `Tracker` directly — you use the appropriate subclass for your algorithm's data structure.

**Defined in:** `src/trackers/base-tracker.ts`
**Used by:** every algorithm's `generateSteps()` function.

Key concept: the tracker constructor takes a `LineMap` so it knows which source lines to highlight for each step type.

---

### LineMap

A lookup table that maps a step key (e.g. `"compare"`, `"swap"`) to the line numbers that should be highlighted in each language's source file when a step of that type is recorded. This is what keeps the Monaco Editor in sync with algorithm execution — every step knows exactly which lines to light up in TypeScript, Python, Java, Rust, C++, and Go simultaneously.

**Defined in:** `src/trackers/base-tracker.ts` (as a type alias)

Type: `Record<string, Record<SupportedLanguage, number[]>>`

**Used by:** Tracker (read at step-record time), `buildLineMapFromSources()` (produced), and each algorithm's step generator (passed to the tracker constructor).

---

### StepType

A string-literal union of roughly 60 values that categorizes what kind of operation an `ExecutionStep` represents. `StepType` drives two things: which entry in the `LineMap` to look up for line highlighting, and which visual state transitions the UI applies.

**Defined in:** `src/types/execution.ts`
**Used by:** `ExecutionStep` (every step has one), Tracker subclasses (each method emits a specific type), and UI components that style steps differently by type.

Representative values: `"initialize"`, `"compare"`, `"swap"`, `"visit"`, `"enqueue"`, `"dequeue"`, `"push"`, `"pop"`, `"set"`, `"lookup"`, `"complete"`.

---

### Playback

Not a type — a runtime concept. After `generateSteps()` produces the full `ExecutionStep[]`, the app stores it and tracks a single integer index into that array. "Play" means advancing the index on a timer. "Step forward/backward" means incrementing or decrementing it. "Scrub" means jumping directly to any index. Because all steps are pre-computed, playback is instantaneous — there is no re-execution.

**Managed by:** the `playback` slice of `AppStore` (`src/store/`).
**Used by:** playback controls (play, pause, step, speed, reset), the Code Panel, all Visualizer components, and the variables/metrics panels.

---

### Tabulation

A bottom-up dynamic programming approach that fills a table iteratively starting from base cases. Each cell is computed exactly once in a predetermined order, so no recursion or call-stack overhead is involved. In AlgoFlow, tabulation algorithms use `DPTracker.compute()` to record each cell fill as a distinct `ExecutionStep`, producing a left-to-right sweep across the DP table visualizer.

**Contrasts with:** [Memoization](#memoization) (top-down, recursive).
**Example algorithms:** Fibonacci (tabulation variant), Climbing Stairs, Coin Change.

---

### Memoization

A top-down dynamic programming approach that solves problems recursively and caches the result of each unique subproblem on first computation. Subsequent calls for the same subproblem return the cached value immediately (a cache hit). In AlgoFlow, memoization algorithms use `DPTracker.lookup()` to record cache reads and `DPTracker.compute()` to record cache writes, so learners can distinguish first-time computation from cache hits in the step-by-step playback.

**Contrasts with:** [Tabulation](#tabulation) (bottom-up, iterative).
**Example algorithms:** Fibonacci (memoization variant).

---

### SCC (Strongly Connected Component)

A maximal subgraph of a directed graph where every vertex is reachable from every other vertex. Algorithms like Tarjan's and Kosaraju's decompose a graph into its SCCs in a single or double DFS pass. Used in dependency analysis, circuit design, and compiler optimizations.

**See also:** [Tarjan's SCC](../src/algorithms/graph/connectivity/tarjans-scc/), [Kosaraju's SCC](../src/algorithms/graph/connectivity/kosarajus-scc/).

---

### MST (Minimum Spanning Tree)

A spanning tree of a weighted undirected graph that connects all vertices with the minimum possible total edge weight. A spanning tree has exactly V-1 edges for V vertices and contains no cycles. Used in network design, clustering, and approximation algorithms.

**See also:** Kruskal's, Prim's, Boruvka's algorithms under `src/algorithms/graph/mst/`.

---

### Augmenting Path

A path from source to sink in a residual graph along which additional flow can be pushed (all edges on the path have remaining positive capacity). Ford-Fulkerson repeatedly finds augmenting paths and increases flow until none remain, at which point the maximum flow has been found.

**See also:** [Residual Graph](#residual-graph), Ford-Fulkerson and Edmonds-Karp under `src/algorithms/graph/network-flow/`.

---

### Residual Graph

A derived graph used in network flow algorithms that shows the remaining capacity available on each edge. For every original edge u→v with capacity c and current flow f, the residual graph has a forward edge u→v with capacity c-f and a back edge v→u with capacity f. Augmenting paths are found in the residual graph.

**See also:** [Augmenting Path](#augmenting-path).

---

### Topological Order

A linear ordering of the vertices of a directed acyclic graph (DAG) such that for every directed edge u→v, vertex u appears before vertex v in the ordering. A topological order only exists if the graph has no cycles. Used in task scheduling, build systems, and dependency resolution.

**See also:** Kahn's Algorithm and DFS Topological Sort under `src/algorithms/graph/topological-sort/`.

---

### Bridge (Cut Edge)

An edge in an undirected graph whose removal increases the number of connected components (i.e., disconnects the graph). Bridges represent critical links in a network — removing one creates an unreachable subgraph. Found efficiently using DFS with low-link values.

**See also:** Bridges algorithm under `src/algorithms/graph/connectivity/bridges/`.

---

### Articulation Point (Cut Vertex)

A vertex in an undirected graph whose removal increases the number of connected components. Articulation points represent critical nodes in a network — removing one partitions the graph. Found using the same DFS low-link technique as bridge detection.

**See also:** Articulation Points algorithm under `src/algorithms/graph/connectivity/articulation-points/`.

---

### Bipartite Graph

A graph whose vertices can be divided into two disjoint sets U and V such that every edge connects a vertex in U to a vertex in V — no edges exist within the same set. Equivalently, a graph is bipartite if and only if it contains no odd-length cycles. Used in matching problems and scheduling.

**See also:** Bipartite Check under `src/algorithms/graph/coloring/bipartite-check/`.

---

### Eulerian Circuit

A circuit (closed walk) that visits every edge of a graph exactly once and returns to the starting vertex. A connected undirected graph has an Eulerian circuit if and only if every vertex has even degree. Hierholzer's algorithm finds one in O(E) time.

**See also:** Hierholzer's Algorithm under `src/algorithms/graph/eulerian/hierholzers/`.

---

### Union-Find (Disjoint Set Union)

A data structure that tracks a partition of elements into disjoint sets and supports two operations efficiently: `union(a, b)` merges the sets containing a and b, and `find(a)` returns the representative of the set containing a. With path compression and union by rank, both operations run in near-constant amortized time. Used in Kruskal's MST and cycle detection.

**See also:** Union-Find Cycle Detection under `src/algorithms/graph/cycle-detection/union-find/`, Kruskal's under `src/algorithms/graph/mst/kruskal/`.

---

### 1D Space Optimization

A DP optimization that reduces a 2D table (where each row depends only on the previous row) to a single reusable array, also called a rolling array. The array is updated in-place on each pass, keeping memory usage at O(n) rather than O(n²). When a DP algorithm uses this technique, the `DPTracker` is constructed with `tableSize = n` (the 1D length) and each outer-loop iteration overwrites cells in place — the DP table visualizer shows the current row state rather than the full 2D grid.

**See also:** [Tabulation](#tabulation).
**Example algorithms:** 0/1 Knapsack (space-optimized variant), Longest Common Subsequence (space-optimized).

---

## Type System

### AlgorithmMeta

Read-only metadata about one algorithm. Used for display in the Command Palette, algorithm header, and complexity badges. The `id` field is the stable identifier used throughout the app (kebab-case, e.g. `"bubble-sort"`).

**Defined in:** `src/types/algorithm.ts`
**Used by:** `AlgorithmDefinition`, `AlgorithmRegistry`, the Command Palette, and the algorithm header component.

Fields: `id`, `name`, `category`, `description`, `timeComplexity` (`ComplexitySpec`), `spaceComplexity` (`ComplexitySpec`), `supportedLanguages` (`SupportedLanguage[]`), `defaultInput`.

---

### SupportedLanguage

The union of language identifiers the app supports for source display: `"typescript" | "python" | "java" | "rust" | "cpp" | "go"`.

**Defined in:** `src/types/algorithm.ts`
**Used by:** `LineMap`, `LineHighlight`, `AlgorithmMeta.supportedLanguages`, the Code Panel language tabs, and source file loading utilities.

---

### ComplexitySpec

An interface holding best/average/worst Big-O strings for a complexity dimension (time or space). Displayed in the complexity badge and the Educational Drawer.

**Defined in:** `src/types/algorithm.ts`
**Used by:** `AlgorithmMeta` (two fields: `timeComplexity`, `spaceComplexity`), and complexity display components.

Fields: `best` (string), `average` (string), `worst` (string).

---

### EducationalContent

The structured learning content attached to every algorithm. Displayed in the Educational Drawer. All 7 sections are required — the drawer renders each one in order.

**Defined in:** `src/types/educational.ts`
**Used by:** `AlgorithmDefinition`, the Educational Drawer component, and documentation tests that assert non-empty content.

Sections:
| Field | Type |
|---|---|
| `overview` | string |
| `howItWorks` | string |
| `timeAndSpaceComplexity` | string |
| `bestAndWorstCase` | string |
| `realWorldUses` | string[] |
| `strengthsAndLimitations` | `{ strengths: string[], limitations: string[] }` |
| `whenToUseIt` | string |

---

### StepMetrics

Cumulative operation counts that accumulate across steps. Displayed in the metrics panel so learners can see how the operation count grows as the algorithm runs.

**Defined in:** `src/types/execution.ts`
**Used by:** `ExecutionStep`, Tracker (updated on each `pushStep()`), and the metrics panel component.

Fields: `comparisons`, `swaps`, `visits`, `cacheHits`, `queueOperations`, `elapsedSteps` (all numbers).

---

### LineHighlight

A single language-to-lines mapping for one step. An `ExecutionStep` carries an array of these — one per language — so the Code Panel can highlight the correct lines regardless of which language tab is active.

**Defined in:** `src/types/execution.ts`
**Used by:** `ExecutionStep.highlightedLines`, the Code Panel (reads the entry matching the active language).

Fields: `language` (`SupportedLanguage`), `lines` (`number[]`).

---

## Build System

### ?raw import

A Vite built-in import suffix that loads any file as a plain text string instead of executing it. AlgoFlow uses this to load algorithm source files (`.ts`, `.py`, `.java`) into the Monaco Editor for display. The `@step:` annotation comments are preserved in the raw string so the source viewer can render them.

**Used in:** `AlgorithmDefinition.sources`, source loader utilities.

Example: `import bubbleSortTs from "./sources/bubble-sort.ts?raw"`

---

### ?fn import

A custom Vite plugin suffix provided by `vite-plugin-fn-import.ts`. Unlike `?raw`, it processes the file: it strips `@step:` markers, transpiles TypeScript to JavaScript using OxC, and auto-exports the functions so they can be called at runtime. This lets the same `.ts` source file serve as both the displayable annotated source (via `?raw`) and the runnable implementation (via `?fn`). Only works for `.ts` files inside `sources/` directories.

**Defined in:** `vite-plugin-fn-import.ts`
**Used by:** algorithm `execute` function implementations that live in `sources/`.

---

### @step: markers

Inline annotations in source files that tag a line with a step key. The marker format is `// @step:<key>` in TypeScript and Java, `# @step:<key>` in Python. Multiple keys on one line are comma-separated: `// @step:init,setup`. These markers are parsed by `parseStepMarkers()` to automatically produce `LineMap` entries — you never have to hard-code line numbers.

**Parsed by:** `parseStepMarkers()` inside `src/utils/source-loader.ts`
**Used in:** all algorithm source files under `sources/` directories.

Rule: every language file for the same algorithm must use the same set of step keys so that `buildLineMapFromSources()` can produce a consistent `LineMap`.

---

### buildLineMapFromSources()

An orchestrator function that takes all language source files for an algorithm, calls `parseStepMarkers()` on each, and assembles the results into a single `LineMap`. This is the standard way to produce the `LineMap` that gets passed to a tracker constructor. It means line numbers never need to be hard-coded — they are derived directly from the `@step:` markers in the source files.

**Defined in:** `src/utils/source-loader.ts`
**Used by:** every algorithm's step generator, called once at the top of `generateSteps()`.

---

### Pipeline Story

A Storybook story file (`<AlgorithmName>Pipeline.stories.tsx`) that renders the full algorithm visualization end-to-end: registry registration, step generation, and the complete visualization UI together. It serves as both a visual regression target and a developer preview. Pipeline stories live in the algorithm's own directory, not in `src/components/`.

**Location pattern:** `src/algorithms/<category>/<algorithm>/<AlgorithmName>Pipeline.stories.tsx`
**Used by:** Storybook (visual regression via `@storybook/test-runner`), and developers checking that a new algorithm renders correctly before running the full test suite.

---

## UI Terms

### AppStore

The single Zustand store that holds all client state. It is composed of 4 slices merged together using immer middleware, which means all slice updates are written as direct mutations (immer handles the immutability under the hood).

**Defined in:** `src/store/`
**Used by:** every component that reads or writes application state.

Slices:
| Slice | Responsibility |
|---|---|
| `algorithm` | Selected algorithm definition, current user input |
| `playback` | Step index, play/pause state, playback speed, computed step array |
| `editor` | Monaco editor instance ref, active language tab |
| `ui` | Drawer visibility flags, panel size state |

---

### Visualizer

A generic React component that renders one kind of `VisualState`. There are 17 Visualizer components, one per `VisualState.kind`. A central dispatcher reads `kind` from the current step's `VisualState` and mounts the correct Visualizer. No Visualizer contains any algorithm-specific logic — they are purely driven by the data in `VisualState`, which means adding a new algorithm never requires touching any Visualizer.

**Location:** `src/components/` (one file per visualizer)
**Used by:** the visualization panel, dispatched from the central visualizer router.

---

### Educational Drawer

A slide-over side panel that displays the 7 sections of `EducationalContent` for the currently selected algorithm. It is toggled by pressing the "L" key or clicking its header button. The drawer is collapsible on tablet and fully separate from the main 3-panel layout on desktop.

**Location:** `src/components/`
**Used by:** the main app layout; content sourced from `AlgorithmDefinition.educational`.

---

### Command Palette

A modal dialog for selecting which algorithm to visualize. Opened via the header button. Displays all registered algorithms (from `AlgorithmRegistry.getAll()`), supports text filtering, and groups entries by category. Selecting an algorithm updates the `algorithm` store slice, which triggers step generation and resets playback.

**Location:** `src/components/`
**Used by:** the app header; reads from `AlgorithmRegistry`.

---

## See Also

- [architecture.md](./architecture.md) — tech stack, data flow, state management, and project structure
- [contributing.md](./contributing.md) — step-by-step guide to adding a new algorithm, tracker API reference, and branch workflow
- [testing.md](./testing.md) — unit test conventions, Storybook setup, E2E test structure, and coverage thresholds
- [deployment.md](./deployment.md) — Docker build, CI/CD pipeline, and deploy configuration
