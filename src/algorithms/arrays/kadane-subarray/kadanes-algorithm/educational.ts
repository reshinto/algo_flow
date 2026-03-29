import type { EducationalContent } from "@/types";

export const kadanesEducational: EducationalContent = {
  overview:
    "**Kadane's Algorithm** finds the contiguous subarray with the largest sum in `O(n)` time using a single pass. " +
    "At each element, it makes a simple decision: *extend* the current subarray or *restart* from the current element. " +
    "This elegant approach transforms an `O(n^2)` brute-force problem into a linear scan by maintaining just two running values — " +
    "the best sum ending at the current position and the best sum seen globally.",

  howItWorks:
    "1. Initialize `currentSum` and `globalMax` to the first element.\n" +
    "2. For each subsequent element, compute two candidates:\n" +
    "   * **Extend**: `currentSum + element` — continue the current subarray.\n" +
    "   * **Restart**: `element` alone — abandon the previous subarray and start fresh.\n" +
    "3. Set `currentSum = max(extend, restart)`. If restarting, record the new start index.\n" +
    "4. If `currentSum > globalMax`, update `globalMax` and record the best subarray bounds.\n" +
    "5. After scanning all elements, `globalMax` holds the maximum subarray sum.\n\n" +
    "### The Key Insight\n\n" +
    "If the running sum becomes worse than starting fresh from the current element, " +
    "the previous subarray can only drag down future results — so discard it entirely.\n\n" +
    "### Walkthrough with `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`\n\n" +
    "| Index | Element | Extend | Restart | Decision | currentSum | globalMax |\n" +
    "|-------|---------|--------|---------|----------|------------|----------|\n" +
    "| 0     | -2      | —      | —       | init     | -2         | -2       |\n" +
    "| 1     | 1       | -1     | 1       | restart  | 1          | 1        |\n" +
    "| 2     | -3      | -2     | -3      | extend   | -2         | 1        |\n" +
    "| 3     | 4       | 2      | 4       | restart  | 4          | 4        |\n" +
    "| 4     | -1      | 3      | -1      | extend   | 3          | 4        |\n" +
    "| 5     | 2       | 5      | 2       | extend   | 5          | 5        |\n" +
    "| 6     | 1       | 6      | 1       | extend   | 6          | 6        |\n" +
    "| 7     | -5      | 1      | -5      | extend   | 1          | 6        |\n" +
    "| 8     | 4       | 5      | 4       | extend   | 5          | 6        |\n\n" +
    "**Result**: Maximum subarray sum = `6`, from subarray `[4, -1, 2, 1]` (indices 3–6).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "The algorithm performs exactly one pass through the array, making a constant number of operations per element. " +
    "This is optimal — any algorithm must examine every element at least once to determine the maximum subarray.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a fixed set of variables is maintained (`currentSum`, `globalMax`, start/end indices). " +
    "No additional data structures are allocated regardless of input size.",

  bestAndWorstCase:
    "**Best and worst case are both `O(n)`** — the algorithm always scans the entire array once.\n\n" +
    "- **All positive elements**: The entire array is the maximum subarray. The algorithm extends at every step.\n" +
    "- **All negative elements**: The maximum subarray is the single least-negative element. The algorithm restarts at every step.\n" +
    "- **Mixed elements**: The extend/restart decision alternates, but the total number of operations remains `n - 1`.\n\n" +
    "### Compared to Brute Force\n\n" +
    "The brute-force approach checks all `O(n^2)` subarrays. For an array of 1,000,000 elements, " +
    "brute force requires ~500 billion operations while Kadane's needs just ~1 million — a **500,000x speedup**.",

  realWorldUses: [
    "**Financial Analysis:** Finding the most profitable consecutive trading period in a stock price change array.",
    "**Signal Processing:** Identifying the strongest contiguous signal burst in noisy sensor data.",
    "**Game Development:** Computing maximum consecutive scoring streaks from per-round score deltas.",
    "**Image Processing:** Extending to 2D for maximum sum rectangle detection in pixel intensity matrices.",
    "**Performance Monitoring:** Detecting the peak load period from time-series CPU usage delta readings.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time — impossible to do better since every element must be examined.",
      "Constant `O(1)` space — no auxiliary arrays or data structures needed.",
      "Simple implementation with just a single loop and two running variables.",
      "Naturally tracks subarray boundaries (start and end indices) alongside the sum.",
      "Handles negative numbers correctly, including all-negative arrays.",
    ],
    limitations: [
      "Only finds the maximum sum, not all subarrays with that sum (there may be ties).",
      "Does not directly extend to non-contiguous subsequences — a different technique is needed.",
      "The 2D extension (maximum sum rectangle) increases complexity to `O(n^3)` for an `n×n` matrix.",
      "Cannot efficiently answer range queries — a segment tree or sparse table is needed for that.",
    ],
  },

  whenToUseIt:
    "Use **Kadane's Algorithm** whenever you need the maximum (or minimum) sum of a contiguous subarray. " +
    "Look for problem statements mentioning *contiguous subarray*, *maximum sum*, or *best consecutive sequence*.\n\n" +
    "**Do not use** when the problem allows skipping elements (non-contiguous) — that requires Dynamic Programming. " +
    "Also avoid when you need the maximum sum subarray of a *fixed size* — the Sliding Window technique is more appropriate for that.",
};
