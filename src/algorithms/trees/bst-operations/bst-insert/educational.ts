import type { EducationalContent } from "@/types";

export const bstInsertEducational: EducationalContent = {
  overview:
    "**BST Insert (Recursive)** adds a new value to a BST while preserving the BST property: every node's left descendants are smaller and right descendants are larger.\n\nThe algorithm finds the correct `null` slot for the new value by recursively navigating left or right.",

  howItWorks:
    "1. **Base case:** If the current node is `null`, create and return a new node with the insert value — this is the correct position.\n" +
    "2. If `insertValue < node.value` — recurse left and link the returned subtree back.\n" +
    "3. If `insertValue > node.value` — recurse right.\n" +
    "4. Duplicates are ignored.\n\n" +
    "The recursion naturally 'threads' the new node into the correct leaf position.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((20)) --> B((10))\n" +
    "  A --> C((30))\n" +
    "  B --> D((5))\n" +
    "  B --> E((15))\n" +
    "  E --> F((13))\n" +
    "  E --> G((null))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#f59e0b,stroke:#d97706\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "Inserting 13: recursive call chain is insert(20)→insert(10)→insert(15)→insert(null). The null slot becomes node 13, returned upward and linked as the left child of 15.",

  timeAndSpaceComplexity:
    "**Time: `O(h)`** — path from root to insertion point.\n\n**Space: `O(h)`** — call stack depth.",

  bestAndWorstCase:
    "**Best case:** Balanced tree — O(log n) path to the leaf.\n\n**Worst case:** Inserting sorted data into a standard BST creates a linear chain — O(n) per insert.",

  realWorldUses: [
    "**Dynamic sorted sets:** Insert elements and iterate in order at any time.",
    "**Priority scheduling:** Maintain a BST of tasks ordered by deadline.",
    "**BST construction:** Building a BST from an unsorted array uses repeated insertion.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Clean recursive structure — easy to understand and verify.",
      "Preserves BST property automatically.",
    ],
    limitations: [
      "Recursive stack depth O(h) — may overflow on very deep trees.",
      "Does not self-balance — consider AVL or red-black trees for guaranteed O(log n).",
    ],
  },

  whenToUseIt:
    "Use when you need a simple ordered dynamic structure. Use a self-balancing BST variant when guaranteed O(log n) performance is required.",
};
