import type { EducationalContent } from "@/types";

export const buildFromPreorderInorderEducational: EducationalContent = {
  overview:
    "**Build Tree from Preorder + Inorder** reconstructs a unique binary tree from two traversal sequences. " +
    "The **preorder** array always starts with the current subtree's root. The **inorder** array reveals which elements belong to the left vs right subtree by locating that root value.",

  howItWorks:
    "The algorithm is recursive and follows three steps per call:\n\n" +
    "1. **Identify root** — the first element of the current preorder slice is the subtree root.\n" +
    "2. **Partition inorder** — find the root's position in the inorder array. Everything to its left belongs to the left subtree; everything to its right to the right subtree.\n" +
    "3. **Recurse** — apply the same logic to the left and right slices, progressively building child nodes.\n\n" +
    "### Example\n\n" +
    "```\n" +
    "preorder = [4, 2, 1, 3, 6, 5, 7]\n" +
    "inorder  = [1, 2, 3, 4, 5, 6, 7]\n\n" +
    "Root = 4 (preorder[0])\n" +
    "Inorder index of 4 = 3 → left subtree has 3 nodes [1,2,3], right has 3 [5,6,7]\n" +
    "Recurse left:  preorder=[2,1,3], inorder=[1,2,3] → root=2\n" +
    "Recurse right: preorder=[6,5,7], inorder=[5,6,7] → root=6\n" +
    "```\n\n" +
    "Base case: an empty preorder or inorder slice returns `null`.\n\n" +
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
    "Root 4 (cyan) comes from `preorder[0]`. Its inorder index 3 partitions the sequence: green nodes 2 and 6 become recursive subtree roots; amber leaves 1, 3, 5, 7 are base cases where the slice has one element.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)` naive, `O(n)` with hash map**\n\n" +
    "Without a lookup table, finding the root in the inorder array takes `O(n)` per call, leading to `O(n²)` overall. " +
    "With an index map precomputed in `O(n)`, each lookup is `O(1)` and total time is `O(n)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The recursion stack reaches depth `O(h)` where `h` is the tree height. The index map uses `O(n)`. " +
    "For a balanced tree `h = O(log n)`; for a degenerate tree `h = O(n)`.",

  bestAndWorstCase:
    "**Best case** is a perfectly balanced tree — recursion depth is `O(log n)` and the tree is evenly divided at each step.\n\n" +
    "**Worst case** is a completely skewed tree (e.g., all left children) — recursion depth reaches `O(n)` and the stack may overflow for very large inputs.",

  realWorldUses: [
    "**Serialization/deserialization:** Reconstruct a tree sent over a network or stored as traversal sequences.",
    "**Compiler parse trees:** Recover abstract syntax trees from pre-computed traversal representations.",
    "**Competitive programming:** A classic reconstruction problem that validates understanding of tree invariants.",
    "**Database checkpointing:** Restore balanced index trees from logged traversal snapshots.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Uniquely reconstructs the original tree — given preorder + inorder, only one tree is possible.",
      "Elegant divide-and-conquer structure mirrors the tree's natural recursive shape.",
      "Hash map optimization brings time complexity down to O(n).",
    ],
    limitations: [
      "Requires both traversal sequences — neither alone is sufficient for unique reconstruction.",
      "All node values must be distinct; duplicate values make reconstruction ambiguous.",
      "Deep recursion on skewed trees risks stack overflow without an iterative conversion.",
    ],
  },

  whenToUseIt:
    "Use this algorithm whenever you have both a preorder and inorder traversal of a tree and need to recover its structure. " +
    "If you only have one traversal, the tree cannot be uniquely determined. " +
    "For large trees, apply the hash map optimization to achieve O(n) time.",
};
