import type { EducationalContent } from "@/types";

export const invertBinaryTreeEducational: EducationalContent = {
  overview:
    "**Invert Binary Tree** mirrors a binary tree by recursively swapping the left and right children of every node. The result is a reflection of the original tree — the left subtree becomes the right subtree and vice versa at every level.\n\nThis is the classic algorithm famously associated with the 2015 tweet claiming it was asked in a Google interview, making it one of the most recognized tree manipulation problems.",

  howItWorks:
    "The algorithm uses a post-order recursive approach:\n\n" +
    "1. **Base case** — if the node is `null`, return immediately.\n" +
    "2. **Recurse left** — invert the left subtree completely.\n" +
    "3. **Recurse right** — invert the right subtree completely.\n" +
    "4. **Swap** — exchange the left and right child pointers of the current node.\n\n" +
    "### Example: Inverting a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "    style n4 fill:#06b6d4,stroke:#0891b2\n" +
    "```\n\n" +
    "After inversion: root 4 has right=2, left=6; node 2 has right=1, left=3; node 6 has right=5, left=7.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is visited exactly once to perform the swap.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "Recursive call stack depth equals tree height. For balanced trees, `h = O(log n)`; for skewed trees, `h = O(n)`.",

  bestAndWorstCase:
    "**Best case** — balanced tree: `O(log n)` call stack depth.\n\n" +
    "**Worst case** — completely skewed tree (all nodes in one direction): `O(n)` call stack depth.\n\n" +
    "Time is always `O(n)` regardless of tree shape since every node must be swapped.",

  realWorldUses: [
    "**UI rendering** — Mirror layouts horizontally for right-to-left language support.",
    "**Image processing** — Flip binary space partition trees to mirror regions.",
    "**Game development** — Reflect AI decision trees for mirrored scenarios.",
    "**Data normalization** — Standardize tree representations for canonical comparisons.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple and elegant recursive implementation — directly models the problem definition.",
      "In-place modification avoids allocating a separate result tree.",
      "Post-order traversal ensures children are processed before parents.",
    ],
    limitations: [
      "Modifies the original tree — caller must clone if the original must be preserved.",
      "Recursive version may stack overflow on very deep skewed trees.",
      "Not useful for BSTs if BST ordering properties need to be maintained after inversion.",
    ],
  },

  whenToUseIt:
    "Use invert-binary-tree whenever you need a mirrored copy of a tree in-place. For immutable trees, create a cloned inverted tree instead. The iterative BFS variant is preferred for very deep trees to avoid stack overflow.",
};
