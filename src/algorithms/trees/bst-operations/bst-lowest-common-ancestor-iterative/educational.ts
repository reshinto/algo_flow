import type { EducationalContent } from "@/types";

export const bstLowestCommonAncestorIterativeEducational: EducationalContent = {
  overview:
    "**BST Lowest Common Ancestor (Iterative)** finds the LCA using a while loop instead of recursion. A single pointer walks the tree until the two values split to different sides of the current node.",

  howItWorks:
    "Start at root. At each step:\n- If both target values are less than the current node → move left.\n- If both are greater → move right.\n- Otherwise → the current node is the LCA (values diverge here).\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((20)) --> B((10))\n" +
    "  A --> C((30))\n" +
    "  B --> D((5))\n" +
    "  B --> E((15))\n" +
    "  C --> F((25))\n" +
    "  C --> G((40))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "LCA(5, 15): at root 20, both 5 and 15 are less → move left to 10. At 10, values split (5 < 10, 15 > 10) → 10 is the LCA. Only one pointer variable needed — O(1) space.",

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
