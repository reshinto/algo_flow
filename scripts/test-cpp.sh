#!/usr/bin/env bash
# Finds and runs all C++ test files under src/algorithms/

set -euo pipefail

PASS_COUNT=0
FAIL_COUNT=0
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CPP_TEST_BIN="/tmp/cpp_test_bin"

echo "Running C++ tests..."
echo "===================="

while IFS= read -r -d '' TEST_FILE; do
  echo -n "  $TEST_FILE ... "
  if g++ -std=c++17 -o "$CPP_TEST_BIN" "$TEST_FILE" > /tmp/cpp_test_output 2>&1 \
      && "$CPP_TEST_BIN" >> /tmp/cpp_test_output 2>&1; then
    echo "PASS"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "FAIL"
    cat /tmp/cpp_test_output
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi

  rm -f "$CPP_TEST_BIN"
done < <(find "$PROJECT_ROOT/src/algorithms" -name "*_test.cpp" -print0)

echo ""
echo "===================="
echo "Results: $PASS_COUNT passed, $FAIL_COUNT failed"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi
