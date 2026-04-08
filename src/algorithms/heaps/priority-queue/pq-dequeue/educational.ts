import type { EducationalContent } from "@/types";

export const pqDequeueEducational: EducationalContent = {
  overview:
    "**PQ Dequeue** removes and returns the highest-priority element from a **Priority Queue** — in a min-heap implementation, this is always the smallest value at the root.\n\nBecause the root cannot simply be removed (it would leave a hole), the algorithm replaces it with the last leaf, shrinks the heap by one, then **sifts the new root down** to restore the heap property.",

  howItWorks:
    "Dequeueing from a min-heap priority queue follows three steps:\n\n" +
    "1. **Extract root** — record the root value (the highest-priority element). This is the return value.\n" +
    "2. **Swap root with last leaf** — place the last element at the root position and remove the last leaf. This maintains the *shape* property (complete binary tree) but breaks the *heap* property.\n" +
    "3. **Sift down** — repeatedly compare the new root with its children:\n" +
    "   - If a child is smaller (higher priority), swap with the smallest child and continue from that child's position.\n" +
    "   - Stop when both children are larger (or a leaf is reached) — the heap property is restored.\n\n" +
    "### Example: Dequeue from [2, 5, 3, 10, 15, 8, 7]\n\n" +
    "```\n" +
    "Priority Queue:    2          ← dequeued\n" +
    "                  / \\\n" +
    "                 5   3\n" +
    "                / \\ / \\\n" +
    "               10 15 8  7\n\n" +
    "After swap+remove:  7\n" +
    "                   / \\\n" +
    "                  5   3\n" +
    "                 / \\ /\n" +
    "                10 15 8\n\n" +
    "Sift down: 7 > child 3 → swap → 7 > child 8? No → done.\n\n" +
    "Result:            3\n" +
    "                  / \\\n" +
    "                 5   7\n" +
    "                / \\ /\n" +
    "               10 15 8\n" +
    "```\n\n" +
    "The dequeued value is 2 (minimum). The queue now serves 3 next.\n\n" +
    "### Diagram: Priority queue after dequeuing 2 from [2, 5, 3, 10, 15, 8, 7]\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n3((3)) --> n5((5))\n" +
    "    n3 --> n7((7))\n" +
    "    n5 --> n10((10))\n" +
    "    n5 --> n15((15))\n" +
    "    n7 --> n8((8))\n" +
    "    style n3 fill:#06b6d4,stroke:#0891b2\n" +
    "    style n7 fill:#f59e0b,stroke:#d97706\n" +
    "    style n5 fill:#14532d,stroke:#22c55e\n" +
    "    style n10 fill:#14532d,stroke:#22c55e\n" +
    "    style n15 fill:#14532d,stroke:#22c55e\n" +
    "    style n8 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "After dequeuing 2, the last element 7 (amber) moved to the root and sifted down — swapping with child 3. Node 3 (cyan) is now the new minimum, ready to be dequeued next.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "Extracting the root and placing the last element there are both `O(1)`. The sift-down then traverses at most one root-to-leaf path of height `⌊log₂ n⌋`, performing two comparisons (left and right child) per level. Total: `O(log n)`.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "Only index variables and one temporary value are used during sift-down. No extra data structure is needed.",

  bestAndWorstCase:
    "**Best case — `O(1)`:** After placing the last element at the root, it is already smaller than both children. Sift-down terminates after one comparison.\n\n" +
    "**Worst case — `O(log n)`:** The last element moved to the root is the largest in the heap. It must travel all the way from root to a leaf, swapping at every level. For a queue of 1 million elements (height ≈ 20), this is still just 20 levels of comparisons.",

  realWorldUses: [
    "**Task execution:** OS schedulers dequeue the next process to run — always the one with the highest urgency or shortest burst time.",
    "**Dijkstra's algorithm:** Each iteration dequeues the unvisited node with the smallest tentative distance, driving the shortest-path search.",
    "**A* pathfinding:** The open list is a priority queue; dequeue always yields the node with the best f-score to expand next.",
    "**Event-driven simulations:** The next event to execute is always dequeued from the priority queue ordered by simulation time.",
    "**Huffman coding:** Minimum-frequency nodes are repeatedly dequeued to build the optimal prefix-free tree.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) guaranteed — dequeue remains efficient even for massive queues.",
      "In-place — no auxiliary allocation; the array shrinks by one element.",
      "Always correct — the algorithm guarantees the globally smallest element is returned.",
    ],
    limitations: [
      "Only the minimum is accessible in O(1) — retrieving the second-smallest requires a dequeue.",
      "Not stable — elements with equal priority may be dequeued in an unpredictable order.",
      "Sift-down touches non-contiguous memory locations, which is cache-unfriendly on large heaps.",
    ],
  },

  whenToUseIt:
    "Use PQ Dequeue whenever you need to repeatedly consume the highest-priority item from a dynamic collection. It pairs with PQ Enqueue to build complete priority queue workflows. Avoid if you need to peek at multiple priority levels simultaneously — consider a sorted list or skip list. If all elements are dequeued in one pass, heapsort may be more appropriate than repeatedly dequeueing.",
};
