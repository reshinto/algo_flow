#!/usr/bin/env bash
# Finds and runs all Python test files under src/algorithms/
# Supports sharding (--shard=M/N) and parallel workers (--workers=W)

set -euo pipefail

SHARD=""
WORKERS=1
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

for arg in "$@"; do
  case "$arg" in
    --shard=*) SHARD="${arg#--shard=}" ;;
    --workers=*) WORKERS="${arg#--workers=}" ;;
  esac
done

# ---------------------------------------------------------------------------
# Preflight
# ---------------------------------------------------------------------------
command -v python3 &>/dev/null || { echo "ERROR: python3 not found on PATH" >&2; exit 1; }
echo "Using: $(python3 --version 2>&1)"

# ---------------------------------------------------------------------------
# Discover & shard
# ---------------------------------------------------------------------------
echo "Running Python tests..."
echo "========================"

ALL_FILES=$(find "$PROJECT_ROOT/src/algorithms" -name "*_test.py" | sort)
TOTAL=$(echo "$ALL_FILES" | wc -l | tr -d ' ')

if [[ -n "$SHARD" ]]; then
  SHARD_INDEX="${SHARD%%/*}"
  SHARD_TOTAL="${SHARD##*/}"
  SELECTED=$(echo "$ALL_FILES" | awk -v si="$SHARD_INDEX" -v st="$SHARD_TOTAL" 'NR % st == si % st')
  SELECTED_COUNT=$(echo "$SELECTED" | grep -c . || true)
  echo "Shard $SHARD: $SELECTED_COUNT of $TOTAL test files"
else
  SELECTED="$ALL_FILES"
  SELECTED_COUNT="$TOTAL"
  echo "Running all $TOTAL test files"
fi

if [[ "$WORKERS" -gt 1 ]]; then
  echo "Workers: $WORKERS"
fi
echo ""

# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------
FAIL_LOG=$(mktemp)

run_single_test() {
  local TEST_FILE="$1"
  local FAIL_LOG_PATH="$2"
  local TEST_DIR TEST_BASENAME
  TEST_DIR="$(dirname "$TEST_FILE")"
  TEST_BASENAME="$(basename "$TEST_FILE")"

  if (cd "$TEST_DIR" && timeout 30 python3 "$TEST_BASENAME") > /dev/null 2>&1; then
    echo "PASS: $TEST_FILE"
  else
    echo "FAIL: $TEST_FILE"
    echo "$TEST_FILE" >> "$FAIL_LOG_PATH"
    (cd "$TEST_DIR" && timeout 30 python3 "$TEST_BASENAME") 2>&1 | tail -10 || true
  fi
}
export -f run_single_test

if [[ "$WORKERS" -gt 1 ]]; then
  echo "$SELECTED" | xargs -P "$WORKERS" -I {} bash -c 'run_single_test "$@"' _ {} "$FAIL_LOG"
else
  while IFS= read -r TEST_FILE; do
    [[ -z "$TEST_FILE" ]] && continue
    run_single_test "$TEST_FILE" "$FAIL_LOG"
  done <<< "$SELECTED"
fi

FAIL_COUNT=0
if [[ -s "$FAIL_LOG" ]]; then
  FAIL_COUNT=$(wc -l < "$FAIL_LOG" | tr -d ' ')
fi
PASS_COUNT=$(( SELECTED_COUNT - FAIL_COUNT ))

echo ""
echo "========================"
echo "Results: $PASS_COUNT passed, $FAIL_COUNT failed"

rm -f "$FAIL_LOG"

if [[ "$FAIL_COUNT" -gt 0 ]]; then
  exit 1
fi
