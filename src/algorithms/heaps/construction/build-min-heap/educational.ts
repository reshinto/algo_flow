import type { EducationalContent } from "@/types";

export const buildMinHeapEducational: EducationalContent = {
  overview:
    "**Build Min Heap** transforms an arbitrary array into a valid min-heap — a complete binary tree where every parent node is smaller than or equal to its children.\n\nThe key insight is that a heap can be stored as a flat array: the children of the node at index `i` live at `2i+1` (left) and `2i+2` (right). Building a heap in-place takes `O(n)` time by starting from the last non-leaf node and sifting each node downward.",

  howItWorks:
    "The algorithm uses a bottom-up approach called **heapify**:\n\n" +
    "1. **Find the last non-leaf** — for an array of size `n`, that's index `⌊n/2⌋ - 1`.\n" +
    "2. **Sift down each node** — from that index down to 0, push each node down until the heap property is restored:\n" +
    "   - Find the smallest of the current node and its children.\n" +
    "   - If the current node is not the smallest, swap and continue sifting from the swapped position.\n" +
    "   - Stop when the node is already smaller than both children, or it's a leaf.\n\n" +
    "### Example: Build Min Heap on [9, 5, 7, 1, 3]\n\n" +
    "```\n" +
    "Start:      9\n" +
    "           / \\\n" +
    "          5   7\n" +
    "         / \\\n" +
    "        1   3\n\n" +
    "Sift-down index 1 (value 5): children are 1 and 3 — 1 < 5, swap.\n" +
    "Sift-down index 0 (value 9): children are 1 and 7 — 1 < 9, swap.\n\n" +
    "Result:     1\n" +
    "           / \\\n" +
    "          3   7\n" +
    "         / \\\n" +
    "        9   5\n" +
    "```\n\n" +
    "Array form: `[1, 3, 7, 9, 5]` — every parent ≤ its children.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Although it appears to be `O(n log n)` (n nodes × O(log n) sift-down), the bottom-up approach is tighter: most nodes are near the leaves and sift down only a few levels. The sum over all nodes converges to `O(n)`.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "The heap is built in-place. Only a constant number of pointer variables are needed regardless of input size. (Recursive sift-down would use `O(log n)` stack space.)",

  bestAndWorstCase:
    "**Best case** — already a valid min-heap: sift-down never swaps for any node, but all `⌊n/2⌋` sift-down calls still execute. Time is still `O(n)`.\n\n" +
    "**Worst case** — reverse-sorted input (descending order forms a max-heap): every non-leaf node must sift all the way to its subtree's leaf. Still `O(n)` total due to the bottom-up analysis, but the constant factor is larger.\n\n" +
    "Time is always `O(n)` for all cases.",

  realWorldUses: [
    "**Priority queues:** The foundation of `std::priority_queue` (C++), `heapq` (Python), and `PriorityQueue` (Java) — all built on heap construction.",
    "**Heap sort:** Build the heap in `O(n)`, then repeatedly extract the minimum in `O(log n)` for an overall `O(n log n)` comparison sort.",
    "**Dijkstra's algorithm:** Uses a min-heap to efficiently extract the node with the shortest known distance at each step.",
    "**k-way merging:** Merge `k` sorted lists by maintaining a min-heap of size `k` to always pick the globally smallest next element.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) build time — faster than inserting elements one-by-one which would be O(n log n).",
      "In-place — no auxiliary array needed beyond the input.",
      "Provides guaranteed O(log n) extract-min operations after construction.",
    ],
    limitations: [
      "Only guarantees the minimum is at the root — elements are not fully sorted.",
      "Cache-unfriendly compared to sorted arrays due to non-sequential access patterns during sift-down.",
      "Iterative sift-down requires managing an explicit loop; recursive versions use O(log n) stack space.",
    ],
  },

  whenToUseIt:
    "Use `buildMinHeap` when you need fast repeated access to the minimum element from a dynamically changing set. If you only need the top-k elements from a static collection, consider a partial sort instead. For a fully sorted result, prefer merge sort or quicksort over heap sort in practice.",
};
