## Docker & CI/CD Rules

### Dockerfile

- Multi-stage build: Node 22 alpine (build) -> nginx alpine (serve)
- `npm ci && npm run build` in build stage
- Copy `dist/` to nginx html directory
- Expose port 80

### docker-compose.yml

- Service `app` using the Dockerfile
- Port mapping: 3000:80
- Health check endpoint

### CI Pipeline (.github/workflows/ci.yml)

- Trigger: push to main + all PRs
- Jobs: lint, typecheck, unit-test, storybook-build, e2e
- Cache node_modules and Playwright browsers
- Upload coverage as artifact

### CD Pipeline (.github/workflows/deploy.yml)

- Trigger: push to main (after CI passes)
- Build Docker image
- Configurable push target
