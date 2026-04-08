import type { EducationalContent } from "@/types";

export const bstLowestCommonAncestorEducational: EducationalContent = {
  overview:
    "**BST Lowest Common Ancestor (Recursive)** finds the deepest node that is an ancestor of both given values, exploiting the BST property to navigate directly to the split point without extra data structures.\n\nThe LCA is the first node encountered where the two values no longer fall on the same side.",

  howItWorks:
    "At each node:\n1. If both values are smaller — LCA is in the left subtree; recurse left.\n2. If both values are larger — LCA is in the right subtree; recurse right.\n3. Otherwise (values split across current node, or one value equals the current node) — the current node is the LCA.\n\nThis directly exploits the BST ordering invariant — no need to traverse both subtrees.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((20)) --> B((10))\n" +
    "  A --> C((30))\n" +
    "  B --> D((5))\n" +
    "  B --> E((15))\n" +
    "  C --> F((25))\n" +
    "  C --> G((40))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "LCA(25, 40): at root 20, both values are greater → recurse right to 30. At 30, values split (25 < 30, 40 > 30) → 30 is the LCA. Only the direct path from root to split point is visited.",

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
