#!/usr/bin/env bash
# Session start hook: block working directly on main/master.
# Forces creation of a task-related feature branch.

set -euo pipefail

CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "")

if [ -z "$CURRENT_BRANCH" ]; then
  echo "WARNING: Not in a git repository or no branch checked out." >&2
  exit 0
fi

PROTECTED_BRANCHES="main master"

for PROTECTED in $PROTECTED_BRANCHES; do
  if [ "$CURRENT_BRANCH" = "$PROTECTED" ]; then
    echo "BLOCKED: Currently on '$CURRENT_BRANCH'. You must create a feature branch before making changes." >&2
    echo "Run: git checkout -b <type>/<short-description>" >&2
    echo "Examples: feat/add-merge-sort, fix/grid-editor-drag, chore/update-deps" >&2
    exit 2
  fi
done

echo "Branch check passed: on '$CURRENT_BRANCH'" >&2
