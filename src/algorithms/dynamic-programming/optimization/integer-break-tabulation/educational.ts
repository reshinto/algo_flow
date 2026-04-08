import type { EducationalContent } from "@/types";

export const integerBreakTabulationEducational: EducationalContent = {
  overview:
    "**Integer Break (Tabulation)** solves the problem: given a positive integer `n`, break it into at least two positive integers that sum to `n`, and maximize their product.\n\nTabulation builds the solution bottom-up, filling a DP table from `P(1)` to `P(n)`. Each entry `P(i)` stores the maximum product achievable by splitting `i` into two or more parts — the answer is assembled one integer at a time without any recursion.",

  howItWorks:
    "1. **Initialize:** create a table of size `n+1`, set `dp[1] = 1` as the base case.\n" +
    "2. **Fill the table** from `splitIndex = 2` to `n`:\n" +
    "   - For every `partIndex` from `1` to `splitIndex - 1`:\n" +
    "     - **Keep the split as-is:** compute `partIndex × (splitIndex - partIndex)` — both halves stay un-split.\n" +
    "     - **Recurse into the right half:** compute `partIndex × dp[splitIndex - partIndex]` — the right piece is further broken down optimally.\n" +
    "     - Update `dp[splitIndex] = max(dp[splitIndex], keepSplit, useDp)`.\n" +
    "3. Return `dp[n]` — the maximum product for integer `n`.\n\n" +
    "### Why 2s and 3s?\n\n" +
    "Any integer `≥ 5` should be broken further because `3 × (n-3) > n` and `2 × (n-2) > n`. " +
    "Splitting a `4` into `2+2` gives `4`, equal to leaving it whole — so `4` is neutral. " +
    "Splitting a `5` into `2+3` gives `6 > 5`, so always break it. " +
    "This means the optimal solution is always composed entirely of `2`s and `3`s, " +
    "with `3`s preferred because `3+3=6` gives product `9`, whereas `2+2+2=6` gives product `8`.\n\n" +
    "### Table Build-Up for `n = 10`\n\n" +
    "```\n" +
    "Index: 1  2  3  4  5  6  7  8   9  10\n" +
    "P:     1  1  2  4  6  9  12 18  27  36\n" +
    "```\n\n" +
    "- `P(2) = 1×1 = 1`\n" +
    "- `P(3) = max(1×2, 1×P(2)) = max(2, 1) = 2`\n" +
    "- `P(4) = max(2×2) = 4`  (split as 2+2)\n" +
    "- `P(6) = max(3×3) = 9`  (split as 3+3)\n" +
    "- `P(10) = max(3×P(7)) = 3×12 = 36`  (split as 3+7, then 7 → 3+4 → 3+2+2)\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  A["dp[2]=1"]:::base\n' +
    '  B["dp[3]=2\\n(1×2)"]:::cached\n' +
    '  C["dp[4]=4\\n(2×2)"]:::cached\n' +
    '  D["dp[7]=12\\n(3×dp[4])"]:::cached\n' +
    '  E["dp[10]=36\\n(3×dp[7])"]:::current\n' +
    "  A --> B --> C --> D --> E\n" +
    "  classDef base fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef cached fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Each cell reuses an already-optimal sub-split, cascading 3s and 2s all the way to `dp[10] = 36`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "Two nested loops: the outer loop runs `n-1` times (from 2 to n), and the inner loop runs up to `i-1` times for each `i`. " +
    "Total comparisons sum to `1 + 2 + … + (n-1) = n(n-1)/2 = O(n²)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "A single DP table of size `n+1` is maintained. No recursion stack is needed — the iterative approach avoids call-frame overhead entirely.",

  bestAndWorstCase:
    "**Best, average, and worst case** are all `O(n²)` — every cell from 2 to n must be filled, and each cell requires evaluating all possible split points. " +
    "There is no early-exit condition that skips cells.\n\n" +
    "The value of `n` determines runtime but not algorithmic behavior: `n = 2` needs one comparison; `n = 100` needs ~4950. " +
    "Input values do not affect the number of steps.",

  realWorldUses: [
    "**Resource Partitioning:** Divide a pool of resources into groups to maximize a multiplicative objective (e.g., network bandwidth allocation).",
    "**Combinatorial Optimization:** Problems where splitting a quantity into independent sub-quantities yields compound gains.",
    "**Game Theory:** Situations where breaking a score or position into independent parts maximizes a final payoff.",
    "**Interview Benchmark:** A classic problem testing understanding of DP recurrence design and the interplay between `dp[i-j]` and plain `i-j`.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Eliminates redundant recomputation — each sub-problem is solved exactly once.",
      "Iterative design avoids recursion overhead and stack overflow for large `n`.",
      "The filled table makes the optimal sub-structure transparent: each `P(i)` builds on previously computed optimal splits.",
      "The mathematical insight (only 2s and 3s matter) can be used to derive an O(1) closed-form for validation.",
    ],
    limitations: [
      "O(n²) time is slower than the O(log n) mathematical formula using powers of 3, though it generalizes to variants where the closed form breaks down.",
      "Only handles positive integers ≥ 2 — `n = 1` has no valid split.",
      "The problem requires breaking into at least two parts, so `dp[n] ≠ n` in all cases even though leaving `n` whole is never considered.",
    ],
  },

  whenToUseIt:
    "Use Integer Break tabulation whenever you need to **partition a value into parts to maximize a product** and the problem does not admit a trivial closed-form solution. " +
    "Choose tabulation over memoization when you want all intermediate `P(i)` values available for visualization or downstream computation. " +
    "If only the final answer matters and `n` is large, the O(log n) mathematical approach (greedily take 3s, handle remainders) is faster — " +
    "but tabulation scales well for visualization and for variants where the recurrence changes (e.g., restricted part sizes or weighted products).",
};
