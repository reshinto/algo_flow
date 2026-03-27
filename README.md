# AlgoFlow

[![CI](https://github.com/reshinto/algo_flow/actions/workflows/ci.yml/badge.svg)](https://github.com/reshinto/algo_flow/actions/workflows/ci.yml)

Algorithm visualization web app for learners. Step through algorithms with synchronized code highlighting, animated visualizations, and educational content.

<!-- TODO: Add screenshot — replace with actual screenshot path when available -->
<!-- ![AlgoFlow screenshot](docs/assets/screenshot.png) -->

## Features

- **14 Algorithm Categories** with interactive visualizations (bar charts, SVG graphs/trees, CSS grids, DP tables, and more)
- **Multi-Language Code Display**: TypeScript, Python, and Java with synchronized line highlighting via Monaco Editor
- **Step-by-Step Playback**: Play, pause, step forward/backward, scrub, adjustable speed (0.25x–4x)
- **Category-Specific Input Editors**: Editable arrays, targets, grids, text patterns, and matrices
- **Educational Content**: Slide-over drawer with overview, complexity analysis, real-world uses, and trade-offs
- **Responsive Layout**: 3-panel resizable IDE-style layout on desktop; tab-based switcher on mobile/tablet

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

## Contributing

New to the project? The contributing guide covers everything from first clone to merged PR:

- **[docs/contributing.md](docs/contributing.md)** — prerequisites, branch workflow, quality gate, algorithm walkthrough, coding standards, troubleshooting

### Adding a New Algorithm

1. Create `src/algorithms/<category>/<algorithm>/` with source files, step generator, educational content, and registry module
2. Import in `src/algorithms/index.ts` (triggers self-registration)
3. Add Storybook pipeline stories
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

- Array inputs, graph configurations, and grid layouts reset on algorithm switch or page reload
- Pathfinding grid edits (walls, start/end node positions) are stored in Zustand only — click to toggle walls, drag to reposition start/end nodes, reset to restore defaults

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

- **ci.yml** — Runs on all pull requests. Jobs: typecheck, lint, format, unit tests, E2E tests, Storybook build, Chromatic visual tests.
- **deploy.yml** — Runs on push to `main`. Runs CI checks, then builds and deploys to GitHub Pages.

See [docs/deployment.md](docs/deployment.md) for Docker build internals and per-job pipeline details.

<details>
<summary><strong>Session Hooks (quality gates)</strong></summary>

The project uses session hooks (`.claude/settings.json`) to enforce quality:

- **SessionStart**: Branch safety check — warns if working directly on `main`
- **Stop**: Quality gate — lint, format, typecheck, and unit tests must pass
- **Stop**: Docs check — verifies README.md and docs/ files are updated when source, infra, config, or hook files change (with targeted guidance on which doc to update)
- **Stop**: Comments check — verifies all modified TypeScript files have code comments
- **Stop**: E2E check — runs `e2e/algoflow_e2e.mjs` in headless Chromium when any `.tsx`, `.css`, `.html`, or `e2e/algoflow_e2e.mjs` file changes; starts the dev server automatically if needed
- **PreToolUse**: Blocks commits and pushes directly to `main`
- **PostToolUse**: Automatically creates a PR after pushing a feature branch

</details>

## Development Plan

The full implementation plan is maintained at `.claude/PLAN.md` with phased milestones, architecture decisions, and verification steps.
