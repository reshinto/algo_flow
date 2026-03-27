#!/usr/bin/env bash
# Session end hook: run E2E browser tests when UI files (TSX/CSS/HTML) change.
# Starts the dev server automatically if one is not already running.
# Non-zero exit blocks git operations.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$PROJECT_DIR"

# Collect all changed files (staged + unstaged + untracked)
CHANGED=$(git diff --name-only HEAD 2>/dev/null || true)
STAGED=$(git diff --cached --name-only 2>/dev/null || true)
UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null || true)
ALL=$(printf '%s\n%s\n%s\n' "$CHANGED" "$STAGED" "$UNTRACKED" | sort -u | grep -v '^$' || true)

# Trigger on any UI file change: React components, CSS, HTML, or the E2E script itself
UI_CHANGES=$(echo "$ALL" | grep -cE '\.(tsx|css|html)$|^e2e/algoflow_e2e\.mjs$' || true)

if [ "$UI_CHANGES" -eq 0 ]; then
  echo "E2E: No UI or E2E script changes detected, skipping." >&2
  exit 0
fi

echo "=== E2E Browser Tests ===" >&2
echo "UI changes detected. Running E2E tests..." >&2

# Find a running dev server on any standard Vite port
PORT=""
for CHECK_PORT in 5173 5174 5175 5176; do
  if curl -sf "http://localhost:${CHECK_PORT}" > /dev/null 2>&1; then
    PORT=$CHECK_PORT
    break
  fi
done

# Start dev server if none found
DEV_SERVER_PID=""
if [ -z "$PORT" ]; then
  echo "No dev server found. Starting one..." >&2
  npm run dev > /tmp/algoflow-e2e-dev-server.log 2>&1 &
  DEV_SERVER_PID=$!

  # Wait up to 20s for server to be ready
  READY=0
  for attempt in $(seq 1 20); do
    sleep 1
    for CHECK_PORT in 5173 5174 5175 5176; do
      if curl -sf "http://localhost:${CHECK_PORT}" > /dev/null 2>&1; then
        PORT=$CHECK_PORT
        READY=1
        break 2
      fi
    done
  done

  if [ "$READY" -eq 0 ]; then
    [ -n "$DEV_SERVER_PID" ] && kill "$DEV_SERVER_PID" 2>/dev/null || true
    echo "FAIL: Dev server did not start within 20s. Check /tmp/algoflow-e2e-dev-server.log." >&2
    exit 1
  fi

  echo "Dev server started on port ${PORT} (PID ${DEV_SERVER_PID})." >&2
else
  echo "Dev server already running on port ${PORT}." >&2
fi

# Run E2E tests in headless mode (no browser window)
E2E_EXIT=0
E2E_BASE_URL="http://localhost:${PORT}" E2E_HEADLESS=true node e2e/algoflow_e2e.mjs >&2 || E2E_EXIT=$?

# Shut down the server if we started it
if [ -n "$DEV_SERVER_PID" ]; then
  kill "$DEV_SERVER_PID" 2>/dev/null || true
  echo "Dev server stopped." >&2
fi

if [ "$E2E_EXIT" -ne 0 ]; then
  echo "BLOCKED: E2E tests failed. Fix UI regressions before git operations." >&2
  exit 1
fi

echo "PASS: E2E tests" >&2
exit 0
