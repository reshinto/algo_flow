import type { EducationalContent } from "@/types";

export const ternarySearchEducational: EducationalContent = {
  overview:
    "**Ternary Search** is a divide-and-conquer searching algorithm for sorted arrays that splits the search range into three equal parts on each iteration, rather than two as in binary search.\n\nTwo midpoints (`mid1` and `mid2`) are computed per iteration, and each comparison narrows the search to one of three regions: left third, middle third, or right third. Despite making two comparisons per iteration, it converges in O(log₃ n) steps.",

  howItWorks:
    "1. Set `low = 0` and `high = array.length - 1`.\n" +
    "2. Compute two midpoints:\n" +
    "   - `mid1 = low + floor((high - low) / 3)`\n" +
    "   - `mid2 = high - floor((high - low) / 3)`\n" +
    "3. Compare target with `array[mid1]` and `array[mid2]`:\n" +
    "   - If `target === array[mid1]`: return `mid1` — found!\n" +
    "   - If `target === array[mid2]`: return `mid2` — found!\n" +
    "   - If `target < array[mid1]`: search the **left third** (`high = mid1 - 1`).\n" +
    "   - If `target > array[mid2]`: search the **right third** (`low = mid2 + 1`).\n" +
    "   - Otherwise: search the **middle third** (`low = mid1 + 1`, `high = mid2 - 1`).\n" +
    "4. Repeat until `low > high`.\n\n" +
    "### Example: Finding 72 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\n\n" +
    "```\n" +
    "Iteration 1: low=0, high=9, mid1=3, mid2=6\n" +
    "  array[3]=12, array[6]=38\n" +
    "  72 > 38 → search right third: low=7, high=9\n\n" +
    "Iteration 2: low=7, high=9, mid1=7, mid2=8\n" +
    "  array[7]=56, array[8]=72\n" +
    "  72 === array[8] → FOUND at index 8\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  A["low=0 high=9\\nmid1=3 mid2=6"] -->|"72 > arr[6]=38"| B["Right third\\nlow=7 high=9"]\n' +
    '  A -->|"target < arr[3]"| L["Left third\\nhigh=mid1-1"]\n' +
    '  A -->|"arr[3] ≤ target ≤ arr[6]"| M["Middle third\\nlow=mid1+1 high=mid2-1"]\n' +
    '  B --> C["mid1=7 mid2=8\\narr[8]=72 = 72"]\n' +
    '  C --> D["✓ Found at index 8"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Two midpoints divide the range into three regions each iteration; the target's relationship to both midpoints selects exactly one region to recurse into.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log₃ n)`**\n\n" +
    "- Each iteration eliminates at least one third of the remaining search space.\n" +
    "- The number of iterations is `log₃(n)`, which equals `log(n) / log(3)` ≈ `0.631 × log₂(n)`.\n" +
    "- However, each iteration requires **two comparisons** (for mid1 and mid2), so the total comparison count is roughly `2 × log₃(n) ≈ 1.26 × log₂(n)` — slightly more than binary search.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only index variables are used: `lowIndex`, `highIndex`, `mid1Index`, `mid2Index`. No recursion stack or auxiliary memory is required.",

  bestAndWorstCase:
    "**Best Case: `O(1)`** — The target matches `mid1` or `mid2` on the very first iteration.\n\n" +
    "**Worst Case: `O(log₃ n)`** — The target is absent or at a boundary, requiring the maximum number of three-way splits. For 1,000 elements, ternary search takes at most about 13 iterations (26 comparisons), compared to binary search's 10 iterations (10 comparisons).\n\n" +
    "**Note:** In practice, binary search is typically preferred because its single comparison per iteration results in fewer total comparisons despite more iterations.",

  realWorldUses: [
    "**Unimodal function optimization:** Ternary search is well-known for finding the maximum or minimum of a strictly unimodal (single-peak) function over a continuous or discrete domain.",
    "**Competitive programming:** Frequently used to find peak values in arrays or to minimize/maximize mathematical functions over an interval.",
    "**Geometric algorithms:** Finding the closest pair of points along one axis when points are sorted by coordinate.",
    "**Educational purposes:** Demonstrates how dividing into more than two parts does not necessarily yield better search performance due to increased per-iteration comparison cost.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Divides the search space into thirds on each iteration, converging in fewer rounds than binary search.",
      "Naturally extends to finding extrema in unimodal functions — a powerful generalization beyond simple element lookup.",
      "Works entirely in-place with O(1) space overhead.",
    ],
    limitations: [
      "Requires two comparisons per iteration, making the total comparison count higher than binary search in practice.",
      "Binary search is asymptotically equivalent and faster in practice for sorted array lookup.",
      "The array must be sorted before searching.",
      "More complex to implement correctly than binary search due to managing two midpoints.",
    ],
  },

  whenToUseIt:
    "Use **Ternary Search** primarily for finding the maximum or minimum of a unimodal function — this is its strongest application. For sorted array element lookup, binary search is almost always the better choice due to fewer comparisons per search.\n\nAvoid ternary search for general sorted-array lookup where binary search is simpler and faster. It is best applied when the mathematical structure of the problem naturally calls for three-way division.",
};
