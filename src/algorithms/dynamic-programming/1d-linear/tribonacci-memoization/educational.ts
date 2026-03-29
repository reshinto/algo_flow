import type { EducationalContent } from "@/types";

export const tribonacciMemoizationEducational: EducationalContent = {
  overview:
    "**Tribonacci (Memoization)** extends the Fibonacci pattern to three predecessors — `T(0) = 0`, `T(1) = 1`, `T(2) = 1`, `T(n) = T(n-1) + T(n-2) + T(n-3)` — and solves it using **top-down dynamic programming**.\n\nMemoization wraps the naive recursive solution with a cache. Each unique subproblem is solved once and stored; all future calls for the same index return the cached result instantly, reducing the otherwise exponential `O(3^n)` naive recursion to linear `O(n)`.",

  howItWorks:
    "1. Call `T(n)` recursively with an empty cache (`memo`).\n" +
    "2. **Base cases:** Return `0` for `n = 0`, and `1` for `n = 1` or `n = 2`.\n" +
    "3. **Cache hit:** If `memo` already contains `T(n)`, return it immediately — no further recursion.\n" +
    "4. **Recurse:** Push `T(n)` onto the call stack, then compute `T(n-1)`, `T(n-2)`, and `T(n-3)` recursively.\n" +
    "5. **Cache miss:** Sum the three results, store `memo[n] = result`, pop the call stack, and return.\n\n" +
    "### Why the Recursion Tree Collapses\n\n" +
    "Without memoization, `T(5)` fans into an exponentially wide tree:\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    T5["T(5)"] --> T4["T(4)"]\n' +
    '    T5 --> T3A["T(3) ×2"]\n' +
    '    T5 --> T2A["T(2) ×3"]\n' +
    '    T4 --> T3B["T(3) ×2"]\n' +
    '    T4 --> T2B["T(2) ×3"]\n' +
    '    T4 --> T1A["T(1) ×4"]\n' +
    "    style T3A fill:#7f1d1d,stroke:#ef4444\n" +
    "    style T3B fill:#7f1d1d,stroke:#ef4444\n" +
    "    style T2A fill:#78350f,stroke:#f59e0b\n" +
    "    style T2B fill:#78350f,stroke:#f59e0b\n" +
    "```\n\n" +
    "With memoization, each `T(k)` is computed **exactly once**. The first descent fills the cache from the base cases upward; all subsequent branches return immediately on a cache hit.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each unique subproblem `T(0)` through `T(n)` is computed exactly once and cached. Every subsequent call for that index hits the cache in `O(1)`. There are `n + 1` unique subproblems, so total work is linear.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The memo cache holds at most `n + 1` entries. Additionally, the recursive call stack reaches depth `O(n)` before the first base case is hit and results begin propagating back up.",

  bestAndWorstCase:
    "**Best case** and **worst case** are both `O(n)` — every unique subproblem from `T(0)` to `T(n)` must be visited at least once to populate the cache.\n\n" +
    "In practice the very first call for `T(n)` descends the full depth to `T(0)`, but subsequent calls for any already-cached index short-circuit instantly. The Tribonacci sequence grows roughly as `T(n) ≈ φ_3^n` where the **Tribonacci constant** `φ_3 ≈ 1.839` — noticeably faster than Fibonacci (`φ ≈ 1.618`), which makes the cache savings even more impactful as `n` grows.",

  realWorldUses: [
    "**Algorithm Education:** A natural progression after Fibonacci memoization — teaches how the top-down pattern scales when a recurrence references more predecessors.",
    "**Combinatorics:** T(n) counts the number of ways to climb `n` stairs taking 1, 2, or 3 steps at a time — the same problem shape appears in staircase, tiling, and partition problems.",
    "**Game Tree Search:** Caching evaluated positions in games where each state depends on up to three prior states avoids recomputing identical subtrees.",
    "**Compiler Optimization:** Memoizing parse-rule results (Packrat parsing) mirrors this pattern — each grammar position is resolved once regardless of how many rules reference it.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Converts naive `O(3^n)` three-branch recursion to `O(n)` with minimal structural change to the recurrence.",
      "Lazy evaluation — only computes subproblems that are actually needed on the current call path.",
      "The recursive structure maps directly onto the mathematical definition, making it easy to derive and verify.",
    ],
    limitations: [
      "Deep recursion reaches call stack depth `O(n)` — for large `n` this can exceed JavaScript's stack limit.",
      "Three-predecessor lookups mean each non-base call spawns three recursive branches before cache hits trim the tree, adding more overhead than Fibonacci memoization's two branches.",
      "For `n` beyond ~80, Tribonacci values overflow JavaScript's safe integer range — `BigInt` is required for exact results.",
    ],
  },

  whenToUseIt:
    "Choose **Tribonacci memoization** when the recursive problem structure is most natural and not all subproblems need to be solved (sparse access patterns). If call stack depth or sequential fill order is a concern, prefer **tabulation** instead — both have the same `O(n)` time complexity. Memoization is especially effective as a teaching tool for top-down DP because the code closely mirrors the mathematical recurrence.",
};
