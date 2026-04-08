import type { EducationalContent } from "@/types";

export const heapExtractMaxEducational: EducationalContent = {
  overview:
    "**Heap Extract Max** removes and returns the largest element from a max-heap — the root node at index 0. In a max-heap, every parent is greater than or equal to its children, so the root is always the global maximum.\n\nAfter removal, the heap must be restructured using a **sift-down** pass that enforces the *largest-wins* rule at each level, restoring the max-heap property in `O(log n)` time.",

  howItWorks:
    "The algorithm mirrors extract-min exactly, but the sift-down comparison favors the *largest* child rather than the smallest:\n\n" +
    "1. **Save the maximum** — record the root value (index 0); this is the return value.\n" +
    "2. **Move last to root** — overwrite the root with the last element in the array, then remove the last slot.\n" +
    "3. **Sift down (max-heap variant)** — push the new root downward:\n" +
    "   - At each step, find the *larger* of the left and right children.\n" +
    "   - If that child is larger than the current node, swap and continue from the child.\n" +
    "   - Stop when the node is ≥ both children, or at a leaf.\n\n" +
    "### Example: Extract max from [9, 7, 8, 3, 5, 6, 1]\n\n" +
    "```\n" +
    "Initial:      9  ← extracted\n" +
    "             / \\\n" +
    "            7   8\n" +
    "           / \\ / \\\n" +
    "          3  5 6  1\n\n" +
    "Move last (1) to root → remove last:\n" +
    "              1\n" +
    "             / \\\n" +
    "            7   8\n" +
    "           / \\\n" +
    "          3   5\n\n" +
    "Sift down: 1 < child 8 → swap → 1 < child 6? swap → leaf → done.\n\n" +
    "Result:       8\n" +
    "             / \\\n" +
    "            7   6\n" +
    "           / \\\n" +
    "          3   5\n" +
    "```\n\n" +
    "Extracted value: `9`. Remaining max-heap: `[8, 7, 6, 3, 5]`.\n\n" +
    "### Resulting Max-Heap After Extracting 9\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n8((8)) --> n7((7))\n" +
    "    n8 --> n6((6))\n" +
    "    n7 --> n3((3))\n" +
    "    n7 --> n5((5))\n" +
    "    style n8 fill:#06b6d4,stroke:#0891b2\n" +
    "    style n7 fill:#14532d,stroke:#22c55e\n" +
    "    style n6 fill:#f59e0b,stroke:#d97706\n" +
    "    style n3 fill:#14532d,stroke:#22c55e\n" +
    "    style n5 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The cyan root (8) is the new maximum after 9 was removed. The amber node (6) was the last element (1) that sifted down two levels — it swapped with 8 then with 6 before settling. Green nodes were already in valid positions.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "Saving the root and moving the last element are both `O(1)`. The sift-down traverses at most one root-to-leaf path (height `⌊log₂ n⌋`), with one comparison and at most one swap per level.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "The operation is performed in-place on the array. Only a constant number of index variables are required. (A recursive sift-down would consume O(log n) stack space.)",

  bestAndWorstCase:
    "**Best case — nearly `O(1)` sift-down:** The last element moved to the root is already larger than both its children, so sift-down stops at the first comparison.\n\n" +
    "**Worst case — `O(log n)`:** The moved element is the smallest and must travel all the way from root to leaf, swapping at every level. For a heap of 1 million nodes (height ≈ 20), this is at most 40 comparisons.\n\n" +
    "The operation is always `O(log n)` in the worst case — variation is only in the constant factor.",

  realWorldUses: [
    "**Heap sort (descending):** Repeatedly extracting the maximum from a max-heap produces elements in descending order in O(n log n).",
    "**Job scheduling:** Operating systems use max-heaps to schedule the highest-priority process next, extracting from the heap on each context switch.",
    "**Real-time leaderboards:** Extract the top-ranked item efficiently in multiplayer games or live competitions.",
    "**K largest elements:** Maintain a max-heap over a stream and repeatedly extract-max to retrieve the top-K elements.",
    "**Bandwidth allocation:** Network routers extract the highest-priority packet from a max-heap queue to enforce QoS policies.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) removal — efficient even for very large heaps.",
      "Always removes the true maximum — no linear search needed.",
      "In-place — the heap shrinks by one element per call with no auxiliary allocation.",
    ],
    limitations: [
      "Only the maximum is efficiently accessible — arbitrary element access is O(n).",
      "Not stable — equal-priority elements may be extracted in a different order than inserted.",
      "For repeated access to the maximum without removal, heapPeek (O(1)) is more appropriate.",
    ],
  },

  whenToUseIt:
    "Use `heapExtractMax` when you need to repeatedly process the highest-priority item from a dynamic set — scheduling, greedy algorithms, or real-time rankings. If you know the full dataset upfront and only need the top-K elements, consider a partial sort or a selection algorithm. Use a min-heap with negated values when your language only provides a min-heap and you need max-heap behavior.",
};
