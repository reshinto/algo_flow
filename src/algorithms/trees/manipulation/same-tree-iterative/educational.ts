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
    "8. **Return true** — all pairs matched.",

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
