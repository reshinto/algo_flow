import type { EducationalContent } from "@/types";

export const uniformBinarySearchEducational: EducationalContent = {
  overview:
    "**Uniform Binary Search** is a variant that pre-computes a lookup table of jump deltas before searching begins. Instead of recalculating `(low + high) / 2` on each iteration, the algorithm steps through the array using a pre-computed sequence of decreasing jump sizes.\n\nThis avoids the addition and division on every iteration, replacing them with a single table lookup — a worthwhile optimization on architectures where memory access is cheaper than arithmetic.",

  howItWorks:
    "1. Pre-compute the **delta table**: `delta[0] = ceil(n/2)`, `delta[k] = ceil(delta[k-1]/2)`, until the value reaches 1.\n" +
    "2. Start at `currentIndex = delta[0] - 1` (the initial midpoint).\n" +
    "3. Set `stepLevel = 0`.\n" +
    "4. On each iteration:\n" +
    "   - Compare `array[currentIndex]` with `target`.\n" +
    "   - If equal: target found — return `currentIndex`.\n" +
    "   - Advance `stepLevel` and look up `nextDelta = deltaTable[stepLevel]`.\n" +
    "   - If `array[currentIndex] < target`: move right by `nextDelta`.\n" +
    "   - If `array[currentIndex] > target`: move left by `nextDelta`.\n" +
    "5. If `stepLevel` exceeds the table or index goes out of bounds, return `-1`.\n\n" +
    "### Delta Table for n=10\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    "    subgraph Delta Table for n=10\n" +
    '    A["delta[0]=5"] --> B["delta[1]=3"] --> C["delta[2]=2"] --> D["delta[3]=1"]\n' +
    "    end\n" +
    "```\n\n" +
    "Starting at index 4 (delta[0]-1=4), then jumping ±3, ±2, ±1 until found or exhausted.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- The delta table has `O(log n)` entries and is traversed at most once per search.\n" +
    "- **Best Case:** `O(1)` — Target is at the initial midpoint.\n" +
    "- **Worst Case:** `O(log n)` — All table entries are consumed.\n\n" +
    "**Space Complexity: `O(log n)`**\n\n" +
    "The pre-computed delta table requires `O(log n)` space — unlike standard binary search which uses `O(1)`. This is the trade-off for avoiding repeated midpoint arithmetic.",

  bestAndWorstCase:
    "**Best case** `O(1)` occurs when the target is located at the initial starting index (`delta[0] - 1`), requiring only a single comparison.\n\n" +
    "**Worst case** `O(log n)` exhausts the entire delta table without finding the target. For an array of 1,000,000 elements, the delta table has about 20 entries — matching the iteration count of standard binary search.",

  realWorldUses: [
    "**Legacy Hardware Optimization:** On older processors where integer division was slow, pre-computing deltas and using table lookup improved search throughput significantly.",
    "**Embedded Read-Only Memory:** ROM-based lookup tables for fixed-size datasets make the delta table a natural fit.",
    "**Sorted Dictionary Lookup:** Applications with frequent lookups in fixed, pre-sorted datasets can benefit from the one-time delta table construction cost.",
    "**Educational Demonstration:** Illustrates the trade-off between space and repeated arithmetic in search algorithms.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Avoids repeated integer division/addition on each search step by using a pre-computed table.",
      "Table is computed once and can be reused across many searches on the same dataset size.",
      "Predictable and uniform jump pattern — easier to reason about cache behavior.",
    ],
    limitations: [
      "Requires `O(log n)` extra space for the delta table, unlike standard binary search.",
      "The pre-computation step adds overhead if only one search is performed.",
      "On modern CPUs with fast arithmetic units, the performance advantage over standard binary search is minimal or nonexistent.",
    ],
  },

  whenToUseIt:
    "Use **Uniform Binary Search** when you need to perform many searches on arrays of the same length, making the one-time delta table construction worthwhile. It is historically relevant for architectures where arithmetic was slower than memory access.\n\nOn modern hardware, prefer standard binary search unless profiling shows a specific benefit from the uniform variant. Do not use it when the array changes frequently, as the delta table is specific to a given array length.",
};
