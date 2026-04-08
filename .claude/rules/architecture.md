## Architecture Rules

### Core Pattern: Registry-Driven + Pre-computed Steps

- Algorithms self-register via `registry.register(definition)` at import time
- All UI components are generic - no algorithm-specific logic in components
- `generateSteps(input)` produces full `ExecutionStep[]` eagerly
- Playback is an index pointer into the step array

### Type System

- `AlgorithmDefinition<TInput>`: meta, execute, generateSteps, educational, sources
- `ExecutionStep`: index, type, description, highlightedLines, variables, visualState, metrics
- `VisualState`: discriminated union by `kind` field (array, graph, grid, dp-table)
- `LineHighlight`: per-language line numbers for synchronized code highlighting

### State Management

- Zustand with 4 slices: algorithm, playback, editor, ui
- Use immer middleware for immutable updates
- Each slice has clear responsibility boundaries

### Source Files

- Real `.ts`, `.py`, `.java`, `.rs`, `.cpp`, `.go` files loaded via Vite `?raw` glob imports
- Source files are lintable, formattable artifacts - not embedded strings
- Line mappings defined as static lookup tables in step generators

### Directory Organization

- Trackers: `src/trackers/<category>/` — grouped by algorithm category
- Visualizers: `src/components/visualization/<category>/` — grouped by algorithm category
- Algorithm tests + stories: `src/algorithms/<category>/<technique>/<algorithm>/__tests__/`
- Source implementations: `src/algorithms/<category>/<technique>/<algorithm>/sources/`

### Adding New Algorithms

1. Create `src/algorithms/<category>/<technique>/<algorithm>/` directory
2. Implement: index.ts, step-generator.ts, educational.ts, sources/ (6 languages)
3. Add tests + pipeline story in `__tests__/`
4. Import in `src/algorithms/index.ts` barrel
5. All UI works automatically via registry
