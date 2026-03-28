# AlgoFlow - Implementation Plan

## Context

Build a learner-focused algorithm visualization web app from scratch. The app provides synchronized code-line highlighting with step-by-step algorithm execution, multi-language code display, interactive pathfinding grid editing, and rich educational content. The project includes a full `.claude` system (rules, agents, skills, hooks) for maintainable development workflow.

**Working directory**: `/Users/springfield/dev/algo_flow` (currently empty, not a git repo)

---

## Tech Stack

- **Framework**: Vite + React 19 + TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (black-first UI, responsive)
- **State**: Zustand 5 with immer middleware (4 slices: algorithm, playback, editor, ui)
- **Code Editor**: @monaco-editor/react (multi-language, line highlighting)
- **Layout**: react-resizable-panels (3-panel IDE-like layout)
- **Animation**: Framer Motion (bar swaps, grid waves, transitions)
- **Testing**: Vitest + @testing-library/react + Storybook 8 + Playwright
- **Quality**: ESLint flat config + Prettier (double quotes, spaces, trailing whitespace removal)

---

## Architecture

### Core Pattern: Registry-Driven + Pre-computed Steps

1. **Self-registering algorithms**: Each algorithm calls `registry.register(definition)` at import time. All UI is generic - no algorithm-specific component logic.
2. **Pre-computed execution**: `generateSteps(input)` produces full `ExecutionStep[]` eagerly. Playback is just an index pointer - instant scrubbing, deterministic replay.
3. **Tracker abstraction**: Category-specific trackers (SortingTracker, PathfindingTracker, etc.) expose semantic methods (`compare()`, `swap()`, `openNode()`) that build `ExecutionStep` objects with correct visual state and per-language line mappings.
4. **Discriminated union for VisualState**: `kind` field dispatches to the correct visualizer component. Adding a category = one union member + one visualizer.

### Key Types

- `AlgorithmDefinition<TInput>`: meta, execute, generateSteps, educational, sources
- `ExecutionStep`: index, type, description, highlightedLines, variables, visualState, metrics
- `VisualState`: union of ArrayVisualState | GraphVisualState | GridVisualState | DPTableVisualState
- `LineHighlight`: per-language line numbers for each step

### State Slices (Zustand)

- **algorithm-slice**: selectedId, definition, input, steps[], totalSteps
- **playback-slice**: currentStepIndex, isPlaying, speed, direction
- **editor-slice**: activeLanguage, sourceCode, highlightedLines, isEditing, editedCode
- **ui-slice**: theme, panelSizes, isMobileDrawerOpen, educationalDrawerOpen

### Source File Loading

Real `.ts`, `.py`, `.java` files loaded via Vite `import.meta.glob("**/sources/*", { query: "?raw", eager: true })`. Source files are lintable, formattable, real code - not embedded strings.

---

## Algorithm Selections

| Category            | Algorithm                         | Rationale                                           |
| ------------------- | --------------------------------- | --------------------------------------------------- |
| Sorting             | Bubble Sort                       | Simple, iconic, best first proof-of-concept         |
| Searching           | Binary Search                     | Rich visualization (pointer narrowing, elimination) |
| Graph               | BFS                               | Queue-based, clear wavefront visualization          |
| Pathfinding         | Dijkstra                          | Grid-based, supports wall/start/end editing         |
| Dynamic Programming | Fibonacci (memo + tabulation)     | Covers both DP approaches                           |
| Array Techniques    | Sliding Window (max sum subarray) | Window range visualization                          |

---

## Project Structure

