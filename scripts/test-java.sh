#!/usr/bin/env bash
# Finds and runs all Java test files under src/algorithms/

set -euo pipefail

PASS_COUNT=0
FAIL_COUNT=0
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Running Java tests..."
echo "====================="

while IFS= read -r -d '' TEST_FILE; do
  TEST_DIR="$(dirname "$TEST_FILE")"
  TEST_BASENAME="$(basename "$TEST_FILE")"
  TEST_CLASS="${TEST_BASENAME%.java}"

  echo -n "  $TEST_FILE ... "
  if (cd "$TEST_DIR" && javac *.java && java -ea "$TEST_CLASS") > /tmp/java_test_output 2>&1; then
    echo "PASS"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "FAIL"
    cat /tmp/java_test_output
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi

  # Clean up compiled class files
  find "$TEST_DIR" -name "*.class" -delete 2>/dev/null || true
done < <(find "$PROJECT_ROOT/src/algorithms" -name "*_test.java" -print0)

echo ""
echo "====================="
echo "Results: $PASS_COUNT passed, $FAIL_COUNT failed"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi
