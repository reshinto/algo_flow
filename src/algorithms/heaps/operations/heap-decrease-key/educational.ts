import type { EducationalContent } from "@/types";

export const heapDecreaseKeyEducational: EducationalContent = {
  overview:
    "**Heap Decrease Key** updates a node's value to a smaller value in a min-heap, then restores the heap property by sifting the node upward.\n\nDecreasing a key can only violate the heap property upward — the new smaller value might be less than its parent — so only a sift-up is needed. This operation is central to algorithms like Dijkstra's shortest path and Prim's MST that repeatedly lower the priority of a node already in the heap.",

  howItWorks:
    "The algorithm has two steps:\n\n" +
    "1. **Update** — set `array[targetIndex] = newValue` (where `newValue < array[targetIndex]`).\n" +
    "2. **Sift-up** — bubble the updated node toward the root until it is ≥ its parent or reaches index 0:\n" +
    "   - Compute `parentIndex = ⌊(currentIndex - 1) / 2⌋`.\n" +
    "   - If `array[currentIndex] < array[parentIndex]`, swap them and continue from `parentIndex`.\n" +
    "   - Otherwise the heap property is restored; stop.\n\n" +
    "### Example: Decrease key at index 3 from 7 to 2 in [1, 5, 3, 7, 9, 8, 6]\n\n" +
    "```\n" +
    "Before:     1\n" +
    "           / \\\n" +
    "          5   3\n" +
    "         / \\ / \\\n" +
    "        7  9 8  6\n\n" +
    "Set index 3 → 2:\n" +
    "          1\n" +
    "         / \\\n" +
    "        5   3\n" +
    "       / \\ / \\\n" +
    "      2  9 8  6\n\n" +
    "Sift-up index 3: parent at index 1 is 5; 2 < 5, swap.\n" +
    "          1\n" +
    "         / \\\n" +
    "        2   3\n" +
    "       / \\ / \\\n" +
    "      5  9 8  6\n\n" +
    "Sift-up index 1: parent at index 0 is 1; 2 ≥ 1, stop.\n" +
    "Result: [1, 2, 3, 5, 9, 8, 6]\n" +
    "```\n\n" +
    "### After Decrease-Key: Node 2 Settled at Its New Position\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n1((1)) --> n2((2))\n" +
    "    n1 --> n3((3))\n" +
    "    n2 --> n5((5))\n" +
    "    n2 --> n9((9))\n" +
    "    n3 --> n8((8))\n" +
    "    n3 --> n6((6))\n" +
    "    style n1 fill:#14532d,stroke:#22c55e\n" +
    "    style n2 fill:#f59e0b,stroke:#d97706\n" +
    "    style n3 fill:#14532d,stroke:#22c55e\n" +
    "    style n5 fill:#14532d,stroke:#22c55e\n" +
    "    style n9 fill:#14532d,stroke:#22c55e\n" +
    "    style n8 fill:#14532d,stroke:#22c55e\n" +
    "    style n6 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Amber node (2) was originally 7 at index 3 — after the key decrease it sifted up one level past its parent (5), stopping when it reached a node smaller than itself (1). All green nodes remained undisturbed.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "The update is `O(1)`. The sift-up traverses at most `⌊log₂ n⌋` levels from the updated node to the root.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "Only a constant number of index variables are used. The heap is modified in-place.",

  bestAndWorstCase:
    "**Best case** — the new value is still ≥ its parent: no swaps occur, the loop exits immediately after the first comparison. `O(1)` effective work after the update.\n\n" +
    "**Worst case** — the new value is smaller than every ancestor all the way to the root: `O(log n)` swaps as the node bubbles from a leaf to the root.",

  realWorldUses: [
    "**Dijkstra's algorithm:** When a shorter path to a node is found, decrease-key lowers its tentative distance in the priority queue.",
    "**Prim's MST algorithm:** When a cheaper edge to a vertex is discovered, its key is decreased to reflect the new minimum edge cost.",
    "**A* search:** Updating the `f`-score of an already-queued node when a better path is found.",
    "**Event simulation:** Rescheduling an event to an earlier time without removing and reinserting it.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) — efficient in-place priority update without removing and reinserting.",
      "Only sift-up is needed — decreasing a key can never violate downward heap order.",
      "Fundamental building block for many greedy and graph algorithms.",
    ],
    limitations: [
      "Requires knowing the target index — heaps do not support O(1) lookup by value.",
      "Only valid for decreasing keys in a min-heap (or increasing keys in a max-heap).",
      "Standard binary heap does not support decrease-key by value without an auxiliary index map — Fibonacci heaps do this more efficiently with O(1) amortized decrease-key.",
    ],
  },

  whenToUseIt:
    "Use heap-decrease-key when you maintain a priority queue alongside an index map so that priority updates remain `O(log n)`. It is especially valuable in graph algorithms where node priorities change dynamically as shorter or cheaper paths are discovered. If priorities only ever increase, use heap-increase-key (sift-down) instead.",
};
