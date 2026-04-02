import type { EducationalContent } from "@/types";

export const setUnionEducational: EducationalContent = {
  overview:
    "**Set Union** combines all unique elements from two input arrays into a single array, without duplicates. " +
    "The naïve approach — checking every element of B against every element of A — runs in `O(n × m)`. " +
    "Using a **hash set** reduces this to `O(n + m)` by turning membership tests from linear scans into `O(1)` lookups.\n\n" +
    "The algorithm runs in two phases: first add all elements of array A to a hash set and the result, " +
    "then iterate array B and add each element only if it is not already in the hash set.",

  howItWorks:
    "**Phase 1 — Build the hash set from array A** `O(n)`:\n\n" +
    "Insert every element of array A into a hash set and append it to the result. " +
    "Each insertion is `O(1)` amortized, so the entire phase is `O(n)`.\n\n" +
    "**Phase 2 — Merge unique elements from array B** `O(m)`:\n\n" +
    "Iterate array B. For each element:\n" +
    "- `hashSet.has(value)` — `O(1)` lookup\n" +
    "- If **found**: the element is already in the result — skip\n" +
    "- If **not found**: add to the result and insert into the hash set\n\n" +
    "### Example: A = [1, 2, 3, 4, 5], B = [3, 4, 5, 6, 7]\n\n" +
    "```\n" +
    "Phase 1 → result: [1, 2, 3, 4, 5], hash set: {1, 2, 3, 4, 5}\n" +
    "\n" +
    "Phase 2:\n" +
    "  B[0]=3 → found   → skip (already in result)\n" +
    "  B[1]=4 → found   → skip\n" +
    "  B[2]=5 → found   → skip\n" +
    "  B[3]=6 → missing → result: [1, 2, 3, 4, 5, 6]\n" +
    "  B[4]=7 → missing → result: [1, 2, 3, 4, 5, 6, 7]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Phase 1: `O(n)` — one pass over array A, each insertion `O(1)` amortized.\n" +
    "- Phase 2: `O(m)` — one pass over array B, each lookup `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(n + m)`**\n\n" +
    "The hash set holds all unique elements from both arrays, up to `n + m` in the case of full disjointness. " +
    "The result array similarly holds all unique elements.",

  bestAndWorstCase:
    "**Best case** — complete overlap (A ≡ B): every element of B is already in the hash set. " +
    "Phase 2 only does lookups — no insertions. Result size equals `n`. Still `O(n + m)`.\n\n" +
    "**Worst case** — no overlap (A ∩ B = ∅): every element of B is added to the result. " +
    "Result size equals `n + m`. Still `O(n + m)`.\n\n" +
    "Unlike sorting-based approaches (`O((n + m) log(n + m))`), hash set union has no worst-case degradation " +
    "barring adversarial hash collisions.",

  realWorldUses: [
    "**Tag aggregation:** Merging the tag sets of multiple blog posts into one de-duplicated tag cloud.",
    "**Contact merging:** Combining contact lists from two sources (e.g., phone and email) without duplicate entries.",
    "**Search engines:** Producing the union of posting lists for OR-queries across multiple keywords.",
    "**Dependency resolution:** Computing the combined set of dependencies from multiple packages without duplicating shared libraries.",
    "**Feature flags:** Merging enabled feature sets from multiple user groups into a single permission set.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — optimal for unsorted inputs.",
      "Single pass over each array — no nested loops.",
      "Naturally handles duplicates by tracking seen elements in the hash set.",
    ],
    limitations: [
      "O(n + m) extra space for the hash set and result — not in-place.",
      "If both arrays are already sorted, a two-pointer merge achieves O(n + m) time with O(1) extra space.",
      "Hash set performance depends on load factor — worst-case O(n) per operation on pathological inputs.",
    ],
  },

  whenToUseIt:
    "Use hash set union when inputs are unsorted and you can afford `O(n + m)` extra space. " +
    "If both arrays are sorted, prefer the two-pointer technique for `O(1)` space. " +
    "For streaming scenarios where elements arrive incrementally, maintain a live hash set and append new elements as they arrive. " +
    "When performing many repeated unions on overlapping sets, consider a persistent data structure or a sorted merge tree for amortized efficiency.",
};
