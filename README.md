# AlgoFlow

Algorithm visualization web app for learners. Step through algorithms with synchronized code highlighting, animated visualizations, and educational content.

## Features

- **14 Algorithm Categories**: Sorting, Searching, Graph, Pathfinding, Dynamic Programming, Arrays, Trees, Linked Lists, Heaps, Stacks & Queues, Hash Maps, Strings, Matrices, Sets
- **Multi-Language Code Display**: TypeScript, Python, and Java source files with synchronized line highlighting via Monaco Editor
- **Interactive Visualizations**: Animated bar charts, SVG graph/tree rendering, CSS grid pathfinding, DP table cells, heap tree + array dual view, stack/queue animations, hash map table, string + failure-table view, matrix spiral, set membership display
- **Step-by-Step Playback**: Play, pause, step forward/backward, scrub, adjustable speed (0.25x–4x)
- **Input Editors**: Category-specific editors for every algorithm — arrays, sorted array + target, sliding window, DP index, KMP text + pattern, two-sum array + target, two array inputs, matrix textarea, interactive pathfinding grid
- **Pathfinding Grid Editing**: Click to place walls, drag start/end nodes, reset grid, run Dijkstra in real-time
- **Educational Content**: Slide-over drawer with overview, complexity analysis, real-world uses, strengths/limitations, and trade-offs for every algorithm
- **Responsive Layout**: 3-panel resizable IDE-style layout on desktop; tab-based single-panel switcher on mobile/tablet (<1024px)
- **Storybook Visual Testing**: Component stories for shared primitives, individual visualizers, and full algorithm pipelines

## Algorithms

| Category            | Algorithm                | Visualizer                                 |
| ------------------- | ------------------------ | ------------------------------------------ |
| Sorting             | Bubble Sort              | Animated bar chart                         |
| Searching           | Binary Search            | Bar chart with pointer narrowing           |
| Graph               | Breadth-First Search     | SVG node + edge graph                      |
| Pathfinding         | Dijkstra's Algorithm     | CSS grid with wavefront                    |
| Dynamic Programming | Fibonacci (Tab + Memo)   | DP table cells + call stack                |
| Arrays              | Sliding Window (Max Sum) | Bar chart with window range                |
| Trees               | BST In-Order Traversal   | SVG binary tree with traversal order       |
| Linked Lists        | Reverse Linked List      | SVG node chain with pointer animation      |
| Heaps               | Build Min Heap           | SVG tree + array dual-view with sift-down  |
| Stacks & Queues     | Valid Parentheses        | Stack push/pop with input character states |
| Hash Maps           | Two Sum                  | Input array + key→value table              |
| Strings             | KMP Search               | Text row, pattern row, failure table       |
| Matrices            | Spiral Order Traversal   | CSS grid with boundary shrink animation    |
| Sets                | Set Intersection         | Array A, array B, hash set, result panels  |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command                   | Description                           |
| ------------------------- | ------------------------------------- |
| `npm run dev`             | Start development server with HMR     |
| `npm run build`           | Type-check and build for production   |
| `npm run preview`         | Preview production build locally      |
| `npm run lint`            | Run ESLint                            |
| `npm run lint:fix`        | Run ESLint with auto-fix              |
| `npm run format`          | Format all files with Prettier        |
| `npm run format:check`    | Check formatting without writing      |
| `npm run typecheck`       | TypeScript type checking              |
| `npm run test`            | Run unit tests (Vitest)               |
| `npm run test:watch`      | Run tests in watch mode               |
| `npm run test:coverage`   | Run tests with coverage report        |
| `npm run storybook`       | Start Storybook development server    |
| `npm run storybook:build` | Build Storybook for static deployment |
| `npm run e2e`             | Run E2E browser tests (headless/CI)   |
| `npm run e2e:headed`      | Run E2E browser tests (headed)        |

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
# Run all unit tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode during development
npm run test:watch
```

Tests cover algorithm correctness, step generation, tracker behavior, and store state transitions across all algorithms.

### E2E Browser Tests (Playwright)

```bash
# Run headless (CI / automated)
npm run e2e

# Run with a visible browser (development)
npm run e2e:headed
```

The E2E suite lives in `e2e/algoflow_e2e.mjs` at the project root. It uses Playwright with Chromium and simulates a real user session — selecting all 15 algorithms via the command palette, exercising playback controls (play, pause, step, reset, rerun), switching language tabs (TypeScript / Python / Java), editing every input editor, scrubbing the progress bar, testing all keyboard shortcuts (Space, ArrowRight, ArrowLeft, R, L, Escape, 1–5), and verifying zero browser console errors.

The suite is automatically enforced by the `session-end-e2e-check.sh` Stop hook: whenever any `.tsx`, `.css`, `.html`, or `e2e/algoflow_e2e.mjs` file is modified during a Claude session, the hook runs the suite in headless mode before allowing any git operations. If no dev server is running, the hook starts one automatically and stops it after the tests complete.

When adding a new algorithm or visualizer component, update `e2e/algoflow_e2e.mjs`:

1. Add the algorithm name to the `algorithms` array — all 14 per-algorithm checks run automatically
2. Add an entry to `inputTests` if the algorithm has an input editor

### Storybook & Visual Regression Testing

```bash
# Start Storybook dev server
npm run storybook

