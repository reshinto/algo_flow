import type { EducationalContent } from "@/types";

export const nAryTreeTraversalEducational: EducationalContent = {
  overview:
    "An **N-ary tree** is a tree where each node can have any number of children (not just left and right). **Preorder traversal** visits a node **before** recursing into its children — the root is always visited first, then children left-to-right.\n\nN-ary trees model hierarchical data like file systems, HTML/XML DOM trees, and organizational charts.",

  howItWorks:
    "The preorder traversal uses a simple recursive pattern:\n\n" +
    "1. **Visit** the current node (record its value).\n" +
    "2. **Recurse** into each child from left to right.\n\n" +
    "```\n" +
    "function preorder(node):\n" +
    "    visit(node)\n" +
    "    for child in node.children:\n" +
    "        preorder(child)\n" +
    "```\n\n" +
    "For a 3-ary tree of 9 nodes (root with 3 children, each having 2 children), the preorder sequence is: **root → child₁ → grandchild₁₁ → grandchild₁₂ → child₂ → ...**\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((1)):::current --> B((2)):::visited\n" +
    "  A --> C((5)):::visited\n" +
    "  A --> D((8)):::visited\n" +
    "  B --> E((3)):::active\n" +
    "  B --> F((4)):::active\n" +
    "  C --> G((6)):::active\n" +
    "  C --> H((7)):::active\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef active fill:#f59e0b,stroke:#d97706\n" +
    "  classDef current fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "Cyan marks the root (visited first); green nodes are second-level children visited next; amber leaves are visited last. Preorder output: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — every node is visited exactly once.\n\n" +
    "**Space Complexity: `O(h)`** — recursion depth equals tree height `h`. For balanced n-ary trees, `h = O(log_k n)` where `k` is the branching factor.",

  bestAndWorstCase:
    "**Best case:** Wide, shallow tree — minimal call stack depth.\n\n" +
    "**Worst case:** Degenerate chain (each node has one child) — call stack depth `O(n)`.",

  realWorldUses: [
    "**File system traversal:** `find` and `ls -R` use preorder DFS to list directories before contents.",
    "**XML/HTML parsing:** DOM tree traversal visits parent elements before children.",
    "**Syntax trees:** Compilers use preorder traversal to serialize abstract syntax trees.",
    "**Organizational charts:** Preorder traversal lists managers before their reports.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Generalizes binary tree traversal to arbitrary branching factors.",
      "Simple recursive implementation — same pattern as binary preorder.",
      "Naturally produces a prefix-order serialization of the tree.",
    ],
    limitations: [
      "Recursive — stack overflow on very deep trees.",
      "Iterative version requires an explicit stack with reversed child ordering.",
      "Does not produce sorted output (unlike BST inorder traversal).",
    ],
  },

  whenToUseIt:
    "Use n-ary preorder traversal when you need to process parent nodes before their children — for example, to serialize a tree, print directory listings, or copy a tree structure. For level-by-level processing, use BFS instead.",
};
