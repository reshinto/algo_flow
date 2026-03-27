[← Back to README](../README.md)

# Deployment

AlgoFlow can be deployed via Docker or GitHub Pages. Two GitHub Actions workflows handle CI and deployment.

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

## CI/CD Pipelines

Two GitHub Actions workflows are in `.github/workflows/`:

### ci.yml — Pull Request Checks

Triggers on all pull requests to `main`. Runs these jobs in parallel:

| Job                          | What It Does                                                          |
| ---------------------------- | --------------------------------------------------------------------- |
| **Type Check & Lint**        | `npm run typecheck`, `npm run lint`, `npm run format:check`           |
| **Unit Tests**               | `npm run test`                                                        |
| **E2E Tests**                | `npm run e2e`                                                         |
| **Storybook Build**          | `npm run storybook:build`                                             |
| **Visual Tests (Chromatic)** | Runs after Storybook build; requires `CHROMATIC_PROJECT_TOKEN` secret |

All jobs use Node 22 with npm caching. Concurrency groups cancel in-progress runs for the same branch.

### deploy.yml — Production Deploy (GitHub Pages)

Triggers on push to `main` and manual `workflow_dispatch`. Runs CI checks first, then:

1. **Build Pages**: runs `npm run build` with `BASE_URL=/<repo-name>/` for correct asset paths
2. **Deploy**: uploads the `dist/` artifact and deploys to GitHub Pages via `actions/deploy-pages@v5`

The deploy jobs only run on push/dispatch events (not PRs). Requires `pages: write` and `id-token: write` permissions.

> [!NOTE]
> The `BASE_URL` environment variable must match your GitHub repository name (e.g., `/algo_flow/`). If you fork the project, update this value to match your fork's repo name or the deployment will have broken asset paths.

---

## See Also

- [Architecture](architecture.md) — tech stack, data flow, project structure
- [Testing](testing.md) — unit tests, E2E, Storybook, Chromatic
- [Contributing](contributing.md) — adding algorithms, branch workflow, quality gate
