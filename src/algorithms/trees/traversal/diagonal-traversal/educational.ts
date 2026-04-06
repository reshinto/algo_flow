import type { EducationalContent } from "@/types";

export const diagonalTraversalEducational: EducationalContent = {
  overview:
    "**Diagonal Traversal** groups nodes by their diagonal index. Moving right keeps a node on the same diagonal; moving left increments the diagonal by 1. Nodes on the same diagonal form a descending-right line in the tree's visual layout.",

  howItWorks:
    "The algorithm uses BFS with a diagonal counter:\n\n" +
    "1. **Initialize** — root enters the queue at diagonal 0.\n" +
    "2. **BFS with diagonal** — dequeue each node, record its diagonal.\n" +
    "3. **Right child** — enqueue at the same diagonal (going right is horizontal).\n" +
    "4. **Left child** — enqueue at `diagonal + 1` (going left shifts to the next diagonal).\n" +
    "5. **Collect result** — iterate diagonals from 0 to `maxDiagonal`.\n\n" +
    "### Example: Diagonal Traversal on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4,d=0)) --> n2((2,d=1))\n" +
    "    n4 --> n6((6,d=0))\n" +
    "    n2 --> n1((1,d=2))\n" +
    "    n2 --> n3((3,d=1))\n" +
    "    n6 --> n5((5,d=1))\n" +
    "    n6 --> n7((7,d=0))\n" +
    "```\n\n" +
    "**Diagonal 0:** `[4, 6, 7]` · **Diagonal 1:** `[2, 3, 5]` · **Diagonal 2:** `[1]`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is visited exactly once during BFS.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The diagonal map and queue together hold all `n` nodes.",

  bestAndWorstCase:
    "**Best case** is a right-skewed tree — all nodes land on diagonal 0, map has one entry.\n\n" +
    "**Worst case** is a left-skewed tree — each node is on its own diagonal, map has `n` entries.\n\n" +
    "Time is always `O(n)` regardless of tree shape.",

  realWorldUses: [
    "**Tree layout algorithms:** Diagonal grouping maps directly to visual diagonal lines in tree drawings.",
    "**Slope-based spatial analysis:** In spatial trees (k-d trees, quad-trees), diagonal grouping reflects geometric proximity.",
    "**Matrix diagonal traversal analogy:** Tree diagonal traversal is the tree analog of matrix diagonal traversal.",
    "**Interview problems:** A classic medium-difficulty problem testing multi-level tree BFS reasoning.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Intuitively maps to the visual diagonal lines visible in a tree drawing.",
      "Simple BFS extension — only requires tracking a diagonal counter.",
      "Collects nodes in a meaningful spatial grouping.",
    ],
    limitations: [
      "Requires O(n) map space for diagonal groupings.",
      "Less universally useful than level-order or depth-first traversals.",
      "Primarily a pedagogical and interview algorithm.",
    ],
  },

  whenToUseIt:
    "Use diagonal traversal when you need to group or process nodes along visual diagonal lines in the tree — useful for tree rendering, spatial analysis, and interview problems. For vertical grouping, use vertical-order traversal instead.",
};
