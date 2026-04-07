#!/usr/bin/env bash
# Moves each algorithm's [name].test.ts into its sources/ folder.
# Structure: src/algorithms/<category>/<technique>/<algorithm>/<algorithm>.test.ts
#         → src/algorithms/<category>/<technique>/<algorithm>/sources/<algorithm>.test.ts

set -euo pipefail

BASE_DIR="src/algorithms"
MOVED=0
SKIPPED=0
MISSING=0

# Loop through each category (arrays, sorting, trees, etc.)
for category_dir in "$BASE_DIR"/*/; do
  category=$(basename "$category_dir")
  # Skip the barrel index.ts — only process directories
  [ ! -d "$category_dir" ] && continue

  # Loop through each technique (cyclic-sort, sliding-window, etc.)
  for technique_dir in "$category_dir"*/; do
    [ ! -d "$technique_dir" ] && continue

    # Loop through each algorithm (find-all-duplicates, etc.)
    for algorithm_dir in "$technique_dir"*/; do
      [ ! -d "$algorithm_dir" ] && continue

      algorithm_name=$(basename "$algorithm_dir")
      test_file="${algorithm_dir}${algorithm_name}.test.ts"
      sources_dir="${algorithm_dir}sources/"
      target_file="${sources_dir}${algorithm_name}.test.ts"

      # Check if the test file exists at the algorithm root
      if [ ! -f "$test_file" ]; then
        MISSING=$((MISSING + 1))
        continue
      fi

      # Check if sources/ directory exists
      if [ ! -d "$sources_dir" ]; then
        echo "WARN: No sources/ dir for $algorithm_dir — skipping"
        SKIPPED=$((SKIPPED + 1))
        continue
      fi

      # Check if already moved
      if [ -f "$target_file" ]; then
        echo "SKIP: $target_file already exists"
        SKIPPED=$((SKIPPED + 1))
        continue
      fi

      echo "MOVE: $test_file → $target_file"
      mv "$test_file" "$target_file"
      MOVED=$((MOVED + 1))
    done
  done
done

echo ""
echo "=== Summary ==="
echo "Moved:   $MOVED"
echo "Skipped: $SKIPPED"
echo "Missing: $MISSING (no test file found at algorithm root)"
