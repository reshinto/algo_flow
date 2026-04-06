import type { EducationalContent } from "@/types";

export const boundaryTraversalEducational: EducationalContent = {
  overview:
    "**Boundary Traversal** visits the outer edge of a binary tree counterclockwise: first the root, then the left boundary (top-down, excluding leaves), then all leaf nodes (left-to-right), and finally the right boundary (bottom-up, excluding leaves). The result traces the perimeter of the tree.",

  howItWorks:
    "The algorithm has three distinct phases:\n\n" +
    "**Phase 1 — Root:** Visit the root (if it's not a leaf).\n\n" +
    "**Phase 2 — Left Boundary:** Starting at the root's left child, walk down following left children preferentially. Skip leaf nodes.\n\n" +
    "**Phase 3 — Leaves:** Traverse the entire tree recursively, visiting only leaf nodes in left-to-right order.\n\n" +
    "**Phase 4 — Right Boundary:** Starting at the root's right child, walk down following right children preferentially (excluding leaves), then add values bottom-up on the way back.\n\n" +
    "### Example: Boundary Traversal on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "```\n\n" +
    "**Result:** `4 → 2 → 1 → 3 → 5 → 7 → 6` — the outer perimeter counterclockwise.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each node is visited at most once across all three phases.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "Recursion depth is bounded by tree height — `O(log n)` for balanced, `O(n)` for degenerate.",

  bestAndWorstCase:
    "**Best case** is a balanced tree — `O(log n)` recursion depth.\n\n" +
    "**Worst case** is a skewed tree — `O(n)` recursion depth and right-boundary phase touches all nodes.\n\n" +
    "Time is always `O(n)` regardless of shape.",

  realWorldUses: [
    "**Tree visualization outline:** Boundary traversal defines the visible outer edge of a tree for outline rendering.",
    "**Convex hull analogy:** Like computing the convex hull of points, boundary traversal extracts the outermost structure.",
    "**Interview problems:** Boundary traversal is a classic medium-difficulty interview problem testing multi-phase tree reasoning.",
    "**Tree perimeter metrics:** Computing the length of a tree's boundary is useful in certain spatial analysis tasks.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Provides the complete boundary of a tree in counterclockwise order.",
      "Three-phase decomposition makes the algorithm easy to understand and implement.",
      "O(n) time ensures scalability.",
    ],
    limitations: [
      "More complex than simple traversals — requires careful handling of leaf and non-leaf cases.",
      "Right boundary is collected bottom-up (post-order), adding complexity.",
      "Not directly useful for standard tree operations like search, insert, or delete.",
    ],
  },

  whenToUseIt:
    "Use boundary traversal when you need the perimeter nodes of a tree — for visualization outlines, interview problems, or spatial boundary calculations. For interior processing, use in-order, pre-order, or level-order traversal instead.",
};
