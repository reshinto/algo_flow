import type { EducationalContent } from "@/types";

export const minCostClimbingStairsMemoizationEducational: EducationalContent = {
  overview:
    "**Min Cost Climbing Stairs (Memoization)** finds the minimum total cost to reach the top of a staircase using a **top-down dynamic programming** approach. Each step `i` has an associated cost `cost[i]`. You may start from step 0 or step 1, and from any step you can climb one or two steps.\n\nThe recurrence is: `C(i) = min(C(i-1) + cost[i-1], C(i-2) + cost[i-2])`, with base cases `C(0) = 0` and `C(1) = 0`. Memoization caches each `C(i)` after it is first computed, eliminating redundant recursive calls.",

  howItWorks:
    "1. Call `computeMemo(n)` where `n` is the number of steps (one past the last index).\n" +
    "2. **Base case:** If `step ≤ 1`, return `0` — you are already at or before the start, so no cost is paid yet.\n" +
    "3. **Cache hit:** If `memo` already contains `C(step)`, return it immediately without recursing.\n" +
    "4. **Push call:** Record `C(step)` on the call stack to visualize the active recursion depth.\n" +
    "5. **Recurse:** Compute `C(step-1) + cost[step-1]` and `C(step-2) + cost[step-2]` recursively.\n" +
    "6. **Store result:** Take the minimum of the two options, cache it in `memo`, then pop the call stack.\n\n" +
    "### Why Memoization Helps\n\n" +
    "Without caching, `C(n)` expands into an exponential call tree — `C(4)` calls `C(3)` and `C(2)`, each of which calls `C(2)` and `C(1)`, etc. With memoization every unique `C(k)` is solved **once** and reused:\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    C5["C(5)"] --> C4["C(4)"]\n' +
    '    C5 --> C3A["C(3) cached"]\n' +
    '    C4 --> C3B["C(3)"]\n' +
    '    C4 --> C2A["C(2) cached"]\n' +
    '    C3B --> C2B["C(2)"]\n' +
    '    C3B --> C1A["C(1) cached"]\n' +
    "    style C3A fill:#14532d,stroke:#22c55e\n" +
    "    style C2A fill:#14532d,stroke:#22c55e\n" +
    "    style C1A fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Green nodes are cache hits — they return in `O(1)` without further recursion.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each unique subproblem `C(0)` through `C(n)` is computed exactly once. All subsequent calls for the same index return the cached value in `O(1)`, giving a total of `n + 1` unique computations.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The memo cache holds at most `n + 1` entries. The recursive call stack reaches a maximum depth of `n` before results propagate back up, also contributing `O(n)` space.",

  bestAndWorstCase:
    "**Best case** and **worst case** are both `O(n)`. Every subproblem `C(0)` through `C(n)` must be visited at least once on the first full traversal to populate the cache — there is no shortcut that avoids computing all `n + 1` values.\n\n" +
    "After the initial traversal, repeated queries for any already-solved index cost `O(1)` due to the memo cache.",

  realWorldUses: [
    "**Route cost optimization:** Finding the cheapest path through a sequence of toll stations or energy costs, where each segment has a fixed price.",
    "**Resource scheduling:** Minimizing total penalty costs when tasks can be skipped by jumping over one or two positions in a queue.",
    "**Game level design:** Computing the minimum resource spend to traverse a level where each tile carries a movement cost.",
    "**Financial planning:** Modelling minimum-cost strategies over time periods where actions can span one or two intervals.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Derives directly from the recursive problem definition — easy to read alongside the recurrence relation.",
      "Only computes subproblems that are actually reached (lazy evaluation), which can save work for sparse access patterns.",
      "Cache hits are `O(1)`, making repeated queries after the initial traversal essentially free.",
    ],
    limitations: [
      "Recursive call stack depth grows to `O(n)` — large inputs can hit JavaScript's stack limit.",
      "Each recursive call carries function-call overhead that tabulation's iterative loop avoids.",
      "The memo `Map` has slightly higher constant overhead than the plain array used by tabulation.",
    ],
  },

  whenToUseIt:
    "Choose **memoization** when the recursive structure maps naturally to the problem and you want the implementation to closely mirror the mathematical recurrence. It is especially useful when only a subset of subproblems needs to be solved (sparse DP). Prefer **tabulation** when all subproblems must be solved, call stack depth is a concern, or raw iteration speed matters more than code clarity.",
};
