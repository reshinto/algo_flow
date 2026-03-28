[← Back to README](../README.md)

# Testing

AlgoFlow uses three layers of testing: unit tests (Vitest), E2E browser tests (Playwright), and visual regression testing (Storybook + Chromatic).

## Unit Tests

```bash
npm run test            # Run all unit tests
npm run test:coverage   # Run with coverage report
npm run test:watch      # Watch mode during development
```

Tests cover algorithm correctness, step generation, tracker behavior, and store state transitions across all 15 algorithms (14 categories, with Fibonacci having both Tabulation and Memoization variants).

### What to Test for Each Algorithm

| Test File                | What to Verify                                              |
| ------------------------ | ----------------------------------------------------------- |
| `<algorithm>.test.ts`    | Pure algorithm correctness (input → expected output)        |
| `step-generator.test.ts` | Step count, step types, final visual state for known inputs |

Additionally verify:

- Educational content is non-empty for all 7 sections
- Source files exist for all supported languages (TypeScript, Python, Java)

### Coverage Thresholds

| Metric     | Threshold |
| ---------- | --------- |
| Statements | 80%       |
| Branches   | 75%       |
| Functions  | 80%       |
| Lines      | 80%       |

## E2E Browser Tests (Playwright)

```bash
npm run e2e         # Run headless (CI / automated)
npm run e2e:headed  # Run with a visible browser (development)
```

The E2E suite lives in `e2e/algoflow_e2e.mjs`. It uses Playwright with Chromium and simulates a real user session:

- Selects all 58 algorithms via the command palette
- Exercises playback controls (play, pause, step, reset, rerun)
- Switches language tabs (TypeScript / Python / Java)
- Edits every input editor
- Scrubs the progress bar
- Tests all keyboard shortcuts (Space, ArrowRight, ArrowLeft, R, L, Escape, 1–5)
- Verifies zero browser console errors

### Automatic Enforcement

> [!TIP]
> The E2E suite is automatically enforced by the `session-end-e2e-check.sh` Stop hook. Whenever any `.tsx`, `.css`, `.html`, or `e2e/algoflow_e2e.mjs` file is modified, the hook runs the suite in headless mode before allowing git operations. If no dev server is running, it starts one automatically.

### Adding Algorithms to E2E

When adding a new algorithm or visualizer component, update `e2e/algoflow_e2e.mjs`:

1. Add the algorithm name to the `algorithms` array — all per-algorithm checks run automatically
2. Add an entry to `inputTests` if the algorithm has an input editor

## Storybook & Visual Regression Testing

```bash
npm run storybook       # Start Storybook dev server (http://localhost:6006)
npm run storybook:build # Build static Storybook
npm run chromatic       # Run Chromatic visual tests
```

### Story Inventory

**58 story files** organized into:

| Category                   | Stories                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------- |
| **Shared Primitives**      | Button, Badge, IconButton, Select                                                       |
| **Code Panel**             | LanguageTabs                                                                            |
| **Individual Visualizers** | ArrayVisualizer, GraphVisualizer, GridVisualizer, DPTableVisualizer                     |
| **Algorithm Pipelines**    | All 58 algorithms — initial, mid-execution, and final states using real step generators |

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
