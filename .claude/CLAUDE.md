# AlgoFlow

Algorithm visualization web app for learners. Synchronized code-line highlighting with step-by-step execution, multi-language code display, interactive pathfinding grid editing, and educational content.

## General Behavior

- When asked to show command output (git status, test results, etc.), show the RAW output first, then summarize if needed. Never replace raw output with a summary.
- When asked to 'continue' prior work, produce a brief plan of what you'll do within the first response, then start executing. Do not spend the entire session reading files without producing output.

## Project Setup

This is a TypeScript + Markdown project. Primary languages: TypeScript for code, Markdown for documentation. Run `npm run lint` and `npm run format` before committing.

## Tech Stack

Vite + React 19 + TypeScript (strict) + Tailwind CSS v4 + Zustand + Monaco Editor + Framer Motion

## Architecture

Registry-driven, pre-computed steps, tracker abstraction, discriminated `VisualState` union — see `.claude/rules/architecture.md`.

## Key Paths

- Types: `src/types/`
- Registry: `src/registry/`
- Trackers: `src/trackers/`
- Algorithms: `src/algorithms/<category>/<algorithm>/`
- Store: `src/store/`
- Components: `src/components/`
- Plan: `.claude/PLAN.md`

## Rules

See `.claude/rules/` for full constraints. Most commonly violated:

- No single-char variable names, no `any` types — use `unknown` with narrowing
- `@/` path alias required for all src-relative imports
- `noUncheckedIndexedAccess` enabled — use tuple types (`[number, number][]`) for coordinate arrays
- Pipeline stories (`*.Pipeline.stories.tsx`) live in algorithm directories, not `src/components/`
- Branch-per-task mandatory — every new task starts on a fresh branch from main
- All edits to input and pathfinding grids are temporary (non-persistent)

## General Guidelines

- This is a TypeScript-first project — when exploring, prioritize source files and tests over config files
- If the task is clear, start making changes immediately — do not read more than 3 files before writing code
- If exploration is needed, read files and propose a concrete plan within the first 5 minutes; never spend an entire session only reading
- Lead with deliverables: always produce at least one code change or a written plan before asking clarifying questions

## Documentation

- After any file reorganization or code generation task, ALWAYS update all related documentation (README, Storybook docs, index files) in the same pass. Do not wait for user to remind you.

## Git Workflow

- When working on branches, always verify the current branch and its commit history before starting work. Never create a new branch from main when continuing prior work — check for existing feature branches first.

## Testing

- Run CI checks in sequence and fix iteratively until all pass green: `npm run lint` → `npm run format` → `npm run typecheck` → `npm test`
- Do not stop after fixing just one category — keep going until everything is clean
- For E2E tests, the dev server starts automatically via hooks — do not start it manually
- Every new algorithm needs: correctness tests + step generation tests + pipeline story in algorithm directory + E2E registration — see `.claude/rules/testing.md`

## Workflow

1. Branch-per-task mandatory before any changes — use format `<type>/<subcategory>-<description>` (e.g., `feat/ui-modal`, `fix/e2e-hash-maps`). The subcategory determines which optional plugins are auto-enabled at session start via `auto-plugin-mode.sh`.
2. Quality gate runs automatically at session end via `session-end-unified-gate.sh` (lint, format, typecheck, tests with coverage, Storybook build, E2E, security scan). Blocks git operations on failure.
3. See `.claude/rules/workflow.md` for full 7-step development flow with agent roles
