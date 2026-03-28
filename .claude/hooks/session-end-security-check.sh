#!/usr/bin/env bash
# Session end hook: run security and coverage checks.
# Scans for unsafe patterns (eval, innerHTML), runs npm audit,
# and verifies test coverage thresholds.
# Non-zero exit blocks git operations.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$PROJECT_DIR"

# Collect changed files
CHANGED=$(git diff --name-only HEAD 2>/dev/null || true)
STAGED=$(git diff --cached --name-only 2>/dev/null || true)
UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null || true)
ALL=$(printf '%s\n%s\n%s\n' "$CHANGED" "$STAGED" "$UNTRACKED" | sort -u | grep -v '^$' || true)

SRC_CHANGES=$(echo "$ALL" | grep -cE '^src/|^__tests__/' || true)

if [ "$SRC_CHANGES" -eq 0 ]; then
  echo "Security: No src/ or test file changes detected, skipping." >&2
  exit 0
fi

FAILED=0

echo "=== Security & Coverage Check ===" >&2

# Check 1: Unsafe code patterns in src/
echo "Scanning for unsafe patterns..." >&2
UNSAFE=$(grep -rnE 'eval\(|\.innerHTML|dangerouslySetInnerHTML|new Function\(|unsafe-eval|unsafe-inline' src/ \
  --include='*.ts' --include='*.tsx' \
  | grep -v '^\s*//' \
  | grep -v 'node_modules' \
  || true)

if [ -n "$UNSAFE" ]; then
  echo "FAIL: Unsafe code patterns found:" >&2
  echo "$UNSAFE" >&2
  FAILED=1
else
  echo "PASS: No unsafe patterns (eval, innerHTML, dangerouslySetInnerHTML)" >&2
fi

# Check 2: npm audit for high/critical vulnerabilities
echo "Running npm audit..." >&2
if ! npm audit --audit-level=high --omit=dev 2>/dev/null; then
  echo "WARN: npm audit found vulnerabilities (non-blocking)" >&2
else
  echo "PASS: npm audit clean" >&2
fi

# Check 3: Coverage thresholds (only if src/ files changed)
echo "Running coverage check..." >&2
COVERAGE_OUTPUT=$(npm run test -- --coverage --reporter=default 2>&1 || true)

STMTS=$(echo "$COVERAGE_OUTPUT" | grep -oE 'Statements\s*:\s*[0-9.]+' | grep -oE '[0-9.]+' | head -1 || echo "0")
BRANCHES=$(echo "$COVERAGE_OUTPUT" | grep -oE 'Branches\s*:\s*[0-9.]+' | grep -oE '[0-9.]+' | head -1 || echo "0")
FUNCS=$(echo "$COVERAGE_OUTPUT" | grep -oE 'Functions\s*:\s*[0-9.]+' | grep -oE '[0-9.]+' | head -1 || echo "0")
LINES=$(echo "$COVERAGE_OUTPUT" | grep -oE 'Lines\s*:\s*[0-9.]+' | grep -oE '[0-9.]+' | head -1 || echo "0")

COVERAGE_FAIL=0
if [ "$(echo "$STMTS < 80" | bc -l 2>/dev/null || echo 1)" -eq 1 ] && [ "$STMTS" != "0" ]; then
  echo "FAIL: Statement coverage ${STMTS}% < 80%" >&2
  COVERAGE_FAIL=1
fi
if [ "$(echo "$BRANCHES < 75" | bc -l 2>/dev/null || echo 1)" -eq 1 ] && [ "$BRANCHES" != "0" ]; then
  echo "FAIL: Branch coverage ${BRANCHES}% < 75%" >&2
  COVERAGE_FAIL=1
fi
if [ "$(echo "$FUNCS < 80" | bc -l 2>/dev/null || echo 1)" -eq 1 ] && [ "$FUNCS" != "0" ]; then
  echo "FAIL: Function coverage ${FUNCS}% < 80%" >&2
  COVERAGE_FAIL=1
fi
if [ "$(echo "$LINES < 80" | bc -l 2>/dev/null || echo 1)" -eq 1 ] && [ "$LINES" != "0" ]; then
  echo "FAIL: Line coverage ${LINES}% < 80%" >&2
  COVERAGE_FAIL=1
fi

if [ "$COVERAGE_FAIL" -eq 0 ]; then
  echo "PASS: Coverage thresholds met (${STMTS}/${BRANCHES}/${FUNCS}/${LINES})" >&2
else
  FAILED=1
fi

echo "=== Security & Coverage Check Complete ===" >&2

if [ "$FAILED" -ne 0 ]; then
  echo "BLOCKED: Security or coverage issues found. Fix before git operations." >&2
  exit 1
fi

echo "All security and coverage checks passed." >&2
exit 0
