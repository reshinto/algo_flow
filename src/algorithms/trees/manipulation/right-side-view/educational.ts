import type { EducationalContent } from "@/types";

export const rightSideViewEducational: EducationalContent = {
  overview:
    "**Right Side View** returns the values of all nodes visible when looking at the binary tree from the right side. For each depth level, only the rightmost node is visible.\n\nThis BFS variant processes the tree level-by-level and records the last node seen at each level.",

  howItWorks:
    "The algorithm uses BFS (level-order traversal):\n\n" +
    "1. **Initialize** — add root to the queue.\n" +
    "2. **Process each level** — at the start of each BFS iteration, snapshot `levelSize = queue.length`.\n" +
    "3. **Dequeue all level nodes** — process exactly `levelSize` nodes from the queue.\n" +
    "4. **Record rightmost** — when `position === levelSize - 1`, the current node is the last at this depth; add its value to results.\n" +
    "5. **Enqueue children** — add left then right children for the next level.\n" +
    "6. **Repeat** — continue until the queue is empty.\n\n" +
    "For the default 7-node BST, the right side view is `[4, 6, 7]`.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((4)) --> B((2))\n" +
    "  A --> C((6))\n" +
    "  B --> D((1))\n" +
    "  B --> E((3))\n" +
    "  C --> F((5))\n" +
    "  C --> G((7))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "The highlighted nodes (4, 6, 7) form the right-side view. BFS processes each level and records the last node dequeued: 4 at level 0, 6 at level 1, 7 at level 2.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is dequeued exactly once.\n\n" +
    "**Space Complexity: `O(w)` where `w` is the maximum tree width**\n\n" +
    "The BFS queue holds at most one full level. For balanced trees, the widest level has `n/2` nodes — `O(n)` worst case.",

  bestAndWorstCase:
    "**Best case** — skewed tree: queue never holds more than one node — `O(1)` extra space.\n\n" +
    "**Worst case** — complete binary tree: bottom level has `⌊n/2⌋` nodes in the queue simultaneously — `O(n)` space.",

  realWorldUses: [
    "**UI rendering** — Determine which elements are visible at each depth in a UI tree.",
    "**Rendering engines** — Compute rightmost visible nodes in BSP or scene graph trees.",
    "**Game AI** — Find the last visible entity per depth tier in search trees.",
    "**Data visualization** — Annotate hierarchical data with the boundary element at each level.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple BFS implementation — easy to understand and maintain.",
      "Level-by-level processing naturally maps to the visual metaphor.",
      "Can be trivially adapted to return the left-side view by picking `position === 0`.",
    ],
    limitations: [
      "Does not handle n-ary trees without modification.",
      "Returns values only, not node references — add a separate `nodeId` array if references are needed.",
      "BFS queue uses `O(w)` space; for very wide trees, DFS recursion may be more space-efficient.",
    ],
  },

  whenToUseIt:
    "Use right-side-view BFS when you need level-by-level access to the rightmost nodes and want a straightforward queue-based implementation. For deep, narrow trees where recursion depth is acceptable, the recursive DFS variant uses less space.",
};
