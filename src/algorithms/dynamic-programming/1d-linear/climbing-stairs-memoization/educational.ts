import type { EducationalContent } from "@/types";

export const climbingStairsMemoizationEducational: EducationalContent = {
  overview:
    "**Climbing Stairs (Memoization)** counts the number of distinct ways to climb `n` stairs when you can take 1 or 2 steps at a time. It uses a **top-down dynamic programming** approach: start from `S(n)` and recurse downward, caching each result so no subproblem is solved more than once.\n\nThe recurrence is `S(n) = S(n-1) + S(n-2)` with base cases `S(0) = S(1) = 1`. Without memoization the naive recursion runs in `O(2^n)`; the cache reduces this to `O(n)`.",

  howItWorks:
    "1. Call `S(n)` recursively with an empty cache (`memo`).\n" +
    "2. **Base case:** If `n ≤ 1`, return `1` — there is exactly one way to be at step 0 or step 1.\n" +
    "3. **Cache hit:** If `memo` already contains `S(n)`, return it immediately without recursing.\n" +
    "4. **Recurse:** Push `S(n)` onto the call stack, then compute `S(n-1)` and `S(n-2)` recursively.\n" +
    "5. **Cache miss:** Sum the two sub-results, store the answer in `memo[n]`, pop the call stack, and return.\n\n" +
    "### Call Stack Visualization\n\n" +
    "For `S(4)`, the recursive calls form a tree before memoization kicks in:\n\n" +
    "```\n" +
    "S(4)\n" +
    "├── S(3)\n" +
    "│   ├── S(2)\n" +
    "│   │   ├── S(1) → 1  (base)\n" +
    "│   │   └── S(0) → 1  (base)\n" +
    "│   └── S(1) → 1  (cache hit)\n" +
    "└── S(2) → 2  (cache hit)\n" +
    "```\n\n" +
    "Once `S(2)` is cached, the second call to `S(2)` returns instantly instead of branching again.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each unique subproblem `S(0)` through `S(n)` is computed exactly once. Every subsequent call for the same index hits the cache in `O(1)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The memo cache holds at most `n + 1` entries. The recursion call stack reaches depth `O(n)` before results propagate back up.",

  bestAndWorstCase:
    "**Best case** and **worst case** are both `O(n)` — every unique subproblem from `S(0)` to `S(n)` must be visited at least once to fill the cache.\n\n" +
    "In practice, the first top-down traversal descends all the way to `S(0)`, but from that point onward all previously solved steps are answered in `O(1)` via cache lookup.",

  realWorldUses: [
    "**Staircase Problems:** The canonical introduction to top-down DP, illustrating how caching transforms exponential recursion into linear computation.",
    "**Tile / Paving Problems:** Counting ways to cover an `n`-unit strip with 1×1 and 1×2 tiles follows the same recurrence.",
    "**Fibonacci-Class Recurrences:** Any problem reducible to `f(n) = f(n-1) + f(n-2)` — coin change with denominations {1, 2}, hop sequences — uses this exact pattern.",
    "**Path Counting in Grids:** Extending this approach to 2-D grids (robot paths, unique paths) uses the same memoization strategy over a 2-D cache.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Reduces naive `O(2^n)` recursion to `O(n)` with a single cache map.",
      "Only computes the subproblems actually needed — lazy evaluation skips unreachable states.",
      "Directly mirrors the mathematical recurrence, making the code easy to derive and verify.",
      "Call stack visualization makes the top-down execution order intuitive for learners.",
    ],
    limitations: [
      "Deep recursion can exhaust the JavaScript call stack for large `n` (typically > 10 000).",
      "Slightly higher constant overhead than tabulation due to Map lookups and function call frames.",
      "The call stack depth of `O(n)` is an additional space cost that tabulation avoids.",
    ],
  },

  whenToUseIt:
    "Choose **memoization** when the recursive structure naturally mirrors the problem definition and only a subset of subproblems may be needed. Prefer **tabulation** when all subproblems are guaranteed to be solved, or when call stack depth is a concern. For the climbing-stairs problem specifically, tabulation is equally simple and avoids recursion overhead — but memoization is the better teaching vehicle for top-down DP.",
};
