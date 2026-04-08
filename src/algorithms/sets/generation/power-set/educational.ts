import type { EducationalContent } from "@/types";

export const powerSetEducational: EducationalContent = {
  overview:
    "**Power Set** generates every possible subset of a given set, including the empty set and the set itself. " +
    "For a set with `n` elements, there are exactly `2^n` subsets — one for each possible combination of include/exclude decisions. " +
    "The backtracking approach explores every branch of this binary decision tree efficiently without duplication.",

  howItWorks:
    "The algorithm uses **recursive backtracking** to enumerate all subsets:\n\n" +
    "1. **Emit** the current subset (starts as empty `[]`) into the result.\n" +
    "2. **Iterate** from `startIdx` to the end of the elements array.\n" +
    "3. **Include** `elements[elemIdx]` by pushing it onto `currentSubset`.\n" +
    "4. **Recurse** with `elemIdx + 1` to generate all subsets that start with the chosen prefix.\n" +
    "5. **Backtrack** — pop the last element to undo the choice and try the next.\n\n" +
    "### Example: elements = [1, 2, 3]\n\n" +
    "```\n" +
    "backtrack(0) → emit []\n" +
    "  include 1 → backtrack(1) → emit [1]\n" +
    "    include 2 → backtrack(2) → emit [1,2]\n" +
    "      include 3 → backtrack(3) → emit [1,2,3]\n" +
    "      backtrack → remove 3\n" +
    "    backtrack → remove 2\n" +
    "    include 3 → backtrack(3) → emit [1,3]\n" +
    "    backtrack → remove 3\n" +
    "  backtrack → remove 1\n" +
    "  include 2 → backtrack(2) → emit [2]\n" +
    "    include 3 → emit [2,3]\n" +
    "    backtrack → remove 3\n" +
    "  backtrack → remove 2\n" +
    "  include 3 → emit [3]\n" +
    "  backtrack → remove 3\n" +
    "Result: [], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]\n" +
    "```\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '  Root["emit [ ]"]:::result\n' +
    '  N1["include 1 → emit [1]"]:::current\n' +
    '  N12["include 2 → emit [1,2]"]:::current\n' +
    '  N123["include 3 → emit [1,2,3]"]:::result\n' +
    '  N13["include 3 → emit [1,3]"]:::result\n' +
    '  N2["include 2 → emit [2]"]:::current\n' +
    '  N23["include 3 → emit [2,3]"]:::result\n' +
    "  Root --> N1 & N2\n" +
    "  N1 --> N12 & N13\n" +
    "  N12 --> N123\n" +
    "  N2 --> N23\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Every node in the tree emits a subset the moment it is reached. The 8 emitted subsets for [1,2,3] correspond exactly to the 2³ = 8 leaves and internal nodes of the binary decision tree.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × 2^n)`**\n\n" +
    "There are `2^n` subsets to generate. Each subset has an average length of `n/2`, so copying each subset costs `O(n)` amortized, giving `O(n × 2^n)` total.\n\n" +
    "**Space Complexity: `O(n × 2^n)`**\n\n" +
    "Storing all `2^n` subsets, each of average length `n/2`. The recursion stack uses `O(n)` additional space.",

  bestAndWorstCase:
    "**Best case** — `n = 0`: one subset (the empty set) is returned immediately in `O(1)`.\n\n" +
    "**Worst case** — large `n`: runtime doubles with every added element. At `n = 20`, there are over one million subsets (`2^20 ≈ 10^6`). " +
    "At `n = 30`, storing all subsets would require gigabytes of memory.\n\n" +
    "There is no way to reduce the exponential growth — generating all `2^n` subsets is inherently `O(2^n)` in output size.",

  realWorldUses: [
    "**Feature selection in ML:** Enumerate all subsets of features to find the optimal subset for a model.",
    "**Boolean satisfiability:** Try all truth assignments to a set of variables.",
    "**Combinatorial auction bidding:** Evaluate all possible bundles of goods a bidder could request.",
    "**Knapsack enumeration:** Brute-force all item subsets to find the optimal packing.",
    "**Test case generation:** Generate all combinations of optional flags or configuration settings.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Generates all subsets with no duplicates and no omissions.",
      "Simple recursive structure is easy to understand and verify.",
      "The backtracking pattern naturally extends to constrained variants (e.g., k-combinations).",
    ],
    limitations: [
      "Exponential time and space — impractical for n > 25 in most environments.",
      "Cannot be made incremental without restructuring — the full tree is explored.",
      "For large n, lazy/streaming generation or bit-masking may be preferable.",
    ],
  },

  whenToUseIt:
    "Use power set generation when you need all possible subsets and `n` is small (typically `n ≤ 20`). " +
    "For constrained subsets (fixed size, bounded sum), prefer k-combinations or branch-and-bound pruning. " +
    "When `n` is large, consider bit-mask iteration (`0` to `2^n - 1`) for a non-recursive alternative, " +
    "or lazy generators that yield subsets on demand rather than storing all of them at once.",
};
