import type { EducationalContent } from "@/types";

export const heapExtractMinEducational: EducationalContent = {
  overview:
    "**Heap Extract Min** removes and returns the smallest element from a min-heap — the root node at index 0. Because a min-heap guarantees the root is always the minimum, access is `O(1)`, but after removal the heap must be restructured to restore its invariants.\n\nThe restructuring uses a **sift-down** pass from the new root, which takes `O(log n)` time — making the full operation `O(log n)`.",

  howItWorks:
    "The algorithm works in three phases:\n\n" +
    "1. **Save the minimum** — record the root value (index 0); this is the return value.\n" +
    "2. **Move last to root** — overwrite the root with the last element in the array, then remove the last slot. This maintains the complete binary tree shape.\n" +
    "3. **Sift down** — push the new root downward until the heap property is restored:\n" +
    "   - At each step, find the smaller of the left and right children.\n" +
    "   - If that child is smaller than the current node, swap and continue from the child's position.\n" +
    "   - Stop when the node is ≤ both children, or when it reaches a leaf.\n\n" +
    "### Example: Extract min from [1, 3, 5, 7, 9, 8, 6]\n\n" +
    "```\n" +
    "Initial:      1  ← extracted\n" +
    "             / \\\n" +
    "            3   5\n" +
    "           / \\ / \\\n" +
    "          7  9 8  6\n\n" +
    "Move last (6) to root → remove last:\n" +
    "              6\n" +
    "             / \\\n" +
    "            3   5\n" +
    "           / \\\n" +
    "          7   9\n\n" +
    "Sift down: 6 > child 3 → swap → 6 > child 8? No → done.\n\n" +
    "Result:       3\n" +
    "             / \\\n" +
    "            6   5\n" +
    "           / \\\n" +
    "          7   9\n" +
    "```\n\n" +
    "Extracted value: `1`. Remaining min-heap: `[3, 6, 5, 7, 9]`.\n\n" +
    "### Diagram: Sift-down after extracting 1\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n6((6)) --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n3 --> n7((7))\n" +
    "    n3 --> n9((9))\n" +
    "    style n6 fill:#f59e0b,stroke:#d97706\n" +
    "    style n3 fill:#14532d,stroke:#22c55e\n" +
    "    style n5 fill:#14532d,stroke:#22c55e\n" +
    "    style n7 fill:#14532d,stroke:#22c55e\n" +
    "    style n9 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Node 6 (amber) was moved from the last leaf to the root after extracting 1. It sifts down by swapping with its smallest child (3), restoring heap order.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "Saving the root and moving the last element are both `O(1)`. The sift-down traverses at most one root-to-leaf path (height `⌊log₂ n⌋`), performing one comparison and at most one swap per level.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "The operation is performed in-place. Only a constant number of index variables are needed regardless of heap size. (Recursive sift-down would use O(log n) call stack space.)",

  bestAndWorstCase:
    "**Best case — `O(1)` comparisons after root move:** The last element moved to the root is already smaller than both its children, so sift-down terminates immediately after one comparison.\n\n" +
    "**Worst case — `O(log n)`:** The moved element is the largest and must travel all the way from root to leaf. For a heap of 1 million elements (height ≈ 20), this is still just 40 comparisons at most.\n\n" +
    "The extract operation is always `O(log n)` in the worst case — the variation is only in the constant.",

  realWorldUses: [
    "**Heap sort:** Repeatedly extracting the minimum from a min-heap produces a sorted sequence in O(n log n).",
    "**Dijkstra's algorithm:** Each iteration extracts the unvisited node with the smallest known distance from the min-heap.",
    "**A* pathfinding:** The node with the lowest f-score is extracted at each step to explore the most promising path.",
    "**Event-driven simulations:** Extract the next scheduled event (smallest timestamp) from the min-heap to process events in chronological order.",
    "**Streaming top-K:** A min-heap of size K uses extract-min to evict the smallest element when a larger one arrives, maintaining the top-K set.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) removal — efficient even for very large heaps.",
      "Always removes the true minimum — no searching required.",
      "In-place — the heap shrinks by one element per call with no extra allocation.",
    ],
    limitations: [
      "Removes only the minimum — extracting an arbitrary element requires O(n) search first.",
      "Heap is not stable — equal elements may emerge in a different order than they were inserted.",
      "Not suitable when you need repeated access to the same minimum without removing it — use peek instead.",
    ],
  },

  whenToUseIt:
    "Use `heapExtractMin` when you have a priority queue and need to process elements in ascending priority order one-by-one. It is the core operation of event-driven simulations, shortest-path algorithms, and scheduling systems. If you only want to inspect the minimum without removing it, use `heapPeek` (O(1)). If you need all elements sorted, consider whether a full sort or a k-way merge would be more appropriate.",
};
