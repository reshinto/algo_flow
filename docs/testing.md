[← Back to README](../README.md)

# Testing

AlgoFlow uses three layers of testing to ensure algorithm correctness, visual consistency, and end-to-end reliability. This guide covers setup, conventions, and coverage targets for each layer.

> [!NOTE] > **Prerequisites:** Read the [Contributing guide](contributing.md) for quality gate requirements and branch workflow. See the [Glossary](glossary.md) for terms like ExecutionStep and StepType.

## Contents

- [Unit Tests](#unit-tests)
- [E2E Browser Tests (Playwright)](#e2e-browser-tests-playwright)
- [Storybook & Visual Regression Testing](#storybook--visual-regression-testing)

## Unit Tests

```bash
npm run test            # Run all unit tests
npm run test:coverage   # Run with coverage report
npm run test:watch      # Watch mode during development
```

Tests cover algorithm correctness, step generation, tracker behavior, and store state transitions across all 367 algorithms in 14 categories.

### Vitest Projects Configuration

The Vitest config uses the `projects` feature to split the test suite into two isolated environments, reducing total runtime to ~20 seconds:

| Project        | Environment | Covers                                                   |
| -------------- | ----------- | -------------------------------------------------------- |
| `algorithms`   | `node`      | Algorithm correctness, step generators, trackers, store  |
| `components`   | `jsdom`     | React component tests requiring a DOM environment        |

This avoids the overhead of loading `jsdom` for pure algorithm tests and removes the need for manual timeout configuration in `test-setup.ts`.

CI shards unit tests 8 ways (aggregated under the **Unit Tests Status** job) and E2E tests 12 ways (aggregated under the **E2E Status** job).

> [!TIP]
> Run a subset of tests with `npx vitest --filter <pattern>` (e.g., `npx vitest --filter bubble-sort`).

### What to Test for Each Algorithm

| Test File                | What to Verify                                              |
| ------------------------ | ----------------------------------------------------------- |
| `<algorithm>.test.ts`    | Pure algorithm correctness (input → expected output)        |
| `step-generator.test.ts` | Step count, step types, final visual state for known inputs |

Additionally verify:

- Educational content is non-empty for all 7 sections
- Source files exist for all supported languages (TypeScript, Python, Java)

#### Example: Algorithm Correctness Test

```typescript
import { describe, expect, it } from "vitest";
import { bubbleSort } from "./sources/bubble-sort.ts?fn";

describe("bubbleSort", () => {
  it("sorts an unsorted array", () => {
    expect(bubbleSort([5, 3, 8, 1])).toEqual([1, 3, 5, 8]);
  });

  it("handles an already-sorted array", () => {
    expect(bubbleSort([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("handles a single-element array", () => {
    expect(bubbleSort([1])).toEqual([1]);
  });
});
```

### Beyond Algorithm Tests

| Area     | What to Test                             | Location        |
| -------- | ---------------------------------------- | --------------- |
| Trackers | Step output shape, metric increments     | `src/trackers/` |
| Store    | Slice actions, state transitions         | `src/store/`    |
| Registry | Registration, lookup, duplicate handling | `src/registry/` |
| Hooks    | Use `renderHook` from Testing Library    | `src/hooks/`    |

### Coverage Thresholds

| Metric     | Threshold |
| ---------- | --------- |
| Statements | 80%       |
| Branches   | 75%       |
| Functions  | 80%       |
| Lines      | 80%       |

> [!NOTE]
> These thresholds are not enforced in the Vite config (running `npm run test:coverage` generates a report but does not fail the build). However, the `session-end-security-check.sh` Stop hook enforces these same thresholds at session end and blocks git operations when they are not met.

### Automatic Coverage and Security Enforcement

> [!TIP]
> Coverage thresholds are verified automatically by the `session-end-security-check.sh` Stop hook whenever `src/` files change. The same hook scans for unsafe patterns (`eval`, `innerHTML`, `dangerouslySetInnerHTML`, `new Function`) and runs `npm audit --audit-level=high`. Violations block git operations for the session.

## E2E Browser Tests (Playwright)

```bash
npm run e2e         # Run headless (CI / automated)
npm run e2e:headed  # Run with a visible browser (development)
npm run e2e:debug   # Run with Playwright inspector for step-through debugging
```

The E2E suite uses `@playwright/test` with Chromium and simulates a real user session. Config lives at `e2e/playwright.config.ts`; the `webServer` block auto-starts Vite on port 5174 so you do not need a running dev server before invoking these commands.

> [!NOTE]
> **CI configuration:** The CI Playwright config sets `baseURL` to `http://127.0.0.1:5174` (not `localhost`) for IPv4/IPv6 compatibility, `globalTimeout: 600_000` to cap total suite runtime, `trace: "off"` to prevent teardown hangs, and the GitHub Actions job uses `timeout-minutes: 15`. These settings differ from the local config intentionally.

### File Structure

```
e2e/
├── playwright.config.ts          # Playwright configuration (webServer, workers, projects)
├── specs/                        # One spec file per concern
│   ├── page-load.spec.ts
│   ├── controls.spec.ts
│   ├── input-editors.spec.ts
│   ├── grid-interaction.spec.ts
│   ├── mobile-layout.spec.ts
│   ├── console-errors.spec.ts
│   ├── representative.spec.ts    # Full playback suite (one algorithm per category)
│   ├── sorting.spec.ts
│   ├── searching.spec.ts
│   ├── graph.spec.ts
│   ├── pathfinding.spec.ts
│   ├── dynamic-programming.spec.ts
│   ├── arrays.spec.ts
│   ├── trees.spec.ts
│   ├── linked-lists.spec.ts
│   ├── heaps.spec.ts
│   ├── stacks-queues.spec.ts
│   ├── hash-maps.spec.ts
│   ├── strings.spec.ts
│   ├── matrices.spec.ts
│   └── sets.spec.ts
└── helpers/                      # Shared Playwright helpers and selectors
```

~950 tests across 21 spec files. Per-category spec files use `test.describe.configure({ mode: "serial" })` to run tests in declaration order. Workers: 2 locally, 4 on CI. In CI the suite is sharded 12 ways, aggregated under the **E2E Status** check.

### What the Suite Covers

- **Smoke tests** (all algorithms): select via command palette, verify step generation is non-zero
- **Full suite** (`representative.spec.ts`): playback controls, language tabs, keyboard shortcuts, educational drawer — one algorithm per category
- **Input editors**: `input-editors.spec.ts` covers algorithms with custom input interaction
- **Grid tests**: `grid-interaction.spec.ts` covers pathfinding grid cell editing and wavefront behavior
- **Cross-cutting**: progress bar scrubbing, speed controls, theme toggle (dark → light → system → dark), zero browser console errors
- **Responsive tests**: `mobile-layout.spec.ts` verifies tab switching and panel rendering at 375×812

> [!NOTE]
> Hardcoded delays are banned in E2E files via the `ban-hardcoded-waits.sh` hook. Always use `waitFor`, `waitForSelector`, or `waitForFunction` — never `waitForTimeout` or `setTimeout`-based waits.

### Automatic Enforcement

> [!TIP]
> The E2E suite is automatically enforced by the `session-end-e2e-check.sh` Stop hook. Whenever any `.tsx`, `.css`, `.html`, or `e2e/specs/` file is modified, the hook runs the suite in headless mode before allowing git operations. The `webServer` config handles dev server startup automatically.

### Adding Algorithms to E2E

New algorithms are auto-discovered from the registry — no manual update is needed for basic smoke testing (the per-category spec files pick them up automatically). If your algorithm has a custom input editor, add an entry in `e2e/specs/input-editors.spec.ts` covering the relevant input interactions. If the visualizer for a new algorithm category requires a new selector, update the shared helpers in `e2e/helpers/`.

## Pre-commit Hook

A pre-commit hook at `.githooks/pre-commit` runs automatically before every `git commit`. It:

1. Runs **Prettier** (auto-fixes formatting)
2. Runs **ESLint** with `--fix` (auto-fixes lint issues)
3. Runs **TypeScript type-checking** (`tsc --noEmit`)
4. Re-stages any files that were auto-fixed

Activate it once after cloning:

```bash
git config core.hooksPath .githooks
```

> [!NOTE]
> Markdown files are excluded from Prettier via `.prettierignore`, so documentation edits will not be reformatted by the hook.

## Storybook & Visual Regression Testing

```bash
npm run storybook       # Start Storybook dev server (http://localhost:6006)
npm run storybook:build # Build static Storybook
npm run storybook:test  # Run @storybook/test-runner (requires Storybook running)
npm run chromatic       # Run Chromatic visual tests
```

### Story Inventory

**88 story files** organized into:

| Category                   | Location                                 | Stories                                                                                                                                                                                                                                   |
| -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shared Primitives**      | `src/components/shared/`                 | Button, Badge, IconButton, Select                                                                                                                                                                                                         |
| **Code Panel**             | `src/components/code-panel/`             | CodePanel, LanguageTabs                                                                                                                                                                                                                   |
| **Individual Visualizers** | `src/components/visualization/`          | ArrayVisualizer, DPTableVisualizer, GraphVisualizer, GridVisualizer, HashMapVisualizer, HeapVisualizer, LinkedListVisualizer, MatrixVisualizer, SetVisualizer, StackQueueVisualizer, StringVisualizer, TreeVisualizer, VisualizationPanel |
| **Layout**                 | `src/components/layout/`                 | AlgorithmSelectorModal, AppShell, Header, MobileLayout, TabletLayout, DesktopLayout                                                                                                                                                       |
| **Educational**            | `src/components/educational/`            | EducationalDrawer, MermaidDiagram                                                                                                                                                                                                         |
| **Input Editor**           | `src/components/input-editor/`           | ArrayInputEditor, InputEditor                                                                                                                                                                                                             |
| **Explanation Panel**      | `src/components/explanation-panel/`      | ExplanationPanel                                                                                                                                                                                                                          |
| **Playback**               | `src/components/playback/`               | PlaybackControls                                                                                                                                                                                                                          |
| **Algorithm Pipelines**    | `src/algorithms/<category>/<algorithm>/` | 367 algorithm pipelines — initial, mid-execution, and final states using real step generators                                                                                                                                             |

Pipeline stories (`*.Pipeline.stories.tsx`) live alongside their algorithm implementation, not with the visualizer components. Component stories remain co-located with their components in `src/components/`.

### Chromatic Visual Regression

Visual regression testing is powered by [Chromatic](https://www.chromatic.com/). Every story is automatically snapshot-tested. Chromatic captures pixel-perfect screenshots in cloud browsers and flags visual differences for review.

> [!WARNING]
> Without a `CHROMATIC_PROJECT_TOKEN`, the CI Chromatic job will be skipped. Visual tests will not run, but the CI pipeline will still pass.

### Setting Up Chromatic

#### Step 1: Get a Project Token

- Sign up at [chromatic.com](https://www.chromatic.com/) and create a project (or link your GitHub repo)
- Copy the project token from the project settings page

#### Step 2: Add the Token to `.env` for Local Use

```bash
cp .env.example .env
```

Open `.env` and paste your token:

```
CHROMATIC_PROJECT_TOKEN=chpt_your_token_here
```

> [!NOTE]
> The `.env` file is gitignored and will not be committed.

#### Step 3: Add the Token to GitHub Secrets for CI

```bash
# Using GitHub CLI
gh secret set CHROMATIC_PROJECT_TOKEN --repo <owner>/<repo> --body "<your-token>"
```

Or manually: GitHub repo → Settings → Secrets and variables → Actions → New repository secret → Name: `CHROMATIC_PROJECT_TOKEN`, Value: your token.

### Running Visual Tests

| Method            | Command             | Details                                                                                                      |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| **CLI**           | `npm run chromatic` | Builds Storybook, uploads snapshots, prints dashboard URL. Token auto-loaded from `.env` via `dotenv-cli`.   |
| **Storybook GUI** | `npm run storybook` | Open http://localhost:6006, select a story, click "Visual tests" tab. One-time Chromatic OAuth on first use. |
| **CI**            | Automatic           | Runs on all pull requests when `CHROMATIC_PROJECT_TOKEN` is configured as a repository secret.               |

---

## See Also

- [Contributing](contributing.md) — adding algorithms, test file conventions, troubleshooting
- [Architecture](architecture.md) — tech stack, data flow, project structure
- [Deployment](deployment.md) — Docker, CI/CD pipelines
- [Debugging](debugging.md) — troubleshooting step generation, line mapping, and E2E failures
- [Glossary](glossary.md) — key terms and type definitions
