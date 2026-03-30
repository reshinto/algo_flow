# AlgoFlow

[![CI](https://github.com/reshinto/algo_flow/actions/workflows/ci.yml/badge.svg)](https://github.com/reshinto/algo_flow/actions/workflows/ci.yml)

Algorithm visualization web app for learners. Step through algorithms with synchronized code highlighting, animated visualizations, and educational content.

![AlgoFlow Demo](docs/assets/demo.gif)

## Features

- **143 Algorithms across 14 Categories** with interactive visualizations (bar charts, SVG graphs/trees, CSS grids, DP tables, and more)
- **Multi-Language Code Display**: TypeScript, Python, and Java with synchronized line highlighting via Monaco Editor
- **Step-by-Step Playback**: Play, pause, step forward/backward, scrub, adjustable speed (0.25x–4x)
- **Category-Specific Input Editors**: Editable arrays, targets, grids, text patterns, and matrices
- **Educational Content**: Slide-over drawer with overview, complexity analysis, real-world uses, and trade-offs
- **Responsive Layout**: 3-panel resizable layout on desktop; 2-panel tablet layout (768-1023px); tab-based switcher on mobile
- **Theme Support**: Light/dark/system theme toggle with persistent preference storage
- **Accessibility**: WCAG 2.1 AA — focus traps, ARIA roles, reduced-motion support across all visualizers

## Algorithms

**143 algorithms across 14 categories**: Sorting, Searching, Graph (28 algorithms across 10 technique subcategories), Pathfinding, Dynamic Programming (32 algorithms across 6 technique subcategories), Arrays (44 algorithms across 11 technique subcategories), Trees, Linked Lists, Heaps, Stacks & Queues, Hash Maps (28 algorithms across 8 technique subcategories), Strings, Matrices, and Sets.

See the [full Algorithm Catalog](docs/algorithms-catalog.md) for the complete listing with visualizer descriptions and technique subcategories.

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

| If you want to...                 | Start here                                                     |
| --------------------------------- | -------------------------------------------------------------- |
| Look up a term or concept         | [Glossary](docs/glossary.md)                                   |
| Understand how the app works      | [Architecture](docs/architecture.md)                           |
| Add a new algorithm               | [Contributing](docs/contributing.md#adding-a-new-algorithm)    |
| Write or run tests                | [Testing](docs/testing.md)                                     |
| Deploy or understand CI           | [Deployment](docs/deployment.md)                               |
| Debug a step generation issue     | [Debugging](docs/debugging.md)                                 |
| Work on UI or styling             | [Design System](docs/design-system.md)                         |
| Write educational content         | [Educational Content Guide](docs/educational-content-guide.md) |
| Browse all algorithms             | [Algorithm Catalog](docs/algorithms-catalog.md)                |
| Understand agents, hooks, plugins | [Development System](docs/claude-system.md)                    |

> [!TIP]
> First-time contributors: read the [Contributing guide](docs/contributing.md) end-to-end. It covers setup, branch workflow, the full algorithm walkthrough, and troubleshooting.

## Contributing

New to the project? The contributing guide covers everything from first clone to merged PR:

- **[docs/contributing.md](docs/contributing.md)** — prerequisites, branch workflow, quality gate, algorithm walkthrough, coding standards, troubleshooting

### Adding a New Algorithm

1. Create the algorithm directory with source files, step generator, educational content, and registry module:
   - Standard categories: `src/algorithms/<category>/<algorithm>/`
   - Arrays and Dynamic Programming use technique sub-directories: `src/algorithms/<category>/<technique>/<algorithm>/`
2. The barrel file `src/algorithms/index.ts` is auto-generated — no manual import needed
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

The project uses 12 session hooks (`.claude/settings.json`) to enforce code quality, safety, and consistency automatically during development sessions — including branch protection, pre-commit quality gates, per-language post-edit warnings, hardcoded-wait bans, plugin auto-switching by branch prefix, and a unified session-end gate.

See [Development System](docs/claude-system.md#session-hooks-12) for the full hook list with descriptions.

## Development Plan

The full implementation plan is maintained at `.claude/PLAN.md` with phased milestones, architecture decisions, and verification steps.
