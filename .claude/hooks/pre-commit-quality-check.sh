#!/usr/bin/env bash
# PreToolUse hook: run typecheck, lint, and format check before any git commit.
# Blocks the commit if any check fails.

set -euo pipefail

INPUT=$(cat)

COMMAND=$(echo "$INPUT" | grep -o '"command":"[^"]*"' | head -1 | sed 's/"command":"//;s/"$//' || true)

if [ -z "$COMMAND" ]; then
  exit 0
fi

IS_GIT_COMMIT=$(echo "$COMMAND" | grep -ci 'git commit' || true)

if [ "$IS_GIT_COMMIT" -eq 0 ]; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$PROJECT_DIR"

echo "Running pre-commit quality checks..." >&2

echo "  TypeScript type check..." >&2
if ! npx tsc -b --noEmit 2>&1; then
  echo "BLOCKED: TypeScript type check failed. Fix errors before committing." >&2
  exit 2
fi

echo "  ESLint..." >&2
if ! npx eslint src/ 2>&1; then
  echo "BLOCKED: ESLint check failed. Fix lint errors before committing." >&2
  exit 2
fi

echo "  Prettier..." >&2
if ! npx prettier --check . 2>&1; then
  echo "BLOCKED: Prettier check failed. Run 'npm run format' before committing." >&2
  exit 2
fi

echo "Pre-commit quality checks passed." >&2
exit 0
