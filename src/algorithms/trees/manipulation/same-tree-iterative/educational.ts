import type { EducationalContent } from "@/types";

export const sameTreeIterativeEducational: EducationalContent = {
  overview:
    "**Same Tree (Iterative)** uses a queue of node pairs to compare two binary trees iteratively. At each step, the front pair is dequeued and compared; their child pairs are then enqueued for the next comparisons.\n\nThis avoids recursion entirely, making it safe for arbitrarily deep trees.",

  howItWorks:
    "The algorithm uses BFS with paired nodes:\n\n" +
    "1. **Initialize** — enqueue `(rootA, rootB)` as the first pair.\n" +
    "2. **Dequeue** — pop the front pair `(nodeA, nodeB)` from the queue.\n" +
    "3. **Both null** — skip (structural match at this position).\n" +
    "4. **One null** — return `false` (structural mismatch).\n" +
    "5. **Different values** — return `false` (value mismatch).\n" +
    "6. **Enqueue children** — add `(nodeA.left, nodeB.left)` and `(nodeA.right, nodeB.right)` to the queue.\n" +
    "7. **Repeat** — continue until queue is empty.\n" +
    "8. **Return true** — all pairs matched.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  subgraph TreeB [Tree B]\n" +
    "    P((4)) --> Q((2))\n" +
    "    P --> R((6))\n" +
    "    Q --> S((1))\n" +
    "    Q --> T((3))\n" +
    "  end\n" +
    "  subgraph TreeA [Tree A]\n" +
    "    A((4)) --> B((2))\n" +
    "    A --> C((6))\n" +
    "    B --> D((1))\n" +
    "    B --> E((3))\n" +
    "  end\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style P fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style Q fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style S fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "The BFS queue processes pairs level by level: (4,4) → (2,2),(6,6) → (1,1),(3,3). All values match and structures align, so the result is `true`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(min(n, m))`**\n\n" +
    "Stops at first mismatch; visits all nodes only when trees are identical.\n\n" +
    "**Space Complexity: `O(min(w₁, w₂))`** where `w₁` and `w₂` are the maximum widths of the two trees\n\n" +
    "The queue holds at most one full level of paired nodes. Worst case is `O(n/2)` for a complete tree.",

  bestAndWorstCase:
    "**Best case** — root values differ: returns `false` after the first dequeue — `O(1)` time.\n\n" +
    "**Worst case** — identical trees: every node is dequeued — `O(n)` time and `O(w)` space.",

  realWorldUses: [
    "**Deep tree comparison** — Compare deep trees without risking call stack overflow.",
    "**Streaming tree validation** — Queue-based comparison integrates well with iterative pipeline processors.",
    "**Unit test trees** — Iterative assertion helpers for tree equality in test frameworks.",
    "**Serialized tree comparison** — BFS order maps directly to level-order serialized representations.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No recursion — safe for arbitrarily deep trees.",
      "BFS order makes it easy to inspect which level caused a mismatch.",
      "Straightforward queue-based extension of the recursive approach.",
    ],
    limitations: [
      "Uses more memory than the recursive approach for wide trees.",
      "Slightly more verbose than the elegant recursive version.",
      "Queue allocates paired arrays for every node, increasing GC pressure.",
    ],
  },

  whenToUseIt:
    "Prefer the iterative version when trees may be very deep. For shallow or moderately-sized trees, the recursive version is cleaner. Both run in the same asymptotic time; the iterative version trades call stack for queue memory.",
};
