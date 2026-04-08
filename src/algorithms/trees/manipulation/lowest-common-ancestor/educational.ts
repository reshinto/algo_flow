import type { EducationalContent } from "@/types";

export const lowestCommonAncestorEducational: EducationalContent = {
  overview:
    "**Lowest Common Ancestor (LCA)** finds the deepest node in a binary tree that is an ancestor of both a given node A and node B. A node is considered an ancestor of itself.\n\nThis is a fundamental tree problem with applications in computational biology, network routing, and data structures like segment trees.",

  howItWorks:
    "The recursive post-order algorithm works bottom-up:\n\n" +
    "1. **Base case** — if the current node is null, return null.\n" +
    "2. **Found target** — if the current node's value equals `nodeValueA` or `nodeValueB`, return the current node.\n" +
    "3. **Recurse left** — search the left subtree for either target.\n" +
    "4. **Recurse right** — search the right subtree for either target.\n" +
    "5. **Both found** — if both left and right return non-null, the current node is the LCA.\n" +
    "6. **One found** — return whichever side is non-null (the other target must be in this subtree or is this node itself).\n\n" +
    "For the default 7-node BST with targets 1 and 3, the LCA is node 2.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((4)) --> B((2))\n" +
    "  A --> C((6))\n" +
    "  B --> D((1))\n" +
    "  B --> E((3))\n" +
    "  C --> F((5))\n" +
    "  C --> G((7))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "Searching for targets 1 and 3: the left subtree returns node 1, the right returns node 3, so node 2 is identified as the LCA since both sides returned non-null.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node may be visited in the worst case (when the targets are in separate deepest subtrees).\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "The recursive call stack depth equals the tree height.",

  bestAndWorstCase:
    "**Best case** — both targets are descendants of the root's children in separate subtrees — LCA is the root, found quickly.\n\n" +
    "**Worst case** — both targets are in one long path to the deepest leaf — every node is visited, `O(n)` time and `O(n)` stack space.",

  realWorldUses: [
    "**Phylogenetics** — Find the most recent common ancestor of two species in an evolutionary tree.",
    "**Version control** — Find the common ancestor commit of two branches in a DAG.",
    "**Network routing** — Identify the lowest common router in a hierarchical network tree.",
    "**DOM queries** — Find the nearest common container of two HTML elements.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Handles any binary tree — not limited to BSTs.",
      "Single-pass `O(n)` algorithm — optimal time complexity.",
      "Post-order traversal ensures children are fully processed before the parent makes a decision.",
    ],
    limitations: [
      "Recursive — may stack overflow on very deep trees.",
      "Requires both nodes to be in the tree; does not validate their presence.",
      "For repeated LCA queries on the same tree, preprocess with Euler tour + sparse table for `O(1)` per query.",
    ],
  },

  whenToUseIt:
    "Use the recursive LCA for one-off queries on general binary trees. For BSTs, the BST-specific LCA algorithm is more efficient. For repeated queries, preprocess the tree with a binary lifting or Euler tour approach.",
};
