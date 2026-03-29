import type { EducationalContent } from "@/types";

export const lisMemoizationEducational: EducationalContent = {
  overview:
    "**Longest Increasing Subsequence (Memoization)** finds the length of the longest strictly increasing subsequence within an array, using a **top-down dynamic programming** approach.\n\n" +
    "For each starting index `i`, the subproblem `L(i)` asks: what is the longest increasing subsequence that *starts* at position `i`? Memoization caches each answer so the recursive tree is resolved in `O(n²)` rather than exponential time.",

  howItWorks:
    "1. For every starting index `i` from `0` to `n-1`, call `lis(i)` recursively.\n" +
    "2. **Cache hit:** If `memo` already contains `L(i)`, return it immediately without recursing.\n" +
    "3. **Push call frame:** Record `L(i)` on the call stack for visualization.\n" +
    "4. **Recurse over extensions:** For every `j > i` where `seq[j] > seq[i]`, compute `1 + lis(j)` and track the maximum.\n" +
    "5. **Cache and return:** Store `max` in `memo[i]`, pop the call frame, and propagate the result upward.\n" +
    "6. **Global maximum:** The answer is the largest `L(i)` across all starting indices.\n\n" +
    "### Recursion Tree Example for `[10, 9, 2, 5, 3, 7]`\n\n" +
    "```\n" +
    "lis(0=10) → no valid extensions → L(0) = 1\n" +
    "lis(1=9)  → no valid extensions → L(1) = 1\n" +
    "lis(2=2)  → lis(3=5), lis(4=3), lis(5=7)\n" +
    "  lis(3=5) → lis(5=7) → L(5)=1 → L(3)=2\n" +
    "  lis(4=3) → lis(5=7) [cached] → L(4)=2\n" +
    "  L(2) = 1 + max(L(3), L(4), L(5)) = 1 + 2 = 3\n" +
    "```\n\n" +
    "Once `L(5)` is cached, the second call from `lis(4)` returns instantly.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "Each index `i` from `0` to `n-1` is computed at most once. Computing `L(i)` scans all `j > i` in the worst case, giving `O(n)` work per subproblem and `O(n²)` total.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The memo cache holds at most `n` entries. The recursive call stack reaches depth `O(n)` in the worst case (a fully increasing sequence).",

  bestAndWorstCase:
    "**Best case** is `O(n²)` — all `n` starting indices must be evaluated, and each scans its suffix to find valid extensions.\n\n" +
    "**Worst case** is also `O(n²)` — a fully increasing sequence causes the deepest recursion and the most comparisons, but memoization still bounds the total work to `n` unique subproblem computations, each doing at most `n` comparisons.",

  realWorldUses: [
    "**Version Control Diffing:** Finding the longest sequence of unchanged lines between two file versions (related to LCS).",
    "**Patience Sorting:** The pile count in patience sorting equals the LIS length — used in card game AI and merge strategies.",
    "**Bioinformatics:** Identifying the longest monotone chain of mutations or gene expression levels across time points.",
    "**Algorithm Education:** A canonical introduction to top-down DP on sequences with dependency on future indices.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Computes only the subproblems reachable from each starting index — lazy evaluation avoids unnecessary work.",
      "The recursive structure directly mirrors the mathematical recurrence `L(i) = 1 + max(L(j))` for `j > i`, `seq[j] > seq[i]`.",
      "Cache hits short-circuit repeated suffix traversals, cutting the effective work to `O(n²)` from exponential.",
    ],
    limitations: [
      "Deep recursion on a fully increasing sequence of length `n` can exhaust the JavaScript call stack.",
      "Each subproblem still requires an inner loop over its suffix, giving `O(n²)` even with memoization — `O(n log n)` is achievable via patience sorting.",
      "The top-down formulation starts from each index independently, making it less intuitive than the tabulation version for some learners.",
    ],
  },

  whenToUseIt:
    "Choose **memoization** when you want the recurrence to read exactly like the definition — `L(i) = 1 + max(L(j))` — and when only a subset of starting indices may be queried. Prefer **tabulation** when all subproblems are needed, call stack depth is a concern, or you want a straightforward bottom-up sweep. For performance-critical applications, consider the `O(n log n)` patience-sorting approach instead.",
};
