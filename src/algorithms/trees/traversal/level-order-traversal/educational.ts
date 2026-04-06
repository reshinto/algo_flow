import type { EducationalContent } from "@/types";

export const levelOrderTraversalEducational: EducationalContent = {
  overview:
    "**Level-Order Traversal** visits every node of a tree level by level, from the root downward, using a queue (BFS). All nodes at depth `d` are visited before any node at depth `d+1`. The result is a list of levels, each containing the values at that depth.",

  howItWorks:
    "The algorithm uses a queue (FIFO) and processes nodes level by level:\n\n" +
    "1. **Enqueue root** — add the root to the queue.\n" +
    "2. **Process each level** — record the queue size (`levelSize`), then dequeue exactly that many nodes.\n" +
    "3. **Visit and enqueue children** — for each dequeued node, record its value and enqueue its left and right children.\n" +
    "4. **Repeat** until the queue is empty.\n\n" +
    "### Example: Level-Order on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "```\n\n" +
    "**Level 0:** `[4]` · **Level 1:** `[2, 6]` · **Level 2:** `[1, 3, 5, 7]`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is enqueued and dequeued exactly once.\n\n" +
    "**Space Complexity: `O(w)` where `w` is the maximum level width**\n\n" +
    "The queue holds at most `w` nodes at one time — the width of the widest level. For a perfect binary tree, `w = n/2` (last level), so worst-case space is `O(n)`.",

  bestAndWorstCase:
    "**Best case** is a completely skewed tree (linked list) — only one node per level, so the queue never holds more than one node: `O(1)` queue space.\n\n" +
    "**Worst case** is a perfect binary tree — the last level holds `n/2` nodes simultaneously in the queue: `O(n)` queue space.\n\n" +
    "Time is always `O(n)` regardless of tree shape.",

  realWorldUses: [
    "**Finding the shortest path in unweighted trees:** Level-order naturally finds the minimum depth to any node.",
    "**Tree serialization/deserialization:** JSON tree representations (like LeetCode's array format) use level-order.",
    "**Rendering tree UIs:** Displaying a tree layer by layer (org charts, file trees) uses level-order for layout.",
    "**Finding tree diameter:** Many tree diameter algorithms use two BFS passes.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees left-to-right, top-down order across all levels.",
      "Naturally groups nodes by depth — ideal for level-specific operations.",
      "Simple queue-based implementation, easy to reason about.",
    ],
    limitations: [
      "Uses O(w) queue space — can reach O(n) for wide, balanced trees.",
      "Not suitable for memory-constrained environments with wide trees.",
      "Depth-first traversals (in-order, pre-order, post-order) are more stack-memory efficient for deep, narrow trees.",
    ],
  },

  whenToUseIt:
    "Use level-order traversal when you need to process a tree layer by layer — finding the minimum depth, computing level-wise sums, or printing the tree in a readable format. For depth-first processing (sorted output, copying, deletion), use in-order, pre-order, or post-order respectively.",
};
