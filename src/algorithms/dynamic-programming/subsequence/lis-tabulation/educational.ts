import type { EducationalContent } from "@/types";

export const lisTabulationEducational: EducationalContent = {
  overview:
    "**Longest Increasing Subsequence (Tabulation)** finds the length of the longest strictly increasing subsequence in an array using **bottom-up dynamic programming**.\n\n" +
    "A subsequence is a selection of elements that preserves relative order but does not require contiguous positions. For `[10, 9, 2, 5, 3, 7, 101, 18]`, the LIS is `[2, 5, 7, 101]` or `[2, 3, 7, 101]` — both of length **4**.\n\n" +
    "Tabulation solves this by building a DP table from index 0 upward, so every subproblem is ready before it is needed.",

  howItWorks:
    "1. **Initialize** a DP table `dp` of size `n`, where every entry starts at `1` — each element alone forms a subsequence of length 1.\n" +
    "2. **Outer loop** iterates `outerIndex` from `1` to `n - 1`.\n" +
    "3. **Inner scan** iterates `innerIndex` from `0` to `outerIndex - 1`.\n" +
    "4. If `seq[innerIndex] < seq[outerIndex]`, update: `dp[outerIndex] = max(dp[outerIndex], dp[innerIndex] + 1)`.\n" +
    "5. **Answer** = `max(dp[0..n-1])`. Note: the answer is **not** `dp[n-1]` — the longest subsequence may end anywhere.\n\n" +
    "### Table Build-Up for `[10, 9, 2, 5, 3, 7, 101, 18]`\n\n" +
    "```\n" +
    "Index:  0   1   2   3   4   5   6   7\n" +
    "Elem:  10   9   2   5   3   7  101  18\n" +
    "dp:     1   1   1   2   2   3    4   4\n" +
    "```\n\n" +
    "`dp[5] = 3` because `[2, 5, 7]` is a length-3 increasing subsequence ending at index 5.\n" +
    "`dp[6] = 4` because `[2, 5, 7, 101]` is the longest — and `max(dp) = 4`.\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["idx 2: val=2\\ndp=1"]:::base\n' +
    '  B["idx 3: val=5\\ndp=2\\n(extends 2)"]:::cached\n' +
    '  C["idx 5: val=7\\ndp=3\\n(extends 2,5)"]:::cached\n' +
    '  D["idx 6: val=101\\ndp=4\\n(extends 2,5,7)"]:::current\n' +
    "  A --> B --> C --> D\n" +
    "  classDef base fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef cached fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Each cell extends the longest subsequence ending at an earlier index where the value is strictly smaller.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "The nested loops produce `n*(n-1)/2` comparisons. For each outer index, every earlier index is inspected once.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "A single flat DP table of size `n` is used — no recursion stack, no auxiliary graph. An `O(n log n)` patience-sorting variant exists but sacrifices the visual clarity of the table.",

  bestAndWorstCase:
    "**Best case: `O(n²)`** — strictly decreasing input (e.g., `[5, 4, 3, 2, 1]`) means no update ever fires in the inner loop, but both loops still run to completion.\n\n" +
    "**Worst case: `O(n²)`** — strictly increasing input (e.g., `[1, 2, 3, 4, 5]`) triggers an update on every valid pair — `n*(n-1)/2` compute-cell operations in total.\n\n" +
    "Unlike sorting, there is no input ordering that reduces the work below `O(n²)` for this formulation.",

  realWorldUses: [
    "**Version Control:** Diff algorithms (longest common subsequence is closely related) compute minimal edit distances between file versions.",
    "**Bioinformatics:** Finding conserved gene subsequences across species by detecting the longest matching sequence of base pairs.",
    "**Stock Analysis:** Identifying the longest streak of strictly increasing closing prices in a time series.",
    "**Algorithm Education:** The canonical O(n²) DP problem for teaching recurrence design, table initialization, and the distinction between `dp[n-1]` and `max(dp)`.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Eliminates repeated subproblem work compared to exponential brute-force enumeration.",
      "Iterative — no recursion stack risk; safe for arbitrarily long sequences.",
      "The full DP table provides a clear audit trail showing why every cell has its value.",
    ],
    limitations: [
      "`O(n²)` time is prohibitive for sequences of length > 10,000 — the `O(n log n)` patience-sorting approach should be used in production.",
      "Returns only the **length** — reconstructing the actual subsequence requires storing back-pointers alongside the DP table.",
      "Handles only strict inequalities (`<`); counting non-decreasing subsequences requires a separate recurrence.",
    ],
  },

  whenToUseIt:
    "Use the `O(n²)` tabulation approach when the input is small (n ≤ a few thousand) and you need full visibility into the DP table — for debugging, visualization, or teaching. " +
    "For large sequences or performance-sensitive paths, switch to the `O(n log n)` patience-sorting variant. " +
    "If you need the actual subsequence and not just its length, extend this approach with a back-pointer array filled in the inner loop.",
};
