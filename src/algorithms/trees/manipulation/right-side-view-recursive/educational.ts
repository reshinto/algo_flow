import type { EducationalContent } from "@/types";

export const rightSideViewRecursiveEducational: EducationalContent = {
  overview:
    "**Right Side View (Recursive)** uses a depth-first search that visits the right child before the left child. By recording only the first node seen at each depth, it naturally captures the rightmost node at every level.\n\nThis DFS approach is more space-efficient than BFS for tall, narrow trees since the call stack is proportional to the tree height rather than the maximum level width.",

  howItWorks:
    "The recursive DFS approach exploits depth tracking:\n\n" +
    "1. **Initialize** — create an empty result array, call `dfs(root, depth=0)`.\n" +
    "2. **Base case** — if the node is null, return.\n" +
    "3. **Record if new depth** — if `depth === result.length`, this is the first (rightmost) node at this depth; add its value.\n" +
    "4. **Recurse right first** — visit right child at `depth + 1`.\n" +
    "5. **Recurse left** — visit left child at `depth + 1`.\n\n" +
    "Because the right subtree is always visited before the left, the first node encountered at each depth is guaranteed to be the rightmost visible node.\n\n" +
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
    "DFS visits right before left: depth 0 → node 4, depth 1 → node 6 (right visited first, so 6 is recorded before 2), depth 2 → node 7. Right-side view = [4, 6, 7].",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is visited exactly once during the DFS.\n\n" +
    "**Space Complexity: `O(h)` where `h` is the tree height**\n\n" +
    "The recursive call stack depth equals the tree height. `O(log n)` for balanced trees, `O(n)` for skewed trees.",

  bestAndWorstCase:
    "**Best case** — balanced tree: `O(log n)` call stack depth.\n\n" +
    "**Worst case** — skewed tree: `O(n)` call stack depth.\n\n" +
    "For wide, shallow trees, the DFS stack uses less memory than BFS queue.",

  realWorldUses: [
    "**Narrow-tree optimization** — Prefer over BFS when trees are taller than they are wide.",
    "**Recursive tree processors** — Natural fit in codebases already using recursive tree traversal.",
    "**Right-boundary traversal** — Used as a sub-step in boundary traversal algorithms.",
    "**Depth-limited views** — Easily extended to collect rightmost node only up to a specified depth.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simpler than BFS — no queue management or level-size bookkeeping needed.",
      "Uses `O(h)` space, which is better than BFS for tall narrow trees.",
      "Easily extended to collect left-side view by swapping DFS order.",
    ],
    limitations: [
      "Recursive — may stack overflow for very deep trees.",
      "For wide trees, BFS is more space-efficient than this DFS approach.",
      "Visiting right-then-left may be counterintuitive compared to standard left-then-right DFS.",
    ],
  },

  whenToUseIt:
    "Use the recursive DFS variant when trees are tall and narrow, or when the codebase already uses recursive tree algorithms. For wide, shallow trees or when an iterative implementation is required, prefer the BFS version.",
};
