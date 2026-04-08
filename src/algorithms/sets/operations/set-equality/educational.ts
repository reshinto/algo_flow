import type { EducationalContent } from "@/types";

export const setEqualityEducational: EducationalContent = {
  overview:
    "**Set Equality** determines whether two arrays represent the same set — that is, they contain exactly the same unique elements regardless of order or duplicates (written A = B). " +
    "Equality holds iff A ⊆ B and B ⊆ A simultaneously, which also requires that both sets have the same number of unique elements.\n\n" +
    "Using a **hash set** built from array A reduces the check to `O(n + m)`: one pass to build, one pass to verify, and a final unique-count comparison.",

  howItWorks:
    "**Phase 1 — Build the hash set** `O(n)`:\n\n" +
    "Insert every element of array A into a hash set, counting unique values (`uniqueCountA`).\n\n" +
    "**Phase 2 — Check membership and count uniques in B** `O(m)`:\n\n" +
    "Iterate array B. For each element:\n" +
    "- Track unique values in B via a secondary seen set (`uniqueCountB`)\n" +
    "- `hashSet.has(value)` — `O(1)` lookup\n" +
    "- If **not found**: sets differ — return `false` immediately (early exit)\n" +
    "- If **found**: condition holds so far — continue\n\n" +
    "**Phase 3 — Final count comparison**:\n\n" +
    "After all B elements pass: return `uniqueCountA === uniqueCountB`. " +
    "This catches the case where A is a proper superset of B (all B elements exist in A, but A has extra elements).\n\n" +
    "### Example: A = [3, 1, 2], B = [2, 3, 1]\n\n" +
    "```\n" +
    "Phase 1 → hash set: {3, 1, 2}, uniqueCountA = 3\n" +
    "\n" +
    "Phase 2:\n" +
    "  B[0]=2 → found → uniqueCountB=1 → condition holds\n" +
    "  B[1]=3 → found → uniqueCountB=2 → condition holds\n" +
    "  B[2]=1 → found → uniqueCountB=3 → condition holds\n" +
    "\n" +
    "Phase 3: uniqueCountA(3) === uniqueCountB(3) → isEqual: true\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  subgraph A["Set A"]\n' +
    '    a1["3"]:::input\n' +
    '    a2["1"]:::input\n' +
    '    a3["2"]:::input\n' +
    "  end\n" +
    '  subgraph B["Set B"]\n' +
    '    b1["2"]:::input\n' +
    '    b2["3"]:::input\n' +
    '    b3["1"]:::input\n' +
    "  end\n" +
    '  subgraph R["Result"]\n' +
    '    r1["isEqual: true"]:::result\n' +
    "  end\n" +
    "  A --> R\n" +
    "  B --> R\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Both sets contain the same 3 unique elements — order and duplicates are irrelevant. The count comparison in Phase 3 catches supersets that would otherwise pass the membership check.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Phase 1: `O(n)` — one pass over array A.\n" +
    "- Phase 2: `O(m)` in the worst case — one pass over array B. Early exit on first missing element.\n" +
    "- Phase 3: `O(1)` — integer comparison.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The primary hash set holds at most `n` unique elements from array A. A secondary seen set tracks unique elements in B, using at most `O(m)` additional space.",

  bestAndWorstCase:
    "**Best case** — first element of B is missing from A: exits immediately after phase 1. Total: `O(n)`.\n\n" +
    "**Worst case** — sets are equal (true result) or differ only in unique count: every element of B must be visited, then the count comparison resolves. Total: `O(n + m)`.\n\n" +
    "Compared to sorting both arrays and comparing element by element (`O((n + m) log(n + m))`), the hash set approach is faster for large unsorted inputs at the cost of extra space.",

  realWorldUses: [
    "**Schema migration validation:** Confirming that a migrated database schema has exactly the same column set as the original.",
    "**Configuration diffing:** Checking whether two environment configs expose identical feature key sets before a deployment.",
    "**Test assertion helpers:** Custom `expectSetsEqual` matchers that ignore ordering in test output comparison.",
    "**Deduplication audit:** Verifying that two collections, potentially with duplicates, resolve to the same canonical set.",
    "**Data pipeline verification:** Confirming that the set of record IDs produced by two parallel pipeline branches is identical.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — optimal for unsorted inputs.",
      "Handles duplicates correctly — equality is defined on unique element sets.",
      "Early exit on first missing element — fast in practice when sets differ.",
    ],
    limitations: [
      "O(n + m) extra space for two hash sets — not in-place.",
      "If both arrays are already sorted, a two-pointer comparison achieves O(n + m) time with O(1) extra space.",
      "Hash set performance degrades on adversarial hash collision inputs.",
    ],
  },

  whenToUseIt:
    "Use hash set equality when both arrays are unsorted and may contain duplicates. " +
    "If both are sorted, a linear two-pointer scan with deduplication is equivalent in time but uses O(1) space. " +
    "For very large sets where memory is critical, compare sorted representations using streaming merge to avoid materialising full hash sets. " +
    "When equality checks are repeated across many array pairs sharing the same array A, build the hash set for A once and reuse it.",
};
