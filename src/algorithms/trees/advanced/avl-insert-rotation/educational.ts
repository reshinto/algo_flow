import type { EducationalContent } from "@/types";

export const avlInsertRotationEducational: EducationalContent = {
  overview:
    "**AVL Tree Insertion** maintains a self-balancing binary search tree by applying rotations after each insertion. Named after Adelson-Velsky and Landis (1962), an AVL tree guarantees that for every node, the heights of its left and right subtrees differ by at most 1 — the **balance factor**.\n\nWhen an insertion violates this invariant, one of four rotation patterns (LL, RR, LR, RL) is applied to restore balance.",

  howItWorks:
    "Insertion proceeds in two phases:\n\n" +
    "1. **Standard BST insert** — place the new node as in a regular BST.\n" +
    "2. **Rebalance on the way back** — update heights and check balance factors bottom-up. Apply the appropriate rotation when `|balance| > 1`:\n\n" +
    "| Case | Condition | Fix |\n" +
    "|------|-----------|-----|\n" +
    "| **LL** | Left-heavy, inserted in left subtree | Single right rotation |\n" +
    "| **RR** | Right-heavy, inserted in right subtree | Single left rotation |\n" +
    "| **LR** | Left-heavy, inserted in left's right subtree | Left then right rotation |\n" +
    "| **RL** | Right-heavy, inserted in right's left subtree | Right then left rotation |\n\n" +
    "After each rotation, heights are recalculated and the tree is balanced again.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)` per insertion**\n\n" +
    "Because the AVL invariant guarantees height `O(log n)`, both traversal and rebalancing are bounded logarithmically.\n\n" +
    "**Space Complexity: `O(log n)`** (call stack depth for recursive insertion).",

  bestAndWorstCase:
    "**Best case:** Insertions require no rotations (already balanced) — `O(log n)` purely for traversal.\n\n" +
    "**Worst case:** Every insertion requires a double rotation — still `O(log n)` per insert, but constant factors are higher than a plain BST. The classical [10, 20, 30, 25, 28, 27] sequence triggers all four rotation types in sequence.",

  realWorldUses: [
    "**Database indexing:** Used in some database engines for balanced in-memory B-tree nodes.",
    "**Ordered map/set:** Languages like C++ (`std::map`) use red-black trees, but AVL trees provide faster lookups for read-heavy workloads.",
    "**Network routing tables:** Where lookup speed is critical and insertions are infrequent.",
    "**File system directories:** Some filesystems use balanced BSTs to index directory entries.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Strictly balanced — lookup is always `O(log n)`, faster than red-black trees on read-heavy workloads.",
      "Deterministic height bound: height ≤ 1.44 log₂(n+2).",
      "Conceptually straightforward rotations compared to more complex self-balancing schemes.",
    ],
    limitations: [
      "More rotations per insertion than red-black trees — slower for write-heavy workloads.",
      "Requires storing a height (or balance factor) in each node — small memory overhead.",
      "Deletion is complex and also requires rebalancing.",
    ],
  },

  whenToUseIt:
    "Use an AVL tree when you need guaranteed O(log n) lookup with a roughly equal mix of reads and writes. For write-heavy applications, prefer a red-black tree. For bulk-loaded, read-only sorted data, a sorted array with binary search is simpler.",
};
