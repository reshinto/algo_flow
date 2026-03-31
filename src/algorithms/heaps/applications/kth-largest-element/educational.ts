import type { EducationalContent } from "@/types";

export const kthLargestElementEducational: EducationalContent = {
  overview:
    "**Kth Largest Element** finds the kth largest value in an unsorted array without fully sorting it. By maintaining a **min-heap of size k**, the algorithm keeps track of the k largest elements seen so far — and the root of that heap is always the smallest of those k elements, which is exactly the kth largest overall.\n\nThis runs in **O(n log k)** time, which is much faster than O(n log n) full sorting when k is small.",

  howItWorks:
    "The algorithm processes each element in the array and maintains a min-heap of size at most k:\n\n" +
    "1. **Build phase** — For the first k elements, insert each into the min-heap using sift-up.\n" +
    "2. **Filter phase** — For every subsequent element:\n" +
    "   - Compare it to the heap root (the smallest of the top-k candidates).\n" +
    "   - If the new element is **larger than the root**, it belongs in the top k. Replace the root with this element and sift-down to restore the heap property.\n" +
    "   - Otherwise, discard it — it cannot be in the top k.\n" +
    "3. **Answer** — After all elements are processed, the heap root is the kth largest element.\n\n" +
    "### Example: array = [3, 1, 5, 12, 2, 11, 7, 9], k = 3\n\n" +
    "```\n" +
    "Insert 3 → heap: [3]\n" +
    "Insert 1 → heap: [1, 3]\n" +
    "Insert 5 → heap: [1, 3, 5]  (size = k, full)\n" +
    "Element 12 > root 1 → replace → heap: [3, 12, 5] → sift-down → [3, 12, 5]\n" +
    "Element 2 < root 3 → skip\n" +
    "Element 11 > root 3 → replace → heap: [5, 12, 11]\n" +
    "Element 7 > root 5 → replace → heap: [7, 12, 11]\n" +
    "Element 9 > root 7 → replace → heap: [9, 12, 11]\n\n" +
    "Root = 9 → 3rd largest ✓\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log k)`**\n\n" +
    "Each of the n elements is compared to the heap root in O(1). Insertions and sift-down operations on a heap of size k take O(log k). The first k insertions cost O(k log k); the remaining n − k elements each cost O(log k) at most. Total: O(n log k).\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "The min-heap holds at most k elements at any time. No additional memory proportional to n is required.",

  bestAndWorstCase:
    "**Best case — O(n):** If the array is already sorted in descending order, every element after the kth is smaller than the current root, so no sift-down is ever needed — just one comparison per element.\n\n" +
    "**Worst case — O(n log k):** Every element is larger than the current root (e.g., the array is sorted ascending). Each element triggers a root replacement and a full O(log k) sift-down. For k = n this degrades to O(n log n).",

  realWorldUses: [
    "**Streaming analytics:** Find the top-k revenue products from a live transaction feed without buffering all data.",
    "**Recommendation systems:** Maintain the k highest-scored candidates while scanning millions of items.",
    "**Database query optimization:** `SELECT TOP k` implementations in database engines use heap-based selection.",
    "**Network monitoring:** Track the k busiest network connections in a continuous packet stream.",
    "**Machine learning:** Select top-k feature importances from large feature sets during model training.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n log k) — significantly faster than O(n log n) full sort when k << n.",
      "O(k) space — only the top-k candidates are held in memory, ideal for streaming data.",
      "Online algorithm — can process elements one at a time without seeing the full array first.",
    ],
    limitations: [
      "Not stable — equal elements may not preserve their original order.",
      "Requires knowing k in advance — not suitable if k can change dynamically.",
      "If k ≈ n, a full sort may be simpler and equally efficient.",
    ],
  },

  whenToUseIt:
    "Use the kth largest element algorithm when you need a single rank-ordered value from a large or streaming dataset and k is much smaller than n. It outperforms sorting for this use case. If you need the entire sorted top-k list, use a heap and extract k times. If k equals n, a standard sort is cleaner. For very small k (k ≤ 3), a linear scan tracking the top-k values may be simpler.",
};
