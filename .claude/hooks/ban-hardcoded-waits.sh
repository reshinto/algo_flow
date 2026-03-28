#!/usr/bin/env bash
# PostToolUse hook: block hardcoded delays in E2E and test files.
# Hardcoded delays degrade test performance and create flaky tests.
# Use element-based waits (waitFor, waitForSelector, waitForFunction) instead.

FILE=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // empty')

# Only check E2E and test files
case "$FILE" in
  *e2e*|*.test.*|*.spec.*)
    if [ -f "$FILE" ]; then
      # Banned patterns: waitForTimeout, new Promise + setTimeout, sleep()
      MATCHES=$(grep -nE 'waitForTimeout|\.sleep\(|await new Promise.*setTimeout' "$FILE" || true)
      if [ -n "$MATCHES" ]; then
        echo "BLOCKED: $FILE contains hardcoded delays:"
        echo "$MATCHES"
        echo ""
        echo "Use element-based waits instead:"
        echo "  waitFor()           — wait for element condition"
        echo "  waitForSelector()   — wait for DOM element"
        echo "  waitForFunction()   — wait for JS condition"
        echo "Never use waitForTimeout, sleep, or setTimeout-based delays."
        exit 1
      fi
    fi
    ;;
esac

exit 0
