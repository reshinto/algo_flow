import type { EducationalContent } from "@/types";

export const catalanNumbersEducational: EducationalContent = {
  overview:
    "**Catalan Numbers (Tabulation)** is a bottom-up dynamic programming algorithm that computes the n-th Catalan number by filling a DP table from the base case upward.\n\n" +
    "Catalan numbers form a sequence `1, 1, 2, 5, 14, 42, 132, 429, 1430, …` that appears throughout combinatorics wherever structures can be recursively split into two independent sub-structures. The recurrence `C(0) = 1`, `C(n) = Σ C(k) × C(n-1-k)` for k from 0 to n-1 captures this binary partitioning idea directly.",

  howItWorks:
    "1. **Initialize** a DP table of size `n + 1` filled with zeros.\n" +
    "2. **Fill base case:** `table[0] = 1` (there is exactly one empty structure).\n" +
    "3. **Iterate** from index `1` to `n`.\n" +
    "4. For each `i`, compute `table[i] = Σ table[k] × table[i-1-k]` for k from 0 to i-1. Each product pairs the left and right sub-structure counts for a specific split point.\n" +
    "5. Return `table[n]`.\n\n" +
    "### Table Build-Up for C(5)\n\n" +
    "```\n" +
    "Index:  0  1  2   3   4    5\n" +
    "Value:  1  1  2   5  14   42\n" +
    "```\n\n" +
    "Each cell requires one full inner loop pass, so the total work grows as the sum of 1 + 2 + 3 + … + n = n(n+1)/2 — exactly the O(n²) cost.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "For each index `i` from 1 to n the inner loop runs `i` iterations, giving a total of 1 + 2 + … + n = n(n+1)/2 operations — quadratic overall. This is unavoidable: the recurrence inherently sums over all split points.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The DP table stores `n + 1` values. No additional data structures are needed beyond the table and a few loop variables.",

  bestAndWorstCase:
    "**Best case, average case, and worst case** are all `O(n²)` — every cell from `C(0)` to `C(n)` must be computed, and each cell `C(i)` requires `i` multiplications.\n\n" +
    "For reference, Catalan numbers grow as `C(n) ~ 4ⁿ / (n^(3/2) × √π)`. By `C(18)` the value exceeds 4 billion, surpassing JavaScript's 32-bit integer range. For `n > ~30` exact arithmetic requires `BigInt`.",

  realWorldUses: [
    "**Ballot Problem:** `C(n)` counts the number of sequences of `n` votes for candidate A and `n` votes for candidate B such that A is strictly ahead throughout the count — a classic combinatorics result.",
    "**Bracket Sequences:** The number of ways to place `n` pairs of balanced parentheses is exactly `C(n)`. This generalises to any correctly nested structure such as XML tags or function call expressions.",
    "**Binary Trees:** `C(n)` counts the number of structurally distinct full binary trees with `n+1` leaves (equivalently, `n` internal nodes). Compiler parse-tree enumeration uses this result.",
    "**Polygon Triangulation:** The number of ways to triangulate a convex polygon with `n+2` vertices into triangles using non-crossing diagonals is `C(n)`. This arises in computational geometry and mesh generation.",
    "**Stack-Sortable Permutations:** The number of permutations of `1…n` that can be sorted using a single stack is `C(n)`, linking Catalan numbers directly to algorithm analysis.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Eliminates the exponential cost of naive recursive enumeration by reusing all previously computed sub-results.",
      "No recursion depth concern — the iterative table fill is stack-safe for any practical input.",
      "The same tabulation pattern generalises to higher-order Catalan analogues and related combinatorial recurrences.",
    ],
    limitations: [
      "O(n²) time is inherent to the standard recurrence — there is no known general O(n log n) DP formulation.",
      "For large `n`, Catalan values grow exponentially and overflow standard integer types. Use `BigInt` for `n > ~30`.",
      "The full O(n) table is kept for visualization; if only the final answer is needed, memory can be reduced to O(n) with no other gains since the recurrence still requires all prior values.",
    ],
  },

  whenToUseIt:
    "Choose **Catalan number tabulation** when you need the n-th Catalan number or the full sequence up to n, and you recognize the binary-split recurrence structure in your problem. Common triggers: counting balanced bracket arrangements, binary tree shapes, non-crossing partition counts, or polygon triangulation solutions. When the recurrence is `C(n) = Σ C(k) × C(n-1-k)`, tabulation is the canonical efficient approach.",
};
