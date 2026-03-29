import type { EducationalContent } from "@/types";

export const maxSubarrayKadaneEducational: EducationalContent = {
  overview:
    "**Kadane's Algorithm (Max Subarray)** solves the classic maximum subarray problem using a **bottom-up dynamic programming** approach. The DP table stores `dp[i]` — the maximum subarray sum ending exactly at index `i`.\n\nThe key insight is that at every position you face a binary choice: **extend** the previous subarray (add the current element to `dp[i-1]`) or **restart** a fresh subarray starting at the current element. The better of the two becomes `dp[i]`. A single pass through the table reveals the global maximum.",

  howItWorks:
    "1. **Initialize** a DP table of size `n`.\n" +
    "2. **Base case:** `dp[0] = array[0]` — a single-element subarray is the only option.\n" +
    "3. **Iterate** from index `1` to `n - 1`.\n" +
    "4. For each index `i`, apply the recurrence:\n" +
    "   `dp[i] = max(array[i], dp[i-1] + array[i])`\n" +
    "   - `array[i]` — restart: begin a new subarray here.\n" +
    "   - `dp[i-1] + array[i]` — extend: append current element to the best subarray ending at `i-1`.\n" +
    "5. **Track** the running global maximum across all `dp[i]` values.\n" +
    "6. Return the global maximum.\n\n" +
    "### DP Table for `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`\n\n" +
    "```\n" +
    "Index:  0   1   2   3   4   5   6   7   8\n" +
    "Array: -2   1  -3   4  -1   2   1  -5   4\n" +
    "dp:    -2   1  -2   4   3   5   6   1   5\n" +
    "```\n\n" +
    "Global maximum = `dp[6] = 6`, produced by the subarray `[4, -1, 2, 1]`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single left-to-right pass fills every cell exactly once. Each cell requires one comparison and one addition — constant work per element.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The full DP table of size `n` is maintained for visualization. In production the space can be reduced to `O(1)` by keeping only the previous `dp` value rather than the entire table.",

  bestAndWorstCase:
    "**Best case, average case, and worst case** are all `O(n)` — every element must be visited to correctly compute each `dp[i]`.\n\n" +
    "There is no early-exit shortcut: even an all-positive array requires filling every cell to confirm the entire array is the optimal subarray.\n\n" +
    "The most favorable input is an all-positive array (every cell extends the previous subarray). The most challenging input for human intuition — but not for the algorithm — is an array with mixed signs, where the restart decision produces non-obvious subarray boundaries.",

  realWorldUses: [
    "**Financial Analysis:** Finding the most profitable trading window in a time series of daily profit/loss values.",
    "**Signal Processing:** Isolating the highest-energy segment of a noisy signal for feature extraction.",
    "**Genomics:** Identifying gene regions with the highest expression scores in a sequence of expression deltas.",
    "**Image Processing:** 1-D foundation for the 2-D maximum submatrix problem used in object detection.",
    "**Algorithm Education:** The canonical example of the extend-or-restart DP decision pattern.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single-pass `O(n)` solution — optimal time complexity for this problem.",
      "No recursive overhead; stack-safe for arbitrarily large arrays.",
      "Straightforward recurrence makes it easy to verify and extend.",
      "The DP table makes every intermediate decision visible, aiding debugging and learning.",
    ],
    limitations: [
      "Returns the maximum sum only; recovering the subarray indices requires extra bookkeeping.",
      "The `O(n)` table is unnecessary if only the final answer is needed — two variables suffice.",
      "Does not handle the empty-array case without an explicit guard (returns 0 by convention).",
      "Cannot be directly applied to circular subarrays without modification.",
    ],
  },

  whenToUseIt:
    "Choose the **DP tabulation form** when you want to visualize or audit the extend-or-restart decision at every position. For production use where only the maximum sum matters, the space-optimized two-variable version is preferable.\n\n" +
    "Use Kadane's when the input is a 1-D array of integers (positive, negative, or mixed). For 2-D variants (maximum submatrix), apply Kadane's to compressed row sums. Avoid it for non-contiguous subarray problems — those require a different DP formulation.",
};
