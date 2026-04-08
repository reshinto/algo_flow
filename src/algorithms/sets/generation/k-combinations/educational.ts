import type { EducationalContent } from "@/types";

export const kCombinationsEducational: EducationalContent = {
  overview:
    "**K-Combinations** generates all subsets of exactly `k` elements chosen from a set of `n` elements. " +
    "The total count is given by the binomial coefficient `C(n, k) = n! / (k! × (n-k)!)`. " +
    "Unlike the full power set, only subsets of the exact required size are emitted, making it more focused and practical for fixed-size selection problems.",

  howItWorks:
    "The algorithm uses **recursive backtracking** constrained by a size check:\n\n" +
    "1. **Base case:** if `currentSubset.length === k`, emit the subset and return.\n" +
    "2. **Iterate** from `startIdx` to the end of the elements array.\n" +
    "3. **Include** `elements[elemIdx]` by pushing it onto `currentSubset`.\n" +
    "4. **Recurse** with `elemIdx + 1` to continue building the subset.\n" +
    "5. **Backtrack** — pop the last element and try the next candidate.\n\n" +
    "### Example: elements = [1, 2, 3, 4, 5], k = 3\n\n" +
    "```\n" +
    "backtrack(0) — currentSubset: []\n" +
    "  include 1 → [1]\n" +
    "    include 2 → [1,2]\n" +
    "      include 3 → emit [1,2,3]\n" +
    "      include 4 → emit [1,2,4]\n" +
    "      include 5 → emit [1,2,5]\n" +
    "    backtrack → [1]\n" +
    "    include 3 → [1,3]\n" +
    "      include 4 → emit [1,3,4]\n" +
    "      include 5 → emit [1,3,5]\n" +
    "    backtrack → [1]\n" +
    "    include 4 → [1,4]\n" +
    "      include 5 → emit [1,4,5]\n" +
    "    ... (continues)\n" +
    "Result: [1,2,3], [1,2,4], [1,2,5], [1,3,4], [1,3,5], [1,4,5],\n" +
    "        [2,3,4], [2,3,5], [2,4,5], [3,4,5]  — C(5,3) = 10 combinations\n" +
    "```\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '  Root["[ ]"]:::current\n' +
    '  N1["[1]"]:::current\n' +
    '  N12["[1,2]"]:::current\n' +
    '  N13["[1,3]"]:::current\n' +
    '  E123["[1,2,3] ✓"]:::result\n' +
    '  E124["[1,2,4] ✓"]:::result\n' +
    '  E134["[1,3,4] ✓"]:::result\n' +
    "  Root --> N1\n" +
    "  N1 --> N12 & N13\n" +
    "  N12 --> E123 & E124\n" +
    "  N13 --> E134\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The tree prunes as soon as a branch reaches size k=3 (emitting the result) or runs out of elements to add. Nodes shown are a partial view for elements [1,2,3,4], k=3.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(k × C(n,k))`**\n\n" +
    "There are `C(n,k)` combinations to generate. Each combination has exactly `k` elements, so copying it costs `O(k)`, giving `O(k × C(n,k))` total.\n\n" +
    "**Space Complexity: `O(k × C(n,k))`**\n\n" +
    "Storing all `C(n,k)` combinations, each of length `k`. The recursion stack uses `O(k)` additional space (bounded by the depth `k`).",

  bestAndWorstCase:
    "**Best case** — `k = 0` or `k = n`: only one combination exists (empty set or full set). Returns in `O(1)`.\n\n" +
    "**Worst case** — `k = n/2`: the binomial coefficient is maximized at `C(n, n/2)`, which grows exponentially. " +
    "For example, `C(20, 10) = 184,756` combinations.\n\n" +
    "Compared to full power set, k-combinations prune the search tree early: as soon as a subset reaches size `k`, recursion halts for that branch.",

  realWorldUses: [
    "**Team selection:** Choose `k` players from `n` candidates — enumerate all valid teams.",
    "**Lottery numbers:** Generate all possible draws of `k` numbers from 1 to `n`.",
    "**Feature subset selection:** Try all `k`-feature subsets in brute-force feature engineering.",
    "**Card hands:** Enumerate all 5-card hands from a 52-card deck (`C(52,5) = 2,598,960`).",
    "**Network redundancy:** Find all subsets of `k` links that could fail simultaneously.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Generates exactly C(n,k) combinations with no duplicates.",
      "More efficient than full power set when k ≪ n — prunes branches early.",
      "Recursion depth bounded by k, not n.",
    ],
    limitations: [
      "Still exponential for k near n/2 — not feasible for large n.",
      "No built-in pruning for additional constraints (e.g., sum limits) without modification.",
      "Storing all C(n,k) results in memory may be impractical for large n and k.",
    ],
  },

  whenToUseIt:
    "Use k-combinations when you need all fixed-size subsets and `n` is moderate (typically `n ≤ 20` for `k ≈ n/2`). " +
    "For ordered selections (where order matters), use permutations instead. " +
    "If you only need to count — not enumerate — combinations, compute `C(n,k)` directly using the binomial coefficient formula in `O(k)` time. " +
    "For very large `n`, consider lazy generation via combinatorial number system ranking/unranking.",
};
