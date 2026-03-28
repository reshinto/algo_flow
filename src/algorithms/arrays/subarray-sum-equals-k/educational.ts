import type { EducationalContent } from "@/types";

export const subarraySumEqualsKEducational: EducationalContent = {
  overview:
    "**Subarray Sum Equals K** asks: *how many contiguous subarrays of an integer array have a sum equal to a target value `k`?*\n\n" +
    "The naive approach checks every possible subarray, giving **O(n²)** time. The optimal solution exploits the **prefix sum + hash map** pattern to answer the question in a single **O(n)** pass — making it a canonical example of trading O(n) space for a dramatic speed gain.",

  howItWorks:
    "### Key Insight\n\n" +
    "The sum of elements from index `left` to `right` equals `runningSum[right] - runningSum[left-1]`. If that equals `target`, then `runningSum[right] - target = runningSum[left-1]`, which means the hash map lookup `runningSum - target` tells us *how many times that prefix sum appeared before*.\n\n" +
    "### Algorithm Steps\n\n" +
    "1. Initialize a map `{ 0: 1 }` — the empty prefix (sum = 0) appears once.\n" +
    "2. Maintain a `runningSum` starting at 0.\n" +
    "3. For each element at `scanIndex`:\n" +
    "   a. Add `inputArray[scanIndex]` to `runningSum`.\n" +
    "   b. Compute `lookupKey = runningSum - target`.\n" +
    "   c. If `lookupKey` is in the map, add `map[lookupKey]` to `foundCount`.\n" +
    "   d. Increment `map[runningSum]` by 1.\n" +
    "4. Return `foundCount`.\n\n" +
    "### Example Trace\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Array: [1, 2, 3], target = 3"]\n' +
    '    B["Index 0: sum=1, lookup=1-3=-2 ✗, map={0:1,1:1}"]\n' +
    '    C["Index 1: sum=3, lookup=3-3=0 ✓ count=1, map={0:1,1:1,3:1}"]\n' +
    '    D["Index 2: sum=6, lookup=6-3=3 ✓ count=2, map={0:1,1:1,3:1,6:1}"]\n' +
    '    E["Result: 2 subarrays ([1,2] and [3])"]  \n' +
    "    A --> B --> C --> D --> E\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- One linear pass through the array.\n" +
    "- Each hash map operation (get/set) is `O(1)` amortized.\n" +
    "- Total: `O(n)` regardless of the target value or array contents.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "- The hash map stores at most one entry per distinct prefix sum.\n" +
    "- In the worst case (all distinct prefix sums), this is `O(n)` entries.\n\n" +
    "**Versus Brute Force (`O(n²)`)**\n\n" +
    "| Approach | Time | Space |\n" +
    "| --- | --- | --- |\n" +
    "| Brute Force (nested loops) | O(n²) | O(1) |\n" +
    "| Prefix Sum + Hash Map | O(n) | O(n) |",

  bestAndWorstCase:
    "**Best Case:** `O(n)` — there are no repeated prefix sums and no matches, so the loop runs exactly once through the array with O(1) map operations at each step.\n\n" +
    "**Worst Case:** `O(n)` — even when every element forms a valid subarray, the algorithm still only makes one pass. Hash map collisions are theoretically possible but amortize to O(1) per operation.\n\n" +
    "**The O(n²) Trap:** The brute force approach uses two nested loops — outer loop selects the start index, inner loop extends the end index while accumulating a sum. This works but is painfully slow for large arrays. A 10,000-element array requires 50 million inner loop iterations versus 10,000 for the prefix sum approach.",

  realWorldUses: [
    "**Financial Analysis:** Detecting all time windows where cumulative profit or loss equals a specific threshold.",
    "**Network Monitoring:** Finding all consecutive packet bursts where total bytes transmitted equals a target bandwidth value.",
    "**Log Analysis:** Counting all contiguous time ranges in event logs where the aggregate score or weight matches a threshold.",
    "**Game Scoring:** Identifying all consecutive move sequences in a game history that produce a target point total.",
    "**Signal Processing:** Locating all contiguous signal segments whose energy integral matches a target amplitude.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Solves a quadratic problem in linear time — a 100x speedup on large inputs.",
      "Handles negative numbers correctly, unlike sliding window approaches which require non-negative arrays.",
      "Handles duplicate prefix sums naturally via frequency counting in the map.",
      "Single-pass algorithm with minimal state — easy to implement once the key insight is understood.",
    ],
    limitations: [
      "Requires O(n) extra space for the hash map — not suitable when memory is severely constrained.",
      "Only counts subarrays; reconstructing the actual subarray indices requires additional bookkeeping.",
      "Hash map operations have worse cache locality than array-based approaches, which matters for performance-critical systems.",
      "The core insight (prefix sum difference = target) is non-obvious and easy to get wrong with off-by-one errors on the initial map entry.",
    ],
  },

  whenToUseIt:
    "**Use this pattern when:**\n" +
    "- The problem asks to *count* or *find* contiguous subarrays with a specific sum.\n" +
    "- The array can contain negative numbers (ruling out the two-pointer sliding window).\n" +
    "- You need to handle multiple valid subarrays ending at the same index.\n\n" +
    "**Key signal phrases:** *'number of subarrays with sum equal to k'*, *'count of contiguous subarrays summing to target'*.\n\n" +
    "**Avoid it when:**\n" +
    "- All numbers are positive and you want the *maximum length* subarray with sum ≤ target (use variable sliding window instead).\n" +
    "- You need the actual subarray values, not just a count (extra tracking required).\n" +
    "- Space is critically constrained (the hash map adds O(n) overhead).",
};
