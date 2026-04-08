import type { EducationalContent } from "@/types";

export const cartesianProductEducational: EducationalContent = {
  overview:
    "**Cartesian Product** generates all ordered pairs `(a, b)` where `a` comes from set A and `b` comes from set B. " +
    "If set A has `n` elements and set B has `m` elements, the result contains exactly `n × m` pairs — " +
    "every element of A paired with every element of B.\n\n" +
    "The algorithm uses two nested loops: the outer loop iterates over set A and the inner loop iterates over set B. " +
    "For each combination, a pair `[a, b]` is recorded. The approach is straightforward because the problem " +
    "is inherently `O(n × m)` — you must enumerate all combinations.",

  howItWorks:
    "**Step-by-step enumeration** using nested iteration:\n\n" +
    "For each element `a` in set A (outer loop):\n" +
    "- For each element `b` in set B (inner loop):\n" +
    "  - Append the pair `[a, b]` to the result\n\n" +
    "### Example: A = [1, 2, 3], B = [4, 5]\n\n" +
    "```\n" +
    "a=1: (1,4), (1,5)\n" +
    "a=2: (2,4), (2,5)\n" +
    "a=3: (3,4), (3,5)\n" +
    "\n" +
    "Result: [[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]]  (6 pairs)\n" +
    "```\n\n" +
    "The result is always ordered: all pairs with `a=1` come before pairs with `a=2`, " +
    "reflecting the outer-loop ordering.\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A1["1"]:::input\n' +
    '  A2["2"]:::input\n' +
    '  B4["4"]:::input\n' +
    '  B5["5"]:::input\n' +
    '  R14["[1,4]"]:::result\n' +
    '  R15["[1,5]"]:::result\n' +
    '  R24["[2,4]"]:::result\n' +
    '  R25["[2,5]"]:::result\n' +
    "  A1 --> R14 & R15\n" +
    "  A2 --> R24 & R25\n" +
    "  B4 --> R14 & R24\n" +
    "  B5 --> R15 & R25\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each element of A pairs with every element of B, producing 2×2 = 4 ordered pairs. Arrows show which source elements contribute to each output pair.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`**\n\n" +
    "- Outer loop runs `n` times (one per element of set A).\n" +
    "- Inner loop runs `m` times per outer iteration.\n" +
    "- Total iterations: `n × m` — one per output pair. This is optimal since there are exactly `n × m` pairs to produce.\n\n" +
    "**Space Complexity: `O(n × m)`**\n\n" +
    "The result array holds all `n × m` pairs, each of size 2. No auxiliary space is needed beyond the output.",

  bestAndWorstCase:
    "**Best case** — one set has a single element: `|A| = 1` or `|B| = 1`. " +
    "The result has `m` or `n` pairs respectively. Still `O(n × m)` by definition, but minimal in absolute terms.\n\n" +
    "**Worst case** — both sets are large: `|A| = n`, `|B| = m`. " +
    "The output size is `n × m` pairs. There is no shortcut — every pair must be visited.\n\n" +
    "Unlike search or sorting algorithms, there is no early-exit opportunity: " +
    "the algorithm must always run to completion to produce the full cartesian product.",

  realWorldUses: [
    "**Database JOIN:** A SQL cross join between two tables computes the cartesian product of their rows.",
    "**Grid coordinate generation:** Generating all `(row, column)` pairs for a 2D grid of dimensions n × m.",
    "**Test case generation:** Creating all combinations of parameter values for exhaustive integration testing.",
    "**Machine learning feature crosses:** Combining categorical features (e.g., color × size) to create interaction terms.",
    "**Game development:** Enumerating all possible move combinations from two independent action sets.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal time complexity — O(n × m) matches the output size.",
      "Simple nested-loop structure — easy to implement and reason about.",
      "No auxiliary data structures required beyond the result array.",
    ],
    limitations: [
      "Output size grows multiplicatively — large sets produce enormous results quickly.",
      "Not suitable for streaming or lazy evaluation without generator-based implementation.",
      "All pairs must fit in memory simultaneously, which can be prohibitive for very large sets.",
    ],
  },

  whenToUseIt:
    "Use cartesian product when you need to enumerate every combination of two independent collections exhaustively. " +
    "It is the right tool for cross-join queries, combinatorial test generation, and coordinate grids. " +
    "Avoid it when the full output is too large to store — consider a lazy generator or streaming approach instead. " +
    "If you only need a subset of pairs (e.g., those satisfying a predicate), filter during iteration " +
    "rather than generating all pairs first.",
};
