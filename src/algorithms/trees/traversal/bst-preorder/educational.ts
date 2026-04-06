import type { EducationalContent } from "@/types";

export const bstPreorderEducational: EducationalContent = {
  overview:
    "**BST Pre-Order Traversal** visits every node in NLR order: **root → left subtree → right subtree**. Unlike in-order traversal (which produces sorted output), pre-order visits the root before its children, making it ideal for copying or serializing a tree.",

  howItWorks:
    "The algorithm uses a recursive helper that processes each node in three steps:\n\n" +
    "1. **Visit root** — record the current node's value immediately.\n" +
    "2. **Recurse left** — visit all nodes in the left subtree.\n" +
    "3. **Recurse right** — visit all nodes in the right subtree.\n\n" +
    "### Example: Pre-Order on a 7-Node BST\n\n" +
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
    "**Visit order:** `4 → 2 → 1 → 3 → 6 → 5 → 7` — root always appears before its descendants.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is visited exactly once.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "The call stack depth equals the height of the tree. `O(log n)` for balanced, `O(n)` for degenerate trees.",

  bestAndWorstCase:
    "**Best case** is a perfectly balanced BST — call stack depth is `O(log n)`.\n\n" +
    "**Worst case** is a degenerate (chain) tree — the call stack reaches depth `O(n)`, risking stack overflow for very large inputs.\n\n" +
    "Time is always `O(n)` since all nodes must be visited.",

  realWorldUses: [
    "**Tree copying:** Pre-order produces the exact insertion sequence needed to reconstruct the same BST structure from scratch.",
    "**Tree serialization:** Pre-order output uniquely identifies a BST's structure, enabling lossless serialization.",
    "**Expression tree evaluation:** Pre-order traversal of an expression tree produces prefix (Polish) notation.",
    "**File system traversal:** Pre-order mirrors how directory listings show a parent folder before its children.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Visits the root before its descendants — ideal for tasks where parent context is needed before children.",
      "Simple, elegant recursive implementation closely mirrors the mathematical definition.",
      "Pre-order output can be used directly to reconstruct the exact same BST.",
    ],
    limitations: [
      "Does not produce sorted output — in-order traversal is required for sorted BST values.",
      "Recursive implementation risks stack overflow on very deep, degenerate trees.",
      "An iterative version using an explicit stack avoids the overflow risk.",
    ],
  },

  whenToUseIt:
    "Use pre-order traversal when you need to copy, serialize, or export the structure of a tree — parent before children. Use in-order for sorted output, and post-order when you need to process children before their parent (e.g., deleting a tree).",
};
