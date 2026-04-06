import type { EducationalContent } from "@/types";

export const bstDeleteEducational: EducationalContent = {
  overview:
    "**BST Delete (Recursive)** removes a node while preserving the BST property. There are three distinct cases depending on the deleted node's children:\n1. **Leaf:** Simply remove it.\n2. **One child:** Replace the node with its only child.\n3. **Two children:** Replace the node's value with its in-order successor (smallest value in the right subtree), then delete the successor.",

  howItWorks:
    "The algorithm searches for the target recursively. Once found:\n- **Leaf (no children):** Return `null` — the parent's pointer becomes `null`.\n- **One child:** Return the non-null child — the parent links directly to it.\n- **Two children:** Find the in-order successor (leftmost node in right subtree), copy its value into the target node, then recursively delete the successor from the right subtree.\n\nThe 'copy-value then delete' approach avoids restructuring large subtrees.",

  timeAndSpaceComplexity:
    "**Time: `O(h)`** — search + successor find.\n\n**Space: `O(h)`** — call stack.",

  bestAndWorstCase:
    "**Best case:** Target is a leaf or has one child — O(log n) on a balanced tree.\n\n**Worst case:** Degenerate tree — O(n).",

  realWorldUses: [
    "**Event scheduling:** Remove a processed event from an ordered BST of future events.",
    "**Cache eviction:** Remove stale entries from an LRU-ordered BST.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Handles all three deletion cases cleanly and recursively.",
      "In-order successor replacement is the canonical correct approach.",
    ],
    limitations: [
      "Two-children case requires finding the successor — an extra O(h) traversal.",
      "Does not rebalance — tree may become lopsided after many deletions.",
    ],
  },

  whenToUseIt:
    "Use for ordered dynamic collections where deletions are occasional. For frequent deletions with performance guarantees, use a self-balancing BST.",
};
