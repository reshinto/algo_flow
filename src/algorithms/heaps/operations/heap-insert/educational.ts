import type { EducationalContent } from "@/types";

export const heapInsertEducational: EducationalContent = {
  overview:
    "**Heap Insert** adds a new value to an existing min-heap while preserving the heap property — the rule that every parent must be smaller than or equal to its children.\n\nThe strategy is to append the value at the end of the array (becoming the last leaf in the tree), then **sift it upward** by repeatedly swapping it with its parent until it either reaches the root or finds a parent that is already smaller.",

  howItWorks:
    "The algorithm works in two phases:\n\n" +
    "1. **Append** — place the new value at the next available leaf position (the end of the array). This satisfies the *shape* property (complete binary tree) but may violate the *heap* property.\n" +
    "2. **Sift up** — repeatedly compare the inserted node with its parent:\n" +
    "   - If the node is smaller than its parent, swap them and continue from the parent's position.\n" +
    "   - If the node is ≥ its parent (or the root is reached), stop — the heap property is restored.\n\n" +
    "### Example: Insert 2 into [1, 3, 5, 7, 9, 8, 6]\n\n" +
    "```\n" +
    "Initial heap:     1\n" +
    "                 / \\\n" +
    "                3   5\n" +
    "               / \\ / \\\n" +
    "              7  9 8  6\n\n" +
    "Append 2:         1\n" +
    "                 / \\\n" +
    "                3   5\n" +
    "               / \\ / \\ \\\n" +
    "              7  9 8  6  2   ← new leaf\n\n" +
    "Sift up: 2 < parent 5 → swap → 2 < parent 1? No → done.\n\n" +
    "Result:           1\n" +
    "                 / \\\n" +
    "                3   2\n" +
    "               / \\ / \\ \\\n" +
    "              7  9 8  6  5\n" +
    "```\n\n" +
    "Parent of index `i` is always at `⌊(i-1)/2⌋`, making traversal upward `O(log n)`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "Appending to the end is `O(1)`. The sift-up then travels at most one path from a leaf to the root, which has height `⌊log₂ n⌋`. Each level requires one comparison and at most one swap, so the worst case is `O(log n)` total.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "Only a constant number of index variables are used during sift-up. The new value is stored in the array itself — no extra memory proportional to `n` is required.",

  bestAndWorstCase:
    "**Best case — `O(1)`:** The inserted value is larger than its immediate parent. No swaps are needed; sift-up terminates after one comparison.\n\n" +
    "**Worst case — `O(log n)`:** The inserted value is the new global minimum. It must travel all the way from the last leaf to the root, swapping at every level. For a heap of 1 million elements (height ≈ 20), this is still just 20 swaps.\n\n" +
    "Both best and worst refer to the same algorithm — the difference is purely how many sift-up swaps occur.",

  realWorldUses: [
    "**Priority queues:** Every `push()` (or `offer()`) operation in a priority queue is a heap insert — used in task schedulers, event-driven simulations, and OS process queuing.",
    "**Dijkstra's algorithm:** When a shorter path to a node is found, inserting the updated priority into the min-heap drives the algorithm forward.",
    "**A* pathfinding:** Candidate nodes are inserted with their f-score priority, enabling the algorithm to always expand the most promising path next.",
    "**K-way merge:** Inserting the next element from each sorted sublist into the heap maintains the ability to efficiently extract the globally smallest element.",
    "**Median maintenance:** The insert operation feeds elements into dual heaps (max-heap for lower half, min-heap for upper half) to track the running median.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) guaranteed — inserts are fast even for large heaps.",
      "In-place — no auxiliary data structure is needed beyond the array itself.",
      "Simple implementation — just one array index calculation per level traversal.",
    ],
    limitations: [
      "Heap is not fully sorted — you can only efficiently access the minimum (root), not arbitrary elements.",
      "Not cache-friendly during sift-up — accesses jump between distant array indices.",
      "If many inserts are needed at once, building a heap from scratch with buildMinHeap is O(n) versus O(n log n) for n individual inserts.",
    ],
  },

  whenToUseIt:
    "Use heap insert when you have a live priority queue where new elements arrive over time and you need O(log n) additions with O(1) min-access. If you are initializing the heap from a known set of values, prefer `buildMinHeap` (O(n)) over n individual inserts (O(n log n)). Avoid if you frequently need to search for arbitrary elements or access elements beyond the minimum — a balanced BST offers O(log n) for both.",
};
