# AlgoFlow

[![CI](https://github.com/reshinto/algo_flow/actions/workflows/ci.yml/badge.svg)](https://github.com/reshinto/algo_flow/actions/workflows/ci.yml)

Algorithm visualization web app for learners. Step through algorithms with synchronized code highlighting, animated visualizations, and educational content.

![AlgoFlow Demo](docs/assets/demo.gif)

## Features

- **232 Algorithms across 14 Categories** with interactive visualizations (bar charts, SVG graphs/trees, CSS grids, DP tables, and more)
- **Multi-Language Code Display**: TypeScript, Python, and Java with synchronized line highlighting via Monaco Editor
- **Step-by-Step Playback**: Play, pause, step forward/backward, scrub, adjustable speed (0.25x–4x)
- **Category-Specific Input Editors**: Editable arrays, targets, grids, text patterns, and matrices
- **Educational Content**: Slide-over drawer with overview, complexity analysis, real-world uses, and trade-offs
- **Responsive Layout**: 3-panel resizable layout on desktop; 2-panel tablet layout (768-1023px); tab-based switcher on mobile
- **Theme Support**: Light/dark/system theme toggle with persistent preference storage
- **Accessibility**: WCAG 2.1 AA — focus traps, ARIA roles, reduced-motion support across all visualizers

## Algorithms

**232 algorithms across 14 categories**: Sorting, Searching, Graph (28 algorithms across 10 technique subcategories), Pathfinding (27 algorithms across 5 technique subcategories), Dynamic Programming (32 algorithms across 6 technique subcategories), Arrays (44 algorithms across 11 technique subcategories), Trees, Linked Lists, Heaps (28 algorithms across 4 technique subcategories), Stacks & Queues, Hash Maps (28 algorithms across 8 technique subcategories), Strings, Matrices (20 algorithms across 5 technique subcategories), and Sets (19 algorithms across 5 technique subcategories).

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

Welcome to the definitive map of AlgoFlow. We maintain 12 specialized guides mapping every constraint of this repository. Instead of bloating this README, we require developers to navigate to the isolated documentation covering their exact domain.

| If you want to...                  | Document Target                                                   |
| ---------------------------------- | ----------------------------------------------------------------- |
| **Start contributing**             | 🗺️ [New Developer Onboarding](docs/onboarding.md)                 |
| Look up a term or concept          | 📖 [Glossary](docs/glossary.md)                                   |
| Understand the system architecture | 🏗️ [Architecture Overview](docs/architecture.md)                  |
| Understand the repository layouts  | 📁 [Root Files Guide](docs/root-files-guide.md)                   |
| Add an algorithm or language       | 🛠️ [Contributing Guide](docs/contributing.md)                     |
| Write or run tests                 | 🧪 [Testing](docs/testing.md)                                     |
| Deploy via Docker or CI/CD         | 🚀 [Deployment](docs/deployment.md)                               |
| Debug step-generation crashes      | 🐛 [Debugging](docs/debugging.md)                                 |
| Work on UI layout or styling       | 💅 [Design System](docs/design-system.md)                         |
| Write algorithm learning modules   | 📚 [Educational Content Guide](docs/educational-content-guide.md) |
| Browse all 232 algorithms          | 🔍 [Algorithm Catalog](docs/algorithms-catalog.md)                |
| Understand AI hooks & plugins      | 🤖 [Development System](docs/claude-system.md)                    |

> [!TIP] > **First-time contributors:** Do not try to hack around aimlessly. Start strictly at the [New Developer Onboarding Guide](docs/onboarding.md). It dictates the hard boundary between the UI logic and the engine.

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

All complex operational instructions have been modularized:

- **Available NPM Scripts & Watchers**: Handled in [Testing](docs/testing.md).
- **Docker Orchestration & Environment Setup**: Handled in [Deployment](docs/deployment.md).
- **GitHub Actions (CI/CD)**: Pipeline architecture detailed in [Deployment](docs/deployment.md).

## Development System & Hooks

This repository leverages automatic pre-commit quality gates, git protection blocking direct pushes to `main`, and accessibility scanners.

Please review the 12 active session hooks in the [Development System Guide](docs/claude-system.md#session-hooks) to understand the terminal environments preventing bad commits.

## Development Plan

The full implementation plan is maintained at `.claude/PLAN.md` with phased milestones, architecture decisions, and verification steps.
