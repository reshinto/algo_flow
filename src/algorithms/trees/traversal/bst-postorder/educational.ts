import type { EducationalContent } from "@/types";

export const bstPostorderEducational: EducationalContent = {
  overview:
    "**BST Post-Order Traversal** visits every node in LRN order: **left subtree → right subtree → root**. The root is visited last, after all its descendants have been processed. This bottom-up pattern is essential for deletion, memory deallocation, and expression evaluation.",

  howItWorks:
    "The algorithm uses a recursive helper that processes each node in three steps:\n\n" +
    "1. **Recurse left** — visit all nodes in the left subtree.\n" +
    "2. **Recurse right** — visit all nodes in the right subtree.\n" +
    "3. **Visit root** — record the current node's value after its children.\n\n" +
    "### Example: Post-Order on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "```\n\n" +
    "**Visit order:** `1 → 3 → 2 → 5 → 7 → 6 → 4` — leaves before parents, root last.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is visited exactly once.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "The call stack depth equals the tree height. `O(log n)` for balanced trees, `O(n)` for degenerate.",

  bestAndWorstCase:
    "**Best case** is a perfectly balanced BST — call stack depth is `O(log n)`.\n\n" +
    "**Worst case** is a degenerate (chain) tree — the call stack reaches depth `O(n)`, risking overflow.\n\n" +
    "Time is always `O(n)` since all nodes must be processed.",

  realWorldUses: [
    "**Tree deletion:** Post-order is the correct order to free nodes — children must be deleted before their parent.",
    "**Expression evaluation:** Post-order traversal of an expression tree computes sub-expressions bottom-up, then combines at the root.",
    "**Compiler code generation:** Compilers evaluate expressions bottom-up, generating code for operands before operators.",
    "**Directory size calculation:** To compute a directory's total size, sum child sizes first, then add the parent — post-order logic.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees children are processed before their parent — essential for deletion and bottom-up computation.",
      "Simple, elegant recursive implementation.",
      "Post-order output uniquely identifies subtree boundaries.",
    ],
    limitations: [
      "Does not produce sorted output — in-order is required for sorted BST values.",
      "Recursive implementation risks stack overflow on degenerate trees.",
      "Iterative post-order is significantly more complex to implement than iterative pre-order or in-order.",
    ],
  },

  whenToUseIt:
    "Use post-order traversal whenever you need to process children before their parent — deleting a tree, evaluating an expression tree, or computing aggregate values bottom-up. For pre-order (copy/serialize), use bst-preorder; for sorted output, use bst-inorder.",
};
