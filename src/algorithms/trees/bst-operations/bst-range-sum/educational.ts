import type { EducationalContent } from "@/types";

export const bstRangeSumEducational: EducationalContent = {
  overview:
    "**BST Range Sum (Recursive)** computes the sum of all node values within a given range `[low, high]` by exploiting the BST property to skip entire subtrees that cannot contain values in range.",

  howItWorks:
    "At each node:\n1. If `node === null`, return 0.\n2. If `node.value` is within `[low, high]`, add it to the sum.\n3. If `node.value > low`, the left subtree may have in-range values — recurse left.\n4. If `node.value < high`, the right subtree may have in-range values — recurse right.\n\nSubtrees where all values are guaranteed to be out of range are pruned entirely.",

  timeAndSpaceComplexity:
    "**Time: `O(log n + k)`** for a balanced tree where `k` is the number of in-range nodes (pruning skips out-of-range subtrees).\n\n**Space: `O(h)`** — call stack.",

  bestAndWorstCase:
    "**Best case:** Range covers no nodes — only the root-to-boundary path is traversed.\n\n**Worst case:** Range covers all nodes — all `n` nodes are visited.",

  realWorldUses: [
    "**Financial aggregation:** Sum all transactions in a date range stored in a BST.",
    "**Database range queries:** Sum indexed column values between two bounds.",
    "**Game leaderboards:** Sum scores within a score band.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "BST pruning skips whole subtrees — much faster than a full scan for narrow ranges.",
      "Clean recursive implementation.",
    ],
    limitations: ["Wide ranges that include most nodes degrade to O(n)."],
  },

  whenToUseIt:
    "Use for range aggregation queries on a dynamically maintained BST. For read-heavy workloads, a segment tree or Fenwick tree provides O(log n) range sum.",
};
