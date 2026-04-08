import type { EducationalContent } from "@/types";

export const buildFromPostorderInorderEducational: EducationalContent = {
  overview:
    "**Build Tree from Postorder + Inorder** reconstructs a unique binary tree from its postorder and inorder traversal sequences. " +
    "Unlike the preorder variant, here the **last** element of the postorder array is the current subtree's root. " +
    "The inorder array reveals which elements belong to the left vs right subtree.",

  howItWorks:
    "The algorithm recursively identifies the root, splits both arrays, and recurses:\n\n" +
    "1. **Identify root** — `postorder[last]` is always the current subtree's root.\n" +
    "2. **Locate root in inorder** — everything to its left belongs to the left subtree; everything to its right is the right subtree.\n" +
    "3. **Slice both arrays** — use the left subtree size to extract matching postorder and inorder slices for each child.\n" +
    "4. **Recurse** — apply the same logic recursively until slices are empty.\n\n" +
    "### Example\n\n" +
    "```\n" +
    "postorder = [1, 3, 2, 5, 7, 6, 4]\n" +
    "inorder   = [1, 2, 3, 4, 5, 6, 7]\n\n" +
    "Root = 4 (postorder[-1])\n" +
    "Inorder index of 4 = 3 → left has [1,2,3], right has [5,6,7]\n" +
    "Left postorder = [1,3,2], right postorder = [5,7,6]\n" +
    "```\n\n" +
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
    "Root 4 (cyan) is taken from `postorder[-1]`. Its inorder index 3 splits the sequence: green nodes 2 and 6 become subtree roots in recursive calls; amber leaves 1, 3, 5, 7 are base cases with single-element slices.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)` naive, `O(n)` with hash map**\n\n" +
    "Searching for the root in the inorder array takes `O(n)` per call without a lookup table. " +
    "A precomputed hash map reduces each lookup to `O(1)` and total time to `O(n)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Recursion depth is `O(h)` where `h` is the tree height, plus `O(n)` for the index map.",

  bestAndWorstCase:
    "**Best case** is a balanced tree — `O(log n)` recursion depth and even partitioning at each level.\n\n" +
    "**Worst case** is a completely left- or right-skewed tree — recursion depth reaches `O(n)` and may overflow the call stack.",

  realWorldUses: [
    "**Tree deserialization:** Reconstruct a tree from its serialized postorder and inorder representations.",
    "**Expression tree recovery:** Postorder corresponds to postfix evaluation order; recovering the original expression tree aids code analysis.",
    "**Compiler intermediate representations:** Recover the original AST from postorder expression evaluation records.",
    "**Algorithm education:** Classic problem for deepening understanding of tree traversal relationships.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Uniquely determines the tree given both traversals with distinct node values.",
      "Naturally pairs with postorder output from tree evaluation algorithms.",
      "Hash map optimization achieves O(n) time.",
    ],
    limitations: [
      "Requires both postorder and inorder arrays — neither alone is sufficient.",
      "All values must be distinct; duplicates break the reconstruction.",
      "Deep recursion on skewed trees can overflow the call stack.",
    ],
  },

  whenToUseIt:
    "Use when you have postorder output (e.g., from expression evaluation or deletion-order logging) and need to recover the tree structure. " +
    "For very large trees, convert to the iterative variant or apply the hash map optimization to avoid O(n²) worst case.",
};