```
algo_flow/
├── .claude/
│   ├── CLAUDE.md                    # Concise project context
│   ├── PLAN.md                      # Canonical plan (this content)
│   ├── settings.json                # Hook configuration
│   ├── rules/
│   │   ├── workflow.md
│   │   ├── architecture.md
│   │   ├── coding-standards.md
│   │   ├── testing.md
│   │   ├── ui-ux.md
│   │   ├── algorithms.md
│   │   ├── pathfinding.md
│   │   ├── docs.md
│   │   ├── docker-ci-cd.md
│   │   └── token-efficiency.md
│   ├── agents/
│   │   ├── senior-engineer-code-reviewer.md
│   │   ├── qa-tester.md
│   │   ├── ui-ux-designer.md
│   │   ├── tech-lead-architect.md
│   │   ├── product-strategist.md
│   │   ├── technical-writer.md
│   │   ├── marketing-engine.md
│   │   ├── claude-system-architect.md
│   │   ├── silent-failure-hunter.md
│   │   ├── code-simplifier.md
│   │   └── code-explorer.md
│   ├── skills/
│   │   ├── implementation-planning/SKILL.md
│   │   ├── algorithm-learning-content/SKILL.md
│   │   ├── pathfinding-scenario-editing/SKILL.md
│   │   ├── repository-quality-gate/SKILL.md
│   │   ├── branch-safety-check/SKILL.md
│   │   ├── cifix/SKILL.md
│   │   ├── accessibility-audit/SKILL.md
│   │   ├── architecture-review/SKILL.md
│   │   ├── strict-typescript-review/SKILL.md
│   │   ├── security-coverage-audit/SKILL.md
│   │   ├── learner-engagement-review/SKILL.md
│   │   ├── documentation-review/SKILL.md
│   │   ├── readme-optimization/SKILL.md
│   │   ├── claude-system-management/SKILL.md
│   │   ├── tdd/SKILL.md
│   │   ├── verification/SKILL.md
│   │   ├── feature-dev/SKILL.md
│   │   └── debugging/SKILL.md
│   └── hooks/
│       ├── session-start-branch-check.sh
│       ├── session-end-quality-gate.sh
│       ├── session-end-readme-check.sh
│       ├── session-end-comments-check.sh
│       ├── session-end-e2e-check.sh
│       ├── session-end-security-check.sh
│       ├── session-end-claude-system-check.sh
│       ├── block-ai-attribution.sh
│       ├── block-main-branch-commits.sh
│       ├── pre-commit-quality-check.sh
│       ├── auto-pr-after-push.sh
│       ├── post-edit-typescript-check.sh
│       └── post-edit-accessibility-check.sh
├── src/
│   ├── types/                       # All TypeScript interfaces
│   ├── registry/                    # AlgorithmRegistry singleton
│   ├── engine/                      # Step generator
│   ├── trackers/                    # BaseTracker + 6 category trackers
│   ├── store/                       # Zustand 4-slice store
│   ├── algorithms/
│   │   ├── sorting/bubble-sort/     # definition, algo, steps, educational, sources/
│   │   ├── searching/binary-search/
│   │   ├── graph/bfs/
│   │   ├── pathfinding/dijkstra/
│   │   ├── dynamic-programming/fibonacci/
│   │   └── array-techniques/sliding-window/
│   ├── components/
│   │   ├── layout/                  # AppShell, Header, PanelLayout, MobileDrawer
│   │   ├── code-panel/             # CodePanel, LanguageTabs
│   │   ├── visualization/          # VisualizationPanel + ArrayVisualizer, GraphVisualizer, GridVisualizer, DPTableVisualizer
│   │   ├── explanation-panel/      # ExplanationPanel, VariableInspector, StepDescription, MetricsDisplay
│   │   ├── playback/              # PlaybackControls, ProgressBar, SpeedSelector
│   │   ├── input-editor/          # InputEditor, ArrayInputEditor, GraphInputEditor, GridEditor
│   │   ├── educational/           # EducationalDrawer, ContentSection, ComplexityBadge
│   │   └── shared/                # Button, IconButton, Select, Tooltip, Badge, Kbd
│   ├── hooks/                     # usePlaybackEngine, useKeyboardShortcuts, useAlgorithmSource, useResponsiveLayout
│   ├── utils/                     # constants, helpers, source-loader
│   └── styles/                    # tokens.css, animations.css
├── e2e/                           # Playwright tests
├── .storybook/                    # Storybook config
├── .github/workflows/             # CI + deploy
├── Dockerfile                     # Multi-stage (Node build -> nginx serve)
├── docker-compose.yml
├── README.md
└── [config files: vite, tsconfig, eslint, prettier, .gitignore]
```

---

## Phased Milestones

### Phase 1: Project Scaffolding + .claude Bootstrap

- Vite React-TS scaffold, install all deps
- Configure TS strict, Tailwind v4, ESLint flat config, Prettier (double quotes, 2-space indent, trailing whitespace removal)
- `git init`, initial commit
- Create full `.claude/` structure: CLAUDE.md, PLAN.md, settings.json, all rules, agents, skills, hooks
- Wire hooks in settings.json (SessionStart -> branch check, PreToolUse for git-blocking quality gate)
- **Verify**: `npm run dev` shows blank page, `npm run lint` passes

### Phase 2: Core Architecture

- All type definitions in `src/types/`
- `AlgorithmRegistry` class in `src/registry/`
- `BaseTracker` abstract class + `SortingTracker` in `src/trackers/`
- Step generator in `src/engine/`
- All 4 Zustand slices in `src/store/`
- `constants.ts` and `source-loader.ts` in `src/utils/`
- Unit tests for registry, trackers, store slices
- **Verify**: `npx vitest run` passes

### Phase 3: UI Shell

- Black-first theme: zinc-950 bg, zinc-900 panels, emerald/cyan/amber accents
- Shared primitives (Button, Select, Tooltip, etc.)
- AppShell: Header + 3-panel PanelLayout via react-resizable-panels
- MobileDrawer for < 768px
- Stub CodePanel, VisualizationPanel, ExplanationPanel
- PlaybackControls, ProgressBar, SpeedSelector (wired to playback-slice)
- Storybook stories for all layout + shared components
- **Verify**: Visual app shell renders in browser, Storybook runs

