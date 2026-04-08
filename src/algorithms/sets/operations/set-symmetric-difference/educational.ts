import type { EducationalContent } from "@/types";

export const setSymmetricDifferenceEducational: EducationalContent = {
  overview:
    "**Set Symmetric Difference** (A △ B) finds all elements that appear in **either** array A or array B, but **not in both**. " +
    "It is the union minus the intersection. " +
    "The naïve approach — comparing every element of each array against the other — runs in `O(n × m)`. " +
    "Using a **hash set** reduces this to `O(n + m)` by making membership tests `O(1)`.\n\n" +
    "The algorithm runs in three phases: build a hash set from array A, process array B (removing common elements and collecting B-only elements), " +
    "then collect the remaining elements in the hash set (which are A-only).",

  howItWorks:
    "**Phase 1 — Build the hash set from array A** `O(n)`:\n\n" +
    "Insert every element of array A into a hash set. Each insertion is `O(1)` amortized.\n\n" +
    "**Phase 2 — Process array B** `O(m)`:\n\n" +
    "Iterate array B. For each element:\n" +
    "- `hashSet.has(value)` — `O(1)` lookup\n" +
    "- If **found**: the element is in both arrays — remove it from the hash set (it is common, not symmetric)\n" +
    "- If **not found**: the element is only in B — add to result\n\n" +
    "**Phase 3 — Collect A-only elements** `O(n)`:\n\n" +
    "After phase 2, the hash set contains only elements that were in A but not matched by any element of B. " +
    "Add all remaining hash set elements to the result.\n\n" +
    "### Example: A = [1, 2, 3, 4], B = [3, 4, 5, 6]\n\n" +
    "```\n" +
    "Phase 1 → hash set: {1, 2, 3, 4}\n" +
    "\n" +
    "Phase 2:\n" +
    "  B[0]=3 → found   → remove from set → set: {1, 2, 4}\n" +
    "  B[1]=4 → found   → remove from set → set: {1, 2}\n" +
    "  B[2]=5 → missing → result: [5]\n" +
    "  B[3]=6 → missing → result: [5, 6]\n" +
    "\n" +
    "Phase 3:\n" +
    "  remaining: {1, 2} → result: [5, 6, 1, 2]\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  subgraph A["Set A"]\n' +
    '    a1["1"]:::result\n' +
    '    a2["2"]:::result\n' +
    '    a3["3"]:::excluded\n' +
    '    a4["4"]:::excluded\n' +
    "  end\n" +
    '  subgraph B["Set B"]\n' +
    '    b1["3"]:::excluded\n' +
    '    b2["4"]:::excluded\n' +
    '    b3["5"]:::result\n' +
    '    b4["6"]:::result\n' +
    "  end\n" +
    '  subgraph R["A △ B"]\n' +
    '    r1["1"]:::result\n' +
    '    r2["2"]:::result\n' +
    '    r3["5"]:::result\n' +
    '    r4["6"]:::result\n' +
    "  end\n" +
    "  A --> R\n" +
    "  B --> R\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef excluded fill:#f59e0b,stroke:#d97706\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Shared elements 3 and 4 (amber) are eliminated from both sides. Only A-exclusive elements (1, 2) and B-exclusive elements (5, 6) appear in the symmetric difference (green).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Phase 1: `O(n)` — one pass over array A.\n" +
    "- Phase 2: `O(m)` — one pass over array B.\n" +
    "- Phase 3: `O(n)` — one pass over the remaining hash set elements.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The hash set holds at most `n` elements (from array A). " +
    "Elements are removed during phase 2 as common elements are eliminated.",

  bestAndWorstCase:
    "**Best case** — complete overlap (A ≡ B): all elements of B match elements in A. " +
    "The hash set is emptied during phase 2 and phase 3 produces nothing. Result is empty. Still `O(n + m)`.\n\n" +
    "**Worst case** — no overlap (A ∩ B = ∅): no elements are removed in phase 2. " +
    "Phase 3 adds all `n` elements of A. Result has `n + m` elements. Still `O(n + m)`.\n\n" +
    "Unlike sorting-based approaches (`O((n + m) log(n + m))`), hash set symmetric difference has no worst-case degradation " +
    "barring adversarial hash collisions.",

  realWorldUses: [
    "**Change detection:** Finding which items were added or removed between two snapshots of a dataset.",
    "**Diff tools:** Computing the symmetric difference of line sets between two file versions to identify changed lines.",
    "**Fraud detection:** Identifying transactions that appear in one ledger but not the other — discrepancies that require investigation.",
    "**Social network analysis:** Finding users who follow exactly one of two accounts (but not both) to identify potential cross-promotion targets.",
    "**Configuration drift:** Detecting which settings diverged between two environment configurations.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — optimal for unsorted inputs.",
      "Commutative result: A △ B = B △ A (unlike set difference).",
      "Three-phase structure is easy to reason about and implement correctly.",
    ],
    limitations: [
      "O(n) extra space for the hash set — not in-place.",
      "If both arrays are already sorted, a two-pointer merge achieves O(n + m) time with O(1) extra space.",
      "Result ordering depends on iteration order of the hash set, which may not be deterministic across all runtimes.",
    ],
  },

  whenToUseIt:
    "Use hash set symmetric difference when inputs are unsorted and you need all elements exclusive to either array. " +
    "If both arrays are sorted, prefer the two-pointer technique for `O(1)` space. " +
    "Symmetric difference is commutative (A △ B = B △ A), making it ideal when the distinction between 'source' and 'target' arrays is not meaningful. " +
    "For streaming or incremental scenarios, maintain a live symmetric difference set by toggling elements — " +
    "insert if not present, remove if already present.",
};
