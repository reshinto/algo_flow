import type { EducationalContent } from "@/types";

export const supersetCheckEducational: EducationalContent = {
  overview:
    "**Superset Check** determines whether every element of set B also appears in set A (written A ⊇ B). " +
    "It is the inverse of the subset check: instead of asking 'does A fit inside B?', we ask 'does A contain B?'. " +
    "A naïve approach runs in `O(n × m)`; using a **hash set** built from A reduces this to `O(n + m)`.\n\n" +
    "The algorithm runs in two phases: first build a hash set from array A, then iterate array B and confirm each element is present.",

  howItWorks:
    "**Phase 1 — Build the hash set** `O(n)`:\n\n" +
    "Insert every element of array A into a hash set. Each insertion is `O(1)` amortized.\n\n" +
    "**Phase 2 — Check membership** `O(m)`:\n\n" +
    "Iterate array B. For each element:\n" +
    "- `hashSet.has(value)` — `O(1)` lookup\n" +
    "- If **found**: predicate holds for this element — continue\n" +
    "- If **not found**: A ⊉ B — return `false` immediately (early exit)\n\n" +
    "If all elements of B pass, return `true`.\n\n" +
    "### Example: A = [1, 2, 3, 4, 5], B = [2, 4]\n\n" +
    "```\n" +
    "Phase 1 → hash set: {1, 2, 3, 4, 5}\n" +
    "\n" +
    "Phase 2:\n" +
    "  B[0]=2 → found   → condition holds\n" +
    "  B[1]=4 → found   → condition holds\n" +
    "All elements checked → isSuperset: true\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  subgraph A["Set A (superset candidate)"]\n' +
    '    a1["1"]:::input\n' +
    '    a2["2"]:::input\n' +
    '    a3["3"]:::input\n' +
    '    a4["4"]:::input\n' +
    '    a5["5"]:::input\n' +
    "  end\n" +
    '  subgraph B["Set B (must be contained)"]\n' +
    '    b1["2"]:::input\n' +
    '    b2["4"]:::input\n' +
    "  end\n" +
    '  subgraph R["Result"]\n' +
    '    r1["isSuperset: true"]:::result\n' +
    "  end\n" +
    "  A --> R\n" +
    "  B --> R\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef excluded fill:#f59e0b,stroke:#d97706\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "A's hash set is built first; each element of B is looked up against it. Since both 2 and 4 exist in A, A ⊇ B is confirmed. A's extra elements (1, 3, 5) are irrelevant to the check.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Phase 1: `O(n)` — one pass over array A to build the hash set.\n" +
    "- Phase 2: `O(m)` in the worst case — one pass over array B. Early exit on the first missing element.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The hash set holds at most `n` elements (the size of array A). " +
    "If A is very large, pre-build the hash set once and reuse it across multiple superset queries.",

  bestAndWorstCase:
    "**Best case** — first element of B is missing from A: the algorithm exits after one comparison plus `O(n)` for phase 1. Total: `O(n)`.\n\n" +
    "**Worst case** — A is a superset of B (true result): every element of B must be checked. Total: `O(n + m)`.\n\n" +
    "Compared to sorting-based superset checks (`O((n + m) log(n + m))`), the hash set approach trades `O(n)` space for a faster expected runtime.",

  realWorldUses: [
    "**Role-based access control:** Confirming that a user's granted roles contain all roles required to perform an action.",
    "**Plugin compatibility:** Checking that the host application exposes all APIs a plugin declares it needs.",
    "**Content delivery networks:** Verifying that a cache's stored headers are a superset of the headers a client requires.",
    "**Test suite validation:** Ensuring that all required test cases are included in the executed test plan.",
    "**Configuration management:** Confirming that a deployed environment's config keys cover every key the application expects.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — optimal for unsorted inputs.",
      "Early exit on first failure — faster in practice when A ⊉ B.",
      "Symmetric dual of subset check — the same hash set can be reused for repeated queries against different B arrays.",
    ],
    limitations: [
      "O(n) extra space for the hash set — not in-place.",
      "If A is already sorted, binary search gives O(m log n) with O(1) space.",
      "Hash set performance degrades on adversarial hash collision inputs.",
    ],
  },

  whenToUseIt:
    "Use hash set superset check when inputs are unsorted and you can afford `O(n)` extra space. " +
    "If A is sorted, binary search over A for each element of B costs `O(m log n)` with no extra space. " +
    "When performing many superset queries against the same array A, build the hash set once and share it. " +
    "For approximate superset checks on very large sets, consider a Bloom filter for a probabilistic first pass.",
};
