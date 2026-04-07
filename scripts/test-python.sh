#!/usr/bin/env bash
# Finds and runs all Python test files under src/algorithms/

set -euo pipefail

PASS_COUNT=0
FAIL_COUNT=0
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Running Python tests..."
echo "========================"

while IFS= read -r -d '' TEST_FILE; do
  TEST_DIR="$(dirname "$TEST_FILE")"
  TEST_BASENAME="$(basename "$TEST_FILE")"

  echo -n "  $TEST_FILE ... "
  if (cd "$TEST_DIR" && python3 "$TEST_BASENAME") > /tmp/py_test_output 2>&1; then
    echo "PASS"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "FAIL"
    cat /tmp/py_test_output
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
done < <(find "$PROJECT_ROOT/src/algorithms" -name "*_test.py" -print0)

echo ""
echo "========================"
echo "Results: $PASS_COUNT passed, $FAIL_COUNT failed"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi
