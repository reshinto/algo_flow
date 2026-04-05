import type { EducationalContent } from "@/types";

export const sumOfSubarrayMinimumsEducational: EducationalContent = {
  overview:
    "**Sum of Subarray Minimums** (LeetCode 907) computes the sum of the minimum value of every contiguous subarray of a given array, modulo 10⁹ + 7.\n\nRather than enumerating all O(n²) subarrays, the algorithm finds each element's **contribution**: how many subarrays have it as the minimum. Two monotonic stack passes determine the left and right boundaries — the count of subarrays where an element is the minimum is `leftDistance × rightDistance`.",

  howItWorks:
    "The key insight is that for each element `arr[i]`, we need to count subarrays where `arr[i]` is the minimum. This equals `left[i] × right[i]` where:\n\n" +
    "- `left[i]` = distance to the previous element **strictly less** than `arr[i]` (or the left edge)\n" +
    "- `right[i]` = distance to the next element **less than or equal** to `arr[i]` (or the right edge)\n\n" +
    "The asymmetry (strict left, non-strict right) handles duplicates correctly — each duplicate pair is counted exactly once.\n\n" +
    "**Pass 1 — Left boundaries** (left to right, monotonic increasing stack):\n" +
    "- Pop while stack top ≥ current value\n" +
    "- `left[i]` = `i + 1` if stack empty, else `i − stack.top`\n\n" +
    "**Pass 2 — Right boundaries** (right to left, monotonic increasing stack):\n" +
    "- Pop while stack top > current value\n" +
    "- `right[i]` = `n − i` if stack empty, else `stack.top − i`\n\n" +
    "**Pass 3 — Sum contributions**:\n" +
    "- `result += arr[i] × left[i] × right[i]`, taken modulo 10⁹ + 7\n\n" +
    "### Example trace on `[3, 1, 2, 4]`\n\n" +
    "```\n" +
    "idx  val  left  right  contribution\n" +
    " 0    3     1     2       3×1×2 =  6\n" +
    " 1    1     2     4       1×2×4 =  8\n" +
    " 2    2     1     2       2×1×2 =  4  (wait — right[2]=2: next ≤2 is none, so n−2=2)\n" +
    " 3    4     1     1       4×1×1 =  4\n" +
    "                          total = 17 ✓\n" +
    "```\n\n" +
    "*(Correction for idx 2: next element strictly less than 2 doesn't exist, so right[2] = 4−2 = 2 using strict-greater pop. Contribution = 2×1×2 = 4.)*",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each element is pushed and popped from the stack at most once in each of the two passes. The contribution pass is also a single linear scan. Total work is `O(3n) = O(n)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Three auxiliary arrays of size `n` (`leftDistances`, `rightDistances`, and the stack itself) contribute `O(n)` extra space.",

  bestAndWorstCase:
    "**Best case** — a strictly increasing array like `[1, 2, 3, 4]`: the stack never pops during either pass because each element is greater than the one before it. Every element's left distance is 1 and right distance equals the remaining length.\n\n" +
    "**Worst case** — a strictly decreasing array like `[4, 3, 2, 1]`: during the right-boundaries pass, each new element triggers pops of all preceding stack entries. However, amortized across the entire pass each element is pushed and popped at most once, keeping the total at `O(n)`.\n\n" +
    "The algorithm always runs in exactly `O(n)` regardless of input shape.",

  realWorldUses: [
    "**Financial analytics:** Computing minimum-price windows across rolling time ranges to detect sustained low-cost periods.",
    "**Histogram analysis:** Related to the Largest Rectangle in Histogram problem — both use monotonic stacks to find left/right boundaries efficiently.",
    "**Range minimum query preprocessing:** The boundary arrays built here are a foundation for static RMQ structures used in competitive programming and database engines.",
    "**Signal processing:** Identifying subintervals where signal strength never exceeds a threshold minimum.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — amortized constant work per element across three linear passes.",
      "Handles duplicate values correctly via the asymmetric pop conditions.",
      "Avoids modular arithmetic pitfalls by applying MOD only in the contribution sum, not in boundary computations.",
    ],
    limitations: [
      "Requires three passes and two auxiliary arrays, making it less cache-friendly than single-pass alternatives for very large inputs.",
      "The two-pass boundary logic (strict vs. non-strict pop conditions) is subtle and easy to get wrong when adapting to variations.",
      "Not suitable for online/streaming inputs where the array can grow dynamically — the right-boundary pass requires the full array upfront.",
    ],
  },

  whenToUseIt:
    "Use this approach whenever you need to aggregate a function (minimum, maximum, first/last occurrence) over all contiguous subarrays efficiently. The contribution technique generalises: replace 'minimum' with any dominance relation that forms a monotonic stack structure. Avoid it when the input changes dynamically — use a segment tree with lazy propagation instead.",
};
