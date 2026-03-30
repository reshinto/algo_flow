import type { EducationalContent } from "@/types";

export const subarraySumEqualsKEducational: EducationalContent = {
  overview:
    "**Subarray Sum Equals K** counts the number of contiguous subarrays whose elements sum to a given target `k`. A brute-force approach checks every pair of start/end indices in `O(n²)`, but using **prefix sums with a hash map** reduces it to a single `O(n)` pass.\n\nThe key insight: if the running sum up to index `j` minus the running sum up to index `i` equals `k`, the subarray `i+1..j` sums to `k`. By storing prefix sum counts in a map, we can check this in `O(1)`.",

  howItWorks:
    "The algorithm maintains a running prefix sum and a hash map of `{ prefixSum → count }`:\n\n" +
    "1. **Initialize** the map with `{ 0: 1 }` — the empty prefix sums to zero once.\n" +
    "2. **For each element**, add it to the running sum.\n" +
    "3. **Check** if `currentSum - target` exists in the map. If so, there are that many subarrays ending here that sum to `target`.\n" +
    "4. **Increment** the count for `currentSum` in the map.\n\n" +
    "### Example: `numbers = [1, 1, 1]`, `target = 2`\n\n" +
    "```\n" +
    "idx  val  currentSum  needed (sum-target)  map lookup        totalCount  map after\n" +
    " 0    1       1           -1               not found             0        {0:1, 1:1}\n" +
    " 1    1       2            0               found (count=1)       1        {0:1, 1:1, 2:1}\n" +
    " 2    1       3            1               found (count=1)       2        {0:1, 1:1, 2:1, 3:1}\n" +
    "```\n\n" +
    "Answer: **2** subarrays (`[1,1]` starting at index 0 and `[1,1]` starting at index 1).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single pass through the array. Each hash map insert and lookup is `O(1)` amortized, so total work is linear in the length of the input.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The map stores at most `n + 1` distinct prefix sum values (one per element plus the initial zero entry).",

  bestAndWorstCase:
    "**Best case** — `O(n)` time regardless of input, since every element must be visited at least once to compute prefix sums. There is no early-exit optimisation here.\n\n" +
    "**Worst case** — `O(n)` time and `O(n)` space. All prefix sums are distinct (no repeated values), so the map grows to hold every entry. This is the typical scenario for arrays of random integers.",

  realWorldUses: [
    "**Network packet analysis:** Counting windows of packets whose payload sizes sum to a protocol threshold.",
    "**Financial time series:** Finding all contiguous date ranges where cumulative profit/loss hits an exact target.",
    "**Signal processing:** Locating all segments of a discrete signal whose energy (sum of samples) equals a target level.",
    "**Database query optimisation:** Translating range-sum queries on integer sequences into `O(n)` pre-computation rather than repeated aggregation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — optimal for this problem (every element must be read).",
      "Counts all valid subarrays, not just the first one found.",
      "Handles negative numbers naturally — unlike sliding window approaches which require non-negative values.",
    ],
    limitations: [
      "O(n) extra space for the prefix sum map.",
      "Does not return the actual subarray boundaries — only the count.",
      "Hash map performance degrades on pathological inputs with many hash collisions (rare in practice).",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you need to count (or find) subarrays with an exact sum and the input may contain negative numbers. If you only need existence (not count) and values are non-negative, a two-pointer sliding window uses `O(1)` space. For 2D grids, apply this technique row-by-row with column prefix sums.",
};
