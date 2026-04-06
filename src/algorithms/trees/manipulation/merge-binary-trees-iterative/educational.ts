import type { EducationalContent } from "@/types";

export const mergeBinaryTreesIterativeEducational: EducationalContent = {
  overview:
    "**Merge Binary Trees (Iterative)** uses an explicit stack of node pairs to merge two binary trees without recursion. At each step, a pair `(nodeA, nodeB)` is popped, their values are summed, and pairs of corresponding children are pushed for future processing.\n\nThis avoids stack overflow risk for very deep trees.",

  howItWorks:
    "The algorithm uses a stack of paired nodes:\n\n" +
    "1. **Initialize** — if Tree A is null, return Tree B. Otherwise, push `(rootA, rootB)` onto the stack.\n" +
    "2. **Pop pair** — take the top pair `(nodeA, nodeB)` from the stack.\n" +
    "3. **Merge value** — add `nodeB.value` to `nodeA.value`.\n" +
    "4. **Handle right** — if `nodeA.right` is null, assign `nodeB.right`; otherwise push `(nodeA.right, nodeB.right)`.\n" +
    "5. **Handle left** — if `nodeA.left` is null, assign `nodeB.left`; otherwise push `(nodeA.left, nodeB.left)`.\n" +
    "6. **Repeat** — continue until the stack is empty.\n" +
    "7. **Return** — return the modified Tree A.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(min(n, m))`**\n\n" +
    "Only overlapping nodes require a merge step.\n\n" +
    "**Space Complexity: `O(min(h₁, h₂))`** where `h₁` and `h₂` are the heights of the two trees\n\n" +
    "The explicit stack holds at most one pair per depth level. Same asymptotic space as the recursive version's call stack, but no risk of call-stack overflow.",

  bestAndWorstCase:
    "**Best case** — one tree is empty: returns the other tree in `O(1)` time.\n\n" +
    "**Worst case** — identical-shaped trees: every node is processed — `O(n)` time and `O(h)` space.",

  realWorldUses: [
    "**Deep tree merging** — Safe for arbitrarily deep trees without recursion stack risk.",
    "**Incremental merging** — Stack-based approach can be paused and resumed for cooperative multitasking.",
    "**Streaming merge** — Easily adapted to merge trees produced by generators or lazy iterators.",
    "**Game state merging** — Combine two game state trees iteratively during state reconciliation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No recursion — safe for arbitrarily deep trees.",
      "Explicit stack makes the merge order easy to visualize and trace.",
      "Same time and space complexity as the recursive version without overflow risk.",
    ],
    limitations: [
      "More verbose than the elegant recursive version.",
      "Stack allocates pair arrays for every pushed node, increasing GC pressure.",
      "DFS stack order (LIFO) means the right subtree is processed before the left.",
    ],
  },

  whenToUseIt:
    "Prefer the iterative version when working with potentially very deep trees. For shallow or balanced trees, the recursive version is cleaner. Both have the same asymptotic complexity.",
};
