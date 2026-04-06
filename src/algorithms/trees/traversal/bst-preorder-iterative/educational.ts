import type { EducationalContent } from "@/types";

export const bstPreorderIterativeEducational: EducationalContent = {
  overview:
    "**BST Pre-Order Traversal (Iterative)** visits every node in NLR order using an explicit stack. It pushes the root, then on each loop pops a node (visiting it), pushes its right child, then its left child — ensuring left is processed first due to LIFO stack behavior.",

  howItWorks:
    "The algorithm uses a single stack:\n\n" +
    "1. **Initialize** — push the root onto the stack.\n" +
    "2. **Pop and visit** — pop the top node and record its value.\n" +
    "3. **Push children** — push right child first, then left child (so left is popped next).\n" +
    "4. **Repeat** until the stack is empty.\n\n" +
    "### Example: Iterative Pre-Order on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "```\n\n" +
    "**Visit order:** `4 → 2 → 1 → 3 → 6 → 5 → 7` — identical to recursive pre-order.\n\n" +
    "The key insight: pushing right before left ensures left is on top of the stack and gets popped (visited) first.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is pushed onto and popped from the stack exactly once.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "At most `h` nodes exist on the stack at any time. `O(log n)` for balanced, `O(n)` for degenerate trees.",

  bestAndWorstCase:
    "**Best case** is a balanced tree — stack never exceeds `O(log n)` depth.\n\n" +
    "**Worst case** is a right-skewed tree — every node is pushed and the stack grows to `O(n)`.\n\n" +
    "Pre-order iterative is very simple to implement because it only requires a single pass, unlike iterative in-order which requires tracking the current pointer separately.",

  realWorldUses: [
    "**Safe tree copying without recursion:** Iterative pre-order enables copying deep trees without stack overflow.",
    "**DOM tree serialization:** Browser engines use pre-order iteration to serialize or diff DOM trees.",
    "**Compiler AST printing:** Abstract syntax trees are printed in pre-order for human-readable output.",
    "**Depth-first file system scanning:** Pre-order iteration maps directly to depth-first directory scanning.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single-pass, straightforward stack management — simpler than iterative in-order.",
      "No recursion — safe for arbitrarily deep trees.",
      "Produces exact NLR pre-order output, suitable for tree reconstruction.",
    ],
    limitations: [
      "Does not produce sorted output — use in-order for sorted BST values.",
      "Still uses O(h) heap memory for the stack.",
      "Right-heavy trees cause larger stack usage than left-heavy trees.",
    ],
  },

  whenToUseIt:
    "Use iterative pre-order when you need root-before-children output without recursion overhead. This is the simplest iterative tree traversal to implement. For in-order (sorted) output, use the iterative in-order variant; for bottom-up processing, use iterative post-order.",
};
