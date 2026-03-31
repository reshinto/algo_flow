import type { EducationalContent } from "@/types";

export const findMedianStreamEducational: EducationalContent = {
  overview:
    "**Find Median from Data Stream** computes the running median after each new number arrives from a stream. Instead of re-sorting on every insertion, it uses **two heaps** that together partition all seen values into a lower half and an upper half.\n\n" +
    "- **maxHeap** (lower half): a max-heap whose root is the largest value in the lower half.\n" +
    "- **minHeap** (upper half): a min-heap whose root is the smallest value in the upper half.\n\n" +
    "By keeping these two heaps balanced in size, the median is always available in **O(1)** as the root of one or both heaps. This is LeetCode problem 295 and a classic streaming algorithm.",

  howItWorks:
    "For each new number from the stream:\n\n" +
    "1. **Route the number** — if the number is ≤ the maxHeap root (or maxHeap is empty), push it onto maxHeap (lower half); otherwise push it onto minHeap (upper half). Sift to restore heap order.\n" +
    "2. **Rebalance** — enforce that `|maxHeap| - |minHeap| ≤ 1` and `|minHeap| ≤ |maxHeap|`:\n" +
    "   - If maxHeap grew too large (size > minHeap + 1), extract its root and insert into minHeap.\n" +
    "   - If minHeap grew larger than maxHeap, extract its root and insert into maxHeap.\n" +
    "3. **Read the median:**\n" +
    "   - Odd total: median = root of maxHeap (the larger heap).\n" +
    "   - Even total: median = average of both roots.\n\n" +
    "### Example: stream = [5, 2, 8, 1, 9, 3, 7]\n\n" +
    "```\n" +
    "Insert 5  → maxHeap: [5]       minHeap: []      → median: 5\n" +
    "Insert 2  → maxHeap: [5, 2]    minHeap: []      → rebalance → maxHeap: [5], minHeap: [2]? No\n" +
    "           → 2 ≤ 5, goes to maxHeap → [5, 2]   → median: (5+2)/2 = 3.5 — wait, still unbalanced\n" +
    "           → Actually maxHeap=[5,2], minHeap=[] → sizes 2 vs 0, diff=2 → move 5→minHeap\n" +
    "           → maxHeap: [2], minHeap: [5]         → median: (2+5)/2 = 3.5\n" +
    "Insert 8  → 8 > 2, goes to minHeap: [5, 8]     → maxHeap: [2], sizes equal → median: (2+5)/2 = 3.5\n" +
    "           → Wait: 8 > maxHeap root 2 → minHeap: [5, 8] → sizes 1 vs 2, rebalance\n" +
    "           → move 5 from minHeap → maxHeap: [5, 2], minHeap: [8] → median: 5\n" +
    "Insert 1  → 1 ≤ 5, maxHeap: [5, 2, 1] → rebalance, move 5 → minHeap: [5, 8]\n" +
    "           → maxHeap: [2, 1], minHeap: [5, 8]  → median: (2+5)/2 = 3.5\n" +
    "...and so on\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)` per insertion**\n\n" +
    "Each number insertion triggers at most two heap operations (one insert + one rebalance extract/insert). Each heap operation on a heap of size n takes O(log n). Reading the median is O(1).\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "All n stream elements are stored across the two heaps.",

  bestAndWorstCase:
    "**Best case — O(log n):** Every insertion routes to the correct heap and no rebalancing is needed. Sifting still costs O(log n) in the worst arrangement.\n\n" +
    "**Worst case — O(log n):** Every insertion triggers a rebalance, which is one additional extract and insert, so 2× the constant. Asymptotically still O(log n).\n\n" +
    "The two-heap approach is uniformly O(log n) per element — far better than naive O(n) re-sorting or O(n²) insertion sort approaches.",

  realWorldUses: [
    "**Streaming analytics:** Computing real-time median response times, latency percentiles, or sensor readings from a continuous data feed.",
    "**Financial systems:** Running median of stock prices or trade sizes to detect anomalies in live market data.",
    "**Medical monitoring:** Tracking the median heart rate or blood pressure from a continuous patient sensor stream.",
    "**Load balancing:** Finding the median server load across a fleet to decide routing, updated with each new metric ping.",
    "**Search engines:** Maintaining median document relevance scores as new documents are indexed in real time.",
    "**Competitive programming:** The basis for many sliding-window median problems, extended with lazy deletion.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) per insertion — far faster than re-sorting O(n log n) or linear scan O(n) for each new element.",
      "O(1) median read — the median is always instantly available at the heap roots.",
      "Streaming-compatible — works on unbounded data streams without storing history explicitly.",
      "Exact median — no approximation; the result is always precisely correct.",
    ],
    limitations: [
      "O(n) space — all elements are retained across the two heaps.",
      "Not designed for deletion — removing an arbitrary element from a binary heap is O(n). Extensions use lazy deletion with a hash map.",
      "Two-heap invariant requires careful implementation — off-by-one rebalancing bugs are common.",
      "Not cache-friendly — heap pointer-chasing is less cache-efficient than array-based approaches for small n.",
    ],
  },

  whenToUseIt:
    "Use the two-heap median finder when you need **exact running medians from a data stream** where elements arrive one at a time and the total count is not known in advance. It is the canonical solution to LeetCode 295 and similar problems.\n\n" +
    "Prefer a **sorted array with binary search** if the dataset is small and static. Use an **order-statistics tree** (e.g., a balanced BST with rank tracking) if you also need arbitrary-rank queries or range medians. For **sliding-window medians**, extend the two-heap approach with lazy deletion (mark elements as invalid using a hash map) rather than rebuilding from scratch.",
};
