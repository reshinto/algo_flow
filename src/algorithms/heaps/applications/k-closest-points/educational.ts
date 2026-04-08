import type { EducationalContent } from "@/types";

export const kClosestPointsEducational: EducationalContent = {
  overview:
    "**K Closest Points to Origin** finds the `k` points nearest to (0, 0) from a list of 2D coordinates. Rather than sorting all points by distance (O(n log n)), it uses a **max-heap of size k** to maintain only the best candidates, achieving O(n log k) time — a significant win when k ≪ n.\n\nDistance comparison uses **distance²** (squared Euclidean) to avoid floating-point square roots while preserving ordering.",

  howItWorks:
    "The algorithm maintains a max-heap of size `k` keyed by distance². The root always holds the *farthest* point seen so far:\n\n" +
    "1. **Initialize** — start with an empty max-heap.\n" +
    "2. **For each point:**\n" +
    "   - Compute `dist² = x² + y²`.\n" +
    "   - If the heap has fewer than `k` elements, insert the point and sift-up.\n" +
    "   - Else if `dist² < root's dist²`, replace the root with the new point and sift-down.\n" +
    "   - Otherwise discard the point — it's farther than all current candidates.\n" +
    "3. **Return** the remaining `k` heap entries.\n\n" +
    "### Example: k=3 from [[3,3],[5,-1],[-2,4],[1,1],[0,2],[-1,-1],[4,0]]\n\n" +
    "```\n" +
    "Point  dist²\n" +
    "[3,3]    18   → insert\n" +
    "[5,-1]   26   → insert\n" +
    "[-2,4]   20   → insert  (heap full, root=26)\n" +
    "[1,1]     2   → 2 < 26 → replace root\n" +
    "[0,2]     4   → 4 < 20 → replace root\n" +
    "[-1,-1]   2   → 2 < 18 → replace root\n" +
    "[4,0]    16   → 16 < 18 → replace root\n\n" +
    "Result: [[1,1],[-1,-1],[0,2]]\n" +
    "```\n\n" +
    "### Max-Heap (size k=3) — Final State Keyed by dist²\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    r16("[4,0]\\ndist²=16") --> r4("[0,2]\\ndist²=4")\n' +
    '    r16 --> r2("[-1,-1]\\ndist²=2")\n' +
    "    style r16 fill:#f59e0b,stroke:#d97706\n" +
    "    style r4 fill:#14532d,stroke:#22c55e\n" +
    "    style r2 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The root (amber) is the farthest of the k=3 candidates — dist²=16. Any incoming point with dist² < 16 evicts it. The two leaves (green) are confirmed close points.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log k)`**\n\n" +
    "Each of the `n` points triggers at most one heap insert or replace, costing `O(log k)` for sift-up or sift-down. This beats full sorting when k ≪ n.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "The heap holds at most `k` entries at any time, independent of the total number of points.",

  bestAndWorstCase:
    "**Best case — `O(n)`:** When k = 1 and every subsequent point is farther than the current minimum, no sift operations are needed beyond the first insert.\n\n" +
    "**Worst case — `O(n log k)`:** Every point triggers a replacement and full sift-down through the heap of size k. For k = n this degenerates to `O(n log n)`.\n\n" +
    "**k = n:** Using a heap provides no advantage over sorting — both are O(n log n). Consider full sort or QuickSelect for this case.",

  realWorldUses: [
    "**Nearest-neighbor search:** Map apps finding the k closest restaurants or transit stops to your current position.",
    "**Machine learning (k-NN):** Classifiers computing the k nearest training samples to a test point.",
    "**Collision detection:** Game engines finding nearby entities within a radius, capping expensive physics checks.",
    "**Recommendation systems:** Matching users or items by feature-vector proximity in high-dimensional space.",
    "**Robotics path planning:** Identifying k nearest waypoints or obstacles from sensor point clouds.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n log k) — faster than sorting when k is small relative to n.",
      "Streaming-friendly — processes points one at a time with O(k) memory.",
      "No floating-point sqrt needed — distance² preserves ordering.",
    ],
    limitations: [
      "Heap root tracks the farthest point, not the closest — conceptually reversed from a min-heap approach.",
      "Result is not sorted by distance — add a final sort if order matters.",
      "For k = n, QuickSelect gives O(n) expected time; the heap approach is O(n log n).",
    ],
  },

  whenToUseIt:
    "Use K Closest Points when you need the `k` nearest items from a large dataset and k is significantly smaller than n. It excels in streaming or online settings where points arrive one at a time. If k ≈ n, prefer QuickSelect (O(n) average) or sorting. If repeated queries are expected, precompute a spatial index (k-d tree, ball tree) for O(log n) per query.",
};
