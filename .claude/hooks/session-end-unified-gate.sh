#!/usr/bin/env bash
# Unified session-end quality gate. Runs ONCE as the absolute last step.
# Replaces all individual session-end hooks with a single comprehensive gate.
#
# Design:
#   - Per-step timeouts via `timeout` command
#   - Output suppressed on success, capped at 30 lines on failure
#   - Accumulates all failures before exiting
#   - Conditional: E2E/storybook only when relevant files changed
#   - Coverage runs once (not duplicated)
#   - trap cleanup kills orphaned child processes

set -uo pipefail  # NOT set -e — we accumulate failures

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$PROJECT_DIR"
FAILED=0

# Cleanup orphaned child processes on exit
cleanup() { jobs -p 2>/dev/null | xargs -r kill 2>/dev/null || true; }
trap cleanup EXIT

# Collect changed files for conditional checks
CHANGED=$(git diff --name-only HEAD 2>/dev/null || true)
STAGED=$(git diff --cached --name-only 2>/dev/null || true)
UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null || true)
ALL_CHANGES=$(printf '%s\n%s\n%s\n' "$CHANGED" "$STAGED" "$UNTRACKED" | sort -u | grep -v '^$' || true)

# Exit early if no changes at all
if [ -z "$ALL_CHANGES" ]; then
  echo "Quality gate: no changes detected, skipping." >&2
  exit 0
fi

SRC_CHANGES=$(echo "$ALL_CHANGES" | grep -cE '^src/' || true)
UI_CHANGES=$(echo "$ALL_CHANGES" | grep -cE '\.(tsx|css|html)$|^e2e/' || true)
STORY_CHANGES=$(echo "$ALL_CHANGES" | grep -cE '\.(tsx|stories\.tsx)$' || true)
CLAUDE_CHANGES=$(echo "$ALL_CHANGES" | grep -cE '^\.claude/' || true)
DOC_TRIGGER=$(echo "$ALL_CHANGES" | grep -cE '^src/|^docs/|^README|package\.json|\.github/' || true)

run_step() {
  local step_name="$1" cmd="$2" step_timeout="${3:-120}"
  echo "--- $step_name ---" >&2
  local outfile="/tmp/gate-${step_name}-$$.txt"
  if ! timeout "$step_timeout" bash -c "$cmd" > "$outfile" 2>&1; then
    echo "FAILED: $step_name" >&2
    tail -30 "$outfile" >&2
    FAILED=1
  else
    echo "PASSED: $step_name" >&2
  fi
  rm -f "$outfile"
}

echo "=== Unified Quality Gate ===" >&2

# === BLOCKING STEPS (all run, accumulate failures) ===

run_step "lint" "npm run lint --silent" 60
run_step "format" "npm run format --silent && npm run format:check --silent" 30
run_step "typecheck" "npm run typecheck --silent" 60

# Conditional: storybook only if UI/story files changed
if [ "$STORY_CHANGES" -gt 0 ]; then
  run_step "storybook" "npm run build-storybook --silent" 300
else
  echo "--- storybook --- SKIPPED (no .tsx/.stories.tsx changes)" >&2
fi

# Tests with coverage (single run)
run_step "tests" "npm run test -- --coverage --reporter=default" 120

# Conditional: E2E only if UI/E2E files changed
if [ "$UI_CHANGES" -gt 0 ]; then
  run_step "e2e" "npm run e2e" 300
else
  echo "--- e2e --- SKIPPED (no UI/E2E file changes)" >&2
fi

# Security: unsafe patterns in src/ (blocking)
# Pattern file avoids triggering security linting hooks on the script itself
if [ "$SRC_CHANGES" -gt 0 ]; then
  SECURITY_PATTERNS="$PROJECT_DIR/.claude/hooks/security-patterns.txt"
  if [ -f "$SECURITY_PATTERNS" ]; then
    UNSAFE=$(grep -rnEf "$SECURITY_PATTERNS" src/ \
      --include='*.ts' --include='*.tsx' \
      | grep -v '^\s*//' \
      | grep -v 'node_modules' \
      || true)
    if [ -n "$UNSAFE" ]; then
      echo "--- security-patterns --- FAILED" >&2
      echo "$UNSAFE" | head -10 >&2
      FAILED=1
    else
      echo "--- security-patterns --- PASSED" >&2
    fi
  else
    echo "--- security-patterns --- SKIPPED (patterns file missing)" >&2
  fi
else
  echo "--- security-patterns --- SKIPPED (no src/ changes)" >&2
fi

# === ADVISORY CHECKS (always continue, print warnings) ===

echo "" >&2
echo "=== Advisory Checks ===" >&2

# npm audit (non-blocking)
npm audit --audit-level=high --omit=dev 2>&1 | tail -5 >&2 || echo "WARN: npm audit found issues" >&2

# Coverage thresholds advisory (non-blocking, uses awk not bc)
COVERAGE_LOG="/tmp/gate-tests-$$.txt"
if [ -f "$COVERAGE_LOG" ]; then
  for METRIC in "Statements:80" "Branches:75" "Functions:80" "Lines:80"; do
    NAME=$(echo "$METRIC" | cut -d: -f1)
    THRESHOLD=$(echo "$METRIC" | cut -d: -f2)
    VALUE=$(grep -oE "${NAME}\s*:\s*[0-9.]+" "$COVERAGE_LOG" | grep -oE '[0-9.]+' | head -1 || echo "0")
    if [ -n "$VALUE" ] && [ "$VALUE" != "0" ]; then
      BELOW=$(awk "BEGIN { print ($VALUE < $THRESHOLD) }")
      if [ "$BELOW" = "1" ]; then
        echo "WARN: ${NAME} coverage ${VALUE}% < ${THRESHOLD}% threshold" >&2
      fi
    fi
  done
fi

# Docs advisory (non-blocking)
if [ "$DOC_TRIGGER" -gt 0 ]; then
  README_UPDATED=$(echo "$ALL_CHANGES" | grep -c '^README.md$' || true)
  DOCS_UPDATED=$(echo "$ALL_CHANGES" | grep -c '^docs/' || true)
  if [ "$README_UPDATED" -eq 0 ] && [ "$DOCS_UPDATED" -eq 0 ]; then
    echo "WARN: Source/config changes detected but no docs updated — check if docs need updating" >&2
  fi
fi

# Claude system config advisory (non-blocking)
if [ "$CLAUDE_CHANGES" -gt 0 ]; then
  echo "INFO: .claude/ config files changed — verify hooks, skills, and agents are consistent" >&2
fi

echo "" >&2
echo "=== Quality Gate Complete ===" >&2

if [ "$FAILED" -ne 0 ]; then
  echo "QUALITY GATE FAILED — fix issues above before pushing" >&2
  exit 1
fi
echo "All checks passed." >&2
exit 0
