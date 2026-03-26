# AlgoFlow

Algorithm visualization web app for learners. Step through algorithms with synchronized code highlighting, animated visualizations, and educational content.

## Features

- **6 Algorithm Categories**: Sorting, Searching, Graph Traversal, Pathfinding, Dynamic Programming, Array Techniques
- **Multi-Language Code Display**: TypeScript, Python, and Java source files with synchronized line highlighting via Monaco Editor
- **Interactive Visualizations**: Animated bar charts, SVG graph rendering, CSS grid pathfinding, DP table cells
- **Step-by-Step Playback**: Play, pause, step forward/backward, scrub, adjustable speed (0.25x–4x)
- **Input Editors**: Editable arrays for sorting/searching/sliding-window, target index for DP, interactive grid for pathfinding (click walls, drag start/end)
- **Pathfinding Grid Editing**: Click to place walls, drag start/end nodes, reset grid, run Dijkstra in real-time
- **Educational Content**: Slide-over drawer with overview, complexity analysis, real-world uses, strengths/limitations, and trade-offs for every algorithm
- **Responsive Layout**: 3-panel resizable IDE-style layout on desktop; tab-based single-panel switcher on mobile/tablet (<1024px)
- **Storybook Visual Testing**: Component stories for shared primitives, individual visualizers, and full algorithm pipelines (42 stories across 15 files)

## Algorithms

| Category            | Algorithm                | Visualizer                       |
| ------------------- | ------------------------ | -------------------------------- |
| Sorting             | Bubble Sort              | Animated bar chart               |
| Searching           | Binary Search            | Bar chart with pointer narrowing |
| Graph               | Breadth-First Search     | SVG node + edge graph            |
| Pathfinding         | Dijkstra's Algorithm     | CSS grid with wavefront          |
| Dynamic Programming | Fibonacci (Tabulation)   | DP table cells + call stack      |
| Array Techniques    | Sliding Window (Max Sum) | Bar chart with window range      |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command                  | Description                               |
| ------------------------ | ----------------------------------------- |
| `npm run dev`            | Start development server with HMR         |
| `npm run build`          | Type-check and build for production       |
| `npm run preview`        | Preview production build locally          |
| `npm run lint`           | Run ESLint                                |
| `npm run lint:fix`       | Run ESLint with auto-fix                  |
| `npm run format`         | Format all files with Prettier            |
| `npm run format:check`   | Check formatting without writing          |
| `npm run typecheck`      | TypeScript type checking                  |
| `npm run test`           | Run unit tests (Vitest)                   |
| `npm run test:watch`     | Run tests in watch mode                   |
| `npm run test:coverage`  | Run tests with coverage report            |
| `npm run storybook`      | Start Storybook development server        |
| `npm run storybook:build`| Build Storybook for static deployment     |

## Docker

### Build and run with Docker Compose

```bash
docker-compose up -d
```

