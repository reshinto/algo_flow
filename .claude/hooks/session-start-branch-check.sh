#!/usr/bin/env bash
# Session start hook: verify we're on a task-related branch, not main/master.
# Outputs a warning message to stderr if on a protected branch.

set -euo pipefail

CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "")

if [ -z "$CURRENT_BRANCH" ]; then
  echo "WARNING: Not in a git repository or no branch checked out." >&2
  exit 0
fi

PROTECTED_BRANCHES="main master"

for PROTECTED in $PROTECTED_BRANCHES; do
  if [ "$CURRENT_BRANCH" = "$PROTECTED" ]; then
    echo "BRANCH SAFETY: Currently on '$CURRENT_BRANCH'. Create a feature branch before making changes." >&2
    echo "Suggested: git checkout -b feat/<task-description>" >&2
    exit 0
  fi
done

echo "Branch check passed: on '$CURRENT_BRANCH'" >&2
