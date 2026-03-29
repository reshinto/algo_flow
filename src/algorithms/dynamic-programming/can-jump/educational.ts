import type { EducationalContent } from "@/types";

export const canJumpEducational: EducationalContent = {
  overview:
    "**Can Jump (Tabulation)** solves the classic reachability problem: given an array where each element represents the maximum jump length from that position, determine whether you can reach the last index starting from index 0.\n\n" +
    "The tabulation approach builds a boolean DP table `dp[i]` bottom-up, where `dp[i] = 1` means index `i` is reachable from index 0, and `dp[i] = 0` means it is not. The answer is `dp[n-1]`.",

  howItWorks:
    "1. **Initialize** a DP table of size `n` filled with zeros.\n" +
    "2. **Fill base case:** `dp[0] = 1` — index 0 is always reachable.\n" +
    "3. **Iterate** from `targetIndex = 1` to `n - 1`.\n" +
    "4. For each `targetIndex`, scan all prior indices `sourceIndex` from `0` to `targetIndex - 1`.\n" +
    "5. If `dp[sourceIndex] = 1` and `sourceIndex + nums[sourceIndex] >= targetIndex`, then `dp[targetIndex] = 1`.\n" +
    "6. Return `dp[n-1] === 1`.\n\n" +
    "### Table Build-Up for `[2, 3, 1, 1, 4]`\n\n" +
    "```\n" +
    "Index:  0  1  2  3  4\n" +
    "nums:   2  3  1  1  4\n" +
    "dp:     1  1  1  1  1   → true\n" +
    "```\n\n" +
    "### Table Build-Up for `[3, 2, 1, 0, 4]`\n\n" +
    "```\n" +
    "Index:  0  1  2  3  4\n" +
    "nums:   3  2  1  0  4\n" +
    "dp:     1  1  1  1  0   → false\n" +
    "```\n\n" +
    "Index 3 has `nums[3] = 0` and every path leads through it, so index 4 is unreachable.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "For each of the `n` target indices, the inner loop scans up to `n` prior source indices. In the worst case (e.g., all zeros except the first element) every pair is examined.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The DP table stores one reachability flag per index. This is maintained in full for visualization clarity.\n\n" +
    "> **Note:** A greedy scan achieves `O(n)` time and `O(1)` space by tracking the maximum reachable index. The tabulation approach trades efficiency for an explicit, step-by-step DP story.",

  bestAndWorstCase:
    "**Best case: `O(n)`** — if `nums[0]` is large enough to reach the last index directly, the inner loop terminates immediately for every `targetIndex`.\n\n" +
    "**Worst case: `O(n²)`** — if jumps are short (e.g., all ones), every `targetIndex` requires scanning all prior indices before confirming reachability.\n\n" +
    "The answer is `false` only when index `n-1` remains `0` after all pairs are evaluated — often occurring when a zero-valued cell blocks all paths forward.",

  realWorldUses: [
    "**Game AI:** Jump-and-run level solvability checks — can a character reach the goal given fixed jump distances at each platform?",
    "**Network Routing:** Determine if a packet can traverse a sequence of relay nodes where each node has a limited forwarding range.",
    "**Task Scheduling:** Check if a sequence of dependent tasks can all be completed given resource constraints at each step.",
    "**Robotics:** Path feasibility — can a robot reach a target cell if each cell constrains the maximum step length of its actuators?",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Produces an explicit per-index reachability table, making each decision visible and auditable.",
      "Naturally extends to related problems: minimum jumps, jump paths, or reachability from arbitrary start points.",
      "Bottom-up order guarantees every dependency `dp[sourceIndex]` is computed before it is read.",
    ],
    limitations: [
      "`O(n²)` time is dominated by the greedy `O(n)` solution in production code.",
      "Stores `n` values when only a single running maximum is needed for the pure reachability answer.",
      "The inner loop cannot be vectorized easily, limiting performance on very large inputs.",
    ],
  },

  whenToUseIt:
    "Choose the **tabulation approach** when you need to visualize or audit the full reachability table, or when the problem requires deriving per-index values (e.g., minimum jumps to reach each index). For a production boolean answer, prefer the greedy scan: track `maxReach = max(maxReach, index + nums[index])` and return `maxReach >= n - 1` — it runs in `O(n)` time with `O(1)` space and no DP table at all.",
};
