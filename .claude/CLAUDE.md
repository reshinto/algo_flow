# AlgoFlow

Algorithm visualization web app for learners. Synchronized code-line highlighting with step-by-step execution, multi-language code display, interactive pathfinding grid editing, and educational content.

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

## Testing

- Run CI checks in sequence and fix iteratively until all pass green: `npm run lint` → `npm run format` → `npm run typecheck` → `npm test`
- Do not stop after fixing just one category — keep going until everything is clean
- For E2E tests, the dev server starts automatically via hooks — do not start it manually
- Every new algorithm needs: correctness tests + step generation tests + pipeline story in algorithm directory + E2E registration — see `.claude/rules/testing.md`

## Workflow

1. Branch-per-task mandatory before any changes
2. Quality gate: lint + format + typecheck + unit tests + storybook build
3. See `.claude/rules/workflow.md` for full 7-step development flow with agent roles
