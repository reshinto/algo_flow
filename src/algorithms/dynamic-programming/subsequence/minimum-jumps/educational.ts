import type { EducationalContent } from "@/types";

export const minimumJumpsEducational: EducationalContent = {
  overview:
    "**Minimum Jumps (Tabulation)** finds the fewest jumps needed to reach the last index of an array, where each element `jumps[i]` tells you the maximum number of steps you can leap forward from position `i`.\n\nTabulation builds the answer bottom-up: `dp[0] = 0` (you start here for free), and for every subsequent index `i`, the algorithm looks back at every prior position `j` that can reach `i` and records `dp[i] = min(dp[j] + 1)`. The result is the minimum jump count stored in `dp[n-1]`.",

  howItWorks:
    "1. **Initialize** a DP table of size `n` filled with `Infinity` (unreachable by default).\n" +
    "2. **Base case:** `dp[0] = 0` — zero jumps needed to stand at the start.\n" +
    "3. **Fill the table** from index `1` to `n-1`:\n" +
    "   - For each target index `i`, scan every source index `j < i`.\n" +
    "   - If `dp[j] != Infinity` and `j + jumps[j] >= i`, then position `j` can reach `i`.\n" +
    "   - Update `dp[i] = min(dp[i], dp[j] + 1)` — one more jump from `j`.\n" +
    "4. Return `dp[n-1]`. If it is still `Infinity`, the last index is unreachable (return `-1`).\n\n" +
    "### Table Build-Up for `[2, 3, 1, 1, 4]`\n\n" +
    "```\n" +
    "Index:   0  1  2  3  4\n" +
    "jumps:   2  3  1  1  4\n" +
    "dp:      0  1  1  2  2\n" +
    "```\n\n" +
    "- `dp[0] = 0` — start\n" +
    "- `dp[1] = 1` — jump from index 0 (reach: 0+2=2 ≥ 1)\n" +
    "- `dp[2] = 1` — jump from index 0 (reach: 0+2=2 ≥ 2)\n" +
    "- `dp[3] = 2` — jump from index 1 (reach: 1+3=4 ≥ 3), dp[1]+1=2\n" +
    "- `dp[4] = 2` — jump from index 1 (reach: 1+3=4 ≥ 4), dp[1]+1=2\n\n" +
    "The answer is `dp[4] = 2`: jump index 0→1→4 (or 0→2→4).\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  A["dp[0]=0\\njumps=2"]:::base\n' +
    '  B["dp[1]=1\\nfrom idx 0"]:::cached\n' +
    '  C["dp[2]=1\\nfrom idx 0"]:::cached\n' +
    '  D["dp[3]=2\\nfrom idx 1"]:::cached\n' +
    '  E["dp[4]=2\\nfrom idx 1 ✓"]:::current\n' +
    "  A --> B\n" +
    "  A --> C\n" +
    "  B --> D\n" +
    "  B --> E\n" +
    "  classDef base fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef cached fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Index 1 has `jumps[1] = 3`, covering indices 2, 3, and 4 in one leap — each inherits `dp[1] + 1 = 2`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "For each of the `n` target positions, the algorithm scans all prior positions — a nested double loop over `n` elements. In the worst case (e.g., all elements equal `n`), every pair `(j, i)` is evaluated.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "A single DP table of size `n` stores the minimum jump count to reach each index. No additional data structures scale with input size.",

  bestAndWorstCase:
    "**Best case: `O(n²)`** — the nested loop always runs in full regardless of input values. Even if the answer is found early (e.g., the first element covers the whole array), all `j < i` pairs are still checked.\n\n" +
    "**Worst case: `O(n²)`** — same asymptotic bound. A Greedy approach achieves `O(n)`, but tabulation makes all intermediate `dp[i]` values visible for learning purposes.\n\n" +
    "Arrays with large uniform jump values (e.g., `[n, n, n, ...]`) maximize inner-loop iterations because every prior index can reach every future index.",

  realWorldUses: [
    "**Network Hop Routing:** Model packets traversing a network where each router can forward to a limited range of downstream nodes — minimum jumps maps directly to minimum hops.",
    "**Video Game Level Design:** Calculate the minimum number of platform transitions a character must make to reach the exit, given variable jump distances at each platform.",
    "**Task Scheduling with Dependencies:** Determine the minimum number of processing stages when each task can hand off to a limited set of successor tasks.",
    "**Interview Staple:** Minimum Jumps II (greedy variant) and this DP variant are standard medium-to-hard problems at major tech company interviews.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Produces all intermediate `dp[i]` values, making the path-building logic fully transparent for visualization and debugging.",
      "Correctly handles unreachable indices (cells remain `Infinity`) without special-casing.",
      "Variable lookback window — unlike fixed-offset recurrences (Fibonacci, House Robber), each `dp[i]` may draw from any prior index, giving learners insight into non-uniform DP dependencies.",
    ],
    limitations: [
      "The `O(n²)` time cost is avoidable: a greedy single-pass algorithm solves the same problem in `O(n)` — use tabulation only when you need intermediate state for visualization or path reconstruction.",
      "The inner loop re-evaluates all `j < i` even when `jumps[j]` is small and cannot reach `i`, adding unnecessary iterations.",
      "Arrays where no index can reach the last position still run the full `O(n²)` loop before returning `-1`.",
    ],
  },

  whenToUseIt:
    "Use this **variable-lookback tabulation** pattern when the recurrence for `dp[i]` depends on an unbounded or data-driven set of prior cells — not just a fixed two-step lookback. It is ideal when you need the full DP table for visualization, path reconstruction, or downstream queries. If only the minimum jump count is required and performance matters, switch to the greedy O(n) approach: track the current reachable boundary and advance it greedily. Avoid this tabulation variant in production systems with large arrays where the `O(n²)` cost becomes a bottleneck.",
};
