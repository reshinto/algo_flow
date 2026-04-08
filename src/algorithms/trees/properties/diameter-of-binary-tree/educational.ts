import type { EducationalContent } from "@/types";

export const diameterOfBinaryTreeEducational: EducationalContent = {
  overview:
    "**Diameter of a Binary Tree** is the length of the longest path between any two nodes. " +
    "This path may or may not pass through the root. The length is measured in number of edges.",

  howItWorks:
    "A recursive post-order DFS computes two values simultaneously at each node:\n\n" +
    "1. **Height** — the height of this node's subtree (returned up the call stack).\n" +
    "2. **Local diameter** — `leftHeight + rightHeight` represents the longest path through this node.\n\n" +
    "A global variable tracks the maximum local diameter seen across all nodes. " +
    "The final diameter is recorded when the recursion completes.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((1)):::visited --> B((2)):::current\n" +
    "  A --> C((3)):::visited\n" +
    "  B --> D((4)):::visited\n" +
    "  B --> E((5)):::visited\n" +
    "  D --> F((8)):::visited\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "At node 2: leftHeight (through 4 → 8) = 2, rightHeight (through 5) = 1. Local diameter = 3. At node 1: leftHeight = 3, rightHeight = 1, local diameter = 4. The maximum diameter of 4 edges is the answer.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — each node is visited exactly once.\n\n" +
    "**Space Complexity: `O(h)`** — call stack depth equals tree height.",

  bestAndWorstCase:
    "**Best case** is a balanced tree where the diameter passes through the root and equals `2h - 2`.\n\n" +
    "**Worst case** in terms of space is a degenerate tree with `O(n)` stack depth.",

  realWorldUses: [
    "**Network diameter:** The maximum latency path in a hierarchical network topology modeled as a tree.",
    "**Phylogenetic tree analysis:** The evolutionary distance between two most-distant species.",
    "**Social network depth:** Maximum degrees of separation in a tree-shaped contact graph.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Computes height and diameter in a single DFS pass — O(n) time with no redundant work.",
      "Simple to implement once the key insight (local path = leftHeight + rightHeight) is understood.",
    ],
    limitations: [
      "Requires careful handling of the global state (max diameter) in recursive implementations.",
      "Recursive version risks stack overflow on degenerate trees.",
    ],
  },

  whenToUseIt:
    "Use diameter when you need to find the longest inter-node path in a tree. " +
    "If the tree can be very deep, consider an iterative post-order approach to avoid stack overflow.",
};
