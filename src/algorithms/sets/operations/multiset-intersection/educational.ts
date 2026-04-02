import type { EducationalContent } from "@/types";

export const multisetIntersectionEducational: EducationalContent = {
  overview:
    "**Multiset Intersection** (also called **bag intersection**) finds the elements that appear in **both** multisets, retaining each element exactly as many times as its **minimum** frequency across the two inputs.\n\n" +
    "For example, if element 1 appears twice in A and three times in B, the intersection contains **two** copies — you can only include as many as the smaller supply allows. The algorithm uses two frequency maps and runs in `O(n + m)` time.",

  howItWorks:
    "**Phase 1 — Count arrayA** `O(n)`:\n\n" +
    "Iterate arrayA and build a `Map<element, count>`. Each occurrence increments the count by 1.\n\n" +
    "**Phase 2 — Count arrayB** `O(m)`:\n\n" +
    "Iterate arrayB and build a second frequency map the same way.\n\n" +
    "**Phase 3 — Merge with min** `O(k)` where k = unique elements in A:\n\n" +
    "For each key in countsA, look up its count in countsB. Emit `min(countA, countB)` copies of the element into the result (0 copies if the element is absent from B). The result is sorted for deterministic output.\n\n" +
    "### Example: A = [1, 1, 2, 3, 3, 3], B = [1, 1, 1, 2, 2, 3]\n\n" +
    "```\n" +
    "countsA: {1→2, 2→1, 3→3}\n" +
    "countsB: {1→3, 2→2, 3→1}\n" +
    "\n" +
    "min per element:\n" +
    "  1 → min(2, 3) = 2 copies\n" +
    "  2 → min(1, 2) = 1 copy\n" +
    "  3 → min(3, 1) = 1 copy\n" +
    "\n" +
    "result: [1, 1, 2, 3]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Phase 1: `O(n)` — one pass over arrayA.\n" +
    "- Phase 2: `O(m)` — one pass over arrayB.\n" +
    "- Phase 3: `O(k)` — iteration over unique keys in A, bounded by `O(n)`.\n\n" +
    "**Space Complexity: `O(n + m)`**\n\n" +
    "Two frequency maps together hold at most `n + m` entries. The result is bounded by `min(n, m)` elements.",

  bestAndWorstCase:
    "**Best case** — A and B are disjoint: every countB lookup returns 0, producing an empty result. Still `O(n + m)` because all elements must be counted.\n\n" +
    "**Worst case** — A is a subset of B with identical frequencies: every element in A appears at least as often in B, producing a result the size of A. Runtime: still `O(n + m)`.\n\n" +
    "Unlike sorting-based intersection (`O((n + m) log(n + m))`), frequency map intersection has no worst-case time degradation.",

  realWorldUses: [
    "**Shopping cart reconciliation:** Finding items a customer can purchase given both cart quantities and warehouse stock — you can only ship as many as the minimum of ordered and available.",
    "**Document similarity:** The bag intersection of word frequency vectors measures how many words two documents share with matching multiplicity (used in Jaccard distance variants).",
    "**Anagram detection:** The multiset intersection of character frequencies confirms whether one string can be formed from the letters of another.",
    "**Pharmacy dispensing:** Given a prescription quantity and available stock per medicine, the intersection determines what can actually be dispensed.",
    "**Video game loot merging:** When merging two loot tables, the intersection gives items that must appear in both, taking the lower count.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — optimal for unsorted inputs.",
      "Correctly handles duplicates, returning each element the right number of times.",
      "Only iterates elements of A in Phase 3, so output is bounded by the smaller input.",
    ],
    limitations: [
      "O(n + m) extra space for two frequency maps — more than hash set intersection.",
      "Requires a full count of both arrays before producing output — cannot stream results element by element.",
      "If inputs are already sorted, a two-pointer merge gives O(n + m) time with O(1) space.",
    ],
  },

  whenToUseIt:
    "Use multiset intersection when element multiplicity matters and you need the minimum frequency shared by both sources. If both arrays are sorted, prefer a two-pointer scan for constant extra space. When dealing with very large datasets that exceed memory, approximate frequency counting with Count-Min Sketches provides a space-efficient alternative. If duplicates should be ignored entirely, use standard set intersection instead.",
};
