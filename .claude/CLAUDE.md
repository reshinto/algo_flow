# AlgoFlow

Algorithm visualization web app for learners. Synchronized code-line highlighting with step-by-step execution, multi-language code display, interactive pathfinding grid editing, and educational content.

## Tech Stack

Vite + React 19 + TypeScript (strict) + Tailwind CSS v4 + Zustand + Monaco Editor + Framer Motion

## Architecture

- **Registry-driven**: Algorithms self-register via `registry.register()`. All UI is generic.
- **Pre-computed steps**: `generateSteps(input)` produces `ExecutionStep[]` eagerly. Playback = index pointer.
- **Tracker abstraction**: Category-specific trackers build steps with correct visual state + per-language line maps.
- **Discriminated union**: `VisualState.kind` dispatches to the correct visualizer component.

## Key Paths

- Types: `src/types/`
- Registry: `src/registry/`
- Trackers: `src/trackers/`
- Algorithms: `src/algorithms/<category>/<algorithm>/`
- Store: `src/store/`
- Components: `src/components/`
- Plan: `.claude/PLAN.md`

## Rules

Detailed rules are in `.claude/rules/`. Key constraints:

- No single-character variable names
- Double quotes, 2-space indent, trailing whitespace removal (Prettier enforced)
- Unit tests target actual algorithm implementations, not only step generators
- Educational content required for every algorithm
- All edits to input and pathfinding grids are temporary (non-persistent)

## General Guidelines

- This is a TypeScript-first project — when exploring, prioritize source files and tests over config files
- If the task is clear, start making changes immediately — do not read more than 3 files before writing code
- If exploration is needed, read files and propose a concrete plan within the first 5 minutes; never spend an entire session only reading
- Lead with deliverables: always produce at least one code change or a written plan before asking clarifying questions

## Testing

- After making code changes, always run the full test suite (`npm test`) and fix any failures before considering the task complete
- For E2E tests, the dev server starts automatically via hooks — do not start it manually
- Run CI checks in sequence and fix iteratively until all pass green: `npm run lint` → `npm run format` → `npm run typecheck` → `npm test`
- Do not stop after fixing just one category — keep going until everything is clean

## Workflow

1. Pre-session branch check (hook)
2. Implement in feature branches
3. Post-session quality gate: lint, format, test must pass before git operations
