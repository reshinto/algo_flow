import type { EducationalContent } from "@/types";

export const setDifferenceEducational: EducationalContent = {
  overview:
    "**Set Difference** (A \\ B) finds all elements that appear in array A but **not** in array B. " +
    "The naïve approach — checking every element of A against every element of B — runs in `O(n × m)`. " +
    "Using a **hash set** reduces this to `O(n + m)` by turning membership tests from linear scans into `O(1)` lookups.\n\n" +
    "The algorithm runs in two phases: first build a hash set from array B, " +
    "then iterate array A and include each element only if it is absent from the hash set.",

  howItWorks:
    "**Phase 1 — Build the hash set from array B** `O(m)`:\n\n" +
    "Insert every element of array B into a hash set. Each insertion is `O(1)` amortized, so the entire phase is `O(m)`.\n\n" +
    "**Phase 2 — Filter array A** `O(n)`:\n\n" +
    "Iterate array A. For each element:\n" +
    "- `hashSet.has(value)` — `O(1)` lookup\n" +
    "- If **found**: the element is also in B — skip it\n" +
    "- If **not found**: the element is exclusive to A — add to result\n\n" +
    "### Example: A = [1, 2, 3, 4, 5], B = [3, 4, 5, 6, 7]\n\n" +
    "```\n" +
    "Phase 1 → hash set: {3, 4, 5, 6, 7}\n" +
    "\n" +
    "Phase 2:\n" +
    "  A[0]=1 → missing → result: [1]\n" +
    "  A[1]=2 → missing → result: [1, 2]\n" +
    "  A[2]=3 → found   → skip\n" +
    "  A[3]=4 → found   → skip\n" +
    "  A[4]=5 → found   → skip\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  subgraph A["Set A"]\n' +
    '    a1["1"]:::input\n' +
    '    a2["2"]:::input\n' +
    '    a3["3"]:::excluded\n' +
    '    a4["4"]:::excluded\n' +
    '    a5["5"]:::excluded\n' +
    "  end\n" +
    '  subgraph B["Set B (exclusion)"]\n' +
    '    b1["3"]:::excluded\n' +
    '    b2["4"]:::excluded\n' +
    '    b3["5"]:::excluded\n' +
    "  end\n" +
    '  subgraph R["A \\\\ B"]\n' +
    '    r1["1"]:::result\n' +
    '    r2["2"]:::result\n' +
    "  end\n" +
    "  A --> R\n" +
    "  B -. remove .-> R\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef excluded fill:#f59e0b,stroke:#d97706\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Elements shared with B (amber) are excluded; only elements unique to A (cyan) reach the result (green).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Phase 1: `O(m)` — one pass over array B, each insertion `O(1)` amortized.\n" +
    "- Phase 2: `O(n)` — one pass over array A, each lookup `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(m)`**\n\n" +
    "The hash set holds at most `m` elements (the size of array B). " +
    "The result array holds at most `n` elements. " +
    "If `m ≫ n`, swap the roles: build the set from A and iterate B for a space-efficient variant.",

  bestAndWorstCase:
    "**Best case** — no overlap (A ∩ B = ∅): every element of A passes the lookup and is added to the result. " +
    "Result size equals `n`. Still `O(n + m)`.\n\n" +
    "**Worst case** — A ⊆ B: every element of A is found in the hash set and skipped. " +
    "Result is empty. Still `O(n + m)`.\n\n" +
    "Unlike sorting-based approaches (`O((n + m) log(n + m))`), hash set difference has no worst-case degradation " +
    "barring adversarial hash collisions.",

  realWorldUses: [
    "**Changelog computation:** Finding new items added since the last snapshot (current set minus previous set).",
    "**Access revocation:** Determining which permissions were removed when updating a user's role (old permissions minus new permissions).",
    "**Incremental sync:** Identifying records present on server A but not server B to synchronize only the delta.",
    "**Spam filtering:** Subtracting a whitelist of known-good addresses from a set of flagged addresses.",
    "**Dependency pruning:** Removing already-installed packages from a required-package list before installation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — optimal for unsorted inputs.",
      "Single pass over each array — no nested loops.",
      "O(m) space — only the exclusion set needs to be stored, not the full result ahead of time.",
    ],
    limitations: [
      "O(m) extra space for the hash set — not in-place.",
      "If both arrays are already sorted, a two-pointer scan achieves O(n + m) time with O(1) extra space.",
      "Hash set performance depends on load factor — worst-case O(m) per operation on pathological inputs.",
    ],
  },

  whenToUseIt:
    "Use hash set difference when inputs are unsorted and you can afford `O(m)` extra space. " +
    "If both arrays are sorted, prefer the two-pointer technique for `O(1)` space. " +
    "Note that set difference is **not commutative** — A \\ B ≠ B \\ A unless the sets are equal. " +
    "When you need both A \\ B and B \\ A simultaneously, compute symmetric difference instead.",
};
