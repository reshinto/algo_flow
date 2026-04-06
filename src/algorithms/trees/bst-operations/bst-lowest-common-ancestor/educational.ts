import type { EducationalContent } from "@/types";

export const bstLowestCommonAncestorEducational: EducationalContent = {
  overview:
    "**BST Lowest Common Ancestor (Recursive)** finds the deepest node that is an ancestor of both given values, exploiting the BST property to navigate directly to the split point without extra data structures.\n\nThe LCA is the first node encountered where the two values no longer fall on the same side.",

  howItWorks:
    "At each node:\n1. If both values are smaller — LCA is in the left subtree; recurse left.\n2. If both values are larger — LCA is in the right subtree; recurse right.\n3. Otherwise (values split across current node, or one value equals the current node) — the current node is the LCA.\n\nThis directly exploits the BST ordering invariant — no need to traverse both subtrees.",

  timeAndSpaceComplexity:
    "**Time: `O(h)`** — at most one root-to-LCA path.\n\n**Space: `O(h)`** — call stack.",

  bestAndWorstCase:
    "**Best case:** LCA is the root — found immediately.\n\n**Worst case:** LCA is a leaf — full height traversal.",

  realWorldUses: [
    "**Organizational hierarchies:** Find the common manager of two employees in a BST of employee IDs.",
    "**File system paths:** Find the common ancestor directory of two paths in a sorted BST.",
    "**Network routing:** Find the most specific common subnet prefix.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Exploits BST property — much simpler than general binary tree LCA algorithms.",
      "O(h) time with no auxiliary data structures.",
    ],
    limitations: ["Only works on BSTs — general trees require DFS with two separate path arrays."],
  },

  whenToUseIt:
    "Use when both values are guaranteed to exist in the BST. For general binary trees, use the standard post-order DFS LCA algorithm.",
};
