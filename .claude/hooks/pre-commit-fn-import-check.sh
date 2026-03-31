#!/usr/bin/env bash
# Pre-commit hook: Validates that all ?fn imports have matching declarations
# in src/types/fn-import.d.ts. Prevents CI failures from missing exports.
#
# Scans all algorithm source files for `import { X } from "...?fn"` patterns
# and checks each function name exists in the fn-import.d.ts ambient module.

set -euo pipefail

PROJECT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo ".")"
FN_IMPORT_FILE="$PROJECT_ROOT/src/types/fn-import.d.ts"

if [[ ! -f "$FN_IMPORT_FILE" ]]; then
  echo "⚠️  fn-import.d.ts not found — skipping validation"
  exit 0
fi

# Extract all declared export names from fn-import.d.ts
DECLARED=$(sed -n 's/.*export const \([a-zA-Z0-9_]*\).*/\1/p' "$FN_IMPORT_FILE" | sort -u)

# Find all ?fn imports across the codebase
IMPORTED=$(grep -rh 'from ".*?fn"' "$PROJECT_ROOT/src/algorithms/" 2>/dev/null \
  | sed -n 's/.*import { \([a-zA-Z0-9_]*\) }.*/\1/p' \
  | sort -u)

if [[ -z "$IMPORTED" ]]; then
  exit 0
fi

MISSING=""
while IFS= read -r func; do
  if ! echo "$DECLARED" | grep -qx "$func"; then
    MISSING="$MISSING  - $func\n"
  fi
done <<< "$IMPORTED"

if [[ -n "$MISSING" ]]; then
  echo ""
  echo "❌ fn-import.d.ts is missing declarations for these ?fn imports:"
  echo ""
  echo -e "$MISSING"
  echo "Add them to src/types/fn-import.d.ts before committing."
  echo "Each entry should be: export const functionName: (...args: any[]) => any;"
  echo ""
  exit 1
fi

exit 0
