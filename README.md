# AlgoFlow

[![CI](https://github.com/reshinto/algo_flow/actions/workflows/ci.yml/badge.svg)](https://github.com/reshinto/algo_flow/actions/workflows/ci.yml)

Algorithm visualization web app for learners. Step through algorithms with synchronized code highlighting, animated visualizations, and educational content.

![AlgoFlow Demo](docs/assets/demo.gif)

## Features

- **Multi-Category Algorithm Library** with interactive visualizations (bar charts, SVG graphs/trees, CSS grids, DP tables, and more)
- **Multi-Language Code Display**: TypeScript, Python, Java, Rust, C++, and Go with synchronized line highlighting via Monaco Editor
- **Step-by-Step Playback**: Play, pause, step forward/backward, scrub, adjustable speed (0.25x–4x)
- **Category-Specific Input Editors**: Editable arrays, targets, grids, text patterns, and matrices
- **Educational Content**: Slide-over drawer with overview, complexity analysis, real-world uses, and trade-offs
- **Responsive Layout**: 3-panel resizable layout on desktop; 2-panel tablet layout; tab-based switcher on mobile
- **Theme Support**: Light/dark/system theme toggle with persistent preference storage
- **Accessibility**: WCAG 2.1 AA — focus traps, ARIA roles, reduced-motion support across all visualizers

## Algorithms

Algorithms span Sorting, Searching, Graph, Pathfinding, Dynamic Programming, Arrays, Trees, Linked Lists, Heaps, Stacks & Queues, Hash Maps, Strings, Matrices, and Sets — each with multiple technique subcategories.

See the [Algorithm Catalog](docs/algorithms-catalog.md) for the full listing with visualizer descriptions and technique subcategories.

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

| If you want to...                  | Document Target                                                   |
| ---------------------------------- | ----------------------------------------------------------------- |
| **Start contributing**             | [New Developer Onboarding](docs/onboarding.md)                    |
| Look up a term or concept          | [Glossary](docs/glossary.md)                                      |
| Understand the system architecture | [Architecture Overview](docs/architecture.md)                     |
| Understand the repository layouts  | [Root Files Guide](docs/root-files-guide.md)                      |
| Add an algorithm or language       | [Contributing Guide](docs/contributing.md)                        |
| Write or run tests                 | [Testing](docs/testing.md)                                        |
| Deploy via Docker or CI/CD         | [Deployment](docs/deployment.md)                                  |
| Debug step-generation crashes      | [Debugging](docs/debugging.md)                                    |
| Work on UI layout or styling       | [Design System](docs/design-system.md)                            |
| Write algorithm learning modules   | [Educational Content Guide](docs/educational-content-guide.md)    |
| Browse all algorithms              | [Algorithm Catalog](docs/algorithms-catalog.md)                   |
| Understand dev hooks & plugins     | [Development System](docs/claude-system.md)                       |

> [!TIP] > **First-time contributors:** Start at the [New Developer Onboarding Guide](docs/onboarding.md). It dictates the hard boundary between the UI logic and the engine.

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

## Scripts, Testing, and Deployment

### Run All Tests via Docker (No Toolchain Install Required)

> [!TIP]
> The Docker test image has all 6 language toolchains pre-installed. Only Docker is needed on your machine.

```bash
npm run docker:test:build        # Build once (cached after first build)
npm run docker:test              # Run ALL test suites (TypeScript + 5 languages)
npm run docker:test:python       # Run a single language
```

### Run Tests Locally (Requires Toolchains on PATH)

```bash
npm run test                     # TypeScript unit tests (Vitest)
npm run test:all-languages       # All 5 language suites sequentially
npm run test:python              # Individual language suite
```

See [Testing](docs/testing.md) for full commands, sharding, coverage, and [Deployment](docs/deployment.md) for Docker and CI/CD details.

## Development System

Pre-commit quality gates, git branch protection, and accessibility scanners run automatically. See the [Development System Guide](docs/claude-system.md) for the full reference.
