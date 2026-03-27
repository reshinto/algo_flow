import type { EducationalContent } from "@/types";

export const fibonacciMemoizationEducational: EducationalContent = {
  overview:
    "**Fibonacci (Memoization)** solves the classic Fibonacci sequence using a **top-down dynamic programming** approach. Each number is the sum of the two preceding ones: `F(0) = 0`, `F(1) = 1`, `F(n) = F(n-1) + F(n-2)`.\n\nMemoization wraps the naive recursive solution with a cache — if a subproblem has already been solved, its cached answer is returned immediately instead of recomputing it, reducing exponential `O(2^n)` time to linear `O(n)`.",

  howItWorks:
    "1. Call `F(n)` recursively with an empty cache (`memo`).\n" +
    "2. **Base case:** If `n ≤ 1`, return `n` directly.\n" +
    "3. **Cache hit:** If `memo` already contains `F(n)`, return it immediately.\n" +
    "4. **Recurse:** Compute `F(n-1) + F(n-2)` recursively.\n" +
    "5. **Cache miss:** Store the result in `memo[n]`, then return it.\n\n" +
    "### Why It's Faster\n\n" +
    "Without memoization, `F(5)` causes `F(3)` to be computed twice and `F(2)` three times:\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    F5["F(5)"] --> F4["F(4)"]\n' +
    '    F5 --> F3A["F(3) ×2"]\n' +
    '    F4 --> F3B["F(3) ×2"]\n' +
    '    F4 --> F2A["F(2) ×3"]\n' +
    "    style F3A fill:#7f1d1d,stroke:#ef4444\n" +
    "    style F3B fill:#7f1d1d,stroke:#ef4444\n" +
    "    style F2A fill:#78350f,stroke:#f59e0b\n" +
    "```\n\n" +
    "With memoization, each `F(k)` is computed **once**, then cached — subsequent calls are instant.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each unique subproblem `F(0)` through `F(n)` is computed exactly once. Subsequent calls for the same index hit the cache in `O(1)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The memo cache holds at most `n + 1` entries. The call stack depth reaches `O(n)` before results start propagating back up.",

  bestAndWorstCase:
    "**Best case** and **worst case** are both `O(n)` — every unique subproblem must be visited at least once to fill the cache from `F(0)` to `F(n)`.\n\n" +
    "In practice, the first call for `F(n)` traverses the full depth, but all subsequent calls for previously solved indices return immediately.",

  realWorldUses: [
    "**Algorithm Education:** The canonical introduction to top-down DP and recursive caching.",
    "**Parser Caching:** Packrat parsers use memoization to cache grammar rule results, enabling linear-time parsing of ambiguous grammars.",
    "**Game Tree Search:** Memoizing evaluated board positions avoids re-evaluating the same game state in minimax.",
    "**Route Optimization:** Caching subpath costs in recursive shortest-path algorithms reduces redundant recomputation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Reduces naive `O(2^n)` recursion to `O(n)` with minimal code change.",
      "Only computes the subproblems that are actually needed (lazy evaluation).",
      "Intuitive to derive directly from the mathematical recurrence.",
    ],
    limitations: [
      "Deep recursion can hit the JavaScript call stack limit for large `n`.",
      "Cache lookup adds constant overhead per call versus tabulation's direct array indexing.",
      "For very large `n`, native integers overflow — `BigInt` is required.",
    ],
  },

  whenToUseIt:
    "Choose **memoization** when the problem has irregular or sparse access patterns where not all subproblems need to be solved, or when the recursive structure maps naturally to the problem definition. Prefer **tabulation** for predictable sequential fills or when call stack depth is a concern.",
};
