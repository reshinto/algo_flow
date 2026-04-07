# Pathfinding Algorithm Category Expansion Design Spec

**Date:** 2026-04-01
**Status:** Draft
**Scope:** Expand pathfinding from 1 algorithm to 27 across 5 technique subcategories

## Problem

The pathfinding category has only 1 algorithm (Dijkstra's Shortest Path). Other mature categories have 20-30+. This expansion brings pathfinding to comprehensive coverage of shortest-path, heuristic search, graph traversal, flood fill, and maze generation techniques on a grid.

## Architecture

### Tracker Enhancement (Single Tracker)

Unlike matrices (which needed 5 sub-trackers for different visual state shapes), all pathfinding algorithms share `GridVisualState` (kind: `"grid"`). The existing `PathfindingTracker` will be extended with new methods rather than creating sub-trackers.

| Method                              | Step Type       | Purpose                                            |
| ----------------------------------- | --------------- | -------------------------------------------------- |
| `setCurrentNode(row, col, vars)`    | `"visit"`       | Highlight node being expanded, auto-reset previous |
| `updateCost(row, col, vars, costs)` | `"update-cost"` | Cost relaxation with g/h/f update                  |
| `openNodeReverse(row, col, vars)`   | `"open-node"`   | Backward frontier in bidirectional search          |
| `closeNodeReverse(row, col, vars)`  | `"close-node"`  | Backward explored in bidirectional search          |
| `carveCell(row, col, vars)`         | `"carve-cell"`  | Maze generation: wall becomes passage              |
| `markJumpPoint(row, col, vars)`     | `"visit"`       | JPS forced neighbor highlight                      |

Internal addition: `private previousCurrentPos: [number, number] | null` for auto-resetting current-node highlight.

### Type Extensions (`src/types/execution.ts`)

**New GridCellState values:**
`"open-reverse"`, `"closed-reverse"`, `"jump-point"`, `"carved"`, `"generating"`

**New StepType values:**
`"carve-cell"`, `"merge-cells"`

**New optional fields on GridVisualState:**

- `reversePath?: [number, number][]` - backward frontier path (bidirectional)
- `carvedCount?: number` - cells carved so far (maze generation)
- `phase?: string` - general operation phase label

### GridVisualizer CSS Extensions (`src/components/visualization/GridVisualizer.tsx`)

New entries in `CELL_COLORS`:

- `"open-reverse"`: `var(--color-accent-rose)` (distinct backward frontier)
- `"closed-reverse"`: `var(--color-viz-swapped)` (muted backward explored)
- `"jump-point"`: `var(--color-accent-amber)` (JPS landing)
- `"carved"`: `var(--color-viz-found)` (freshly carved passage)
- `"generating"`: `var(--color-viz-comparing)` (maze generation active)

## Algorithm List (27 total)

### 1. Shortest Path (5) - PathfindingTracker

| #   | Algorithm         | Directory                          | Complexity        | fn-import         |
| --- | ----------------- | ---------------------------------- | ----------------- | ----------------- |
| 1   | Dijkstra (exists) | `shortest-path/dijkstra/`          | O(V^2) / O(V)     | `dijkstra`        |
| 2   | BFS Shortest Path | `shortest-path/bfs-shortest-path/` | O(V+E) / O(V)     | `bfsShortestPath` |
| 3   | A\* Search        | `shortest-path/a-star/`            | O(V log V) / O(V) | `aStarSearch`     |
| 4   | Bellman-Ford Grid | `shortest-path/bellman-ford-grid/` | O(V\*E) / O(V)    | `bellmanFordGrid` |
| 5   | Lee Algorithm     | `shortest-path/lee-algorithm/`     | O(V+E) / O(V)     | `leeAlgorithm`    |

- **BFS Shortest Path**: Optimal for unweighted grids, no priority queue needed. Key "aha": BFS = shortest path when weights are uniform.
- **A\* Search**: Manhattan distance heuristic, uses gCost/hCost/fCost. Premier informed-vs-uninformed teaching algorithm.
- **Bellman-Ford Grid**: Handles negative weights (educational: why Dijkstra fails). Demonstrates V-1 relaxation iterations.
- **Lee Algorithm**: Circuit routing BFS variant with wavefront numbering. Cells display distance labels. Visually distinct from plain BFS via numbered wavefront expansion.

### 2. Heuristic Search (5) - PathfindingTracker

| #   | Algorithm         | Directory                             | Complexity        | fn-import         |
| --- | ----------------- | ------------------------------------- | ----------------- | ----------------- |
| 6   | Greedy Best-First | `heuristic-search/greedy-best-first/` | O(V log V) / O(V) | `greedyBestFirst` |
| 7   | Jump Point Search | `heuristic-search/jump-point-search/` | O(V log V) / O(V) | `jumpPointSearch` |
| 8   | IDA\*             | `heuristic-search/ida-star/`          | O(b^d) / O(d)     | `idaStar`         |
| 9   | Weighted A\*      | `heuristic-search/weighted-a-star/`   | O(V log V) / O(V) | `weightedAStar`   |
| 10  | D\* Lite          | `heuristic-search/d-star-lite/`       | O(V log V) / O(V) | `dStarLite`       |

- **Greedy Best-First**: Uses only heuristic (h-cost), ignoring actual distance. Fast but NOT optimal. Beelines toward goal.
- **Jump Point Search**: A\* optimization that "jumps" over intermediate nodes. Sparse exploration with large jumps. Uses `"jump-point"` cell state.
- **IDA\***: Memory-efficient A\* using iterative deepening with f-cost threshold. O(d) memory vs O(V).
- **Weighted A\***: A* with inflated heuristic (w * h). Trades optimality for speed. Slider-like educational value for exploring weight parameter.
- **D\* Lite**: Incremental replanning search. Demonstrates how to efficiently re-search when obstacles change. Unique "replanning" visual phase.

### 3. Graph Traversal (5) - PathfindingTracker

| #   | Algorithm               | Directory                                  | Complexity    | fn-import               |
| --- | ----------------------- | ------------------------------------------ | ------------- | ----------------------- |
| 11  | BFS Exploration         | `graph-traversal/bfs-exploration/`         | O(V+E) / O(V) | `bfsExploration`        |
| 12  | DFS Exploration         | `graph-traversal/dfs-exploration/`         | O(V+E) / O(V) | `dfsExploration`        |
| 13  | Bidirectional BFS       | `graph-traversal/bidirectional-bfs/`       | O(V+E) / O(V) | `bidirectionalBfs`      |
| 14  | Iterative Deepening DFS | `graph-traversal/iterative-deepening-dfs/` | O(b^d) / O(d) | `iterativeDeepeningDfs` |
| 15  | Wall Follower           | `graph-traversal/wall-follower/`           | O(V) / O(1)   | `wallFollower`          |

- **BFS Exploration**: Pure BFS, no target. Layer-by-layer wavefront from start. Foundation for understanding flood fill.
- **DFS Exploration**: DFS on grid. Snaking deep-first pattern. Stack vs queue visual contrast with BFS.
- **Bidirectional BFS**: Search from both start AND end. Uses `"open-reverse"` and `"closed-reverse"` states. Two frontiers meet in middle.
- **Iterative Deepening DFS**: DFS with increasing depth limits. Shows repeated shallow exploration. O(d) memory.
- **Wall Follower**: Right-hand (or left-hand) rule maze solving. Single-path exploration hugging walls. O(1) extra space.

### 4. Flood Fill (3) - PathfindingTracker

| #   | Algorithm        | Directory                      | Complexity    | fn-import        |
| --- | ---------------- | ------------------------------ | ------------- | ---------------- |
| 16  | Flood Fill BFS   | `flood-fill/flood-fill-bfs/`   | O(V) / O(V)   | `floodFillBfs`   |
| 17  | Flood Fill DFS   | `flood-fill/flood-fill-dfs/`   | O(V) / O(V)   | `floodFillDfs`   |
| 18  | Multi-Source BFS | `flood-fill/multi-source-bfs/` | O(V+E) / O(V) | `multiSourceBfs` |

- **Flood Fill BFS**: Classic paint bucket. BFS from seed point, uniform wavefront fill. Uses start as seed, ignores end.
- **Flood Fill DFS**: Same result, dramatically different fill order. Stack vs queue choice visualization.
- **Multi-Source BFS**: BFS from ALL wall-adjacent cells simultaneously. Computes distance from nearest wall. Converging wavefronts.

### 5. Maze Generation (5) - PathfindingTracker

| #   | Algorithm             | Directory                                | Complexity        | fn-import                  |
| --- | --------------------- | ---------------------------------------- | ----------------- | -------------------------- |
| 19  | Recursive Backtracker | `maze-generation/recursive-backtracker/` | O(V) / O(V)       | `recursiveBacktrackerMaze` |
| 20  | Prim's Maze           | `maze-generation/prims-maze/`            | O(V log V) / O(V) | `primsMaze`                |
| 21  | Kruskal's Maze        | `maze-generation/kruskals-maze/`         | O(E log E) / O(V) | `kruskalsMaze`             |
| 22  | Recursive Division    | `maze-generation/recursive-division/`    | O(V) / O(V)       | `recursiveDivision`        |
| 23  | Aldous-Broder         | `maze-generation/aldous-broder/`         | O(V^2) avg / O(V) | `aldousBroder`             |

- **Recursive Backtracker**: DFS maze carving. Long winding corridors, few dead ends. Most common maze algorithm.
- **Prim's Maze**: Frontier-based random wall selection. Short dead ends, "bushy" pattern. MST connection.
- **Kruskal's Maze**: Union-Find based. Scattered patches that gradually merge. Teaches union-find.
- **Recursive Division**: Top-down: starts with open field, recursively adds walls with passages. Only algorithm that ADDS walls instead of carving.
- **Aldous-Broder**: Random walk that carves unvisited cells. Produces perfectly uniform random mazes. Slow but mathematically unbiased.

### 6. Additional Pathfinding (4) - PathfindingTracker

| #   | Algorithm                    | Directory                                   | Complexity                | fn-import               |
| --- | ---------------------------- | ------------------------------------------- | ------------------------- | ----------------------- |
| 24  | Random Walk                  | `random-walk/random-walk/`                  | Unbounded / O(1)          | `randomWalk`            |
| 25  | Swarm Intelligence           | `swarm/swarm-intelligence/`                 | O(V \* iterations) / O(V) | `swarmIntelligence`     |
| 26  | Best-First with Tie Breaking | `heuristic-search/best-first-tie-breaking/` | O(V log V) / O(V)         | `bestFirstTieBreaking`  |
| 27  | Dijkstra Bidirectional       | `shortest-path/dijkstra-bidirectional/`     | O(V log V) / O(V)         | `dijkstraBidirectional` |

**REVISED**: Let me keep to the clean 5 techniques. Moving algorithms 24-27 back into existing categories:

**Final count per technique:**

- Shortest Path: 6 (add Dijkstra Bidirectional)
- Heuristic Search: 6 (add Best-First with Tie Breaking)
- Graph Traversal: 5
- Flood Fill: 3
- Maze Generation: 7 (add Binary Tree Maze, Eller's Maze)

**FINAL REVISED COUNT: 27 algorithms**

| Technique        | Count                |
| ---------------- | -------------------- |
| shortest-path    | 6 (1 exists + 5 new) |
| heuristic-search | 6                    |
| graph-traversal  | 5                    |
| flood-fill       | 3                    |
| maze-generation  | 7                    |
| **Total**        | **27**               |

### Revised Shortest Path (6)

Add: **Dijkstra Bidirectional** (`shortest-path/dijkstra-bidirectional/`) - Weighted bidirectional Dijkstra. Uses `"open-reverse"` states. fn-import: `dijkstraBidirectional`

### Revised Heuristic Search (6)

Add: **Best-First Tie Breaking** (`heuristic-search/best-first-tie-breaking/`) - A\* with cross-product tie-breaking for aesthetically straight paths. fn-import: `bestFirstTieBreaking`

### Revised Maze Generation (7)

Add:

- **Binary Tree Maze** (`maze-generation/binary-tree-maze/`) - Simplest maze: each cell randomly carves north or east. Visible diagonal bias. O(V) / O(1). fn-import: `binaryTreeMaze`
- **Eller's Maze** (`maze-generation/ellers-maze/`) - Row-by-row generation using set merging. Memory-efficient for infinite mazes. O(V) / O(cols). fn-import: `ellersMaze`

## Per-Algorithm Deliverables

Each algorithm produces 10 files:

- `index.ts` - AlgorithmDefinition + registry.register()
- `step-generator.ts` - ExecutionStep[] using PathfindingTracker
- `educational.ts` - 7-section EducationalContent
- `<algorithm>.test.ts` - 8+ correctness tests
- `step-generator.test.ts` - 6+ step generation tests
- `<Algorithm>Pipeline.stories.tsx` - 3-4 visual snapshots
- `sources/<algorithm>.ts` - TypeScript with @step markers
- `sources/<algorithm>.py` - Python with @step markers
- `sources/<Algorithm>.java` - Java with @step markers
- Entry in `src/types/fn-import.d.ts`

## Files Modified

- `src/types/execution.ts` - GridCellState, StepType, GridVisualState extensions
- `src/trackers/pathfinding-tracker.ts` - 6 new methods
- `src/components/visualization/GridVisualizer.tsx` - New cell state colors
- `src/types/fn-import.d.ts` - 26 new function declarations
- E2E auto-discovers all algorithms (no manual changes needed)

## Implementation Phases with Model Assignment

| Phase    | Description                                                    | Claude Model | Rationale                                   |
| -------- | -------------------------------------------------------------- | ------------ | ------------------------------------------- |
| Phase 0  | Foundation (types, tracker, visualizer)                        | Opus         | Architectural decisions, type system design |
| Phase 1  | Shortest Path (5 new algorithms)                               | Sonnet       | Implementation following Dijkstra pattern   |
| Phase 2  | Heuristic Search (6 algorithms)                                | Sonnet       | Implementation with cost field usage        |
| Phase 3  | Graph Traversal (5 algorithms)                                 | Sonnet       | Implementation with reverse states          |
| Phase 4  | Flood Fill (3 algorithms)                                      | Sonnet       | Implementation following BFS/DFS pattern    |
| Phase 5  | Maze Generation (7 algorithms)                                 | Sonnet       | Implementation with carve mechanics         |
| Phase 6  | Code Review                                                    | Opus         | Quality review, architectural consistency   |
| Phase 7  | QA Testing                                                     | Sonnet       | Run all tests, fix failures                 |
| Phase 8  | Visual Browser Preview (MCP Playwright)                        | Opus         | Judgment calls on visual correctness        |
| Phase 9  | E2E Testing                                                    | Sonnet       | Run E2E, fix failures                       |
| Phase 10 | Documentation Updates                                          | Sonnet       | Update docs, README, algorithms-catalog     |
| Phase 11 | Quality Gate + Git (lint, format, typecheck, commit, push, PR) | Opus         | Final review, PR creation                   |

## Master Checklist

### Phase 0: Foundation

- [ ] Create branch `feat/pathfinding-expand-algorithms` from main
- [ ] Add `GridCellState` values: `"open-reverse"`, `"closed-reverse"`, `"jump-point"`, `"carved"`, `"generating"`
- [ ] Add `StepType` values: `"carve-cell"`, `"merge-cells"`
- [ ] Add optional fields to `GridVisualState`: `reversePath`, `carvedCount`, `phase`
- [ ] Add `setCurrentNode()` to PathfindingTracker
- [ ] Add `updateCost()` to PathfindingTracker
- [ ] Add `openNodeReverse()` to PathfindingTracker
- [ ] Add `closeNodeReverse()` to PathfindingTracker
- [ ] Add `carveCell()` to PathfindingTracker
- [ ] Add `markJumpPoint()` to PathfindingTracker
- [ ] Update `GridVisualizer.tsx` CELL_COLORS for new states
- [ ] Update `getCellColor()` to handle new states
- [ ] Add PathfindingTracker method tests
- [ ] Verify typecheck passes after foundation changes

### Phase 1: Shortest Path (5 new algorithms)

- [ ] BFS Shortest Path (all 10 files)
- [ ] A\* Search (all 10 files)
- [ ] Bellman-Ford Grid (all 10 files)
- [ ] Lee Algorithm (all 10 files)
- [ ] Dijkstra Bidirectional (all 10 files)
- [ ] Add fn-import.d.ts entries for 5 shortest-path algorithms

### Phase 2: Heuristic Search (6 algorithms)

- [ ] Greedy Best-First (all 10 files)
- [ ] Jump Point Search (all 10 files)
- [ ] IDA\* (all 10 files)
- [ ] Weighted A\* (all 10 files)
- [ ] D\* Lite (all 10 files)
- [ ] Best-First Tie Breaking (all 10 files)
- [ ] Add fn-import.d.ts entries for 6 heuristic-search algorithms

### Phase 3: Graph Traversal (5 algorithms)

- [ ] BFS Exploration (all 10 files)
- [ ] DFS Exploration (all 10 files)
- [ ] Bidirectional BFS (all 10 files)
- [ ] Iterative Deepening DFS (all 10 files)
- [ ] Wall Follower (all 10 files)
- [ ] Add fn-import.d.ts entries for 5 graph-traversal algorithms

### Phase 4: Flood Fill (3 algorithms)

- [ ] Flood Fill BFS (all 10 files)
- [ ] Flood Fill DFS (all 10 files)
- [ ] Multi-Source BFS (all 10 files)
- [ ] Add fn-import.d.ts entries for 3 flood-fill algorithms

### Phase 5: Maze Generation (7 algorithms)

- [ ] Recursive Backtracker (all 10 files)
- [ ] Prim's Maze (all 10 files)
- [ ] Kruskal's Maze (all 10 files)
- [ ] Recursive Division (all 10 files)
- [ ] Aldous-Broder (all 10 files)
- [ ] Binary Tree Maze (all 10 files)
- [ ] Eller's Maze (all 10 files)
- [ ] Add fn-import.d.ts entries for 7 maze-generation algorithms

### Phase 6: Code Review

- [ ] Review all tracker methods for architectural consistency
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
- [ ] Navigate to each of the 27 pathfinding algorithms
- [ ] Verify step playback works (forward, backward, reset)
- [ ] Verify code highlighting syncs with steps
- [ ] Verify educational drawer content
- [ ] Verify language tab switching (TS, Python, Java, Rust, C++, Go)
- [ ] Fix any visual issues

### Phase 9: E2E Testing

- [ ] Run E2E tests for all 27 pathfinding algorithms
- [ ] Verify smoke tests pass for each algorithm
- [ ] Fix any E2E failures
- [ ] Verify no regressions in other categories

### Phase 10: Documentation Updates

- [ ] Update `docs/algorithms-catalog.md` with 27 pathfinding algorithms
- [ ] Update `README.md` algorithm count
- [ ] Update `docs/contributing.md` if new tracker methods need documenting
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
5. E2E tests pass for all 27 pathfinding algorithms
6. Coverage thresholds: 80% statements, 75% branches, 80% functions, 80% lines
7. Visual browser preview of each algorithm
