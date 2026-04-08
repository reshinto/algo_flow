import type { EducationalContent } from "@/types";

export const treeToDoublyLinkedListEducational: EducationalContent = {
  overview:
    "**BST to Sorted Circular Doubly Linked List** converts a binary search tree into a sorted circular doubly-linked list **in-place** — without allocating any new nodes. The key insight is that an in-order traversal of a BST produces nodes in sorted order, and the `left`/`right` pointers can be repurposed as `prev`/`next` DLL pointers respectively.",

  howItWorks:
    "The algorithm performs an in-order traversal while maintaining a `tail` pointer to the last processed node:\n\n" +
    "1. Recurse into the left subtree.\n" +
    "2. **Link** the current node after `tail`: `tail.right = node; node.left = tail`.\n" +
    "3. Advance `tail` to the current node.\n" +
    "4. Recurse into the right subtree.\n\n" +
    "After traversal, close the circle: `tail.right = head; head.left = tail`.\n\n" +
    "**Result:** The BST becomes a sorted circular DLL where `left = prev` and `right = next`.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((4)):::current --> B((2)):::visited\n" +
    "  A --> C((6)):::visited\n" +
    "  B --> D((1)):::active\n" +
    "  B --> E((3)):::active\n" +
    "  C --> F((5)):::active\n" +
    "  C --> G((7)):::active\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef active fill:#f59e0b,stroke:#d97706\n" +
    "  classDef current fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "In-order traversal visits nodes in sorted order 1→2→3→4→5→6→7. As each node (amber leaves first, then green parents) is processed, its `right` pointer is set to the next node and its `left` pointer to the previous, threading all nodes into a circular doubly-linked list.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — every node is visited exactly once.\n\n" +
    "**Space Complexity: `O(h)`** — the recursion stack reaches depth `h` (tree height).",

  bestAndWorstCase:
    "**Best case:** Balanced BST — `O(log n)` stack depth.\n\n" +
    "**Worst case:** Degenerate BST (linear chain) — `O(n)` stack depth.",

  realWorldUses: [
    "**Memory-efficient conversion:** Convert a BST to a DLL without extra node allocation.",
    "**Doubly-linked sorted structure:** Enables O(1) insertion at known positions after conversion.",
    "**Interview problems:** Classic in-place pointer manipulation question (Google Leetcode).",
    "**Database cursors:** Efficiently iterate forward and backward through sorted records.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "In-place — no additional memory beyond the recursion stack.",
      "Produces a sorted list in one O(n) pass.",
      "The circular linkage enables O(1) access to both head and tail.",
    ],
    limitations: [
      "Destroys the original tree structure — the BST invariant is lost after conversion.",
      "Recursive — can stack overflow on very deep trees.",
      "Requires a BST specifically — does not produce a sorted list from an arbitrary tree.",
    ],
  },

  whenToUseIt:
    "Use this when you need to convert a BST to a sorted DLL without allocating new nodes. If you need to keep the BST intact, create a new DLL by walking the tree in-order instead.",
};
