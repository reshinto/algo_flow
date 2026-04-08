import type { EducationalContent } from "@/types";

export const minCostClimbingStairsTabulationEducational: EducationalContent = {
  overview:
    "**Min Cost Climbing Stairs (Tabulation)** finds the minimum cost to reach the top of a staircase using a **bottom-up dynamic programming** approach. Each step has an associated cost; you can climb one or two steps at a time. You may start from step 0 or step 1 at no charge.\n\nUnlike basic stair-climbing problems that count *ways*, this variant optimizes *cost* — making it a classic introduction to cost-minimization DP on linear sequences.",

  howItWorks:
    "1. **Initialize** a DP table of size `n + 1` (where `n = costs.length`), representing the minimum cost to *reach* each step.\n" +
    "2. **Fill base cases:** `dp[0] = 0`, `dp[1] = 0` — you can start at either step for free.\n" +
    "3. **Iterate** from index `2` to `n` (the top, one beyond the last step).\n" +
    "4. For each `i`, apply the recurrence:\n" +
    "   ```\n" +
    "   dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])\n" +
    "   ```\n" +
    "   — arrive from one step below (paying `cost[i-1]`) or two steps below (paying `cost[i-2]`).\n" +
    "5. Return `dp[n]` — the minimum cost to reach the top.\n\n" +
    "### Table Build-Up for costs = [10, 15, 20]\n\n" +
    "```\n" +
    "Index:  0   1   2   3 (top)\n" +
    "Cost:  10  15  20   —\n" +
    "dp:     0   0  10  15\n" +
    "```\n\n" +
    "Answer: `15` (start at step 1 → pay 15 → jump to top).\n\n" +
    "### DP Table for costs=[10,15,20]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  S0["dp[0]=0 free start"] --> S2["dp[2]=10 from s0+cost10"]\n' +
    '  S1["dp[1]=0 free start"] --> S2\n' +
    '  S1 --> S3["dp[3]=15 from s1+cost15"]\n' +
    "  S2 --> S3\n" +
    "  style S0 fill:#06b6d4,stroke:#0891b2\n" +
    "  style S1 fill:#06b6d4,stroke:#0891b2\n" +
    "  style S2 fill:#14532d,stroke:#22c55e\n" +
    "  style S3 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Cyan nodes are the free starting positions, green nodes are filled cost cells, and the amber node is the top — the minimum of arriving from one or two steps below.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single pass from index `2` to `n` fills the table. Each iteration performs `O(1)` work — one min comparison and two table lookups.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The DP table stores `n + 1` values. This can be reduced to `O(1)` by keeping only the two most recent values, but the full table is retained here for visualization.",

  bestAndWorstCase:
    "**All cases are `O(n)`** — the algorithm always fills every cell from `dp[2]` to `dp[n]` exactly once, regardless of cost values.\n\n" +
    "There is no early-exit condition: even if the optimal path is obvious, every subproblem must be solved to guarantee correctness.",

  realWorldUses: [
    "**Resource Allocation:** Minimizing cost or energy spent traversing sequential states — applicable to network routing and pipeline scheduling.",
    "**Game Design:** Computing minimum-penalty paths through level checkpoints where each segment has a penalty.",
    "**Finance:** Modeling minimum-cost execution paths through discrete decision sequences (e.g., transaction fees at each stage).",
    "**Algorithm Education:** A canonical bridge from counting DP (Climbing Stairs) to optimization DP, introducing the `min` recurrence pattern.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple recurrence with exactly two choices per step — easy to reason about and verify.",
      "Eliminates redundant recomputation that naive recursion would perform exponentially.",
      "Iterative bottom-up approach avoids call stack overhead, safe for large inputs.",
    ],
    limitations: [
      "Allocates a full `O(n)` table even though only the two previous values are ever needed.",
      "Only handles 1- or 2-step jumps — generalizing to `k` steps requires a different recurrence.",
      "Cost values must be non-negative for the greedy intuition to hold; negative costs require careful handling.",
    ],
  },

  whenToUseIt:
    "Choose **tabulation** when you need to visualize or inspect intermediate subproblem values. If only the final minimum cost matters and memory is tight, reduce to two rolling variables. Prefer this pattern over memoization when every subproblem from `0` to `n` is guaranteed to be needed — which is always true for this linear staircase structure.",
};
