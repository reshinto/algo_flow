import type { EducationalContent } from "@/types";

export const houseRobberTabulationEducational: EducationalContent = {
  overview:
    "**House Robber (Tabulation)** solves the classic constraint optimization problem: given a row of houses each containing some amount of money, find the maximum total you can rob without robbing two adjacent houses.\n\nTabulation builds the solution bottom-up, filling a DP table from the first house to the last. At each position `i`, the table records the best possible haul from houses `0` through `i` — the answer accumulates one house at a time.",

  howItWorks:
    "1. **Handle edge cases:** return `0` for an empty array; return `houses[0]` for a single house.\n" +
    "2. **Initialize base cases:** `dp[0] = houses[0]` (only option), `dp[1] = max(houses[0], houses[1])` (take the richer of the first two).\n" +
    "3. **Fill the table** from index `2` to `n-1`:\n" +
    "   - **Rob current house:** add `houses[i]` to `dp[i-2]` (the best haul two steps back, guaranteed non-adjacent).\n" +
    "   - **Skip current house:** carry forward `dp[i-1]` unchanged.\n" +
    "   - Store `dp[i] = max(dp[i-1], dp[i-2] + houses[i])`.\n" +
    "4. Return `dp[n-1]` — the maximum total across all houses.\n\n" +
    "### Table Build-Up for `[2, 7, 9, 3, 1]`\n\n" +
    "```\n" +
    "Index:  0   1   2   3   4\n" +
    "House:  2   7   9   3   1\n" +
    "dp:     2   7  11  11  12\n" +
    "```\n\n" +
    "- `dp[0] = 2` — rob house 0\n" +
    "- `dp[1] = max(2, 7) = 7` — rob house 1 instead\n" +
    "- `dp[2] = max(7, 2+9) = 11` — rob houses 0 and 2\n" +
    "- `dp[3] = max(11, 7+3) = 11` — skipping house 3 is equally good\n" +
    "- `dp[4] = max(11, 11+1) = 12` — rob houses 0, 2, and 4\n\n" +
    "Each cell is filled exactly once with an `O(1)` decision.\n\n" +
    "### DP Table for [2, 7, 9, 3, 1]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  H0["dp[0]=2 rob h0"] --> H2["dp[2]=11 rob h0+h2"]\n' +
    '  H1["dp[1]=7 rob h1"] --> H2\n' +
    '  H1 --> H3["dp[3]=11 skip h3"]\n' +
    "  H2 --> H3\n" +
    '  H2 --> H4["dp[4]=12 rob h0+h2+h4"]\n' +
    "  H3 --> H4\n" +
    "  style H0 fill:#06b6d4,stroke:#0891b2\n" +
    "  style H1 fill:#06b6d4,stroke:#0891b2\n" +
    "  style H2 fill:#14532d,stroke:#22c55e\n" +
    "  style H3 fill:#14532d,stroke:#22c55e\n" +
    "  style H4 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Each node shows the best haul achievable up to that house. The two incoming arrows represent the skip (from `dp[i-1]`) and rob (from `dp[i-2] + house[i]`) choices — the maximum is kept.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single linear pass fills the table. Each house is visited exactly once with constant-time work.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The DP table stores one value per house. This can be reduced to `O(1)` by keeping only the two most recent values (`prev1` and `prev2`), but the full table is maintained here for visualization clarity.",

  bestAndWorstCase:
    "**Best case, average case, and worst case** are all `O(n)` — every house must be evaluated to guarantee the global optimum. There is no early-exit condition.\n\n" +
    "Input values do not affect runtime. Whether houses hold `[0, 0, 0]` or `[100, 1, 100]`, the algorithm makes the same number of comparisons.",

  realWorldUses: [
    "**Resource Scheduling:** Assign jobs or tasks to time slots where adjacent slots conflict — the same recurrence applies.",
    "**Stock Trading with Cooldown:** Variants of the adjacent-constraint pattern appear in buy/sell-with-cooldown problems.",
    "**Network Frequency Allocation:** Assign frequencies to adjacent antennas that cannot share the same band.",
    "**Interview Staple:** One of the most commonly asked DP problems in software engineering interviews at major tech companies.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Eliminates the exponential cost of brute-force enumeration of all subsets.",
      "Iterative — no recursion overhead, no risk of stack overflow.",
      "The filled table makes the optimal sub-structure immediately visible for learning and debugging.",
    ],
    limitations: [
      "The `O(n)` table can be compressed to `O(1)` space when visualization is not needed.",
      "Only handles a linear arrangement of houses — circular arrangements (house 0 and house n-1 adjacent) require two separate passes.",
      "Greedy strategies (always rob the richest house) fail this problem — `[2, 7, 9, 3, 1]` would greedily pick 9 then 7 = 16, but 9 and 7 are adjacent.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you have a **linear sequence with an adjacency constraint** — the recurrence `dp[i] = max(dp[i-1], dp[i-2] + value[i])` appears in many disguised forms. Choose tabulation over memoization when you need all intermediate values (e.g., for visualization or downstream use). If only the final answer is needed and memory is tight, reduce to two rolling variables. Avoid greedy approaches for this problem class — local optima do not compose into global optima when skipping is required.",
};
