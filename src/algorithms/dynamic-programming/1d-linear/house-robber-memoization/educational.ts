import type { EducationalContent } from "@/types";

export const houseRobberMemoizationEducational: EducationalContent = {
  overview:
    "**House Robber (Memoization)** finds the maximum amount of money you can rob from a row of houses without robbing two adjacent houses, using a **top-down dynamic programming** approach.\n\n" +
    "At each house `i`, you face a binary decision: **skip** it (take the best from `i-1`) or **rob** it (take its value plus the best from `i-2`). Memoization caches each subproblem result so the recursive tree is resolved in `O(n)` rather than exponential time.",

  howItWorks:
    "1. Call `rob(n-1)` recursively on the last house index.\n" +
    "2. **Base case H(0):** Return `houses[0]` directly — only one house available.\n" +
    "3. **Base case H(1):** Return `max(houses[0], houses[1])` — pick the more valuable of the first two.\n" +
    "4. **Cache hit:** If `memo` already has `H(i)`, return it immediately without recursing.\n" +
    "5. **Push call frame:** Record `H(i)` on the call stack for visualization.\n" +
    "6. **Recurse:** Compute `skipCurrent = rob(i-1)` and `robCurrent = rob(i-2) + houses[i]`.\n" +
    "7. **Cache and return:** Store `max(skipCurrent, robCurrent)` in `memo[i]`, pop the call frame.\n\n" +
    "### Rob vs Skip Decision Tree\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    H4["H(4)"] --> H3["H(3) — skip house 4"]\n' +
    '    H4 --> H2A["H(2) + houses[4] — rob house 4"]\n' +
    '    H3 --> H2B["H(2) ×cached"]\n' +
    '    H3 --> H1A["H(1) + houses[3]"]\n' +
    "    style H2B fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Once `H(2)` is computed and cached, the second call returns instantly — each subproblem is solved exactly once.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each index from `0` to `n-1` is computed at most once. All subsequent lookups hit the cache in `O(1)`, giving a total of `n` unique subproblem computations.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The memo cache holds at most `n` entries. The recursive call stack reaches depth `O(n)` before results start propagating upward.",

  bestAndWorstCase:
    "**Best case** and **worst case** are both `O(n)` — every house index must be visited at least once to fill the cache from `H(0)` to `H(n-1)`.\n\n" +
    "In practice, the initial call traverses the full depth, but all branches that revisit a cached index return in `O(1)`. The total number of recursive calls is bounded by `2n`.",

  realWorldUses: [
    "**Resource Scheduling:** Selecting non-conflicting tasks (e.g., jobs with cooldown periods) to maximize total reward.",
    "**Stock Trading Cooldowns:** Maximizing profit when selling triggers a mandatory rest period before the next buy.",
    "**Network Packet Selection:** Choosing non-adjacent data segments to maximize throughput under adjacency constraints.",
    "**Algorithm Education:** A canonical introduction to top-down DP on linear sequences with adjacency constraints.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Converts an exponential brute-force recursion to `O(n)` with a simple cache.",
      "Computes only the subproblems reachable from the top — lazy evaluation skips unreachable states.",
      "The recursive structure mirrors the problem's mathematical recurrence directly.",
    ],
    limitations: [
      "Deep recursion can hit the JavaScript call stack limit for very large house arrays.",
      "Cache lookup adds constant overhead per call compared to tabulation's direct array access.",
      "Requires understanding of recursive call order to reason about which subproblems are solved first.",
    ],
  },

  whenToUseIt:
    "Choose **memoization** when the recurrence is naturally expressed as a top-down recursion and only a subset of subproblems may be needed. Prefer **tabulation** when all subproblems are always required, call stack depth is a concern, or sequential bottom-up filling is more intuitive for the problem structure.",
};
