import type { EducationalContent } from "@/types";

export const minRotatedArrayEducational: EducationalContent = {
  overview:
    "**Minimum in Rotated Sorted Array** is a binary search variant that efficiently locates the smallest element in a sorted array that has been rotated at some pivot point.\n\nFor example, `[4, 5, 6, 7, 0, 1, 2]` is a rotation of `[0, 1, 2, 4, 5, 6, 7]`. Rather than scanning linearly, this algorithm exploits the partial ordering property left by the rotation to eliminate half the array at each step.",

  howItWorks:
    "1. Set `low = 0` and `high = array.length - 1`.\n" +
    "2. While `low < high`, calculate `mid = floor((low + high) / 2)`.\n" +
    "3. Compare `array[mid]` with `array[high]`:\n" +
    "   - If `array[mid] > array[high]`: the rotation pivot (minimum) lies in the **right half**. Set `low = mid + 1`.\n" +
    "   - Otherwise: the minimum is in the **left half or at mid**. Set `high = mid`.\n" +
    "4. When `low === high`, both pointers point at the minimum element.\n\n" +
    "### Why Compare with High?\n\n" +
    "Comparing `mid` to `high` (rather than `low`) avoids ambiguity at boundaries and correctly handles both rotated and non-rotated inputs.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    subgraph Array: [4,5,6,7,0,1,2]\n" +
    '    A["mid=6, high=2 → 6>2, go right"] --> B["mid=0, high=2 → 0≤2, go left"]\n' +
    '    B --> C["low=high=4, minimum=0"]\n' +
    "    end\n" +
    "    style C fill:#10b981,stroke:#059669\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- **Average & Worst Case:** `O(log n)` — Each comparison eliminates half the remaining array.\n" +
    "- **Best Case:** `O(1)` — Occurs if the array is not rotated and the minimum is immediately found at the midpoint.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only two pointer variables (`low` and `high`) are needed — no recursion stack or auxiliary data structures.",

  bestAndWorstCase:
    "**Best case** `O(1)` occurs when the midpoint happens to land directly on the minimum element in the first iteration.\n\n" +
    "**Worst case** `O(log n)` occurs on larger arrays where each halving step is required until `low === high`. An array of 1,000,000 elements needs at most ~20 comparisons.",

  realWorldUses: [
    "**Database Index Recovery:** Detecting and correcting cyclic shifts in B-tree index pages after partial writes.",
    "**Circular Buffer Analysis:** Finding the oldest entry in a circular log buffer that wraps around.",
    "**Time-Series Data:** Locating the start of a wrapped time-series window where timestamps cycle.",
    "**Version Control:** Identifying the start of a rotated patch series applied in non-chronological order.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Finds the minimum in `O(log n)` time even when the array has been rotated.",
      "Works correctly on non-rotated arrays without any special-casing.",
      "Constant space usage — no recursion or auxiliary arrays required.",
    ],
    limitations: [
      "Only works on arrays that were sorted and then rotated — not on arbitrarily unsorted inputs.",
      "Does not handle duplicate values correctly in its basic form — duplicates require a modified version that falls back to linear scan in the worst case.",
      "Slightly more complex to reason about than standard binary search due to the pivot comparison logic.",
    ],
  },

  whenToUseIt:
    "Use **Minimum in Rotated Sorted Array** when you need to find the minimum value in a dataset that was once sorted but has undergone a cyclic rotation. It is especially valuable in systems where data is written in a circular fashion.\n\nAvoid it when the array contains duplicate elements (the basic form may give wrong results) or when the array is not guaranteed to be a rotation of a sorted sequence.",
};
