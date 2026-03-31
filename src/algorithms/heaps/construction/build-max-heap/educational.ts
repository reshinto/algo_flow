import type { EducationalContent } from "@/types";

export const buildMaxHeapEducational: EducationalContent = {
  overview:
    "**Build Max Heap** transforms an arbitrary array into a valid max-heap — a complete binary tree where every parent node is greater than or equal to its children.\n\nLike its min-heap counterpart, the heap is stored as a flat array: children of the node at index `i` live at `2i+1` (left) and `2i+2` (right). The bottom-up heapify approach builds the max-heap in `O(n)` time by processing each non-leaf node from the bottom up.",

  howItWorks:
    "The algorithm uses the same bottom-up **sift-down** approach as min-heap construction, but the comparison is reversed — we look for the largest child instead of the smallest:\n\n" +
    "1. **Find the last non-leaf** — for an array of size `n`, that's index `⌊n/2⌋ - 1`.\n" +
    "2. **Sift down each node** — from that index down to 0, push each node down until the heap property is restored:\n" +
    "   - Find the largest of the current node and its children.\n" +
    "   - If the current node is not the largest, swap and continue sifting from the swapped position.\n" +
    "   - Stop when the node is already larger than both children, or it's a leaf.\n\n" +
    "### Example: Build Max Heap on [1, 3, 5, 7, 9]\n\n" +
    "```\n" +
    "Start:      1\n" +
    "           / \\\n" +
    "          3   5\n" +
    "         / \\\n" +
    "        7   9\n\n" +
    "Sift-down index 1 (value 3): children are 7 and 9 — 9 > 3, swap.\n" +
    "Sift-down index 0 (value 1): children are 9 and 5 — 9 > 1, swap.\n\n" +
    "Result:     9\n" +
    "           / \\\n" +
    "          7   5\n" +
    "         / \\\n" +
    "        1   3\n" +
    "```\n\n" +
    "Array form: `[9, 7, 5, 1, 3]` — every parent ≥ its children.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Although it appears to be `O(n log n)` (n nodes × O(log n) sift-down), the bottom-up approach is tighter: most nodes are near the leaves and sift down only a few levels. The sum over all nodes converges to `O(n)`.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "The heap is built in-place. Only a constant number of pointer variables are needed regardless of input size. (Recursive sift-down would use `O(log n)` stack space.)",

  bestAndWorstCase:
    "**Best case** — already a valid max-heap: sift-down never swaps for any node, but all `⌊n/2⌋` sift-down calls still execute. Time is still `O(n)`.\n\n" +
    "**Worst case** — sorted ascending input (which forms a min-heap): every non-leaf node must sift all the way down to a leaf. Still `O(n)` total due to the bottom-up analysis, but the constant factor is larger.\n\n" +
    "Time is always `O(n)` for all cases.",

  realWorldUses: [
    "**Heap sort:** Build a max-heap in `O(n)`, then repeatedly extract the maximum and place it at the array's tail to produce a sorted result in `O(n log n)`.",
    "**Priority scheduling:** Operating system schedulers use max-heaps to always run the highest-priority task next.",
    "**K largest elements:** Build a max-heap and extract the top-k elements in `O(n + k log n)` time.",
    "**Stream processing:** Maintain a sliding-window max-heap to efficiently answer 'what is the largest value seen recently?' queries.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) build time — faster than inserting elements one-by-one which would be O(n log n).",
      "In-place — no auxiliary array needed beyond the input.",
      "Provides guaranteed O(log n) extract-max operations after construction.",
    ],
    limitations: [
      "Only guarantees the maximum is at the root — elements are not fully sorted.",
      "Cache-unfriendly compared to sorted arrays due to non-sequential access patterns during sift-down.",
      "Not stable — equal elements may change relative order during heap construction.",
    ],
  },

  whenToUseIt:
    "Use `buildMaxHeap` when you need repeated fast access to the maximum element from a dynamically changing set, such as in a priority queue or scheduler. If you need the top-k elements from a large static array, `buildMaxHeap` followed by k extractions is efficient. Avoid heap sort in cache-sensitive scenarios — quicksort typically outperforms it in practice due to better cache locality.",
};
