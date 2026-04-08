import type { EducationalContent } from "@/types";

export const knapsack01Educational: EducationalContent = {
  overview:
    "**0/1 Knapsack (Tabulation)** solves the classic combinatorial optimization problem: given a set of items each with a weight and value, determine the maximum value that fits within a fixed capacity knapsack. The **0/1** constraint means each item can be included at most once — you either take it or leave it.\n\nTabulation builds the solution bottom-up using a 1D DP table `dp[w]` representing the maximum value achievable using exactly `w` units of capacity, iterating over each item and updating capacities from right to left.",

  howItWorks:
    "1. **Initialize** a DP table `dp[0..capacity]` filled with `0` (zero value when no items are considered).\n" +
    "2. **Outer loop:** iterate over each item `i` with weight `w_i` and value `v_i`.\n" +
    "3. **Inner loop (right-to-left):** iterate `w` from `capacity` down to `w_i`.\n" +
    "4. For each capacity `w`, update: `dp[w] = max(dp[w], dp[w - w_i] + v_i)`.\n" +
    "5. The **right-to-left** direction is critical — it ensures each item is used at most once by reading from unmodified sub-capacity values computed in the previous item's pass.\n" +
    "6. After all items are processed, `dp[capacity]` holds the maximum achievable value.\n\n" +
    "### Table Build-Up for weights=[2,3,4,5], values=[3,4,5,6], capacity=8\n\n" +
    "```\n" +
    "After item 0 (w=2, v=3): dp = [0, 0, 3, 3, 3, 3, 3, 3, 3]\n" +
    "After item 1 (w=3, v=4): dp = [0, 0, 3, 4, 4, 7, 7, 7, 7]\n" +
    "After item 2 (w=4, v=5): dp = [0, 0, 3, 4, 5, 7, 8, 9, 9]\n" +
    "After item 3 (w=5, v=6): dp = [0, 0, 3, 4, 5, 7, 8, 9, 10]\n" +
    "```\n\n" +
    "Final answer: `dp[8] = 10` (items 0 and 3 with total weight 7, value 9 — or items 0 and 2 with weight 6, value 8 — the optimum is items 1 and 3: weight 8, value 10).\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["dp[0..8] = 0"]:::base\n' +
    '  B["item 0: w=2,v=3\\ndp[2]=3, dp[3]=3"]:::cached\n' +
    '  C["item 1: w=3,v=4\\ndp[3]=4, dp[5]=7"]:::cached\n' +
    '  D["item 2: w=4,v=5\\ndp[4]=5, dp[6]=8"]:::cached\n' +
    '  E["item 3: w=5,v=6\\ndp[8]=10 ✓"]:::current\n' +
    "  A --> B --> C --> D --> E\n" +
    "  classDef base fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef cached fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Each item pass sweeps right-to-left through the table, locking in the best value achievable at every capacity without reusing items.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × capacity)`**\n\n" +
    "The outer loop runs once per item (`n` items); the inner loop runs at most `capacity` times per item. Each iteration performs `O(1)` work.\n\n" +
    "**Space Complexity: `O(capacity)`**\n\n" +
    "Only a single 1D DP table of size `capacity + 1` is required. The 1D optimization reduces the classic 2D `O(n × capacity)` space down to `O(capacity)` by reusing the same row and iterating in reverse.",

  bestAndWorstCase:
    "**Best case:** `O(n × capacity)` — the algorithm always processes every item and every capacity slot regardless of the input values or weights. There is no early termination.\n\n" +
    "**Worst case:** `O(n × capacity)` — same asymptotic bound. Large capacity values and many items both increase runtime linearly.\n\n" +
    "Note that the knapsack problem is **NP-hard** in general (when capacity is not bounded by a polynomial in the input size). The DP solution is **pseudo-polynomial** — efficient when `capacity` is small, but impractical for astronomically large capacities.",

  realWorldUses: [
    "**Portfolio optimization:** Selecting investments with bounded total budget to maximize expected return.",
    "**Cargo loading:** Packing freight with weight limits to maximize total shipment value.",
    "**Resource scheduling:** Assigning tasks with time/memory costs to a constrained processor to maximize throughput.",
    "**Cryptography:** Subset-sum variants of knapsack underpin certain public-key cryptosystems.",
    "**Feature selection in ML:** Choosing model features within a computational budget to maximize predictive accuracy.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the globally optimal solution — greedy heuristics fail on most 0/1 knapsack instances.",
      "1D space optimization makes it practical for moderate capacities without sacrificing correctness.",
      "Right-to-left traversal elegantly enforces the 0/1 constraint without a separate dimension for item count.",
      "Each subproblem is solved exactly once — no redundant recomputation compared to naive recursion.",
    ],
    limitations: [
      "Pseudo-polynomial time — impractical when `capacity` is very large (e.g., 10^9).",
      "Does not reconstruct which items were selected — backtracking or a 2D table is needed to recover the item set.",
      "Only handles integer weights and capacities; fractional weights require a different approach (greedy for fractional knapsack).",
      "The 0/1 constraint is baked into the right-to-left traversal — switching to left-to-right inadvertently solves unbounded knapsack instead.",
    ],
  },

  whenToUseIt:
    "Use **0/1 Knapsack tabulation** when each item can be selected at most once and you need the maximum value within a capacity constraint. Prefer the 1D tabulation approach over the 2D table when space is a concern and you do not need to reconstruct the selected items. If items can be reused unlimited times, use **unbounded knapsack** (left-to-right inner loop). If capacity is too large for DP, consider **branch and bound**, **FPTAS approximation**, or **greedy** when item values are proportional to weights. For fractional items, use the **greedy fractional knapsack** algorithm which runs in `O(n log n)`.",
};
