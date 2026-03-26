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

- Real `.ts`, `.py`, `.java` files loaded via Vite `?raw` glob imports
- Source files are lintable, formattable artifacts - not embedded strings
- Line mappings defined as static lookup tables in step generators

### Adding New Algorithms

1. Create `src/algorithms/<category>/<algorithm>/` directory
2. Implement: index.ts, <algorithm>.ts, step-generator.ts, educational.ts, sources/
3. Import in `src/algorithms/index.ts` barrel
4. All UI works automatically via registry
