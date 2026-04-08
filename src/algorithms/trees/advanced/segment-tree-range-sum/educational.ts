import type { EducationalContent } from "@/types";

export const segmentTreeRangeSumEducational: EducationalContent = {
  overview:
    "A **Segment Tree** is a binary tree where each node stores the aggregate (here, the sum) of a contiguous subarray. The root covers the entire array; each leaf covers a single element. This structure enables both **range queries** and **point updates** in `O(log n)` time — far faster than the `O(n)` scan required by a plain array.",

  howItWorks:
    "**Build phase:** Recursively split the array in half. Each internal node's value is the sum of its two children. A leaf node stores its single element.\n\n" +
    "**Query phase:** To find the sum of range `[L, R]`:\n" +
    "1. If the current node's range is completely outside `[L, R]`, return 0.\n" +
    "2. If completely inside `[L, R]`, return the node's stored value.\n" +
    "3. Otherwise, recurse into both children and sum the results.\n\n" +
    "**Example:** Array `[1,3,5,7,9,11]`, query `[1,3]` → sum of elements at indices 1-3 = 3+5+7 = **15**.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((sum=36)):::current --> B((sum=16)):::visited\n" +
    "  A --> C((sum=20)):::active\n" +
    "  B --> D((sum=4)):::active\n" +
    "  B --> E((sum=12)):::visited\n" +
    "  D --> F((1)):::active\n" +
    "  D --> G((3)):::visited\n" +
    "  E --> H((5)):::visited\n" +
    "  E --> I((7)):::visited\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef active fill:#f59e0b,stroke:#d97706\n" +
    "  classDef current fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "For query `[1,3]`: node D partially overlaps so we recurse into it; G (index 1, value 3) and E (indices 2–3, sum 12) are fully inside the range — their values are returned directly. Total = 3 + 12 = **15**.",

  timeAndSpaceComplexity:
    "**Build Time: `O(n)`** — each node is computed once.\n\n" +
    "**Query Time: `O(log n)`** per query — at most 4 nodes are visited per level.\n\n" +
    "**Space: `O(4n)`** — the tree array needs up to 4× the input size.",

  bestAndWorstCase:
    "**Best case:** Query range exactly matches a stored node's range — answered in `O(1)`.\n\n" +
    "**Worst case:** Query range straddles many node boundaries — still `O(log n)` nodes visited.",

  realWorldUses: [
    "**Range sum queries:** Database aggregations over indexed column ranges.",
    "**Interval scheduling:** Checking overlapping reservations in calendar systems.",
    "**Competitive programming:** A fundamental tool for range queries and updates.",
    "**Game development:** Tracking region statistics (e.g., sum of unit health in a zone).",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) query and update — dramatically faster than O(n) brute force for large arrays.",
      "Versatile — the same structure works for sum, min, max, GCD, and XOR queries.",
      "Simple recursive structure is easy to reason about.",
    ],
    limitations: [
      "4× memory overhead compared to the source array.",
      "Build time is O(n) — not suitable for frequently changing array size.",
      "More complex to extend to 2D arrays (2D segment trees).",
    ],
  },

  whenToUseIt:
    "Use a segment tree when you need repeated range queries (sum, min, max) on a static or infrequently updated array. For prefix sums on a static array, a prefix sum array is simpler. For frequent point updates, a Fenwick tree (BIT) may be easier to implement.",
};
