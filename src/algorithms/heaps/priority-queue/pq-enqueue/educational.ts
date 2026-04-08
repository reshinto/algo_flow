import type { EducationalContent } from "@/types";

export const pqEnqueueEducational: EducationalContent = {
  overview:
    "**PQ Enqueue** inserts a new element with a given priority into a **Priority Queue** — an abstract data type that always serves the highest-priority element first.\n\nA binary min-heap is the standard implementation: elements are stored as an array where the smallest value (highest priority) sits at the root. Enqueue appends the new element at the end and **sifts it up** until the heap property is restored.",

  howItWorks:
    "Enqueueing into a min-heap priority queue follows two steps:\n\n" +
    "1. **Append** — place the new value at the next available position (the end of the array). This maintains the *shape* property (complete binary tree) but may temporarily break the *heap* property.\n" +
    "2. **Sift up** — repeatedly compare the new element with its parent:\n" +
    "   - If the new element is smaller (higher priority), swap with its parent and continue from the parent's position.\n" +
    "   - If the new element is ≥ its parent (or the root is reached), stop — the heap property is restored.\n\n" +
    "### Example: Enqueue 3 into [2, 5, 8, 10, 15]\n\n" +
    "```\n" +
    "Priority Queue (heap):   2\n" +
    "                        / \\\n" +
    "                       5   8\n" +
    "                      / \\\n" +
    "                     10  15\n\n" +
    "After append 3:          2\n" +
    "                        / \\\n" +
    "                       5   8\n" +
    "                      / \\ /\n" +
    "                     10 15 3  ← new element\n\n" +
    "Sift up: 3 < parent 8 → swap → 3 > parent 2 → done.\n\n" +
    "Result:                  2\n" +
    "                        / \\\n" +
    "                       5   3\n" +
    "                      / \\ /\n" +
    "                     10 15 8\n" +
    "```\n\n" +
    "The Priority Queue ADT guarantees `dequeue()` always returns 2 (the minimum) next.\n\n" +
    "### Diagram: After enqueuing 3 into [2, 5, 8, 10, 15]\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n2((2)) --> n5((5))\n" +
    "    n2 --> n3((3))\n" +
    "    n5 --> n10((10))\n" +
    "    n5 --> n15((15))\n" +
    "    n3 --> n8((8))\n" +
    "    style n2 fill:#06b6d4,stroke:#0891b2\n" +
    "    style n3 fill:#f59e0b,stroke:#d97706\n" +
    "    style n5 fill:#14532d,stroke:#22c55e\n" +
    "    style n10 fill:#14532d,stroke:#22c55e\n" +
    "    style n15 fill:#14532d,stroke:#22c55e\n" +
    "    style n8 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Node 3 (amber) was appended as a leaf under 8, then sifted up — swapping with parent 8 — to reach its correct position. The root (cyan, value 2) remains the highest-priority element.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "Appending to the end is `O(1)`. The sift-up traverses at most one root-to-leaf path of height `⌊log₂ n⌋`, performing one comparison and at most one swap per level. Total: `O(log n)`.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "Only index variables are used during sift-up. The new element is stored in the array itself — no additional memory proportional to `n` is required.",

  bestAndWorstCase:
    "**Best case — `O(1)`:** The enqueued value is larger than its immediate parent. No swaps are needed; sift-up terminates after one comparison.\n\n" +
    "**Worst case — `O(log n)`:** The enqueued value is the new global minimum (highest priority). It must travel all the way from the last leaf to the root, swapping at every level. For a queue of 1 million elements (height ≈ 20), this is still just 20 comparisons.",

  realWorldUses: [
    "**Task schedulers:** OS process schedulers enqueue processes by priority; the scheduler always dequeues the highest-priority process to run next.",
    "**Event-driven simulations:** Simulation events are enqueued with their scheduled timestamp as priority, ensuring chronological execution.",
    "**Dijkstra's shortest path:** Each candidate node is enqueued with its current distance estimate, allowing the algorithm to always expand the closest unvisited node.",
    "**A* pathfinding:** Candidate positions are enqueued with their f-score (cost + heuristic), guiding the search toward the goal efficiently.",
    "**Print queues and bandwidth management:** Jobs or packets are enqueued with urgency levels, ensuring high-priority work is processed first.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) guaranteed — enqueue remains fast even for millions of elements.",
      "In-place — the array grows by one element with no auxiliary allocation.",
      "Directly maps to the Priority Queue ADT — the heap is the canonical implementation.",
    ],
    limitations: [
      "Heap is not fully sorted — only the minimum (root) is immediately accessible; other elements require O(log n) dequeues.",
      "Not cache-friendly during sift-up — index jumps break spatial locality.",
      "Bulk initialization is O(n) via heapify, not O(n log n) via repeated enqueue — prefer heapify when all elements are known upfront.",
    ],
  },

  whenToUseIt:
    "Use PQ Enqueue whenever elements arrive dynamically and you need to maintain a sorted-by-priority collection with O(1) access to the minimum and O(log n) insertion. If all elements are known in advance, prefer `heapify` (O(n)) over repeated enqueues (O(n log n)). Avoid if you need random access or frequent search by value — a balanced BST offers O(log n) for those operations at the cost of more memory.",
};
