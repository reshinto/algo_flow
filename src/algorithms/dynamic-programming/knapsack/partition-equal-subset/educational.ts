import type { EducationalContent } from "@/types";

export const partitionEqualSubsetEducational: EducationalContent = {
  overview:
    "**Partition Equal Subset Sum (Tabulation)** determines whether a given array of positive integers can be split into two subsets with equal sums. It is a classic **0/1 knapsack** problem: each element can be used at most once.\n\nTabulation builds the answer bottom-up using a boolean DP table `dp[j]` where `dp[j] = 1` means sum `j` is achievable using a subset of the processed elements so far.",

  howItWorks:
    "1. **Compute the total sum.** If it is odd, equal partition is impossible — return `false` immediately.\n" +
    "2. **Set target** = `totalSum / 2`. The goal is to find a subset summing to exactly this value.\n" +
    "3. **Initialize** a DP table of size `target + 1` filled with `0` (not achievable by default).\n" +
    "4. **Base case:** `dp[0] = 1` — an empty subset always achieves sum 0.\n" +
    "5. **Outer loop** over each number in the array.\n" +
    "6. **Inner loop** runs from `target` down to `currentNumber` (right-to-left).\n" +
    "   - If `dp[j - currentNumber] = 1`, then set `dp[j] = 1`.\n" +
    "   - Right-to-left order ensures each element is counted at most once.\n" +
    "7. After processing all numbers, return `dp[target] === 1`.\n\n" +
    "### Table Build-Up for numbers=[1, 5, 11, 5], target=11\n\n" +
    "```\n" +
    "Start:    dp = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]\n" +
    "After 1:  dp = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]\n" +
    "After 5:  dp = [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0]\n" +
    "After 11: dp = [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1]\n" +
    "After 5:  dp = [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1]\n" +
    "```\n\n" +
    "`dp[11] = 1` → true. The subset [11] (or [1, 5, 5]) sums to 11.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × sum)`**\n\n" +
    "The outer loop runs once per element (`n` iterations). The inner loop runs at most `target = sum/2` times per element. Each iteration does `O(1)` work, giving `O(n × sum/2)` which simplifies to `O(n × sum)`.\n\n" +
    "**Space Complexity: `O(sum)`**\n\n" +
    "Only a single 1-D DP table of size `target + 1 = sum/2 + 1` is needed. No recursion stack or extra tables are required.",

  bestAndWorstCase:
    "**Best case:** `O(1)` — if the total sum is odd, the algorithm returns `false` immediately without building any table.\n\n" +
    "**Typical / worst case:** `O(n × sum)` — the full table must be built before the answer is known. This occurs when the total sum is even and no early-exit condition is triggered.\n\n" +
    "In practice, arrays with small sums and many elements run quickly; arrays with a large total sum (e.g., many large numbers) require a proportionally larger table and more iterations.",

  realWorldUses: [
    "**Job scheduling:** Distributing tasks across two workers so both have equal total workload.",
    "**Load balancing:** Splitting server requests or batch jobs into two queues with equal processing time.",
    "**Fair resource division:** Dividing assets, files, or weights into two equal groups.",
    "**Compiler optimization:** Static analysis to partition data sets for parallel processing pipelines.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guaranteed correct answer — greedy or sorting-based heuristics can fail on adversarial inputs.",
      "Iterative bottom-up approach avoids recursion overhead and stack overflow on large inputs.",
      "Right-to-left inner loop enforces the 0/1 constraint (each element used at most once) without a 2-D table.",
      "Naturally extends to the full 0/1 knapsack problem by replacing the boolean flag with a value.",
    ],
    limitations: [
      "Space grows with the total sum — inputs with very large numbers produce equally large DP tables.",
      "Does not reconstruct which elements form the equal subset; backtracking logic must be added separately.",
      "Only works for non-negative integers; negative numbers or fractional values require a different approach.",
    ],
  },

  whenToUseIt:
    "Use **partition equal subset tabulation** when you need to determine whether an integer array can be split into two equal-sum halves, particularly when the set of elements is fixed and each element may only be used once (0/1 knapsack variant). Choose tabulation over memoization when the input size is predictable and you want to avoid recursion stack overhead. If you need to know *which* elements form the subset rather than just feasibility, augment the DP table with a parent-pointer or backtracking pass. For problems where elements can be reused, see the unbounded knapsack (coin change) variant instead.",
};
