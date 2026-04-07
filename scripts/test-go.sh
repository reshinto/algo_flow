#!/usr/bin/env bash
# Finds and runs all Go test files under src/algorithms/

set -euo pipefail

PASS_COUNT=0
FAIL_COUNT=0
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Running Go tests..."
echo "==================="

# Track unique directories — Go requires `go test` per package directory, not per file
declare -A SEEN_DIRS

while IFS= read -r -d '' TEST_FILE; do
  TEST_DIR="$(dirname "$TEST_FILE")"

  # Skip if we've already tested this directory
  if [[ -n "${SEEN_DIRS[$TEST_DIR]+_}" ]]; then
    continue
  fi
  SEEN_DIRS["$TEST_DIR"]=1

  echo -n "  $TEST_DIR ... "
  if (cd "$TEST_DIR" && go test ./...) > /tmp/go_test_output 2>&1; then
    echo "PASS"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "FAIL"
    cat /tmp/go_test_output
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
done < <(find "$PROJECT_ROOT/src/algorithms" -name "*_test.go" -print0)

echo ""
echo "==================="
echo "Results: $PASS_COUNT passed, $FAIL_COUNT failed"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi
