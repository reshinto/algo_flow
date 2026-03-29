import type { EducationalContent } from "@/types";

export const climbingStairsTabulationEducational: EducationalContent = {
  overview:
    "**Climbing Stairs (Tabulation)** solves the classic staircase problem using a **bottom-up dynamic programming** approach. Given `n` stairs, you can take either 1 or 2 steps at a time — how many distinct ways can you reach the top?\n\nThe answer follows the Fibonacci pattern: `S(0) = 1`, `S(1) = 1`, `S(n) = S(n-1) + S(n-2)`. Tabulation builds the full DP table iteratively from the base cases upward, filling each cell exactly once.",

  howItWorks:
    "1. **Initialize** a DP table of size `n + 1` filled with zeros.\n" +
    "2. **Fill base cases:** `table[0] = 1` (one way to stand at ground), `table[1] = 1` (one way to take a single step).\n" +
    "3. **Iterate** from step `2` to `n`.\n" +
    "4. For each `i`, compute `table[i] = table[i-1] + table[i-2]` — you either arrived from step `i-1` (took 1 step) or from step `i-2` (took 2 steps).\n" +
    "5. Return `table[n]`.\n\n" +
    "### Table Build-Up for n=6\n\n" +
    "```\n" +
    "Step:   0  1  2  3  4  5  6\n" +
    "Ways:   1  1  2  3  5  8  13\n" +
    "```\n\n" +
    "Each cell is filled exactly once — no redundant recomputation.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single linear loop from `2` to `n` fills the table. Each iteration performs `O(1)` work — one addition and one table write.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The DP table stores `n + 1` values. This can be reduced to `O(1)` by keeping only the two most recent values, but the full table is maintained here for visualization clarity.",

  bestAndWorstCase:
    "**Best case, average case, and worst case** are all `O(n)` — every cell from `S(0)` to `S(n)` must be computed exactly once to fill the table.\n\n" +
    "There is no shortcut: even for small outputs, the algorithm always completes a full linear pass from the base cases to the target step.",

  realWorldUses: [
    "**Combinatorics:** Counting distinct paths through discrete decision trees where each move has a fixed set of choices.",
    "**Fibonacci in Nature:** Staircase ways follow the Fibonacci sequence, which appears in spiral patterns, flower petals, and phyllotaxis.",
    "**Network Routing:** Counting paths between nodes in layered networks where each hop can advance by 1 or 2 layers.",
    "**Game Design:** Calculating the number of distinct move sequences in turn-based games with fixed step sizes.",
    "**Algorithm Education:** A canonical introduction to DP table construction and the connection between recurrence relations and iterative solutions.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Eliminates redundant recomputation — each subproblem is solved exactly once.",
      "No recursive call overhead — avoids stack overflow for large `n`.",
      "Cache-friendly sequential memory access pattern.",
      "Generalizes easily to steps of size 1..k by extending the recurrence.",
    ],
    limitations: [
      "Allocates the full `O(n)` table even when only the final answer is needed — a two-variable rolling approach uses `O(1)` space.",
      "For very large `n`, JavaScript number overflow occurs — `BigInt` is required for exact results above `n ≈ 70`.",
    ],
  },

  whenToUseIt:
    "Choose **tabulation** when you need all intermediate values — for example, to visualize the table being built or to answer queries for multiple step counts in one pass. If you only need the final answer and memory is tight, reduce to two rolling variables. Prefer memoization when the problem has irregular or sparse access patterns where not all subproblems need to be solved.",
};
