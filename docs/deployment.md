[← Back to README](../README.md)

# Deployment

How to build, deploy, and serve AlgoFlow in production. Covers Docker containerization and GitHub Actions CI/CD pipelines.

> [!NOTE] > **Prerequisites:** Read [Architecture](architecture.md) for tech stack context and [Testing](testing.md) to understand what the CI jobs verify.

## Contents

- [Docker](#docker)
- [Docker Test Environment](#docker-test-environment)
- [CI/CD Pipelines](#cicd-pipelines)

## Docker

### Build and Run with Docker Compose

```bash
docker-compose up -d
```

The app is served at [http://localhost:3000](http://localhost:3000).

### Build the Image Directly

```bash
docker build -t algoflow .
docker run -p 3000:80 algoflow
```

### Multi-Stage Build

The Dockerfile uses a two-stage build:

| Stage     | Base Image       | What It Does                                                          |
| --------- | ---------------- | --------------------------------------------------------------------- |
| **Build** | `node:22-alpine` | Runs `npm ci` and `npm run build` to produce static `dist/` output    |
| **Serve** | `nginx:alpine`   | Serves `dist/` with SPA fallback routing and long-lived cache headers |

The nginx config provides:

- SPA fallback: `try_files $uri $uri/ /index.html`
- Cache headers: `expires 1y; Cache-Control: public, immutable` for hashed assets
- Health check: `wget -qO- http://localhost/` every 30 seconds (5-second start period)

## Docker Test Environment

A separate Docker setup for running all multi-language tests without installing any toolchains on your host machine.

### Quick Start

```bash
npm run docker:test:build    # Build the test image (once)
npm run docker:test          # Run all 6 language test suites
```

`Dockerfile.test` builds on Ubuntu 24.04 with all 6 language toolchains (Node, Python, Java, Rust, g++, Go). The `docker-compose.test.yml` file defines one service per language (`test-all`, `test-typescript`, `test-python`, etc.), all sharing the same image.

See [Testing — Docker Test Environment](testing.md#docker-test-environment) for the full service list, image contents, and advanced usage.

> [!NOTE]
> This is separate from the production `Dockerfile` (nginx) and `docker-compose.yml` (port 3000). The test image is for development and CI use only.

## CI/CD Pipelines

Two GitHub Actions workflows are in `.github/workflows/`:

### ci.yml — Pull Request Checks

Triggers on all pull requests to `main`. Runs these jobs in parallel:

| Job                          | What It Does                                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Type Check & Lint**        | `npm run typecheck`, `npm run lint`, `npm run format:check`                                           |
| **Unit Tests**               | `npm run test` — sharded across parallel jobs; aggregated under **Unit Tests Status**                  |
| **Python Tests**             | `test-python.sh` — sharded with parallel workers; aggregated under **Python Tests Status**             |
| **Java Tests**               | `test-java.sh` — sharded with parallel workers; aggregated under **Java Tests Status**                 |
| **Rust Tests**               | `test-rust.sh` — sharded with parallel workers; aggregated under **Rust Tests Status**                 |
| **C++ Tests**                | `test-cpp.sh` — sharded with parallel workers; aggregated under **C++ Tests Status**                   |
| **Go Tests**                 | `test-go.sh` — sharded with parallel workers; aggregated under **Go Tests Status**                     |
| **E2E Tests**                | `npm run e2e` — sharded across parallel jobs; aggregated under **E2E Status**                          |
| **Storybook Build**          | `npm run storybook:build`                                                                             |
| **Visual Tests (Chromatic)** | Runs after Storybook build; requires `CHROMATIC_PROJECT_TOKEN` secret                                 |

All jobs use Node 22 with npm caching. Concurrency groups cancel in-progress runs for the same branch.

### deploy.yml — Production Deploy (GitHub Pages)

Triggers on push to `main` and manual `workflow_dispatch`. Runs CI checks first, then:

1. **Build Pages**: runs `npm run build` with `BASE_URL=/<repo-name>/` for correct asset paths
2. **Deploy**: uploads the `dist/` artifact and deploys to GitHub Pages via `actions/deploy-pages@v5`

The deploy jobs only run on push/dispatch events (not PRs). Requires `pages: write` and `id-token: write` permissions.

> [!NOTE]
> The `BASE_URL` environment variable must match your GitHub repository name (e.g., `/algo_flow/`). If you fork the project, update this value to match your fork's repo name or the deployment will have broken asset paths.

---

## Demo Recording

The README hero GIF is generated from an automated Playwright recording. This is a manual release artifact, not part of CI.

### Prerequisites

- `ffmpeg` installed (`brew install ffmpeg`)
- Dev server running or auto-started by the script

### Commands

| Command               | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `npm run demo:record` | Record a new demo and convert to GIF                |
| `npm run demo:gif`    | Re-convert an existing WebM to GIF (skip recording) |

### What the script does

1. Launches a headless Chromium browser with Playwright video recording
2. Runs a ~15-second demo scenario: Bubble Sort playback, algorithm switching, Dijkstra wavefront, educational drawer, BFS traversal
3. Converts the recorded WebM to a high-quality GIF via ffmpeg two-pass palette generation
4. Outputs `docs/assets/demo.gif` (git-tracked) and cleans up intermediates

### Output

- `docs/assets/demo.gif` — committed to the repo, referenced by README
- Target: 800px wide, 15fps, under 5MB

---

## See Also

- [Architecture](architecture.md) — tech stack, data flow, project structure
- [Testing](testing.md) — unit tests, E2E, Storybook, Chromatic (what the CI jobs verify)
- [Contributing](contributing.md) — adding algorithms, branch workflow, quality gate
- [Development System](claude-system.md) — session hooks that enforce quality gates
