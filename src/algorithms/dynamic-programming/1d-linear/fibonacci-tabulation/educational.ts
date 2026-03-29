import type { EducationalContent } from "@/types";

export const fibonacciTabulationEducational: EducationalContent = {
  overview:
    "**Fibonacci (Tabulation)** solves the classic Fibonacci sequence using a **bottom-up dynamic programming** approach. Each number in the sequence is the sum of the two preceding ones: `F(0) = 0`, `F(1) = 1`, `F(n) = F(n-1) + F(n-2)`.\n\nTabulation builds the solution iteratively from the smallest subproblems upward, storing every computed value in a table to avoid the exponential cost of naive recursion.",

  howItWorks:
    "1. **Initialize** a DP table of size `n + 1` filled with zeros.\n" +
    "2. **Fill base cases:** `table[0] = 0`, `table[1] = 1`.\n" +
    "3. **Iterate** from index `2` to `n`.\n" +
    "4. For each `i`, compute `table[i] = table[i-1] + table[i-2]` — both values are already in the table.\n" +
    "5. Return `table[n]`.\n\n" +
    "### Table Build-Up for F(5)\n\n" +
    "```\n" +
    "Index:  0  1  2  3  4  5\n" +
    "Value:  0  1  1  2  3  5\n" +
    "```\n\n" +
    "Each cell is filled exactly once — no redundant recomputation.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single linear loop from `2` to `n` fills the table. Each iteration performs `O(1)` work.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The DP table stores `n + 1` values. This can be reduced to `O(1)` by keeping only the two most recent values, but the full table is maintained here for visualization clarity.",

  bestAndWorstCase:
    "**Best case, average case, and worst case** are all `O(n)` — every call from `F(0)` to `F(n)` must be computed exactly once to fill the table.\n\n" +
    "There is no shortcut: even if `F(n)` is small, the algorithm still fills the entire table from the ground up.",

  realWorldUses: [
    "**Algorithm Education:** The canonical introduction to bottom-up DP and avoiding subproblem recomputation.",
    "**Financial Modeling:** Fibonacci retracement levels are widely used in technical chart analysis for stocks and crypto.",
    "**Biology:** The Fibonacci ratio appears in spiral patterns, sunflower seeds, nautilus shells, and phyllotaxis.",
    "**Data Structures:** Fibonacci heaps use Fibonacci numbers to bound tree degree during decrease-key operations.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Eliminates the `O(2^n)` exponential cost of naive recursion with a single linear pass.",
      "No recursive call overhead — avoids stack overflow for large `n`.",
      "Values are filled in a predictable, cache-friendly sequential order.",
    ],
    limitations: [
      "Allocates the full `O(n)` table even when only the final answer is needed.",
      "For very large `n` (e.g., `F(100+)`), native JavaScript integers overflow — `BigInt` is required.",
    ],
  },

  whenToUseIt:
    "Choose **tabulation** when you need all intermediate values (e.g., for visualization or when the full table is useful downstream). If you only need the final answer and memory is constrained, reduce to two rolling variables. Prefer memoization when the problem has sparse or irregular access patterns where not all subproblems need to be solved.",
};
