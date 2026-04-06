import type { EducationalContent } from "@/types";

export const flattenToLinkedListEducational: EducationalContent = {
  overview:
    "**Flatten Binary Tree to Linked List** transforms a binary tree into a right-skewed linked list in-place, using the same nodes. The resulting order follows a preorder traversal: root, then left subtree, then right subtree.\n\nThis problem is commonly asked in interviews because it tests both tree traversal understanding and pointer manipulation skills.",

  howItWorks:
    "The algorithm uses a recursive post-order approach to ensure subtrees are flattened before the parent rewires them:\n\n" +
    "1. **Base case** — if the node is `null`, return.\n" +
    "2. **Flatten left** — recursively flatten the left subtree into a linked list.\n" +
    "3. **Flatten right** — recursively flatten the right subtree into a linked list.\n" +
    "4. **Save right** — store the original right subtree pointer.\n" +
    "5. **Move left to right** — set `right = left`, then set `left = null`.\n" +
    "6. **Find tail** — walk to the rightmost node of the (now-right) former left subtree.\n" +
    "7. **Attach** — connect the saved right subtree at the tail.\n\n" +
    "After flattening a 7-node tree, the result is: `4 → 2 → 1 → 3 → 6 → 5 → 7` (all right pointers, all left pointers null).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each node is visited exactly once during the recursion plus the rightmost walk, which amortizes to `O(n)` total.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "The recursive call stack consumes space proportional to the height. `O(log n)` for balanced trees, `O(n)` for skewed trees.",

  bestAndWorstCase:
    "**Best case** — balanced tree: `O(log n)` stack depth.\n\n" +
    "**Worst case** — already-right-skewed tree: `O(n)` stack depth and no work to do in the inner loop.\n\n" +
    "Time is always `O(n)` regardless of shape.",

  realWorldUses: [
    "**Serialization** — Convert tree structures to linear sequences for storage or transmission.",
    "**In-place compaction** — Flatten trees for memory-efficient iteration without allocating a separate list.",
    "**Parser trees** — Linearize ASTs or expression trees for sequential evaluation.",
    "**Database B-tree pages** — Reorder node pointers for sequential leaf access patterns.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "In-place transformation — no extra memory for a new data structure.",
      "Recursive implementation closely mirrors the preorder traversal definition.",
      "Produces a canonical right-skewed linked list usable by any linked list algorithm.",
    ],
    limitations: [
      "Destroys the original tree structure — caller must clone if the tree must be preserved.",
      "Recursive version risks stack overflow on very deep trees.",
      "The inner `while` loop makes the naive analysis appear quadratic, though it is amortized `O(n)`.",
    ],
  },

  whenToUseIt:
    "Use flatten-to-linked-list when you need to linearize a tree for sequential processing and can afford to modify the tree in-place. For immutable trees, collect values in preorder into a separate list instead. Use the iterative variant for very deep trees.",
};
