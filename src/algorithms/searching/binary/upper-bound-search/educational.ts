import type { EducationalContent } from "@/types";

export const upperBoundSearchEducational: EducationalContent = {
  overview:
    "**Upper Bound Search** is a variant of binary search that finds the index of the first element in a sorted array that is strictly greater than the target value.\n\n" +
    "Unlike a standard binary search that looks for an exact match, upper bound search always succeeds — returning the array length when every element is less than or equal to the target. It is the complement of lower bound search and together they define the range of equal elements in a sorted array.",

  howItWorks:
    "1. Set `low = 0` and `high = array.length` (open upper boundary to allow returning the past-the-end index).\n" +
    "2. While `low < high`, compute `mid = floor((low + high) / 2)`.\n" +
    "3. If `array[mid] > target`, the mid position is a valid upper bound candidate:\n" +
    "   - Record `result = mid` and narrow right boundary: `high = mid`.\n" +
    "4. If `array[mid] <= target`, the upper bound must be further right: `low = mid + 1`.\n" +
    "5. When the loop ends, `result` holds the index of the first element strictly greater than `target`.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    subgraph Finding upper bound of 5 in [1,3,3,5,5,5,8,12]\n" +
    '    A["low=0, high=8"] -->|"mid=4, arr[4]=5 <= 5"| B["low=5, high=8"]\n' +
    '    B -->|"mid=6, arr[6]=8 > 5 → result=6"| C["low=5, high=6"]\n' +
    '    C -->|"mid=5, arr[5]=5 <= 5"| D["low=6, high=6 → done"]\n' +
    '    D --> E["Result: index 6 (value 8)"]\n' +
    "    end\n" +
    "    style E fill:#10b981,stroke:#059669\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- **Best Case:** `O(1)` — the first mid comparison lands exactly on the upper bound.\n" +
    "- **Average & Worst Case:** `O(log n)` — the search range halves on every iteration.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of index variables are maintained regardless of array size.",

  bestAndWorstCase:
    "**Best case** occurs when the midpoint of the initial range immediately identifies the upper bound, completing in a single comparison.\n\n" +
    "**Worst case** is `O(log n)` iterations — e.g., when all elements equal the target (so every mid is `<= target` and `low` advances each time) or when the target is smaller than every element (so `high` shrinks each time).",

  realWorldUses: [
    "**Range Queries:** Combined with lower bound search to compute how many times a value appears in a sorted array in `O(log n)` time.",
    "**Sorted Container APIs:** C++ `std::upper_bound` and Java's `Collections.binarySearch` use this logic to insert elements while maintaining sort order.",
    "**Event Scheduling:** Finding the first event scheduled after a given timestamp in a sorted event log.",
    "**Competitive Programming:** Counting inversions, querying sorted frequency tables, and solving problems requiring upper-bound placement.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Always returns a meaningful result — the array length signals that all elements are within the target range.",
      "Pairs naturally with lower bound search to compute occurrence counts and equal-value ranges in `O(log n)`.",
      "Simple and branch-efficient — only one comparison per iteration determines which half to search.",
    ],
    limitations: [
      "Requires a fully sorted array; unsorted input produces incorrect results with no error.",
      "Returns an insertion point, not the target itself — callers must interpret the index carefully.",
      "Not useful for unsorted collections or when an exact-match index is needed rather than a boundary position.",
    ],
  },

  whenToUseIt:
    "Use **Upper Bound Search** whenever you need the insertion point just past the last occurrence of a value in a sorted array, or when you want to count how many elements are less than or equal to the target (the answer is simply the returned index).\n\n" +
    "Avoid it when the array is unsorted, when you need exact-match semantics, or when the collection is small enough that a linear scan is simpler and fast enough.",
};
