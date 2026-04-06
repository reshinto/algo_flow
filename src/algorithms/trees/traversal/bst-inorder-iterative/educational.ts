import type { EducationalContent } from "@/types";

export const bstInorderIterativeEducational: EducationalContent = {
  overview:
    "**BST In-Order Traversal (Iterative)** visits every node in ascending sorted order using an explicit stack instead of the call stack. It follows the same LNR pattern (left → root → right) as the recursive version but avoids recursion-related stack overflow risks for deep trees.",

  howItWorks:
    "The algorithm uses a pointer `current` and an explicit stack:\n\n" +
    "1. **Push left chain** — walk left from `current`, pushing each node onto the stack.\n" +
    "2. **Pop and visit** — pop the top node, record its value.\n" +
    "3. **Move right** — set `current` to the popped node's right child and repeat.\n\n" +
    "The outer loop continues while `current` is non-null or the stack is non-empty, ensuring every node is visited.\n\n" +
    "### Example: Iterative In-Order on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "```\n\n" +
    "**Visit order:** `1 → 2 → 3 → 4 → 5 → 6 → 7` — identical to recursive in-order.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is pushed and popped from the stack exactly once.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "The explicit stack holds at most `h` nodes — the depth of the left spine at any moment. For a balanced BST, `h = O(log n)`; for a degenerate tree, `h = O(n)`.",

  bestAndWorstCase:
    "**Best case** is a perfectly balanced BST — the stack never exceeds `O(log n)` depth.\n\n" +
    "**Worst case** is a left-skewed tree — the stack grows to `O(n)` depth, matching the degenerate recursive case but using heap memory instead of the call stack.\n\n" +
    "The iterative version is always preferred when working with large, potentially unbalanced trees in production environments.",

  realWorldUses: [
    "**Database cursor iteration:** Iterative in-order traversal underlies range scans in B-tree cursor implementations, which must not blow the call stack on production data.",
    "**BST flattening:** Convert a BST to a sorted doubly-linked list without recursion depth limits.",
    "**Streaming sorted output:** Produce sorted elements one at a time from a large BST without materializing all elements first.",
    "**Tree serialization:** Serialize a BST to a sorted sequence for persistence or network transfer.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No recursion — safe for arbitrarily deep trees without stack overflow risk.",
      "Produces the same sorted output as the recursive variant.",
      "Explicit stack enables easy pausing, resuming, or interleaving with other operations.",
    ],
    limitations: [
      "Slightly more complex to read and reason about than the recursive implementation.",
      "Still uses O(h) heap space for the explicit stack — not O(1) space.",
      "For O(1) space in-order traversal, Morris Traversal is required instead.",
    ],
  },

  whenToUseIt:
    "Use the iterative in-order traversal when you need sorted BST output in production environments where call-stack depth is a concern, or when you need explicit control over the traversal state (e.g., pausing mid-traversal). For O(1) extra space, use Morris Traversal instead.",
};
