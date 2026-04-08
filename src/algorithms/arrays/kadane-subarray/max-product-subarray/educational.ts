import type { EducationalContent } from "@/types";

export const maxProductSubarrayEducational: EducationalContent = {
  overview:
    "**Maximum Product Subarray** finds the contiguous subarray whose elements multiply to the largest possible product.\n\n" +
    "The key insight is that **negative numbers flip the sign** of a product. A very large negative product can become the largest positive product " +
    "if multiplied by another negative. Therefore, the algorithm must track both the **maximum** and **minimum** running products simultaneously. " +
    "This single-pass `O(n)` approach is a dynamic programming technique in disguise.",

  howItWorks:
    "1. Initialize `currentMax`, `currentMin`, and `globalMax` all to `arr[0]`.\n" +
    "2. For each subsequent element `elem` from index 1 onward:\n" +
    "   - If `elem < 0`, **swap** `currentMax` and `currentMin` — a negative multiplier flips which extreme is larger.\n" +
    "   - Update `currentMax = max(elem, currentMax * elem)` — either start fresh or extend the subarray.\n" +
    "   - Update `currentMin = min(elem, currentMin * elem)` — track the most negative product for future negative flips.\n" +
    "   - If `currentMax == elem`, reset `currentStart` to the current index (subarray restarted).\n" +
    "   - If `currentMax > globalMax`, update `globalMax` and record `bestStart`/`bestEnd`.\n" +
    "3. Return `{ maxProduct: globalMax, startIndex, endIndex }`.\n\n" +
    "The extend-or-restart decision mirrors Kadane's algorithm, but the dual max/min tracking is unique to the product variant.\n\n" +
    "### Dual-Tracking Diagram (`[2, -3, -4]`)\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["elem=2\\ncurMax=2\\ncurMin=2"] -->|"elem=-3, swap+extend"| B["elem=-3\\ncurMax=-3\\ncurMin=-6"]\n' +
    '  B -->|"elem=-4, swap+extend"| C["elem=-4\\ncurMax=24\\ncurMin=-12"]\n' +
    '  C -->|"globalMax"| D["result=24"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "At `elem = -3`, `curMax` and `curMin` swap so the large negative (`-6`) is preserved as `curMin`. At `elem = -4`, multiplying that negative by `-4` flips it to `24` — the maximum product.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- A single left-to-right pass over the array: `O(n)`.\n" +
    "- Each step performs a constant number of comparisons and multiplications.\n" +
    "- No nested loops or recursion.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a fixed number of scalar variables are maintained (`currentMax`, `currentMin`, `globalMax`, `currentStart`, `bestStart`, `bestEnd`). " +
    "No arrays, maps, or stacks are allocated.",

  bestAndWorstCase:
    "**Best case — `O(n)`:** All elements are positive. `currentMin` stays positive, no swaps occur, and `currentMax` simply grows monotonically. " +
    "The answer is the product of the entire array.\n\n" +
    "**Worst case — `O(n)`:** Elements alternate between large positives and large negatives (e.g., `[2, -3, 4, -5, 6]`). " +
    "Swaps between `currentMax` and `currentMin` occur at every step, but each step is still `O(1)`. " +
    "The total time remains linear.\n\n" +
    "A special case requiring care is **zeros**: multiplying by zero resets both `currentMax` and `currentMin` to zero, " +
    "effectively forcing a restart. The extend-or-restart formula `max(elem, currentMax * elem)` handles this automatically.",

  realWorldUses: [
    "**Financial modeling:** Finding the maximum compound return across a sequence of daily multipliers (growth or shrinkage factors).",
    "**Signal processing:** Identifying the subarray with the highest product amplitude in a sampled waveform.",
    "**Game theory:** Computing the maximum achievable score when moves involve multiplicative bonuses and penalties.",
    "**Physics simulations:** Finding the subinterval of highest multiplicative gain in a chain of transfer functions.",
    "**Logistics:** Identifying the route segment with the highest product of efficiency ratings across a supply chain.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Linear `O(n)` time with `O(1)` space — optimal in both dimensions.",
      "Handles negative numbers, zeros, and mixed-sign arrays correctly without special casing.",
      "The dual-tracking pattern extends naturally to other non-commutative operations (e.g., matrix chains).",
      "Single-pass with no backtracking — suitable for streaming data.",
    ],
    limitations: [
      "Integer overflow is a practical concern for large arrays with large values — use 64-bit or arbitrary-precision arithmetic when needed.",
      "Returns only one longest subarray (the first of maximum product); tie-breaking requires additional logic.",
      "Assumes the subarray must be non-empty; an empty subarray (product = 1) is not considered.",
      "The start-index tracking is fragile with very large numbers of consecutive equal products — careful boundary handling is required.",
    ],
  },

  whenToUseIt:
    "Use Maximum Product Subarray when a problem involves finding the best contiguous subarray under a **multiplicative** objective. " +
    "It is the product analogue of Kadane's algorithm.\n\n" +
    "Use **Kadane's algorithm** instead when the objective is additive (maximum sum subarray). " +
    "Use **divide-and-conquer** only when you need to enumerate all subarrays with product above a threshold, as the segment-tree variant supports range queries. " +
    "For **non-negative** arrays, a simple expanding-window approach is sufficient since zeros are the only reset events.",
};
