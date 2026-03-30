#!/usr/bin/env bash
# PostToolUse hook: warn on Java anti-patterns in algorithm source files.
# WARNS only (always exits 0).
set -euo pipefail

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null || echo "")
if [ -z "$FILE" ]; then exit 0; fi
if [[ ! "$FILE" =~ \.java$ ]]; then exit 0; fi
if [ ! -f "$FILE" ]; then exit 0; fi

WARNINGS=0

# Check 1: Single-char variable names (project coding standard)
SINGLE_CHARS=$(grep -nE '\b(int|long|double|float|boolean|char|String|var)\s+[a-z]\s*[=;,)]' "$FILE" | grep -v '^\s*//' || true)
if [ -n "$SINGLE_CHARS" ]; then
  echo "WARN: [Java] Single-character variable names — use meaningful names:" >&2
  echo "$SINGLE_CHARS" | head -5 >&2
  WARNINGS=$((WARNINGS + 1))
fi

# Check 2: Raw types (e.g., List instead of List<Integer>)
RAW_TYPES=$(grep -nE '\b(List|Map|Set|Queue|Stack|ArrayList|HashMap|HashSet)\s+\w' "$FILE" | grep -v '<' | grep -v '^\s*//' || true)
if [ -n "$RAW_TYPES" ]; then
  echo "WARN: [Java] Raw types found — use generics (e.g., List<Integer>):" >&2
  echo "$RAW_TYPES" | head -5 >&2
  WARNINGS=$((WARNINGS + 1))
fi

# Check 3: @SuppressWarnings without justification
SUPPRESS=$(grep -nE '@SuppressWarnings' "$FILE" | grep -v '//' || true)
if [ -n "$SUPPRESS" ]; then
  echo "WARN: [Java] @SuppressWarnings — add justification comment:" >&2
  echo "$SUPPRESS" | head -5 >&2
  WARNINGS=$((WARNINGS + 1))
fi

# Check 4: Catching generic Exception
CATCH_GENERIC=$(grep -nE 'catch\s*\(\s*Exception\s' "$FILE" || true)
if [ -n "$CATCH_GENERIC" ]; then
  echo "WARN: [Java] Catching generic Exception — use specific exception type:" >&2
  echo "$CATCH_GENERIC" | head -5 >&2
  WARNINGS=$((WARNINGS + 1))
fi

# Check 5: Missing @step annotations (algorithm source files must have step markers)
if [[ "$FILE" =~ /sources/ ]] && ! grep -q '@step:' "$FILE"; then
  echo "WARN: [Java] Algorithm source file missing @step: annotations" >&2
  WARNINGS=$((WARNINGS + 1))
fi

if [ "$WARNINGS" -gt 0 ]; then
  echo "Java check: ${WARNINGS} warning(s)" >&2
fi
exit 0
