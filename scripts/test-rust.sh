#!/usr/bin/env bash
# Finds and runs all Rust test files under src/algorithms/

set -euo pipefail

PASS_COUNT=0
FAIL_COUNT=0
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
RUST_TEST_BIN="/tmp/rust_test_bin"

echo "Running Rust tests..."
echo "====================="

while IFS= read -r -d '' TEST_FILE; do
  echo -n "  $TEST_FILE ... "
  if rustc --test "$TEST_FILE" -o "$RUST_TEST_BIN" > /tmp/rust_test_output 2>&1 \
      && "$RUST_TEST_BIN" >> /tmp/rust_test_output 2>&1; then
    echo "PASS"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "FAIL"
    cat /tmp/rust_test_output
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi

  rm -f "$RUST_TEST_BIN"
done < <(find "$PROJECT_ROOT/src/algorithms" -name "*_test.rs" -print0)

echo ""
echo "====================="
echo "Results: $PASS_COUNT passed, $FAIL_COUNT failed"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi
