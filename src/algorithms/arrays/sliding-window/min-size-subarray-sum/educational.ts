import type { EducationalContent } from "@/types";

export const minSizeSubarraySumEducational: EducationalContent = {
  overview:
    "**Min Size Subarray Sum** finds the shortest contiguous subarray whose elements sum to at least a given target. Unlike the fixed-size sliding window, this pattern uses a **variable-size window** that dynamically expands and contracts.\n\nThe key insight is that once a window's sum reaches the target, shrinking from the left can only reduce the length — so we greedily minimize while the constraint holds.",

  howItWorks:
    "1. Initialize `leftPointer = 0`, `currentSum = 0`, `minLength = ∞`.\n" +
    "2. Move `rightPointer` from left to right:\n" +
    "   * **Expand:** Add `array[rightPointer]` to `currentSum`.\n" +
    "   * **Shrink loop:** While `currentSum >= target`:\n" +
    "     - Record window length `rightPointer - leftPointer + 1`.\n" +
    "     - Update `minLength` if this is shorter than the current best.\n" +
    "     - Subtract `array[leftPointer]` from `currentSum` and advance `leftPointer`.\n" +
    "3. After the loop, if `minLength` is still `∞`, no valid subarray exists — return `0`.\n\n" +
    "### Example with `[2, 3, 1, 2, 4, 3]`, target = `7`\n\n" +
    "- Expand to index 3: `[2,3,1,2]` = 8 ≥ 7 → length 4, shrink → `[3,1,2]` = 6 < 7\n" +
    "- Expand to index 4: `[3,1,2,4]` = 10 ≥ 7 → length 4, shrink → `[1,2,4]` = 7 ≥ 7 → length 3, shrink → `[2,4]` = 6 < 7\n" +
    "- Expand to index 5: `[2,4,3]` = 9 ≥ 7 → length 3, shrink → `[4,3]` = 7 ≥ 7 → length **2** ✓ — new minimum!",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each element is added to `currentSum` at most once (when `rightPointer` passes it) and removed at most once (when `leftPointer` passes it). Total work is at most `2n` operations.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only scalar variables are used (`leftPointer`, `rightPointer`, `currentSum`, `minLength`, `bestStartIndex`). The input array is not copied or transformed.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — When the first element already meets the target, the window immediately shrinks to size 1 and the loop still traverses remaining elements to confirm no smaller window exists.\n\n" +
    "**Worst Case: `O(n)`** — Even when no valid subarray exists (e.g., all elements too small), every element is visited exactly once.\n\n" +
    "Unlike the fixed-size variant, this algorithm can return early with length `0` when no valid subarray is found, but the pointer traversal is always linear.",

  realWorldUses: [
    "**Rate Limiting:** Finding the shortest time window in which an API receives at least `k` requests.",
    "**Batch Processing:** Minimizing the number of items processed in a batch to reach a required aggregate threshold.",
    "**Memory Allocation:** Finding the smallest contiguous block of pages whose total capacity meets a request.",
    "**Streaming Aggregates:** Determining the minimum observation window needed to accumulate a statistically significant signal.",
    "**Load Balancing:** Finding the shortest server task sequence whose combined cost satisfies a service-level threshold.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Achieves `O(n)` time by avoiding redundant recomputation through the two-pointer technique.",
      "`O(1)` space — no auxiliary arrays or hash maps needed.",
      "Naturally handles cases where no valid subarray exists by returning a sentinel value.",
      "Easily adapted to find the longest instead of shortest window by inverting the comparison.",
    ],
    limitations: [
      "Requires all elements to be **non-negative** for correctness — negative values break the monotonic sum property that the shrink loop relies on.",
      "Only works for contiguous subarrays, not subsequences.",
      "Returns only the first minimum-length window found, not all windows of that length.",
    ],
  },

  whenToUseIt:
    "Use **Min Size Subarray Sum** when the problem asks for the **shortest contiguous subarray** meeting a numeric threshold and all input values are non-negative.\n\nKey phrases: 'minimum length subarray with sum at least k', 'smallest window summing to at least target'. If negative numbers are present, the two-pointer shrink invariant breaks — consider a deque-based or prefix-sum approach instead.",
};
