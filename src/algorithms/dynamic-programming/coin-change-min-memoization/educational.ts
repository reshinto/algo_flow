import type { EducationalContent } from "@/types";

export const coinChangeMinMemoizationEducational: EducationalContent = {
  overview:
    "**Coin Change — Minimum (Memoization)** finds the fewest coins from a given set that sum exactly to a target amount, using a **top-down dynamic programming** approach.\n\n" +
    "Starting from the full amount, the algorithm recursively tries subtracting each coin and asks: what is the minimum number of coins needed for the reduced amount? " +
    "A cache stores each sub-amount's answer so repeated subproblems are resolved in `O(1)` rather than recomputed exponentially.",

  howItWorks:
    "1. Call `minCoins(amount)` recursively on the full target.\n" +
    "2. **Base case $0:** Return `0` immediately — zero coins are needed to make zero.\n" +
    "3. **Impossible branch:** If `remaining < 0`, return `-1` to signal this coin can't be used here.\n" +
    "4. **Cache hit:** If `memo` already has an answer for `remaining`, return it without recursing.\n" +
    "5. **Push call frame:** Record `$remaining` on the call stack for visualization.\n" +
    "6. **Try every coin:** For each coin, recursively solve `minCoins(remaining - coin)`. If valid, compute `candidate = subResult + 1`.\n" +
    "7. **Pick the minimum:** Track the smallest valid candidate across all coins.\n" +
    "8. **Cache and return:** Store the result in `memo[remaining]`, pop the call frame, return the result.\n\n" +
    "### Overlapping Subproblems\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    A["$11"] --> B["$10 (coin=1)"]\n' +
    '    A --> C["$6 (coin=5)"]\n' +
    '    A --> D["$1 (coin=10)"]\n' +
    '    B --> E["$9 (coin=1)"]\n' +
    '    B --> F["$5 (coin=5) ×cached"]\n' +
    '    C --> G["$5 (coin=1) ×cached"]\n' +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "    style G fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Sub-amounts like `$5` arise from multiple paths. Once computed and cached, subsequent calls return instantly.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(amount × coins)`**\n\n" +
    "Each sub-amount from `0` to `amount` is computed at most once. Each computation iterates over all `coins`, giving `amount × |coins|` total operations.\n\n" +
    "**Space Complexity: `O(amount)`**\n\n" +
    "The memo cache holds at most `amount + 1` entries. The recursive call stack can reach depth `O(amount)` in the worst case (e.g., only coin denomination 1).",

  bestAndWorstCase:
    "**Best case** occurs when the amount is exactly a single large coin — only one recursive path is explored before a base case is reached, but the cache still stores `O(amount)` entries along that path.\n\n" +
    "**Worst case** occurs when only denomination `1` is available — the recursion depth reaches `amount` and every sub-amount from `1` to `amount` must be computed. Both cases are bounded by `O(amount × |coins|)` total work.\n\n" +
    "If no combination of coins can reach the target, every sub-amount is explored and `-1` is returned, representing the worst-case traversal.",

  realWorldUses: [
    "**Cashier Systems:** Computing the minimum number of bills and coins returned as change.",
    "**Network Protocol Design:** Finding the minimum number of fixed-size data packets to transmit a payload of a given size.",
    "**Stamp Collecting:** Determining the fewest stamps from a set of denominations to reach an exact postage value.",
    "**Algorithm Education:** A canonical top-down DP example demonstrating overlapping subproblems and optimal substructure on integer partitioning problems.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Converts an exponential brute-force search into `O(amount × coins)` with a simple cache.",
      "Naturally handles impossible cases — returns `-1` when no combination of coins reaches the target.",
      "The recursive structure mirrors the mathematical recurrence directly, making it easy to reason about correctness.",
    ],
    limitations: [
      "Deep recursion can overflow the JavaScript call stack for very large amounts with small coin denominations.",
      "Cache lookup has constant overhead per call compared to tabulation's direct indexed array access.",
      "Requires careful handling of the `-1` sentinel to distinguish 'impossible' from 'zero coins needed'.",
    ],
  },

  whenToUseIt:
    "Choose **memoization** when the problem is naturally expressed as a top-down recursion and you want to compute only the subproblems reachable from the target amount. " +
    "Prefer **tabulation** when the call stack depth is a concern, all sub-amounts are needed anyway, or sequential bottom-up filling is easier to verify for correctness.",
};
