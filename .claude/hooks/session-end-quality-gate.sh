#!/usr/bin/env bash
# Session end hook: run quality gate checks.
# Reports failures to stderr. Non-zero exit blocks the session end action.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$PROJECT_DIR"

FAILED=0

echo "=== Quality Gate ===" >&2

# Lint
echo "Running lint..." >&2
if ! npm run lint --silent 2>&1; then
  echo "FAIL: Lint errors found" >&2
  FAILED=1
else
  echo "PASS: Lint" >&2
fi

# Format
echo "Running format check..." >&2
if ! npm run format:check --silent 2>&1; then
  echo "FAIL: Formatting issues found. Run 'npm run format' to fix." >&2
  FAILED=1
else
  echo "PASS: Format" >&2
fi

# Type check
echo "Running type check..." >&2
if ! npm run typecheck --silent 2>&1; then
  echo "FAIL: TypeScript errors found" >&2
  FAILED=1
else
  echo "PASS: Type check" >&2
fi

# Unit tests
echo "Running unit tests..." >&2
if ! npm run test --silent 2>&1; then
  echo "FAIL: Unit test failures" >&2
  FAILED=1
else
  echo "PASS: Unit tests" >&2
fi

echo "=== Quality Gate Complete ===" >&2

if [ "$FAILED" -ne 0 ]; then
  echo "BLOCKED: Quality gate failed. Fix issues before git operations." >&2
  exit 1
fi

echo "All checks passed." >&2
exit 0
