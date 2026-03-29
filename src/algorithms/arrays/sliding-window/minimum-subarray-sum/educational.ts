import type { EducationalContent } from "@/types";

export const minimumSubarraySumEducational: EducationalContent = {
  overview:
    "**Minimum Subarray Sum** finds the contiguous subarray with the smallest (most negative) sum. It is the direct inversion of Kadane's algorithm: instead of tracking the running maximum subarray, we track the running minimum.\n\nEvery element either extends the current minimum-sum subarray or starts a fresh subarray. The key insight is identical to Kadane's — the decision at each step depends only on whether extending is better than restarting.",

  howItWorks:
    "1. Initialize `minEndingHere = array[0]`, `minSoFar = array[0]`.\n" +
    "2. For each element from index `1` to `n-1`:\n" +
    "   * If `element < minEndingHere + element` (i.e., restarting is better than extending), set `minEndingHere = element` and update the current start.\n" +
    "   * Otherwise, extend: `minEndingHere += element`.\n" +
    "   * If `minEndingHere < minSoFar`, update `minSoFar` and record the window bounds.\n" +
    "3. Return `minSoFar` with its start and end indices.\n\n" +
    "### Example with `[3, -4, 2, -3, -1, 7, -5]`\n\n" +
    "| Index | Element | minEndingHere | minSoFar |\n" +
    "|---|---|---|---|\n" +
    "| 0 | 3 | 3 | 3 |\n" +
    "| 1 | -4 | -4 (restart) | **-4** |\n" +
    "| 2 | 2 | -2 (extend) | -4 |\n" +
    "| 3 | -3 | -5 (extend) | **-5** |\n" +
    "| 4 | -1 | -6 (extend) | **-6** ✓ |\n" +
    "| 5 | 7 | 1 (restart) | -6 |\n" +
    "| 6 | -5 | -5 (restart) | -6 |\n\n" +
    "Result: `minSum = -6`, subarray `[-4, 2, -3, -1]` at indices `[1, 4]`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- A single linear pass over the array — identical to Kadane's algorithm.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a fixed set of scalar variables: `minEndingHere`, `minSoFar`, start and end indices.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — When the minimum is the first element (all elements are non-negative), we still scan the full array to confirm it.\n\n" +
    "**Worst Case: `O(n)`** — Arrays with alternating signs require decisions at every step, but each element is still visited exactly once.\n\n" +
    "No edge case changes the linear time complexity. The algorithm is always a single-pass scan.",

  realWorldUses: [
    "**Finance:** Finding the worst-performing period (most negative cumulative return) in a stock's daily change series.",
    "**Fault Detection:** Locating the time interval with the greatest cumulative degradation in sensor readings.",
    "**Resource Management:** Finding the server time window with the maximum cumulative resource deficit.",
    "**Signal Analysis:** Identifying the most negative dip in a differential signal for anomaly detection.",
    "**Game Theory:** Finding the player sequence that minimizes a cumulative score (worst-case analysis).",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Exact inversion of the well-known Kadane's algorithm — minimal new learning required.",
      "`O(n)` time, `O(1)` space — optimal for the problem.",
      "Handles all-positive arrays correctly (minimum is a single element).",
      "Works on arrays with all negatives (the answer is the full array).",
    ],
    limitations: [
      "Only finds the minimum-sum subarray of length ≥ 1 — does not support constraints like 'minimum of length ≥ k'.",
      "Returns only the first minimum-sum window when ties exist.",
      "Not directly applicable to circular arrays without a two-pass modification.",
    ],
  },

  whenToUseIt:
    "Use **Minimum Subarray Sum** when the problem asks for the contiguous subarray with the **smallest or most negative aggregate**.\n\nTypical phrasings: 'find the subarray with the minimum sum', 'largest loss over a contiguous period', 'most negative contiguous segment'. If the array contains only non-negative values, the answer is simply the single smallest element.",
};
