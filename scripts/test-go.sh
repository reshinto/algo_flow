#!/usr/bin/env bash
# Finds and runs all Go test files under src/algorithms/
# Uses a temp directory to isolate .go files from other language files
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
command -v go &>/dev/null || { echo "ERROR: go not found on PATH" >&2; exit 1; }
echo "Using: $(go version 2>&1)"

# ---------------------------------------------------------------------------
# Discover & shard
# ---------------------------------------------------------------------------
echo "Running Go tests..."
echo "==================="

ALL_DIRS=$(find "$PROJECT_ROOT/src/algorithms" -name "*_test.go" -exec dirname {} \; | sort -u)
TOTAL=$(echo "$ALL_DIRS" | wc -l | tr -d ' ')

if [[ -n "$SHARD" ]]; then
  SHARD_INDEX="${SHARD%%/*}"
  SHARD_TOTAL="${SHARD##*/}"
  SELECTED=$(echo "$ALL_DIRS" | awk -v si="$SHARD_INDEX" -v st="$SHARD_TOTAL" 'NR % st == si % st')
  SELECTED_COUNT=$(echo "$SELECTED" | grep -c . || true)
  echo "Shard $SHARD: $SELECTED_COUNT of $TOTAL test directories"
else
  SELECTED="$ALL_DIRS"
  SELECTED_COUNT="$TOTAL"
  echo "Running all $TOTAL test directories"
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
  local TEST_DIR="$1"
  local FAIL_LOG_PATH="$2"

  local TEMP_DIR
  TEMP_DIR=$(mktemp -d)
  cp "$TEST_DIR"/*.go "$TEMP_DIR/" 2>/dev/null || true
  cp "$TEST_DIR"/../sources/*.go "$TEMP_DIR/" 2>/dev/null || true

  if (cd "$TEMP_DIR" && timeout 30 bash -c "go mod init algo 2>/dev/null && go test ./... 2>&1") > /dev/null 2>&1; then
    echo "PASS: $TEST_DIR"
  else
    echo "FAIL: $TEST_DIR"
    echo "$TEST_DIR" >> "$FAIL_LOG_PATH"
    (cd "$TEMP_DIR" && timeout 30 bash -c "go mod init algo 2>/dev/null && go test ./... 2>&1") 2>&1 | tail -10 || true
  fi

  rm -rf "$TEMP_DIR"
}
export -f run_single_test

if [[ "$WORKERS" -gt 1 ]]; then
  echo "$SELECTED" | xargs -P "$WORKERS" -I {} bash -c 'run_single_test "$@"' _ {} "$FAIL_LOG"
else
  while IFS= read -r TEST_DIR; do
    [[ -z "$TEST_DIR" ]] && continue
    run_single_test "$TEST_DIR" "$FAIL_LOG"
  done <<< "$SELECTED"
fi

FAIL_COUNT=0
if [[ -s "$FAIL_LOG" ]]; then
  FAIL_COUNT=$(wc -l < "$FAIL_LOG" | tr -d ' ')
fi
PASS_COUNT=$(( SELECTED_COUNT - FAIL_COUNT ))

echo ""
echo "==================="
echo "Results: $PASS_COUNT passed, $FAIL_COUNT failed"

rm -f "$FAIL_LOG"

if [[ "$FAIL_COUNT" -gt 0 ]]; then
  exit 1
fi
