import type { EducationalContent } from "@/types";

export const tribonacciTabulationEducational: EducationalContent = {
  overview:
    "**Tribonacci (Tabulation)** extends the classic Fibonacci sequence by summing the **three** preceding values instead of two: `T(0) = 0`, `T(1) = 1`, `T(2) = 1`, `T(n) = T(n-1) + T(n-2) + T(n-3)`.\n\nTabulation fills a DP table iteratively from the base cases upward, making every subproblem available the moment it is needed — no recursion, no redundant recomputation.",

  howItWorks:
    "1. **Initialize** a DP table of size `n + 1` filled with zeros.\n" +
    "2. **Fill base cases:** `table[0] = 0`, `table[1] = 1`, `table[2] = 1`.\n" +
    "3. **Iterate** from index `3` to `n`.\n" +
    "4. For each `i`, compute `table[i] = table[i-1] + table[i-2] + table[i-3]` — all three lookups are already filled.\n" +
    "5. Return `table[n]`.\n\n" +
    "### Table Build-Up for T(7)\n\n" +
    "```\n" +
    "Index:  0  1  2  3  4   5   6   7\n" +
    "Value:  0  1  1  2  4   7  13  24\n" +
    "```\n\n" +
    "Each cell is filled exactly once. The three-predecessor read pattern means slightly more work per step than Fibonacci, but the overall complexity remains linear.\n\n" +
    "### DP Table Fill for T(6)\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  T0["T(0)=0"] --> T3["T(3)=2"]\n' +
    '  T1["T(1)=1"] --> T3\n' +
    '  T2["T(2)=1"] --> T3\n' +
    '  T1 --> T4["T(4)=4"]\n' +
    "  T2 --> T4\n" +
    "  T3 --> T4\n" +
    '  T2 --> T5["T(5)=7"]\n' +
    "  T3 --> T5\n" +
    "  T4 --> T5\n" +
    '  T3 --> T6["T(6)=13"]\n' +
    "  T4 --> T6\n" +
    "  T5 --> T6\n" +
    "  style T0 fill:#06b6d4,stroke:#0891b2\n" +
    "  style T1 fill:#06b6d4,stroke:#0891b2\n" +
    "  style T2 fill:#06b6d4,stroke:#0891b2\n" +
    "  style T3 fill:#14532d,stroke:#22c55e\n" +
    "  style T4 fill:#14532d,stroke:#22c55e\n" +
    "  style T5 fill:#14532d,stroke:#22c55e\n" +
    "  style T6 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Unlike Fibonacci's two predecessors, each amber or green node draws three incoming arrows — one from each of `T(i-1)`, `T(i-2)`, and `T(i-3)`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single linear pass from index `3` to `n` fills the table. Each iteration performs three cache reads and one addition — all `O(1)` work.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The DP table stores `n + 1` values. As with Fibonacci tabulation, this can be reduced to `O(1)` by keeping only the three most recent values, but the full table is maintained here for visualization clarity.",

  bestAndWorstCase:
    "**Best case, average case, and worst case** are all `O(n)` — every index from `T(0)` to `T(n)` must be filled exactly once.\n\n" +
    "Unlike Fibonacci, the Tribonacci sequence grows roughly as `T(n) ≈ φ_3^n` where the **Tribonacci constant** `φ_3 ≈ 1.839` is the real root of `x³ - x² - x - 1 = 0`. This growth rate is faster than Fibonacci (`φ ≈ 1.618`) but slower than powers of 2.",

  realWorldUses: [
    "**Algorithm Education:** A natural next step after Fibonacci for teaching DP generalization — the same tabulation pattern scales to any k-step recurrence.",
    "**Combinatorics:** T(n) counts the number of ways to tile a 1×n board using tiles of length 1, 2, or 3.",
    "**Number Theory:** The Tribonacci constant appears in the study of Pisano periods and modular arithmetic on recurrence sequences.",
    "**Game Theory:** Tribonacci-based scoring systems appear in certain combinatorial games and puzzle design.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Eliminates exponential naive recursion with a single linear pass.",
      "No recursive call overhead — stack-safe for large `n`.",
      "Generalizes directly: replace 3 predecessors with k predecessors for any k-step recurrence.",
    ],
    limitations: [
      "Allocates the full `O(n)` table even when only the final value is needed — use three rolling variables if memory matters.",
      "For large `n` (beyond ~80), Tribonacci values exceed JavaScript's safe integer range — `BigInt` is required for exact arithmetic.",
      "Slightly more cache reads per iteration than Fibonacci (3 vs 2), though asymptotic complexity is identical.",
    ],
  },

  whenToUseIt:
    "Choose **Tribonacci tabulation** when you need all intermediate values for visualization or downstream use. If only the final answer is required, reduce to three rolling variables for `O(1)` space. Tribonacci is also the right mental model whenever a recurrence references a fixed number of predecessors — recognize the pattern, apply the same table-filling strategy.",
};
