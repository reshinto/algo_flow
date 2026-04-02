import type { EducationalContent } from "@/types";

export const multisetUnionEducational: EducationalContent = {
  overview:
    "**Multiset Union** (also called **bag union**) combines two multisets so that each element appears as many times as its **maximum** frequency across the two inputs. Unlike standard set union which treats duplicates as one, multiset union preserves multiplicity.\n\n" +
    "For example, if element 1 appears twice in A and three times in B, the union contains **three** copies — the larger of the two counts. The algorithm uses two frequency maps to count occurrences in `O(n + m)` time.",

  howItWorks:
    "**Phase 1 — Count arrayA** `O(n)`:\n\n" +
    "Iterate arrayA and build a `Map<element, count>`. Each element's count increments by 1 per occurrence.\n\n" +
    "**Phase 2 — Count arrayB** `O(m)`:\n\n" +
    "Iterate arrayB and build a second frequency map the same way.\n\n" +
    "**Phase 3 — Merge with max** `O(k)` where k = unique elements:\n\n" +
    "Gather all unique keys from both maps. For each key, emit `max(countA, countB)` copies of that element into the result. The result is sorted for deterministic output.\n\n" +
    "### Example: A = [1, 1, 2, 3, 3, 3], B = [1, 1, 1, 2, 2, 3]\n\n" +
    "```\n" +
    "countsA: {1→2, 2→1, 3→3}\n" +
    "countsB: {1→3, 2→2, 3→1}\n" +
    "\n" +
    "max per element:\n" +
    "  1 → max(2, 3) = 3 copies\n" +
    "  2 → max(1, 2) = 2 copies\n" +
    "  3 → max(3, 1) = 3 copies\n" +
    "\n" +
    "result: [1, 1, 1, 2, 2, 3, 3, 3]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Phase 1: `O(n)` — one pass over arrayA.\n" +
    "- Phase 2: `O(m)` — one pass over arrayB.\n" +
    "- Phase 3: `O(k)` — iteration over unique keys, bounded by `O(n + m)`.\n\n" +
    "**Space Complexity: `O(n + m)`**\n\n" +
    "Two frequency maps together hold at most `n + m` entries in the worst case (all elements are distinct). The result array can hold up to `n + m` elements.",

  bestAndWorstCase:
    "**Best case** — A and B are identical: every element's max count equals its count in either array. The result has the same size as each input. Runtime: `O(n + m)`.\n\n" +
    "**Worst case** — all elements are distinct between the two arrays: both maps are fully populated and the result contains all elements from both. Runtime: still `O(n + m)` with twice the space.\n\n" +
    "Unlike sort-based approaches (`O((n + m) log(n + m))`), the hash map method has no worst-case time degradation.",

  realWorldUses: [
    "**Inventory merging:** Two warehouses each stock varying quantities of items. The bag union gives the minimum combined stock needed to cover both demand profiles.",
    "**Text analysis:** Merging term-frequency dictionaries from two documents with the maximum observed frequency per term.",
    "**Database UNION ALL with deduplication:** SQL `UNION ALL` is multiset union; bag union with max frequencies models certain outer-join aggregations.",
    "**Music playlists:** Combining two playlists where each song can appear multiple times, keeping the higher play-count from either list.",
    "**Probabilistic data structures:** Combining two Count-Min Sketches by taking the element-wise maximum.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — optimal for unsorted inputs.",
      "Naturally handles duplicates without additional deduplication logic.",
      "Generalises to any number of multisets by chaining the merge phase.",
    ],
    limitations: [
      "O(n + m) extra space for two frequency maps — significantly more than hash set intersection.",
      "Map iteration order is non-deterministic in some languages — output must be explicitly sorted for reproducibility.",
      "Not in-place; modifying inputs to reduce space would require sorting first.",
    ],
  },

  whenToUseIt:
    "Use multiset union when element multiplicity matters and you need the maximum frequency from either source. If both arrays are already sorted, a two-pointer merge approach achieves `O(n + m)` time with `O(1)` extra space. For very large datasets where memory is constrained, consider streaming frequency estimation with Count-Min Sketches as an approximate alternative. If you only need the set of distinct elements (ignoring multiplicity), standard set union is simpler and uses less space.",
};
