import type { EducationalContent } from "@/types";

export const verticalOrderTraversalEducational: EducationalContent = {
  overview:
    "**Vertical-Order Traversal** groups nodes by their vertical column index. The root is at column 0; going left decrements the column, going right increments it. Nodes in the same column are grouped together and collected left-to-right using BFS.",

  howItWorks:
    "The algorithm uses BFS with column tracking:\n\n" +
    "1. **Initialize** — root enters the queue at column 0.\n" +
    "2. **BFS with column** — dequeue each node, record its column, enqueue left child at `column - 1` and right child at `column + 1`.\n" +
    "3. **Group by column** — a map accumulates node values per column index.\n" +
    "4. **Collect result** — iterate columns from `minColumn` to `maxColumn` to build the final list.\n\n" +
    "### Example: Vertical-Order on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4,col=0)) --> n2((2,col=-1))\n" +
    "    n4 --> n6((6,col=1))\n" +
    "    n2 --> n1((1,col=-2))\n" +
    "    n2 --> n3((3,col=0))\n" +
    "    n6 --> n5((5,col=0))\n" +
    "    n6 --> n7((7,col=2))\n" +
    "```\n\n" +
    "**Col -2:** `[1]` · **Col -1:** `[2]` · **Col 0:** `[4, 3, 5]` · **Col 1:** `[6]` · **Col 2:** `[7]`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)` or `O(n)`**\n\n" +
    "BFS is `O(n)`. Grouping into a sorted map is `O(n log n)` with a sorted map, or `O(n)` with a hash map plus linear scan.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The column map and BFS queue together hold all `n` nodes.",

  bestAndWorstCase:
    "**Best case** is a perfectly balanced tree — columns span `O(log n)` width, reducing sort overhead.\n\n" +
    "**Worst case** is a completely skewed tree — all nodes end up in distinct columns, requiring the full `O(n)` column range.\n\n" +
    "BFS ensures top-down, left-to-right ordering within each column naturally.",

  realWorldUses: [
    "**Tree rendering:** Vertical columns directly map to horizontal screen positions for tree visualization.",
    "**Database query plans:** Tree-shaped query plan nodes are often arranged by vertical dependency column.",
    "**Binary tree to linked list conversion:** Vertical-order gives a natural left-to-right, top-to-bottom grouping.",
    "**Hierarchical org chart layout:** Vertical order assigns horizontal positions to employees in an org hierarchy.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "BFS naturally produces top-down ordering within each column.",
      "Column indices are intuitively meaningful — directly map to horizontal layout positions.",
      "Simple extension of standard level-order BFS with a column parameter.",
    ],
    limitations: [
      "Requires O(n) extra space for the column map.",
      "Sorting columns requires O(n log n) unless column range is known in advance.",
      "Nodes at the same column and same depth may have ambiguous ordering in some problem variants.",
    ],
  },

  whenToUseIt:
    "Use vertical-order traversal when you need to group or display tree nodes by their horizontal position. This is essential for tree rendering, visualization layout, and certain interview problems. For simple level-by-level processing, use standard level-order traversal.",
};
