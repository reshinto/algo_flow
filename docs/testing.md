[← Back to README](../README.md)

# Testing

AlgoFlow uses three layers of testing to ensure algorithm correctness, visual consistency, and end-to-end reliability. This guide covers setup, conventions, and coverage targets for each layer.

> [!NOTE]
> **Prerequisites:** Read the [Contributing guide](contributing.md) for quality gate requirements and branch workflow. See the [Glossary](glossary.md) for terms like ExecutionStep and StepType.

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

Tests cover algorithm correctness, step generation, tracker behavior, and store state transitions across all 58 algorithms in 14 categories.

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
```

The E2E suite lives in `e2e/algoflow_e2e.mjs`. It uses Playwright with Chromium and simulates a real user session:

The suite uses a **tiered approach**:

- **Smoke tests** (all 58 algorithms): select via command palette, verify step generation is non-zero
- **Full suite** (one representative per category): playback controls, language tabs, keyboard shortcuts, educational drawer
- **Input editors**: algorithms in `inputTests` get additional input interaction tests
- **Grid tests**: Dijkstra's Algorithm receives dedicated grid cell and wavefront tests
- **Cross-cutting**: progress bar scrubbing, speed controls, theme toggle (dark → light → system → dark), zero browser console errors
- **Responsive tests**: tablet layout (768x1024) and mobile layout (375x812) — verify tab switching and panel rendering
- **Hardcoded delays**: banned in test/E2E files via `ban-hardcoded-waits.sh` hook — use `waitFor`/`waitForSelector`/`waitForFunction` instead of `waitForTimeout`

### Automatic Enforcement

> [!TIP]
> The E2E suite is automatically enforced by the `session-end-e2e-check.sh` Stop hook. Whenever any `.tsx`, `.css`, `.html`, or `e2e/algoflow_e2e.mjs` file is modified, the hook runs the suite in headless mode before allowing git operations. If no dev server is running, it starts one automatically.

### Adding Algorithms to E2E

New algorithms are auto-discovered — no manual update needed for basic smoke testing. See [Updating E2E Tests](contributing.md#updating-e2e-tests) in the contributing guide for details on input editor entries.

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
| **Algorithm Pipelines**    | `src/algorithms/<category>/<algorithm>/` | 58 algorithm pipelines — initial, mid-execution, and final states using real step generators                                                                                                                                              |

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