### Phase 4: Bubble Sort (Full Pipeline Proof-of-Concept)

- Pure `bubbleSort()` implementation + unit tests
- Source files: TypeScript, Python, Java
- Step generator using SortingTracker + line map
- Educational content (all 7 sections)
- CodePanel with Monaco: read-only, language tabs, line highlighting
- ArrayVisualizer: Framer Motion animated bars, color-coded states, pointer arrows
- ExplanationPanel: StepDescription, VariableInspector, MetricsDisplay
- InputEditor: editable array, temporary (non-persistent), triggers recompute
- usePlaybackEngine: setInterval-based step advancement
- **Verify**: Full end-to-end Bubble Sort demo works

### Phase 5: Remaining Algorithms + Pathfinding

- **Binary Search**: SearchingTracker, ArrayVisualizer reuse (add eliminated state)
- **BFS**: GraphTracker, SVG-based GraphVisualizer, GraphInputEditor
- **Dijkstra**: PathfindingTracker, CSS-grid GridVisualizer, GridEditor (click walls, drag start/end, run/reset, non-persistent)
- **Fibonacci**: DPTracker, DPTableVisualizer (table + call stack for memo variant)
- **Sliding Window**: ArrayTracker, ArrayVisualizer reuse (window range highlight)
- Update algorithm barrel, header dropdown with categories
- Unit tests + Storybook stories for each
- **Verify**: All 6 algorithms working, grid editing functional

### Phase 6: Educational Content + Polish

- Educational content for all 6 algorithms (Overview, How It Works, Complexity, Best/Worst Case, Real-World Uses, Strengths/Limitations, When to Use)
- EducationalDrawer slide-over panel
- Temporary code editing (Monaco editable mode, sandboxed execution, non-persistent)
- Keyboard shortcuts (Space, arrows, R, 1-5, Escape, L)
- Animation polish (springs, staggers, reduced-motion support)
- Accessibility (ARIA labels, focus management)
- **Verify**: Educational content displays, code editing works, shortcuts work

### Phase 7: Testing + Storybook

- Audit all unit tests (algorithm correctness, step generation, trackers, store, hooks, utils)
- Storybook stories for every component (one per significant state variant)
- Storybook visual regression with test-runner
- Playwright e2e: playback flow, algorithm switching, grid editing, responsive layout
- Coverage thresholds: 80% statements, 75% branches, 80% functions, 80% lines
- **Verify**: `npm test`, `npm run storybook:build`, `npm run e2e` all pass

### Phase 8: Docker + CI/CD + README

- Dockerfile: multi-stage (Node 22 alpine build -> nginx alpine serve)
- docker-compose.yml: port 3000:80, health check
- `.github/workflows/ci.yml`: lint, typecheck, test, storybook-build, e2e
- `.github/workflows/deploy.yml`: build + push Docker image on main
- README.md: setup, Docker, tests, Storybook, CI/CD, algorithm categories, how to add algorithms/languages, educational content, editing behavior, hooks, PLAN.md location
- **Verify**: `docker build` works, `docker-compose up` serves app

---

## Verification Plan

| Check            | Command                                       | Phase |
| ---------------- | --------------------------------------------- | ----- |
| Dev server runs  | `npm run dev`                                 | 1+    |
| Lint passes      | `npm run lint`                                | 1+    |
| Format passes    | `npm run format:check`                        | 1+    |
| Type check       | `npm run typecheck`                           | 2+    |
| Unit tests       | `npx vitest run`                              | 2+    |
| Storybook builds | `npm run storybook:build`                     | 3+    |
| E2E tests        | `npm run e2e`                                 | 7     |
| Docker build     | `docker build -t algoflow .`                  | 8     |
| Docker run       | `docker-compose up -d && curl localhost:3000` | 8     |

---

## Risks & Mitigations

1. **Monaco bundle size (~2MB)**: Use CDN loading (default in @monaco-editor/react) + React.lazy() for CodePanel
2. **Line mapping drift**: Tests validate LINE_MAP bounds against source file line counts
3. **Grid performance (large grids)**: Limit to 30x30, use CSS grid, animate only wavefront cells
4. **Code editing security**: Local-only, try/catch + 5s timeout, TypeScript execution only
5. **Framer Motion with many elements**: will-change:transform, staggerChildren, animate only changed elements
6. **Tailwind v4 + Storybook**: Ensure preview.ts imports main CSS with Tailwind directives via @storybook/react-vite

---

## File Count Estimate

~206 files total: 22 `.claude/` config, 8 types, 4 registry/engine, 12 trackers, 8 store, 48 algorithm files, 18 source display files, 50 components+stories, 8 hooks, 5 utils, 5 e2e, 12 config, 6 infra.
