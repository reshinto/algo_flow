import type { EducationalContent } from "@/types";

export const isBalancedTreeEducational: EducationalContent = {
  overview:
    "**Is Balanced Tree** checks whether a binary tree is height-balanced. " +
    "A height-balanced tree requires that for every node, the heights of its left and right subtrees differ by at most 1. " +
    "AVL trees enforce this invariant to guarantee O(log n) search time.",

  howItWorks:
    "The algorithm uses a modified `checkHeight` helper that returns `-1` for unbalanced subtrees " +
    "and the actual height for balanced ones:\n\n" +
    "1. Recurse left — if `-1` propagates up, return `-1` immediately (short-circuit).\n" +
    "2. Recurse right — same short-circuit.\n" +
    "3. Check `abs(leftHeight - rightHeight) <= 1`.\n" +
    "4. If balanced, return `max(leftHeight, rightHeight) + 1`.\n\n" +
    "This avoids recomputing heights in a separate pass, achieving O(n) time.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — each node is checked once with short-circuit on imbalance.\n\n" +
    "**Space Complexity: `O(h)`** — call stack depth.",

  bestAndWorstCase:
    "**Best case** is an imbalanced root — returns `-1` immediately after checking the two subtrees.\n\n" +
    "**Worst case** is a balanced tree — all `n` nodes must be checked.",

  realWorldUses: [
    "**AVL tree maintenance:** After every insert or delete, balance must be verified and rotations applied.",
    "**Database index validation:** B-tree variants require balance to guarantee O(log n) lookups.",
    "**Game tree optimization:** Balanced decision trees ensure bounded search depth.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time with no extra space beyond the call stack.",
      "Early termination on the first imbalanced node found.",
    ],
    limitations: [
      "Cannot short-circuit if the imbalanced node is a leaf deep in a large tree.",
      "Recursive approach risks stack overflow for degenerate inputs.",
    ],
  },

  whenToUseIt:
    "Use this to validate AVL tree invariants or verify that a tree is balanced after construction. " +
    "For iterative balance checking (safer for large trees), use the stack-based variant.",
};
