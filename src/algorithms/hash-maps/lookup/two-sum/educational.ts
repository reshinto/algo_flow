import type { EducationalContent } from "@/types";

export const twoSumEducational: EducationalContent = {
  overview:
    "**Two Sum** finds two indices in an array whose values add up to a given target. The brute-force approach checks every pair in `O(n²)`, but using a **hash map** reduces it to a single `O(n)` pass.\n\nFor each element, compute its complement (`target - current`). If the complement is already in the map, the pair is found. If not, store the current element for future lookups.",

  howItWorks:
    "The algorithm maintains a hash map of `{ value → index }` seen so far:\n\n" +
    "1. **Compute complement** — `complement = target - current`.\n" +
    "2. **Check map** — if `complement` is already a key, return `[map[complement], currentIndex]`.\n" +
    "3. **Insert** — otherwise store `map[current] = currentIndex` and move on.\n\n" +
    "### Example: `numbers = [2, 7, 11, 15]`, `target = 9`\n\n" +
    "```\n" +
    "idx  num  complement  map lookup        action\n" +
    " 0    2       7       not found         insert { 2: 0 }\n" +
    " 1    7       2       found at idx 0!   return [0, 1]\n" +
    "```\n\n" +
    "The key insight: instead of scanning backward for the complement, we pre-store every value we've seen so the lookup is `O(1)`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "One pass through the array. Each hash map operation (insert and lookup) is `O(1)` amortized, so the total work is linear.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "In the worst case (no solution until the last element) the map holds `n - 1` entries.",

  bestAndWorstCase:
    "**Best case** — the first two elements sum to the target: the algorithm returns after just two iterations in `O(1)` space (only one entry in the map).\n\n" +
    "**Worst case** — the pair is the last two elements, or no solution exists: all `n` elements are inserted into the map before the answer is found or the loop ends. Time and space are both `O(n)`.",

  realWorldUses: [
    "**Financial reconciliation:** Matching debits and credits that sum to zero across large transaction ledgers.",
    "**Pair-sum queries in databases:** Finding two records whose numeric fields sum to a target is the SQL analogue of this pattern.",
    "**Sensor fusion:** Pairing readings from two sensor arrays that together hit a calibration target.",
    "**Interview gold standard:** Two Sum is the canonical example of trading `O(n²)` brute force for `O(n)` with a hash map — used as a teaching example in virtually every algorithms curriculum.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — optimal for this problem class (any algorithm must read all elements).",
      "Single pass — no preprocessing or sorting required.",
      "Generalizes naturally to k-sum problems by combining with other techniques.",
    ],
    limitations: [
      "O(n) extra space for the hash map — not in-place.",
      "Returns only one valid pair; if multiple solutions exist, the first one found is returned.",
      "Hash map performance depends on the hash function — rare worst-case collisions degrade to O(n) per lookup.",
    ],
  },

  whenToUseIt:
    "Use hash map two sum whenever you need `O(n)` pair lookup and can afford `O(n)` extra space. If the array is already sorted, a two-pointer approach achieves `O(n)` time and `O(1)` space. For all pairs (not just one), iterate and collect rather than early-return.",
};
