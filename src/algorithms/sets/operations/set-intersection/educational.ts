import type { EducationalContent } from "@/types";

export const setIntersectionEducational: EducationalContent = {
  overview:
    "**Set Intersection** finds all elements that appear in both of two input arrays, returning them without duplicates. The naïve approach — checking every element of B against every element of A — runs in `O(n × m)`. Using a **hash set** reduces this to `O(n + m)` by turning membership tests from linear scans into `O(1)` lookups.\n\n" +
    "The algorithm runs in two phases: first build a hash set from array A, then iterate array B and check each element for membership.",

  howItWorks:
    "**Phase 1 — Build the hash set** `O(n)`:\n\n" +
    "Insert every element of array A into a hash set. Each insertion is `O(1)` amortized, so the entire phase is `O(n)`.\n\n" +
    "**Phase 2 — Check membership** `O(m)`:\n\n" +
    "Iterate array B. For each element:\n" +
    "- `hashSet.has(value)` — `O(1)` lookup\n" +
    "- If **found**: add to result, then remove from the hash set to prevent duplicate entries\n" +
    "- If **not found**: skip\n\n" +
    "### Example: A = [1, 2, 3, 4, 5, 8], B = [2, 4, 6, 8, 10]\n\n" +
    "```\n" +
    "Phase 1 → hash set: {1, 2, 3, 4, 5, 8}\n" +
    "\n" +
    "Phase 2:\n" +
    "  B[0]=2  → found   → result: [2],    set: {1, 3, 4, 5, 8}\n" +
    "  B[1]=4  → found   → result: [2, 4], set: {1, 3, 5, 8}\n" +
    "  B[2]=6  → missing → skip\n" +
    "  B[3]=8  → found   → result: [2, 4, 8]\n" +
    "  B[4]=10 → missing → skip\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + m)`**\n\n" +
    "- Phase 1: `O(n)` — one pass over array A, each insertion `O(1)` amortized.\n" +
    "- Phase 2: `O(m)` — one pass over array B, each lookup `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The hash set holds at most `n` elements (the size of array A). If `n ≪ m`, use array B to build the set instead to minimize memory.",

  bestAndWorstCase:
    "**Best case** — no intersection: every element of B fails the lookup immediately. Still `O(n + m)` because all elements must be visited.\n\n" +
    "**Worst case** — complete intersection (A ⊆ B): every element of B is found, and the result contains `n` elements. Still `O(n + m)`.\n\n" +
    "Unlike sorting-based approaches (`O((n + m) log(n + m))`), hash set intersection has no worst-case degradation barring adversarial hash collisions.",

  realWorldUses: [
    "**Database JOIN:** Finding rows that match on a key column between two tables is logically equivalent to set intersection.",
    "**Friend recommendations:** 'Mutual friends' between two users is the intersection of their friend sets.",
    "**Search engines:** Computing the intersection of posting lists (document IDs) for multi-keyword queries.",
    "**Access control:** Checking which permissions a user's role set has in common with a resource's required permission set.",
    "**Genomics:** Finding shared gene variants between two patient cohorts.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + m) time — optimal for unsorted inputs where sorting is not already available.",
      "Single pass over each array — no nested loops.",
      "Naturally handles duplicates by removing matched elements from the hash set.",
    ],
    limitations: [
      "O(n) extra space for the hash set — not in-place.",
      "If both arrays are already sorted, a two-pointer merge approach achieves O(n + m) time with O(1) extra space.",
      "Hash set performance depends on load factor and hash function — worst-case O(n) per operation on pathological inputs.",
    ],
  },

  whenToUseIt:
    "Use hash set intersection when inputs are unsorted and you can afford `O(n)` extra space. If both arrays are sorted, prefer the two-pointer technique for `O(1)` space. For very large arrays where memory is critical, a Bloom filter can serve as an approximate first pass before an exact check. When computing intersections repeatedly across many sets, consider a sorted merge tree or inverted index.",
};
