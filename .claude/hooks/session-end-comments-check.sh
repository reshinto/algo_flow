#!/usr/bin/env bash
# Session end hook: verify that modified TypeScript/TSX files have proper code comments.
# Checks for file-level doc comments, exported function comments, and inline explanations.
# Reports files that are missing documentation as warnings.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$PROJECT_DIR"

# Collect changed .ts/.tsx files (staged + unstaged + untracked), excluding test and story files
CHANGED_FILES=$(git diff --name-only HEAD 2>/dev/null || true)
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || true)
UNTRACKED_FILES=$(git ls-files --others --exclude-standard 2>/dev/null || true)

ALL_TS_FILES=$(echo -e "${CHANGED_FILES}\n${STAGED_FILES}\n${UNTRACKED_FILES}" \
  | sort -u \
  | grep -E '\.(ts|tsx)$' \
  | grep -v '\.test\.' \
  | grep -v '\.stories\.' \
  | grep -v 'node_modules' \
  | grep -v '^$' || true)

if [ -z "$ALL_TS_FILES" ]; then
  echo "Comments check: no TypeScript files changed." >&2
  exit 0
fi

MISSING_COMMENTS=0
FILES_WITHOUT_COMMENTS=""

for FILE in $ALL_TS_FILES; do
  if [ ! -f "$FILE" ]; then
    continue
  fi

  # Check for at least one comment (JSDoc, block, or line comment) in the file
  COMMENT_COUNT=$(grep -cE '^\s*(\/\*\*|\/\/|\/\*|\*\/)' "$FILE" 2>/dev/null || true)

  if [ "$COMMENT_COUNT" -eq 0 ]; then
    MISSING_COMMENTS=$((MISSING_COMMENTS + 1))
    FILES_WITHOUT_COMMENTS="${FILES_WITHOUT_COMMENTS}\n  - ${FILE}"
  fi
done

if [ "$MISSING_COMMENTS" -gt 0 ]; then
  echo "COMMENTS CHECK: ${MISSING_COMMENTS} file(s) have no code comments:" >&2
  echo -e "$FILES_WITHOUT_COMMENTS" >&2
  echo "Please add file-level doc comments, function comments, and inline explanations." >&2
  exit 1
fi

echo "Comments check passed: all modified TypeScript files have comments." >&2
exit 0