# Build static Storybook
npm run storybook:build

# Run Chromatic visual tests (auto-loads token from .env)
npm run chromatic
```

**15 story files** (51 snapshots) organized into:

- **Shared Primitives**: Button, Badge, IconButton, Select
- **Code Panel**: LanguageTabs
- **Individual Visualizers**: ArrayVisualizer, GraphVisualizer, GridVisualizer, DPTableVisualizer — with mock data showing different visual states
- **Algorithm Pipelines**: Bubble Sort, Binary Search, BFS, Dijkstra, Fibonacci DP, Sliding Window, BST In-Order, Reverse Linked List, Build Min Heap, Valid Parentheses, Two Sum, KMP Search, Spiral Order, Set Intersection — using real step generators to show initial, mid-execution, and final states

Visual regression testing is powered by [Chromatic](https://www.chromatic.com/). Every story is automatically snapshot-tested. Chromatic captures pixel-perfect screenshots in cloud browsers and flags visual differences for review.

#### Setting up Chromatic

**1. Get a project token:**

- Sign up at [chromatic.com](https://www.chromatic.com/) and create a project (or link your GitHub repo)
- Copy the project token from the project settings page

**2. Add the token to `.env` for local use:**

```bash
cp .env.example .env
```

Then open `.env` and paste your token:

```
CHROMATIC_PROJECT_TOKEN=chpt_your_token_here
```

The `.env` file is gitignored and will not be committed.

**3. Add the token to GitHub Secrets for CI:**

```bash
# Using GitHub CLI
gh secret set CHROMATIC_PROJECT_TOKEN --repo <owner>/<repo> --body "<your-token>"
```

Or manually: GitHub repo > Settings > Secrets and variables > Actions > New repository secret > Name: `CHROMATIC_PROJECT_TOKEN`, Value: your token.

#### Running visual tests

**CLI (headless):**

```bash
npm run chromatic
```

Builds Storybook, uploads snapshots to Chromatic, and prints a dashboard URL with results. The token is auto-loaded from `.env` via `dotenv-cli`.

**Storybook GUI (interactive):**

```bash
npm run storybook
```

Open http://localhost:6006 in your browser, select any story, then click the **"Visual tests"** tab in the bottom panel. Sign in with Chromatic on first use (one-time OAuth). After that, you can run and review visual tests directly inside Storybook.

**CI (automatic):**
The CI workflows run Chromatic automatically on every push to `main` and on pull requests when `CHROMATIC_PROJECT_TOKEN` is configured as a repository secret.

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
4. Category-specific **trackers** (one per category: SortingTracker, SearchingTracker, GraphTracker, PathfindingTracker, DPTracker, ArrayTracker, TreeTracker, LinkedListTracker, HeapTracker, StackQueueTracker, HashMapTracker, StringTracker, MatrixTracker, SetTracker) build steps with correct visual state and per-language line mappings
5. A discriminated union on `VisualState.kind` dispatches to the matching visualizer component

All UI components are generic — no algorithm-specific logic in the view layer.

### Responsive Design

- **Desktop** (>=1024px): 3-panel resizable layout with code, visualization, and explanation panels side by side
- **Mobile/Tablet** (<1024px): Tab-based single-panel switcher ("Visualize", "Code", "Details") using `useSyncExternalStore` for viewport-aware rendering

### Input Editors

Each algorithm category has a tailored input editor rendered above the visualization:

- **Sorting**: Comma-separated array text input
- **Searching**: Sorted array + target value inputs
- **Arrays**: Array + window size inputs
- **Dynamic Programming**: Target index number input
- **Pathfinding**: Interactive mini-grid with click-to-add walls, drag start/end nodes, reset button
- **Heaps**: Comma-separated array input
- **Linked Lists**: Comma-separated values input
- **Stacks & Queues**: Bracket string input
- **Hash Maps**: Array + target number inputs
- **Strings**: Text string + pattern string inputs
- **Matrices**: Textarea with one row per line, comma-separated values
- **Sets**: Two comma-separated array inputs (A and B)

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
e2e/                        # E2E browser tests (Playwright)
src/
├── algorithms/              # Self-registering algorithm definitions
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
│   └── visualization/       # All visualizer components + pipeline stories
├── hooks/                   # usePlaybackEngine, useKeyboardShortcuts, useResponsiveLayout
├── registry/                # AlgorithmRegistry singleton
├── store/                   # Zustand slices (algorithm, playback, editor, UI)
├── trackers/                # Category-specific step trackers (one per category)
├── types/                   # TypeScript type definitions
└── utils/                   # Constants, source file loader
```

## Session Hooks

The project uses Claude session hooks (`.claude/settings.json`) to enforce quality:

- **SessionStart**: Branch safety check — warns if working directly on `main`
- **Stop**: Quality gate — lint, format, typecheck, and unit tests must pass
- **Stop**: README check — verifies README.md is updated when source/infra/config files change
- **Stop**: Comments check — verifies all modified TypeScript files have code comments
- **Stop**: E2E check — runs `e2e/algoflow_e2e.mjs` in headless Chromium when any `.tsx`, `.css`, `.html`, or `e2e/algoflow_e2e.mjs` file changes; starts the dev server automatically if needed

## Development Plan

The full implementation plan is maintained at `.claude/PLAN.md` with phased milestones, architecture decisions, and verification steps.
