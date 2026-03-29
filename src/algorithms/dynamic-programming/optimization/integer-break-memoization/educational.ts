import type { EducationalContent } from "@/types";

export const integerBreakMemoizationEducational: EducationalContent = {
  overview:
    "**Integer Break (Memoization)** finds the maximum product obtainable by splitting a positive integer `n` into at least two positive integers and multiplying them together, using a **top-down dynamic programming** approach.\n\n" +
    "For each integer `n`, every split `j + (n-j)` is evaluated: you either keep the remainder as-is (`j * (n-j)`) or break it further (`j * P(n-j)`). Memoization caches each subproblem so the recursive tree resolves in `O(n²)` rather than exponential time.",

  howItWorks:
    "1. Call `maxProduct(n)` recursively on the target integer.\n" +
    "2. **Base case P(1):** Return `1` directly — a single `1` contributes only a factor of one.\n" +
    "3. **Cache hit:** If `memo` already has `P(n)`, return it immediately without recursing.\n" +
    "4. **Push call frame:** Record `P(n)` on the call stack for visualization.\n" +
    "5. **Iterate splits:** For every `j` from `1` to `n-1`, compute `max(j*(n-j), j*maxProduct(n-j))`.\n" +
    "6. **Cache and return:** Store the best result in `memo[n]`, pop the call frame.\n\n" +
    "### Split Decision at Each Step\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    P4["P(4)"] --> S1["j=1: max(1×3, 1×P(3))"]\n' +
    '    P4 --> S2["j=2: max(2×2, 2×P(2))"]\n' +
    '    P4 --> S3["j=3: max(3×1, 3×P(1))"]\n' +
    '    S1 --> P3["P(3) ×cached after first call"]\n' +
    "    style P3 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Once `P(3)` is computed and cached, every subsequent split that reaches it returns in `O(1)`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "Each integer from `1` to `n` is computed at most once. Computing `P(k)` iterates `k-1` splits, giving a total of `1 + 2 + … + (n-1) = O(n²)` operations across all unique subproblems.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The memo cache holds at most `n` entries. The recursive call stack reaches depth `O(n)` in the worst case as calls descend from `P(n)` down to `P(1)`.",

  bestAndWorstCase:
    "**Best case** and **worst case** are both `O(n²)` — every integer from `2` to `n` must be visited at least once to fill the cache.\n\n" +
    "In practice the initial call traverses the full depth, but all branches that revisit a cached integer return in `O(1)`. The total number of split evaluations is bounded by `n*(n-1)/2`.",

  realWorldUses: [
    "**Resource Partitioning:** Dividing a resource (bandwidth, budget, time) into segments to maximize a multiplicative objective.",
    "**Combinatorial Optimization:** A building block for problems requiring optimal decomposition of integers into parts.",
    "**Cryptography Education:** Illustrates why large primes resist factored-product attacks — the optimal split often avoids small factors.",
    "**Algorithm Education:** A canonical example of top-down DP on integer decomposition with overlapping subproblems.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Converts exponential brute-force recursion to `O(n²)` with a simple cache.",
      "Computes only the subproblems reachable from the top — lazy evaluation skips unreachable states.",
      "The recursive structure mirrors the mathematical recurrence `P(n) = max_j max(j*(n-j), j*P(n-j))` directly.",
    ],
    limitations: [
      "Deep recursion can exhaust the JavaScript call stack for very large target numbers.",
      "The inner loop over all splits means each unique subproblem costs `O(n)` to solve, unlike `O(1)` per cell in simpler DP problems.",
      "Requires understanding of recursive call order to reason about which subproblems are resolved first.",
    ],
  },

  whenToUseIt:
    "Choose **memoization** when the recurrence is naturally expressed as top-down recursion and only a subset of subproblems may be needed. Prefer **tabulation** when all subproblems are always required, call stack depth is a concern, or sequential bottom-up filling is more intuitive.",
};
