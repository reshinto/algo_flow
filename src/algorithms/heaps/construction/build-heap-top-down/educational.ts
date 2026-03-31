import type { EducationalContent } from "@/types";

export const buildHeapTopDownEducational: EducationalContent = {
  overview:
    "**Build Heap Top-Down** constructs a min-heap by inserting elements one at a time, each time restoring the heap property via **sift-up** (also called bubble-up or percolate-up).\n\nUnlike the bottom-up `O(n)` approach, the top-down method is `O(n log n)` — but it is conceptually simpler and mirrors how elements are inserted into a live heap during normal operation. Understanding this approach illuminates how dynamic priority queues work.",

  howItWorks:
    "The algorithm processes elements left to right, growing the heap one node at a time:\n\n" +
    "1. **Start with an empty heap**.\n" +
    "2. **Insert each element** — append it to the end of the heap array (the next available position in the complete binary tree).\n" +
    "3. **Sift up** — compare the new element with its parent. If the new element is smaller (for a min-heap), swap and continue upward. Stop when the element is larger than its parent, or it reaches the root.\n\n" +
    "### Example: Build Top-Down on [9, 5, 7, 1]\n\n" +
    "```\n" +
    "Insert 9:   [9]          — root, no sift-up needed\n" +
    "Insert 5:   [9, 5]       — 5 < 9, swap → [5, 9]\n" +
    "Insert 7:   [5, 9, 7]    — 7 > 5, settled\n" +
    "Insert 1:   [5, 9, 7, 1] — 1 < 9, swap → [5, 1, 7, 9]\n" +
    "                         — 1 < 5, swap → [1, 5, 7, 9]\n" +
    "```\n\n" +
    "Final result: `[1, 5, 7, 9]` — a valid min-heap.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)`**\n\n" +
    "Each of the `n` insertions may trigger a sift-up that travels `O(log n)` levels. Unlike the bottom-up build, there is no telescoping sum that collapses to `O(n)` — each insertion is independently `O(log n)`, giving `O(n log n)` overall.\n\n" +
    "**Space Complexity: `O(1)` auxiliary (in-place variant)**\n\n" +
    "If the heap is grown in-place in the input array, only a constant number of pointer variables are needed. The dynamic variant (using a separate array or list) uses `O(n)` space for the result.",

  bestAndWorstCase:
    "**Best case** — already a valid min-heap: each insertion's sift-up terminates immediately (new element ≥ parent). But the loop still runs `n` times, so time is `O(n)` in this special case.\n\n" +
    "**Worst case** — reverse-sorted descending input: each new element inserted is the smallest seen so far and must sift all the way up to the root. This yields the full `O(n log n)` behavior.\n\n" +
    "The bottom-up approach (`O(n)`) is always faster for initial heap construction from a static array.",

  realWorldUses: [
    "**Dynamic priority queues:** When elements arrive one at a time (e.g., network packets, task submissions), each insertion naturally uses sift-up — this is the exact same operation.",
    "**Online algorithms:** Algorithms that process a stream of data and must maintain a heap without knowing all elements upfront use this insertion model.",
    "**Teaching tool:** The top-down approach mirrors Python's `heapq.heappush`, Java's `PriorityQueue.add`, and C++'s `priority_queue::push` — understanding it clarifies how library heaps work.",
    "**Incremental construction:** When elements must be validated or filtered before insertion, the top-down build naturally interleaves with per-element logic.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Conceptually simple — mirrors standard heap insertion used in all priority queue libraries.",
      "Works for dynamic insertion — elements do not need to be known in advance.",
      "Straightforward to implement correctly without off-by-one errors common in bottom-up builds.",
    ],
    limitations: [
      "O(n log n) vs O(n) for bottom-up — significantly slower for large static arrays.",
      "Each sift-up traverses the path to the root, causing more cache misses than bottom-up sift-down on average.",
      "Not suitable when constructing a heap from a known complete dataset — prefer buildMinHeap or buildMaxHeap instead.",
    ],
  },

  whenToUseIt:
    "Use the top-down approach when elements arrive dynamically and must be inserted into an existing heap one at a time — this is the standard library heap insertion model. For building a heap from a known complete array, always prefer the `O(n)` bottom-up approach (`buildMinHeap` or `buildMaxHeap`). The top-down method is most valuable as a teaching tool and for understanding how live priority queues operate.",
};
