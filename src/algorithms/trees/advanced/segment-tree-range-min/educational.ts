import type { EducationalContent } from "@/types";

export const segmentTreeRangeMinEducational: EducationalContent = {
  overview:
    "A **Range Minimum Query (RMQ) Segment Tree** stores the minimum value of each subarray range in a binary tree structure. Given any query `[L, R]`, it finds the minimum element in that subrange in `O(log n)` time — much faster than scanning the array linearly.",

  howItWorks:
    "**Build:** Each leaf stores its element. Each internal node stores the minimum of its two children's ranges.\n\n" +
    "**Query `[L, R]`:**\n" +
    "1. If the node's range is outside `[L, R]`, return `∞` (infinity).\n" +
    "2. If completely inside `[L, R]`, return the stored minimum.\n" +
    "3. Otherwise, recurse into both children and return `min(leftResult, rightResult)`.\n\n" +
    "**Example:** Array `[2,5,1,4,9,3]`, query `[0,2]` → min of `[2,5,1]` = **1**.",

  timeAndSpaceComplexity:
    "**Build: `O(n)`** — each of the ~2n nodes computed exactly once.\n\n" +
    "**Query: `O(log n)`** per query.\n\n" +
    "**Space: `O(4n)`** for the segment tree array.",

  bestAndWorstCase:
    "**Best case:** Query exactly matches a node's range — answered in O(1).\n\n" +
    "**Worst case:** Query spans many partial ranges — O(log n) nodes visited.",

  realWorldUses: [
    "**Competitive programming:** Solve range minimum problems in O(log n) per query.",
    "**Bioinformatics:** Lowest Common Ancestor (LCA) reduces to RMQ.",
    "**Database engines:** Range statistics over indexed numeric columns.",
    "**Image processing:** Sliding window minimums for morphological erosion.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Handles both range queries and point updates in O(log n).",
      "Same structure as range sum — trivial to adapt between sum, min, max, GCD.",
      "Efficient for both sparse and dense query patterns.",
    ],
    limitations: [
      "4× memory overhead vs source array.",
      "For static arrays with many queries, Sparse Table gives O(1) query but uses O(n log n) space and cannot handle updates.",
      "2D extensions are significantly more complex.",
    ],
  },

  whenToUseIt:
    "Use a range-min segment tree when you need repeated range minimum queries with occasional updates. For static arrays with read-only queries, a Sparse Table is faster (O(1) query). For a single minimum query, a linear scan suffices.",
};