The app is served at [http://localhost:3000](http://localhost:3000).

### Build the image directly

```bash
docker build -t algoflow .
docker run -p 3000:80 algoflow
```

The Dockerfile uses a multi-stage build: Node 22 alpine compiles the app, then nginx alpine serves the static output with SPA fallback routing and long-lived cache headers for hashed assets.

## CI/CD

Three GitHub Actions workflows are included in `.github/workflows/`:

- **ci.yml** — Runs on every push to `main` and all pull requests. Jobs: lint, typecheck, unit tests (with coverage artifact), Storybook build, production build.
- **deploy.yml** — Runs on push to `main` after CI passes. Runs full CI suite inline (lint, typecheck, test, storybook build), then builds and pushes a Docker image to GitHub Container Registry (`ghcr.io`).
- **pages.yml** — Runs on push to `main`. Runs full CI suite inline, builds with the correct `BASE_URL` base path, and deploys to GitHub Pages.

## Testing

### Unit Tests

```bash
# Run all 137 unit tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode during development
npm run test:watch
```

Tests cover algorithm correctness, step generation, tracker behavior, and store state transitions across all 6 algorithms.

### Storybook & Visual Regression Testing

```bash
# Start Storybook dev server
npm run storybook

# Build static Storybook
npm run storybook:build

# Run Chromatic visual tests (requires CHROMATIC_PROJECT_TOKEN)
npm run chromatic
```

**15 story files** organized into:

- **Shared Primitives**: Button, Badge, IconButton, Select
- **Code Panel**: LanguageTabs
- **Individual Visualizers**: ArrayVisualizer, GraphVisualizer, GridVisualizer, DPTableVisualizer — with mock data showing different visual states
- **Algorithm Pipelines**: Bubble Sort, Binary Search, BFS, Dijkstra, Fibonacci DP, Sliding Window — using real step generators to show initial, mid-execution, and final states

Visual regression testing is powered by [Chromatic](https://www.chromatic.com/). Every story is automatically snapshot-tested on each push. To enable in CI, add a `CHROMATIC_PROJECT_TOKEN` repository secret.

## Tech Stack

- **Framework**: Vite + React 19 + TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with a black-first theme (zinc-950/zinc-900)
- **State**: Zustand with 4 slices (algorithm, playback, editor, UI)
- **Code Editor**: Monaco Editor (read-only with ref-based decoration updates)
- **Layout**: react-resizable-panels (3-panel IDE layout on desktop)
- **Animation**: Framer Motion (bar swaps, grid waves, spring transitions)
- **Testing**: Vitest + Testing Library + Storybook 8

## Architecture

AlgoFlow uses a **registry-driven** architecture with **pre-computed execution steps**:

1. Each algorithm self-registers via `registry.register(definition)` at import time
2. `generateSteps(input)` produces a full `ExecutionStep[]` array eagerly
3. Playback is just an index pointer into the step array — instant scrubbing, deterministic replay
4. Category-specific **trackers** (SortingTracker, PathfindingTracker, etc.) build steps with correct visual state and per-language line mappings
5. A discriminated union on `VisualState.kind` dispatches to the matching visualizer component

All UI components are generic — no algorithm-specific logic in the view layer.

### Responsive Design

- **Desktop** (>=1024px): 3-panel resizable layout with code, visualization, and explanation panels side by side
- **Mobile/Tablet** (<1024px): Tab-based single-panel switcher ("Visualize", "Code", "Details") using `useSyncExternalStore` for viewport-aware rendering

### Input Editors

Each algorithm category has a tailored input editor rendered above the visualization:

- **Sorting**: Comma-separated array text input
- **Searching**: Sorted array + target value inputs
- **Sliding Window**: Array + window size inputs
- **Dynamic Programming**: Target index number input
- **Pathfinding**: Interactive mini-grid with click-to-add walls, drag start/end nodes, reset button

### Educational Drawer

A slide-over drawer (toggled via "L" key or header button) displays 7 sections of learning content per algorithm: Overview, How It Works, Time & Space Complexity, Best & Worst Case, Real-World Uses, Strengths & Limitations, When to Use It.

## Adding a New Algorithm

1. Create `src/algorithms/<category>/<algorithm>/` with:
   - `<algorithm>.ts` — pure implementation (no visualization logic)
   - `step-generator.ts` — uses the appropriate tracker to produce `ExecutionStep[]`
   - `educational.ts` — all 7 content sections
   - `index.ts` — defines `AlgorithmDefinition` and calls `registry.register()`
   - `sources/` — display source files for TypeScript, Python, Java
2. Import the new algorithm in `src/algorithms/index.ts` (triggers self-registration)
3. Add Storybook pipeline stories in `src/components/visualization/<Algorithm>Pipeline.stories.tsx`
4. All UI works automatically via the registry

## Adding a New Language

1. Add the language to the `SupportedLanguage` type in `src/types/algorithm.ts`
2. Add display label and Monaco language mapping in `src/utils/constants.ts`
3. Create source files for each algorithm in their `sources/` directory
4. Add line mappings for the new language in each algorithm's `step-generator.ts`

## Input Editing

All input edits are **temporary and non-persistent**:

- Array inputs, graph configurations, and grid layouts reset on algorithm switch or page reload
- Pathfinding grid edits (walls, start/end positions) are stored in Zustand only
- No localStorage, URL state, or server persistence

## Keyboard Shortcuts

| Key         | Action                    |
| ----------- | ------------------------- |
| Space       | Play / Pause              |
| Left Arrow  | Step backward             |
| Right Arrow | Step forward              |
| R           | Reset to step 0           |
| 1–5         | Set speed (0.25x–4x)      |
| Escape      | Close drawers             |
| L           | Toggle educational drawer |

## Project Structure

```
src/
├── algorithms/          # Self-registering algorithm definitions
│   ├── sorting/         # Bubble Sort
│   ├── searching/       # Binary Search
│   ├── graph/           # BFS
│   ├── pathfinding/     # Dijkstra
│   ├── dynamic-programming/ # Fibonacci
│   └── array-techniques/    # Sliding Window
├── components/
│   ├── code-panel/      # Monaco editor with language tabs
│   ├── educational/     # Slide-over educational drawer
│   ├── explanation-panel/ # Step details, metrics, variables
│   ├── input-editor/    # Category-specific input editors
│   ├── layout/          # AppShell, Header, PanelLayout, MobileLayout
│   ├── playback/        # PlaybackControls with progress bar
│   ├── shared/          # Button, Badge, IconButton, Select
│   └── visualization/   # ArrayVisualizer, GraphVisualizer, GridVisualizer, DPTableVisualizer
├── hooks/               # usePlaybackEngine, useKeyboardShortcuts, useResponsiveLayout
├── registry/            # AlgorithmRegistry singleton
├── store/               # Zustand slices (algorithm, playback, editor, UI)
├── trackers/            # Category-specific step trackers (Sorting, Searching, Graph, Pathfinding, DP, Array)
├── types/               # TypeScript type definitions
└── utils/               # Constants, source file loader
```

## Session Hooks

The project uses Claude session hooks (`.claude/settings.json`) to enforce quality:

- **SessionStart**: Branch safety check — warns if working directly on `main`
- **Stop**: Quality gate — lint, format, typecheck, and unit tests must pass
- **Stop**: README check — verifies README.md is updated when source/infra/config files change
- **Stop**: Comments check — verifies all modified TypeScript files have code comments

## Development Plan

The full implementation plan is maintained at `.claude/PLAN.md` with phased milestones, architecture decisions, and verification steps.
