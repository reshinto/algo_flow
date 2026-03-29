import type { EducationalContent } from "@/types";

export const bstInorderEducational: EducationalContent = {
  overview:
    "**BST In-Order Traversal** visits every node of a Binary Search Tree in ascending sorted order by following the pattern: **left subtree → root → right subtree**.\n\nBecause a BST maintains the invariant that all left descendants are smaller than the root and all right descendants are larger, an in-order traversal produces a sorted sequence — making it the canonical way to read a BST's elements in order.",

  howItWorks:
    "The algorithm uses a recursive helper that processes each node in three steps:\n\n" +
    "1. **Recurse left** — visit all nodes in the left subtree (smaller values).\n" +
    "2. **Visit root** — record the current node's value.\n" +
    "3. **Recurse right** — visit all nodes in the right subtree (larger values).\n\n" +
    "### Example: In-Order on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "    style n4 fill:#06b6d4,stroke:#0891b2\n" +
    "    style n2 fill:#3b82f6,stroke:#2563eb\n" +
    "    style n6 fill:#3b82f6,stroke:#2563eb\n" +
    "```\n\n" +
    "**Visit order:** `1 → 2 → 3 → 4 → 5 → 6 → 7` — sorted ascending.\n\n" +
    "The base case is a `null` node — recursion stops immediately without recording a visit.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is visited exactly once. No node is skipped or revisited, regardless of tree shape.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "The call stack reaches a depth of `h` during traversal. For a balanced BST with `n` nodes, `h = O(log n)`. For a degenerate (linear) BST, `h = O(n)` in the worst case.",

  bestAndWorstCase:
    "**Best case** is a perfectly balanced BST — the call stack depth is `O(log n)` and the traversal is maximally efficient.\n\n" +
    "**Worst case** is a degenerate tree (all nodes inserted in sorted order) forming a linked list — the call stack reaches depth `O(n)`, risking a stack overflow for very large inputs.\n\n" +
    "Time is always `O(n)` because all nodes must be visited regardless of structure.",

  realWorldUses: [
    "**Sorted output from a BST:** Produce a sorted array from any BST in `O(n)` without an explicit sort step.",
    "**BST validation:** Verify that a binary tree is a valid BST by checking that the in-order sequence is strictly ascending.",
    "**Database index scans:** B-tree range queries in relational databases use in-order traversal to iterate over sorted keys.",
    "**Expression evaluation:** In-order traversal of an expression tree produces infix notation, matching standard mathematical notation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Always produces sorted output for a valid BST — no sorting step required.",
      "Simple, elegant recursive implementation closely mirrors the mathematical definition.",
      "O(log n) stack depth for balanced trees keeps memory usage low.",
    ],
    limitations: [
      "Recursive implementation can cause a stack overflow on degenerate trees with very large `n`.",
      "Does not work correctly if the input tree violates BST invariants.",
      "An iterative implementation using an explicit stack avoids the overflow risk but is less readable.",
    ],
  },

  whenToUseIt:
    "Use in-order traversal whenever you need the values of a BST in sorted order — such as range queries, building a sorted array, or verifying BST correctness. For pre-order traversal (useful for copying/serializing a tree) or post-order traversal (useful for deletion), use the corresponding variants.",
};
