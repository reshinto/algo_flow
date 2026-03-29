import type { EducationalContent } from "@/types";

export const coinChangeMinTabulationEducational: EducationalContent = {
  overview:
    "**Coin Change — Minimum (Tabulation)** finds the fewest coins from a given set needed to reach a target amount. It is a classic **unbounded knapsack** problem: each coin denomination can be used any number of times.\n\nTabulation builds the solution bottom-up — starting from amount 0 and filling each entry `dp[i]` with the minimum coins required for amount `i` — before the target is ever reached.",

  howItWorks:
    "1. **Initialize** a DP table of size `amount + 1` filled with `Infinity` (impossible by default).\n" +
    "2. **Base case:** `dp[0] = 0` — zero coins needed to make amount 0.\n" +
    "3. **Iterate** from amount `1` to `amount`.\n" +
    "4. For each amount `i`, try every coin `c` where `c ≤ i`.\n" +
    "5. If `dp[i - c]` is not `Infinity`, update: `dp[i] = min(dp[i], dp[i - c] + 1)`.\n" +
    "6. If `dp[amount]` is still `Infinity`, return `-1` (impossible); otherwise return `dp[amount]`.\n\n" +
    "### Table Build-Up for amount=11, coins=[1, 5, 10]\n\n" +
    "```\n" +
    "Amount: 0  1  2  3  4  5  6  7  8  9  10  11\n" +
    "dp:     0  1  2  3  4  1  2  3  4  5   1   2\n" +
    "```\n\n" +
    "Each cell is computed from previously computed cells — no redundant recomputation.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(amount × |coins|)`**\n\n" +
    "The outer loop runs `amount` times; the inner loop runs once per coin denomination. Each combination performs `O(1)` work.\n\n" +
    "**Space Complexity: `O(amount)`**\n\n" +
    "Only a single DP table of size `amount + 1` is required. No additional auxiliary structures are needed.",

  bestAndWorstCase:
    "**Best case:** `O(amount × |coins|)` — the algorithm always fills every cell up to the target, regardless of the coin set or the final answer.\n\n" +
    "**Worst case:** `O(amount × |coins|)` — same as best case. There is no early exit, because every previous cell may be needed by a later one.\n\n" +
    "In practice, smaller coin sets (fewer denominations) and amounts that are exactly reachable by large coins run fastest in wall-clock time, but the asymptotic bound does not change.",

  realWorldUses: [
    "**Vending machines and cash registers:** Finding the fewest coins or bills to return as change.",
    "**Currency exchange:** Minimizing denomination count when converting between currencies.",
    "**Resource allocation:** Any problem where discrete units of fixed sizes must combine to meet a target with minimal unit count.",
    "**Compiler optimization:** Register allocation and instruction selection problems share the same unbounded knapsack structure.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the globally optimal (minimum) answer — greedy coin-change fails on non-canonical coin sets like [1, 3, 4].",
      "Iterative bottom-up approach avoids recursion overhead and stack overflow risks.",
      "Each subproblem is solved exactly once and reused, eliminating exponential redundancy.",
    ],
    limitations: [
      "Requires `O(amount)` space — impractical for astronomically large amounts.",
      "Does not reconstruct which coins were used, only the count — backtracking logic must be added separately.",
      "If `amount` is very large and coin denominations are small, the table becomes correspondingly large.",
    ],
  },

  whenToUseIt:
    "Use **coin change tabulation** when you need the minimum number of coins (or items of fixed sizes) to reach an exact target amount, especially when coin denominations are non-canonical (e.g., [1, 3, 4]) where greedy fails. Prefer tabulation over memoization when all subproblems from 0 to `amount` must be solved — tabulation avoids call stack overhead and is more cache-friendly. If you only need feasibility (not minimum count), a boolean DP variant is more efficient.",
};
