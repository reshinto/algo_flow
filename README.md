# AlgoFlow

[![CI](https://github.com/reshinto/algo_flow/actions/workflows/ci.yml/badge.svg)](https://github.com/reshinto/algo_flow/actions/workflows/ci.yml)

Algorithm visualization web app for learners. Step through algorithms with synchronized code highlighting, animated visualizations, and educational content.

## Features

- **58 Algorithms across 14 Categories** with interactive visualizations (bar charts, SVG graphs/trees, CSS grids, DP tables, and more)
- **Multi-Language Code Display**: TypeScript, Python, and Java with synchronized line highlighting via Monaco Editor
- **Step-by-Step Playback**: Play, pause, step forward/backward, scrub, adjustable speed (0.25x–4x)
- **Category-Specific Input Editors**: Editable arrays, targets, grids, text patterns, and matrices
- **Educational Content**: Slide-over drawer with overview, complexity analysis, real-world uses, and trade-offs
- **Responsive Layout**: 3-panel resizable IDE-style layout on desktop; tab-based switcher on mobile/tablet

## Algorithms

<details>
<summary><strong>58 Algorithms across 14 Categories</strong> (click to expand)</summary>

| Category            | Algorithm                         | Visualizer                                     |
| ------------------- | --------------------------------- | ---------------------------------------------- |
| Sorting             | Bubble Sort                       | Animated bar chart                             |
| Searching           | Binary Search                     | Bar chart with pointer narrowing               |
| Graph               | Breadth-First Search              | SVG node + edge graph                          |
| Pathfinding         | Dijkstra's Algorithm              | CSS grid with wavefront                        |
| Dynamic Programming | Fibonacci (Tab + Memo)            | DP table cells + call stack                    |
| Arrays              | Sliding Window (Max Sum)          | Bar chart with window range                    |
| Arrays              | Sliding Window (Min Sum)          | Bar chart with window range                    |
| Arrays              | Kadane's Algorithm (Max Subarray) | Bar chart with extend/restart window           |
| Arrays              | Minimum Subarray Sum              | Bar chart with inverted Kadane's window        |
| Arrays              | Max Product Subarray              | Bar chart with dual min/max tracking           |
| Arrays              | Best Time Buy/Sell Stock          | Bar chart with min-price pointer               |
| Arrays              | Best Time Buy/Sell (Unlimited)    | Bar chart with greedy profit highlights        |
| Arrays              | Boyer-Moore Voting (Majority)     | Bar chart with candidate tracking              |
| Arrays              | Move Zeros to End                 | Bar chart with fast/slow pointers              |
| Arrays              | Remove Duplicates (Sorted)        | Bar chart with write/read pointers             |
| Arrays              | Two Sum (Sorted, Two Pointer)     | Bar chart with converging pointers             |
| Arrays              | Three Sum (Zero Triplets)         | Bar chart with anchor + two pointers           |
| Arrays              | Four Sum                          | Bar chart with four pointers                   |
| Arrays              | Container With Most Water         | Bar chart with converging pointers             |
| Arrays              | Trapping Rain Water               | Bar chart with two-pointer water calculation   |
| Arrays              | Dutch National Flag               | Bar chart with 3-way partition pointers        |
| Arrays              | Lomuto Partition                  | Bar chart with pivot + boundary pointer        |
| Arrays              | Quickselect (K-th Smallest)       | Bar chart with partition narrowing             |
| Arrays              | Rotate Array (Reversal)           | Bar chart with three-pass reversal             |
| Arrays              | Rotate Array (Cyclic)             | Bar chart with cycle-following swaps           |
| Arrays              | Cyclic Sort                       | Bar chart with index-placement swaps           |
| Arrays              | Find Missing Number (XOR)         | Bar chart with running XOR highlight           |
| Arrays              | Single Number (XOR)               | Bar chart with pair-cancellation highlight     |
| Arrays              | Find All Duplicates               | Bar chart with sign-negation marking           |
| Arrays              | First Missing Positive            | Bar chart with placement + scan phases         |
| Arrays              | Next Greater Element              | Bar chart with monotonic stack resolution      |
| Arrays              | Previous Smaller Element          | Bar chart with monotonic stack (left scan)     |
| Arrays              | Daily Temperatures                | Bar chart with distance-based stack resolution |
| Arrays              | Largest Rectangle in Histogram    | Bar chart (histogram) with monotonic stack     |
| Arrays              | Sliding Window Maximum (Deque)    | Bar chart with deque-based max tracking        |
| Arrays              | Min Size Subarray Sum             | Bar chart with variable window                 |
| Arrays              | Subarray Product < K              | Bar chart with product-based variable window   |
| Arrays              | Max Consecutive Ones III          | Bar chart with zero-flip window                |
| Arrays              | Count Anagram Windows             | Bar chart with frequency-matching window       |
| Arrays              | First Negative in Window          | Bar chart with deque-tracked negatives         |
| Arrays              | Longest K-Distinct Subarray       | Bar chart with distinct-count window           |
| Arrays              | Prefix Sum (Range Query)          | Dual bar chart (original + prefix sum)         |
| Arrays              | Subarray Sum Equals K             | Bar chart with prefix sum + hash map           |
| Arrays              | Product of Array Except Self      | Bar chart with two-pass prefix/suffix          |
| Arrays              | Difference Array (Range Update)   | Dual bar chart (diff array + result)           |
| Arrays              | XOR Range Query                   | Dual bar chart (original + prefix XOR)         |
| Arrays              | Merge Two Sorted Arrays           | Dual bar chart (inputs + merged result)        |
| Arrays              | Counting Sort                     | Dual bar chart (input + count array)           |
| Arrays              | Floyd's Cycle Detection           | Bar chart with tortoise/hare pointers          |
| Trees               | BST In-Order Traversal            | SVG binary tree with traversal order           |
| Linked Lists        | Reverse Linked List               | SVG node chain with pointer animation          |
| Heaps               | Build Min Heap                    | SVG tree + array dual-view with sift-down      |
| Stacks & Queues     | Valid Parentheses                 | Stack push/pop with input character states     |
| Hash Maps           | Two Sum                           | Input array + key→value table                  |
| Strings             | KMP Search                        | Text row, pattern row, failure table           |
| Matrices            | Spiral Order Traversal            | CSS grid with boundary shrink animation        |
| Sets                | Set Intersection                  | Array A, array B, hash set, result panels      |

</details>

## Quick Start

> [!NOTE]
> Requires **Node 22**. Use `nvm use` if you have nvm installed — the repo includes an `.nvmrc`.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Architecture

AlgoFlow uses a registry-driven architecture with pre-computed execution steps. Algorithms self-register, trackers build `ExecutionStep[]` arrays, and a discriminated union on `VisualState.kind` dispatches to generic visualizer components.

See [docs/architecture.md](docs/architecture.md) for tech stack, data flow diagrams, state management, and project structure.

## Documentation Guide

| If you want to...            | Start here                                                  |
| ---------------------------- | ----------------------------------------------------------- |
| Understand how the app works | [Architecture](docs/architecture.md)                        |
| Add a new algorithm          | [Contributing](docs/contributing.md#adding-a-new-algorithm) |
| Write or run tests           | [Testing](docs/testing.md)                                  |
| Deploy or understand CI      | [Deployment](docs/deployment.md)                            |

> [!TIP]
> First-time contributors: read the [Contributing guide](docs/contributing.md) end-to-end. It covers setup, branch workflow, the full algorithm walkthrough, and troubleshooting.

## Contributing

New to the project? The contributing guide covers everything from first clone to merged PR:

- **[docs/contributing.md](docs/contributing.md)** — prerequisites, branch workflow, quality gate, algorithm walkthrough, coding standards, troubleshooting

### Adding a New Algorithm

1. Create `src/algorithms/<category>/<algorithm>/` with source files, step generator, educational content, and registry module
2. Import in `src/algorithms/index.ts` (triggers self-registration)
3. Add Storybook pipeline stories in the algorithm directory (`<Algorithm>Pipeline.stories.tsx`)
4. All UI works automatically via the registry

See the [full walkthrough](docs/contributing.md#adding-a-new-algorithm) for step-by-step instructions with code examples.

### Adding a New Language

1. Add the language to `SupportedLanguage` in `src/types/algorithm.ts`
2. Add display label and Monaco mapping in `src/utils/constants.ts`
3. Create source files with `@step:` markers in each algorithm's `sources/` directory
4. Add language extension in `src/utils/source-loader.ts`

## Input Editing

> [!IMPORTANT]
> All input edits are **temporary and non-persistent**. Edits reset on algorithm switch or page reload. No localStorage, URL state, or server persistence.

See [Input Editors](docs/architecture.md#input-editors) for per-category editor types and pathfinding grid editing details.

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

## Testing

Unit tests (Vitest), E2E browser tests (Playwright), and visual regression (Storybook + Chromatic). See [docs/testing.md](docs/testing.md) for full details, Chromatic setup, and coverage thresholds.

## Docker

```bash
docker-compose up -d        # http://localhost:3000
docker build -t algoflow .  # or build directly
docker run -p 3000:80 algoflow
```

## CI/CD

Two GitHub Actions workflows in `.github/workflows/`:

- **ci.yml** — Runs on all pull requests. Jobs: type-check-and-lint (typecheck + ESLint + Prettier in one job), unit tests, E2E tests, Storybook build, Chromatic visual tests.
- **deploy.yml** — Runs on push to `main`. Runs CI checks, then builds and deploys to GitHub Pages.

See [docs/deployment.md](docs/deployment.md) for Docker build internals and per-job pipeline details.

## Session Hooks

The project uses session hooks (`.claude/settings.json`) to enforce code quality and branch safety automatically during development sessions:

- **SessionStart**: Branch safety check — warns if working directly on `main`
- **Stop**: Quality gate — lint, format, typecheck, and unit tests must pass
- **Stop**: Docs check — verifies README.md and docs/ files are updated when source, infra, config, or hook files change (with targeted guidance on which doc to update)
- **Stop**: Comments check — verifies all modified TypeScript files have code comments
- **Stop**: E2E check — runs `e2e/algoflow_e2e.mjs` in headless Chromium when any `.tsx`, `.css`, `.html`, or `e2e/algoflow_e2e.mjs` file changes; starts the dev server automatically if needed
- **PreToolUse**: Blocks commits and pushes directly to `main`
- **PostToolUse**: Automatically creates a PR after pushing a feature branch

## Development Plan

The full implementation plan is maintained at `.claude/PLAN.md` with phased milestones, architecture decisions, and verification steps.
