import type { EducationalContent } from "@/types";

export const bstLowestCommonAncestorIterativeEducational: EducationalContent = {
  overview:
    "**BST Lowest Common Ancestor (Iterative)** finds the LCA using a while loop instead of recursion. A single pointer walks the tree until the two values split to different sides of the current node.",

  howItWorks:
    "Start at root. At each step:\n- If both target values are less than the current node → move left.\n- If both are greater → move right.\n- Otherwise → the current node is the LCA (values diverge here).",

  timeAndSpaceComplexity: "**Time: `O(h)`**\n\n**Space: `O(1)`** — only a single pointer variable.",

  bestAndWorstCase: "**Best case:** LCA at root — O(1).\n\n**Worst case:** LCA near a leaf — O(h).",

  realWorldUses: [
    "**Constant-space LCA:** Memory-efficient lookup for embedded or real-time systems.",
    "**Database join optimization:** Find common ancestor in an index tree.",
  ],

  strengthsAndLimitations: {
    strengths: ["O(1) space — most memory-efficient BST LCA possible.", "Simple and fast."],
    limitations: ["BST-specific — does not generalize to non-ordered trees."],
  },

  whenToUseIt: "Use when O(1) space is required or as the default implementation in a BST class.",
};
