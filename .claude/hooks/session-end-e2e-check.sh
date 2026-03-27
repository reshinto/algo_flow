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

# The E2E script is self-contained: installs browsers if missing, starts a
# dev server if none is running, and cleans up after itself.
npm run e2e >&2 || {
  echo "BLOCKED: E2E tests failed. Fix UI regressions before git operations." >&2
  exit 1
}

echo "PASS: E2E tests" >&2
exit 0
