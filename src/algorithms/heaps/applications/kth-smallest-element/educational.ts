import type { EducationalContent } from "@/types";

export const kthSmallestElementEducational: EducationalContent = {
  overview:
    "**Kth Smallest Element** finds the kth smallest value in an unsorted array without fully sorting it. By maintaining a **max-heap of size k**, the algorithm keeps track of the k smallest elements seen so far — and the root of that heap is always the largest of those k elements, which is exactly the kth smallest overall.\n\nThis runs in **O(n log k)** time, significantly faster than sorting the entire array when k is much smaller than n.",

  howItWorks:
    "The algorithm processes each element in the array while maintaining a max-heap of size at most k:\n\n" +
    "1. **Build phase** — For the first k elements, insert each into the max-heap using sift-up.\n" +
    "2. **Filter phase** — For every subsequent element:\n" +
    "   - Compare it to the heap root (the largest of the k smallest candidates).\n" +
    "   - If the new element is **smaller than the root**, it belongs in the bottom-k set. Replace the root with this element and sift-down to restore the heap property.\n" +
    "   - Otherwise, discard it — it is larger than all k current candidates and cannot be among the k smallest.\n" +
    "3. **Answer** — After processing all elements, the heap root is the kth smallest element.\n\n" +
    "### Example: array = [7, 10, 4, 3, 20, 15, 8], k = 3\n\n" +
    "```\n" +
    "Insert 7 → heap: [7]\n" +
    "Insert 10 → heap: [10, 7]\n" +
    "Insert 4 → heap: [10, 7, 4]  (size = k, full)\n" +
    "Element 3 < root 10 → replace → heap: [7, 3, 4] → sift-down → [7, 3, 4]\n" +
    "Element 20 > root 7 → skip\n" +
    "Element 15 > root 7 → skip\n" +
    "Element 8 > root 7 → skip\n\n" +
    "Root = 7 → 3rd smallest ✓\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log k)`**\n\n" +
    "Each of the n elements is compared to the heap root in O(1). Insertions and sift-down operations on a heap of size k take O(log k). The first k insertions cost O(k log k); the remaining n − k elements each cost O(log k) at most. Total: O(n log k).\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "The max-heap holds at most k elements at any time. No additional memory proportional to n is required.",

  bestAndWorstCase:
    "**Best case — O(n):** If the array is sorted in ascending order, every element after the kth is larger than the current root, so no sift-down is ever triggered — just one comparison per element.\n\n" +
    "**Worst case — O(n log k):** Every element is smaller than the current root (e.g., the array is sorted descending). Each element triggers a root replacement and a full O(log k) sift-down. For k = n this degrades to O(n log n).",

  realWorldUses: [
    "**Database query optimization:** `SELECT BOTTOM k` or `ORDER BY ... LIMIT k` implementations use heap-based selection to avoid full sorts.",
    "**Anomaly detection:** Find the k smallest response times or error rates in a monitoring stream.",
    "**Closest pair problems:** Identify the k nearest neighbors to a query point in a dataset.",
    "**Budget allocation:** Find the k cheapest items from a live product catalog for budget-constrained recommendations.",
    "**Statistical sampling:** Reservoir sampling variants use similar heap logic to maintain bottom-k samples.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n log k) — much faster than O(n log n) sorting when k << n.",
      "O(k) space — only the bottom-k candidates are held in memory at any time.",
      "Online algorithm — processes elements one at a time, suitable for streaming data.",
    ],
    limitations: [
      "Not stable — equal elements may not preserve their original insertion order.",
      "Requires knowing k in advance — cannot dynamically adjust without rebuilding the heap.",
      "If k ≈ n, a full sort is simpler and equivalently efficient.",
    ],
  },

  whenToUseIt:
    "Use the kth smallest element algorithm when you need a single rank-ordered value from a large or streaming dataset and k is much smaller than n. It outperforms sorting for this focused query. If you need the full sorted bottom-k list, extract from the heap k times. If k equals n, a standard sort is cleaner. For very small k (k ≤ 3), a linear scan tracking the bottom-k values may be simpler and avoids heap overhead.",
};
