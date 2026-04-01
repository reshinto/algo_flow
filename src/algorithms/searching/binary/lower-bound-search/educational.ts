import type { EducationalContent } from "@/types";

export const lowerBoundSearchEducational: EducationalContent = {
  overview:
    "**Lower Bound Search** is a modified binary search that finds the **first position** in a sorted array where an element is greater than or equal to the target value. Unlike standard binary search which returns any matching index, lower bound always returns the leftmost valid position.\n\nThis is equivalent to `std::lower_bound` in C++ and `bisect_left` in Python's `bisect` module. It returns the array length if all elements are strictly less than the target.",

  howItWorks:
    "1. Set `low = 0`, `high = array.length`, and `result = array.length` (default: not found).\n" +
    "2. Compute `mid = floor((low + high) / 2)`.\n" +
    "3. Compare `array[mid]` with the target:\n" +
    "   - If `array[mid] >= target`: `mid` is a valid lower bound candidate — record `result = mid` and narrow left: `high = mid`.\n" +
    "   - If `array[mid] < target`: lower bound is to the right — set `low = mid + 1`.\n" +
    "4. Repeat until `low >= high`.\n" +
    "5. Return `result` — the leftmost index where the element is >= target, or `array.length` if no such element exists.\n\n" +
    "### Example: Lower bound of 5 in [1, 3, 3, 5, 5, 5, 8, 12]\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    A["low=0 high=8 mid=4 arr[4]=5 ≥ 5 → result=4 high=4"] -->|"Narrow left"| B["low=0 high=4 mid=2 arr[2]=3 < 5 → low=3"]\n' +
    '    B -->|"Narrow right"| C["low=3 high=4 mid=3 arr[3]=5 ≥ 5 → result=3 high=3"]\n' +
    '    C -->|"low=high=3 — stop"| D["Return index 3 (first occurrence of 5)"]\n' +
    "    style D fill:#10b981,stroke:#059669\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- **Best Case:** `O(1)` — the first midpoint lands on the lower bound.\n" +
    "- **Average & Worst Case:** `O(log n)` — the range halves with each comparison, same as binary search.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of index variables are maintained. No recursion or auxiliary data structures needed.",

  bestAndWorstCase:
    "**Best case** is `O(1)` when the first midpoint happens to be the lower bound and no further narrowing is needed.\n\n" +
    "**Worst case** is `O(log n)` — the algorithm always performs `⌊log₂(n)⌋ + 1` iterations regardless of whether the target is found, because it must fully converge to confirm the leftmost valid position.\n\n" +
    "Note that lower bound search **always completes its full binary search loop**, even when a match is found early, in order to guarantee returning the leftmost occurrence.",

  realWorldUses: [
    "**Duplicate handling in sorted arrays:** Finding the first occurrence of a repeated value requires lower bound semantics — standard binary search may return any occurrence.",
    "**Range queries:** Lower bound gives the start of the range `[lower_bound(x), lower_bound(y))` for efficient range counting and slicing.",
    "**Sorted insertion:** Finding where to insert a new value while maintaining sort order uses lower bound to identify the correct position.",
    "**Scheduling and interval overlap:** Finding the earliest event at or after a given timestamp uses lower bound on the sorted start times array.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the leftmost valid position — reliable for duplicate-heavy arrays where standard binary search is ambiguous.",
      "Returns `array.length` for out-of-range targets, enabling safe boundary checks without separate condition logic.",
      "Same `O(log n)` performance as binary search with identical constant-space overhead.",
    ],
    limitations: [
      "Always traverses the full binary search tree — cannot short-circuit early even when a match is found, unlike standard binary search.",
      "Returns an insertion point rather than `-1` for not-found — callers must check `result < array.length && array[result] === target` to confirm an exact match.",
      "Requires the array to be sorted for correct results.",
    ],
  },

  whenToUseIt:
    "Use **Lower Bound Search** when you need the **first position** where an element equals or exceeds the target — for example, finding the first occurrence of a duplicate value, computing insertion points, or implementing range queries.\n\nUse standard **Binary Search** when you only need to confirm existence and any matching index is acceptable. Use **Upper Bound Search** (the complementary operation) to find the end of a range of equal values.",
};
