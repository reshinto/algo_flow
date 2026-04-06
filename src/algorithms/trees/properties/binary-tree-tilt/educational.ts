import type { EducationalContent } from "@/types";

export const binaryTreeTiltEducational: EducationalContent = {
  overview:
    "**Binary Tree Tilt** computes the sum of tilts across all nodes. " +
    "The tilt of a node is `abs(left subtree sum - right subtree sum)`. " +
    "Leaf nodes have tilt 0 because both subtree sums are 0.",

  howItWorks:
    "A post-order DFS computes two things simultaneously:\n\n" +
    "1. **Subtree sum** — sum of all values in the subtree rooted at this node (returned up the stack).\n" +
    "2. **Node tilt** — `abs(leftSum - rightSum)`, accumulated into a running total.\n\n" +
    "Post-order is essential because tilt requires knowing both children's sums before computing the parent's tilt.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — each node is visited once.\n\n" +
    "**Space Complexity: `O(h)`** — call stack depth.",

  bestAndWorstCase:
    "**Best case** is a perfectly symmetric tree — all tilts are 0.\n\n" +
    "**Worst case** is a heavily skewed tree — maximum tilt accumulation.",

  realWorldUses: [
    "**Tree balance metric:** Total tilt quantifies how unbalanced a tree is, useful for monitoring data structures.",
    "**Statistical analysis:** Tilt-like asymmetry measures appear in tree-based statistical models.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Computes both subtree sums and tilts in a single O(n) pass.",
      "Clean post-order structure makes the intent clear.",
    ],
    limitations: [
      "Total tilt is not a normalized balance metric — it grows with both size and skewness.",
    ],
  },

  whenToUseIt:
    "Use binary tree tilt when you need a scalar measure of asymmetry across all nodes. " +
    "For per-node balance checking, use `isBalancedTree` instead.",
};
