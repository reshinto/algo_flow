import type { EducationalContent } from "@/types";

export const heapifySingleNodeEducational: EducationalContent = {
  overview:
    "**Heapify Single Node** demonstrates the core `sift-down` operation on a single subtree root — pushing one out-of-place node down to its correct position in the heap.\n\nThis is the fundamental building block of both heap construction (used `⌊n/2⌋` times in `buildMinHeap`) and heap extraction (restoring the heap after the root is removed). Understanding a single sift-down is the key to understanding all heap operations.",

  howItWorks:
    "The algorithm starts at a chosen `targetIndex` and repeatedly moves the node downward until the min-heap property is satisfied:\n\n" +
    "1. **Start at the target node** — this is the node we want to push to its correct position.\n" +
    "2. **Find the smallest child** — compare the current node with its left and right children (if they exist).\n" +
    "3. **Swap if needed** — if the current node is larger than the smallest child, swap them.\n" +
    "4. **Continue from the swapped position** — repeat from the new position of the swapped node.\n" +
    "5. **Stop** — when the node is smaller than both children, or it has reached a leaf.\n\n" +
    "### Example: Heapify index 0 on [9, 1, 7, 2, 3, 8, 5, 6, 4]\n\n" +
    "```\n" +
    "Initial:         9\n" +
    "               /   \\\n" +
    "              1     7\n" +
    "             / \\   / \\\n" +
    "            2   3 8   5\n" +
    "           / \\\n" +
    "          6   4\n\n" +
    "Step 1: 9 vs children 1, 7 — smallest is 1, swap 9↔1\n" +
    "Step 2: 9 vs children 2, 3 — smallest is 2, swap 9↔2\n" +
    "Step 3: 9 vs children 6, 4 — smallest is 4, swap 9↔4\n" +
    "Step 4: 9 is at a leaf — settled\n\n" +
    "Result:          1\n" +
    "               /   \\\n" +
    "              2     7\n" +
    "             / \\   / \\\n" +
    "            4   3 8   5\n" +
    "           / \\\n" +
    "          6   9\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "The sift-down path follows a single root-to-leaf path in the binary tree, which has at most `⌊log₂ n⌋ + 1` levels. Each level performs a constant number of comparisons and at most one swap.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "Only a constant number of index variables are maintained. The operation is purely in-place with no recursion stack overhead (when implemented iteratively).",

  bestAndWorstCase:
    "**Best case — `O(1)`:** The target node is already smaller than both children. No swaps occur; the algorithm terminates after one comparison round.\n\n" +
    "**Worst case — `O(log n)`:** The target node contains the largest value in its subtree and must travel all the way to a leaf. This happens when heapifying the root of a complete tree after extracting the minimum.",

  realWorldUses: [
    "**Heap extraction:** After removing the root (minimum/maximum), the last element is placed at the root and a single sift-down restores the heap — this is `heapq.heappop` in Python, `PriorityQueue.poll` in Java.",
    "**Heap construction:** `buildMinHeap` calls sift-down on each non-leaf node exactly once — understanding the single operation explains why the whole build runs in `O(n)`.",
    "**Heap sort:** After building a max-heap, each extraction step swaps the root with the last element and sift-downs — a direct application of this exact operation.",
    "**Educational foundation:** Every major heap library (Python `heapq`, Java `PriorityQueue`, C++ `std::priority_queue`) uses sift-down as its internal restore operation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) per call — extremely fast; the height of the tree grows only logarithmically with n.",
      "In-place with O(1) auxiliary space — no allocation required.",
      "The foundation of heap sort, priority queue extraction, and O(n) heap construction.",
    ],
    limitations: [
      "Only fixes one node — the rest of the tree must already satisfy the heap property below the target node for the result to be a valid heap.",
      "If the target node's subtree violates heap property at multiple levels, a single sift-down starting from the target will not fix all violations — callers must ensure the subtree rooted at each child is already valid.",
      "Not directly useful for inserting new elements — use sift-up (addNode) for insertions.",
    ],
  },

  whenToUseIt:
    "Use sift-down when restoring the heap property after removing or replacing the root, or when building a heap bottom-up (calling sift-down on each non-leaf in reverse order). Use sift-up instead when inserting a new element at the end. This algorithm is most valuable as a standalone educational demonstration — in production code it appears implicitly inside heap extraction and construction routines.",
};
