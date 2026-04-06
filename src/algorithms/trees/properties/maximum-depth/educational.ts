import type { EducationalContent } from "@/types";

export const maximumDepthEducational: EducationalContent = {
  overview:
    "**Maximum Depth** (also called tree height) is the length of the longest path from the root to any leaf node. " +
    "For a balanced binary tree with `n` nodes, the depth is `O(log n)`. For a degenerate tree, it reaches `O(n)`.",

  howItWorks:
    "The algorithm uses recursive DFS. At each node it:\n\n" +
    "1. **Recurses left** — compute depth of the left subtree.\n" +
    "2. **Recurses right** — compute depth of the right subtree.\n" +
    "3. **Returns** `max(leftDepth, rightDepth) + 1` to account for the current node.\n\n" +
    "The base case returns `0` for a `null` node. The recursion unwinds naturally, passing heights up the call stack.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — every node is visited exactly once.\n\n" +
    "**Space Complexity: `O(h)`** — the call stack depth equals the tree height `h`. " +
    "For balanced trees `h = O(log n)`, for skewed trees `h = O(n)`.",

  bestAndWorstCase:
    "**Best case** is a balanced tree — the call stack stays at `O(log n)` depth.\n\n" +
    "**Worst case** is a degenerate (fully skewed) tree — the recursion depth reaches `O(n)`, " +
    "which may cause a stack overflow for extremely large inputs.",

  realWorldUses: [
    "**Validating AVL / Red-Black trees:** Maximum depth is compared between subtrees to enforce balance invariants.",
    "**Network routing trees:** Tree depth affects worst-case lookup time in hierarchical routing structures.",
    "**Compiler parse trees:** AST depth limits are used to detect deeply nested expressions or recursion bombs.",
    "**File system traversal:** Directory depth checking to prevent infinite recursive descent.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple recursive implementation that directly mirrors the definition.",
      "O(log n) stack depth for balanced trees keeps memory usage minimal.",
      "No auxiliary data structures needed.",
    ],
    limitations: [
      "Recursive implementation risks stack overflow on degenerate trees with very large n.",
      "Visits every node even when early termination could help in some specialized depth-bounded searches.",
    ],
  },

  whenToUseIt:
    "Use maximum depth when you need to measure tree height for balance validation, " +
    "space allocation, or complexity analysis. For large trees where stack overflow is a concern, " +
    "use the iterative BFS variant instead.",
};
