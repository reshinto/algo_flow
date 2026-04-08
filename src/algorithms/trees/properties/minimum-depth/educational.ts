import type { EducationalContent } from "@/types";

export const minimumDepthEducational: EducationalContent = {
  overview:
    "**Minimum Depth** is the length of the shortest path from the root to any leaf node. " +
    "A leaf is a node with no children. Importantly, a node with only one child is NOT a leaf — " +
    "the algorithm must traverse through single-child nodes to reach an actual leaf.",

  howItWorks:
    "The recursive algorithm handles three cases:\n\n" +
    "1. **Null node** — returns 0.\n" +
    "2. **Only one child** — recurse into the existing child only (single-child nodes are not leaves).\n" +
    "3. **Both children** — return `min(leftDepth, rightDepth) + 1`.\n\n" +
    "The critical insight is case 2: a node with only a right child must count the depth through that right subtree, not return 1.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((2)):::root --> C((3)):::current\n" +
    "  C --> E((4)):::current\n" +
    "  E --> F((5)):::visited\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Node 2 has no left child — case 2 applies, recurse right only. Node 3 has no left child — recurse right only. Node 4 has no right child — recurse left only. Node 5 is the only leaf at depth 4. Minimum depth = 4.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — may visit all nodes in the worst case.\n\n" +
    "**Space Complexity: `O(h)`** — call stack depth equals tree height.",

  bestAndWorstCase:
    "**Best case** is a complete tree where the shallowest leaf is at depth 1 (root has leaf child).\n\n" +
    "**Worst case** is a tree shaped such that the minimum depth leaf is at the bottom — " +
    "all nodes may need to be visited before the minimum is determined.",

  realWorldUses: [
    "**Earliest termination detection:** Finding the minimum steps to reach any accepting state in a state machine.",
    "**Network shortest hop:** Minimum depth in a routing tree tells you the minimum hops to reach any leaf node.",
    "**Game tree shortest win:** Minimum depth of winning leaves represents the fastest guaranteed win.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Correctly handles the tricky single-child case that naive max-depth adaptations miss.",
      "Simple recursive implementation once the edge cases are understood.",
    ],
    limitations: [
      "Must visit all nodes in the worst case, even if the minimum is near the root.",
      "The iterative BFS version can short-circuit as soon as the first leaf is found.",
    ],
  },

  whenToUseIt:
    "Use minimum depth when you need the shallowest leaf. The BFS (iterative) variant is more efficient in practice " +
    "because it returns immediately upon finding the first leaf at any level.",
};
