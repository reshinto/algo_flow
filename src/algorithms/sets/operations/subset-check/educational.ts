import type { EducationalContent } from "@/types";

export const subsetCheckEducational: EducationalContent = {
  overview:
    "**Subset Check** determines whether every element of set A also appears in set B (written A ⊆ B). " +
    "A naïve approach compares every element of A against every element of B in `O(n × m)`. " +
    "Using a **hash set** built from B reduces this to `O(n + m)` — membership tests become `O(1)` lookups.\n\n" +
    "The algorithm runs in two phases: first build a hash set from array B, then iterate array A and confirm each element is present.",

  howItWorks:
    "**Phase 1 — Build the hash set** `O(m)`:\n\n" +
    "Insert every element of array B into a hash set. Each insertion is `O(1)` amortized.\n\n" +
    "**Phase 2 — Check membership** `O(n)`:\n\n" +
    "Iterate array A. For each element:\n" +
    "- `hashSet.has(value)` — `O(1)` lookup\n" +
    "- If **found**: predicate holds for this element — continue\n" +
    "- If **not found**: A ⊄ B — return `false` immediately (early exit)\n\n" +
    "If all elements of A pass, return `true`.\n\n" +
    "### Example: A = [2, 4], B = [1, 2, 3, 4, 5]\n\n" +
    "```\n" +
    "Phase 1 → hash set: {1, 2, 3, 4, 5}\n" +
    "\n" +
    "Phase 2:\n" +
    "  A[0]=2 → found   → condition holds\n" +
    "  A[1]=4 → found   → condition holds\n" +
    "All elements checked → isSubset: true\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Phase 1: `O(m)` — one pass over array B to build the hash set.\n" +
    "- Phase 2: `O(n)` in the worst case — one pass over array A. Early exit on the first missing element.\n\n" +
    "**Space Complexity: `O(m)`**\n\n" +
    "The hash set holds at most `m` elements (the size of array B). " +
    "If B is very large relative to A, this can be a concern — an alternative is sorting B and using binary search for `O(n log m)` time with `O(1)` extra space.",

  bestAndWorstCase:
    "**Best case** — first element of A is missing from B: the algorithm exits after one comparison plus `O(m)` for phase 1. Total: `O(m)`.\n\n" +
    "**Worst case** — A is a subset of B (true result): every element of A must be checked. Total: `O(n + m)`.\n\n" +
    "Unlike sorting-based subset checks (`O((n + m) log(n + m))`), the hash set approach avoids a sorting pass at the cost of `O(m)` extra memory.",

  realWorldUses: [
    "**Permission systems:** Verifying that a user's required permissions are all present in their granted permission set.",
    "**Package management:** Checking that a package's declared dependencies are all available in the installed environment.",
    "**Database query optimisation:** Determining whether a smaller index covers all columns referenced in a query.",
    "**Compiler type checking:** Confirming that one interface's method set is a subset of another for structural subtyping.",
    "**Feature flags:** Verifying that all features required by a module are enabled in the current configuration.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — optimal for unsorted inputs.",
      "Early exit on first failure — faster in practice when A ⊄ B.",
      "Simple two-phase structure — easy to reason about and maintain.",
    ],
    limitations: [
      "O(m) extra space for the hash set — not in-place.",
      "If B is already sorted, binary search gives O(n log m) with O(1) space.",
      "Hash set performance degrades to O(m) per operation on adversarial hash inputs.",
    ],
  },

  whenToUseIt:
    "Use hash set subset check when both arrays are unsorted and you can afford `O(m)` extra space. " +
    "If B is sorted, binary search over B for each element of A costs `O(n log m)` with no extra space. " +
    "For tiny arrays (fewer than ~20 elements), a nested loop may be simpler and fast enough. " +
    "When subset tests are repeated across many queries, pre-build the hash set from the candidate superset once and reuse it.",
};
