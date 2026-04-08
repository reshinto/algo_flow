import type { EducationalContent } from "@/types";

export const isSymmetricTreeIterativeEducational: EducationalContent = {
  overview:
    "**Is Symmetric Tree (Iterative)** checks tree symmetry using a queue of node pairs. " +
    "Instead of recursive calls, it processes mirror pairs level by level, " +
    "comparing outer and inner pairs at each step.",

  howItWorks:
    "1. Initialize the queue with `[root.left, root.right]`.\n" +
    "2. Dequeue a pair `[left, right]`.\n" +
    "3. If both null — symmetric, continue.\n" +
    "4. If one null or values differ — return `false`.\n" +
    "5. Enqueue outer pair `[left.left, right.right]` and inner pair `[left.right, right.left]`.\n" +
    "6. If the queue empties without failure — return `true`.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((1)):::root --> B((2)):::visited\n" +
    "  A --> C((2)):::visited\n" +
    "  B --> D((3)):::current\n" +
    "  B --> E((4)):::current\n" +
    "  C --> F((4)):::current\n" +
    "  C --> G((3)):::current\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Queue starts with pair `[2, 2]` — values match. Enqueues outer pair `[3, 3]` and inner pair `[4, 4]`. Both pairs match, queue empties — returns `true`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — all node pairs are processed.\n\n" +
    "**Space Complexity: `O(w)`** — the queue holds at most one level of node pairs.",

  bestAndWorstCase:
    "**Best case** is a root with mismatching children — terminates after the first pair check.\n\n" +
    "**Worst case** is a symmetric tree — all pairs must be enqueued and processed.",

  realWorldUses: [
    "**Stack-overflow-safe symmetry checking:** Works on arbitrarily deep trees.",
    "**BFS-parallel symmetry:** Naturally processes symmetric levels together.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No stack overflow risk from deep recursion.",
      "BFS ordering makes it easy to add per-level symmetry diagnostics.",
    ],
    limitations: ["Queue uses O(w) memory, which can be significant for wide trees."],
  },

  whenToUseIt:
    "Use the queue-based iterative version for very deep trees or in environments with recursion limits.",
};
