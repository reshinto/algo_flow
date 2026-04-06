import type { EducationalContent } from "@/types";

export const reverseLevelOrderEducational: EducationalContent = {
  overview:
    "**Reverse Level-Order Traversal** visits nodes from the deepest level upward to the root, left to right within each level. It uses standard BFS with a queue, but prepends each completed level to the result instead of appending — producing bottom-up level groups.",

  howItWorks:
    "The algorithm is identical to standard level-order traversal, with one change:\n\n" +
    "1. **BFS with queue** — process levels top-down using the standard level-order approach.\n" +
    "2. **Prepend each level** — instead of appending to the result, each completed level is inserted at position 0.\n" +
    "3. **Result** — after BFS completes, the result is naturally in bottom-up level order.\n\n" +
    "### Example: Reverse Level-Order on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "```\n\n" +
    "**Level 2:** `[1, 3, 5, 7]` · **Level 1:** `[2, 6]` · **Level 0:** `[4]`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is enqueued and dequeued exactly once.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The result stores all `n` node values. Queue space is `O(w)` where `w` is the maximum level width.",

  bestAndWorstCase:
    "**Best and worst cases** are both `O(n)` time and `O(n)` output space since all nodes must be visited and stored.\n\n" +
    "Queue memory peaks at the widest level — `O(n/2)` for a perfect binary tree, `O(1)` for a skewed tree.",

  realWorldUses: [
    "**Minimum depth calculation:** Reverse level-order directly provides leaf nodes first, useful for bottom-up depth calculations.",
    "**Printing tree structure:** Display trees from leaves to root (useful for dependency graphs showing deepest dependencies first).",
    "**Bottom-up tree algorithms:** Algorithms like computing subtree sums naturally work in reverse level-order.",
    "**Topological-style tree processing:** Process nodes from leaves inward when parents depend on child results.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple adaptation of standard level-order — just prepend instead of append.",
      "Provides natural bottom-up level grouping without additional passes.",
      "Easy to implement using a deque/stack as the result accumulator.",
    ],
    limitations: [
      "Requires storing all levels in memory before the result is meaningful — no early termination.",
      "Uses O(n) space for the result regardless of tree shape.",
      "Not suitable when you need to process the deepest level immediately upon discovery.",
    ],
  },

  whenToUseIt:
    "Use reverse level-order traversal when you need tree levels from bottom to top — computing bottom-up aggregates, displaying dependency trees from leaves to root, or processing subtrees before their parents. For standard top-down level processing, use level-order traversal instead.",
};
