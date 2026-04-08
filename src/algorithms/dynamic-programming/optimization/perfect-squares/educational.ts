import type { EducationalContent } from "@/types";

export const perfectSquaresEducational: EducationalContent = {
  overview:
    "**Perfect Squares (Tabulation)** finds the minimum number of perfect square numbers (1, 4, 9, 16, …) that sum to a given integer `n`.\n\n" +
    "A perfect square is any integer that is the square of another integer: 1 = 1², 4 = 2², 9 = 3², 16 = 4², and so on. For example, `12 = 4 + 4 + 4` uses three perfect squares, so the answer for `n = 12` is `3`.\n\n" +
    "This is a **bottom-up dynamic programming** solution that fills a table of size `n + 1`, where `dp[i]` holds the minimum count for each value from `0` to `n`.",

  howItWorks:
    "1. **Initialize** a DP table of size `n + 1` filled with `Infinity` (unreachable sentinel).\n" +
    "2. **Base case:** Set `dp[0] = 0` — zero squares are needed to represent zero.\n" +
    "3. **Iterate** `i` from `1` to `n`.\n" +
    "4. For each `i`, iterate over every integer `j` where `j² ≤ i`:\n" +
    "   - Look up `dp[i - j²]` (already computed — this is the cached sub-result).\n" +
    "   - Update `dp[i] = min(dp[i], dp[i - j²] + 1)`.\n" +
    "5. Return `dp[n]`.\n\n" +
    "### Table Build-Up for n = 12\n\n" +
    "```\n" +
    "Index:  0  1  2  3  4  5  6  7  8  9  10  11  12\n" +
    "S(i):   0  1  2  3  1  2  3  4  2   1   2   3   3\n" +
    "```\n\n" +
    "- `S(4) = 1` because `4 = 2²`\n" +
    "- `S(9) = 1` because `9 = 3²`\n" +
    "- `S(12) = 3` because `12 = 4 + 4 + 4`\n\n" +
    "Each cell is filled exactly once — all previously computed values are reused directly.\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  A["dp[0]=0"]:::base\n' +
    '  B["dp[4]=1\\n(2²)"]:::cached\n' +
    '  C["dp[8]=2\\n(4+4)"]:::cached\n' +
    '  D["dp[9]=1\\n(3²)"]:::cached\n' +
    '  E["dp[12]=3\\n(4+4+4)"]:::current\n' +
    "  A --> B --> C --> E\n" +
    "  A --> D\n" +
    "  classDef base fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef cached fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "`dp[12]` checks all squares ≤ 12 (1, 4, 9) and finds `dp[12-4]+1 = dp[8]+1 = 3` as the minimum.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n · √n)`**\n\n" +
    "The outer loop runs `n` times. For each `i`, the inner loop runs at most `√i` times (the number of perfect squares ≤ `i`). In the worst case, the total work is `O(n · √n)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "A single DP table of size `n + 1` is allocated. Unlike the coin-change problem, no additional cache structure is needed — subproblem values are read directly from prior table entries.",

  bestAndWorstCase:
    "**Best case:** `O(n · √n)` — even when `n` is itself a perfect square and `dp[n] = 1`, all `n` cells must still be filled to build the table bottom-up.\n\n" +
    "**Worst case:** `O(n · √n)` — achieved when `n` requires many perfect square combinations to evaluate, such as numbers like `7` (which needs `4 + 1 + 1 + 1`) or large primes.\n\n" +
    "**Lagrange's four-square theorem** guarantees the answer is always between `1` and `4`. No positive integer requires more than four perfect squares. This means `dp[i] ∈ {1, 2, 3, 4}` for all `i ≥ 1`.",

  realWorldUses: [
    "**Number Theory:** Directly implements Legendre's three-square theorem and Lagrange's four-square theorem verification for arbitrary integers.",
    "**Coin Change Analog:** The same recurrence pattern `dp[i] = min(dp[i - coin] + 1)` appears in vending machine dispensing, currency exchange systems, and resource allocation problems.",
    "**Competitive Programming:** A classic DP problem on LeetCode (problem 279) and Codeforces, used to teach the tabulation pattern for minimization over sets of reusable values.",
    "**Compiler Optimization:** Register allocation and instruction scheduling use analogous minimum-cover DP formulations over sets of valid moves.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guaranteed optimal solution — fills every subproblem exactly once with no redundant recomputation.",
      "No recursive call overhead — avoids stack overflow for large inputs.",
      "Predictable `O(n · √n)` runtime with sequential, cache-friendly memory access.",
      "Directly related to the coin-change pattern — mastering this problem unlocks a broad class of minimization DP problems.",
    ],
    limitations: [
      "Must compute all `n` subproblems even when only the final answer is needed — no early exit.",
      "For very large `n` (millions), memory consumption grows linearly and runtime can become expensive.",
      "The inner loop iterates over all perfect squares ≤ `i`, which requires computing integer square roots or iterating until overflow — easy to implement incorrectly.",
    ],
  },

  whenToUseIt:
    "Use **Perfect Squares tabulation** when you need to find the minimum number of elements from a fixed set of values (here: all perfect squares) that sum to a target — a pattern identical to the unbounded coin change problem.\n\n" +
    "Prefer tabulation over memoization when all subproblems from `0` to `n` will be needed (as they are here). If only a sparse subset of subproblems is reachable, memoization avoids computing unnecessary states.\n\n" +
    "Do not use this approach when `n` is extremely large (> 10⁷) without memory optimization — in that case, mathematical solutions exploiting Lagrange's theorem may be more efficient.",
};
