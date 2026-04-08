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
    "7. **Return** — return the modified Tree A.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  subgraph Result [Result Tree]\n" +
    "    R((3)) --> S((5))\n" +
    "    R --> T((4))\n" +
    "    S --> U((5))\n" +
    "    S --> V((4))\n" +
    "  end\n" +
    "  subgraph TreeB [Tree B]\n" +
    "    P((2)) --> Q((3))\n" +
    "    P --> BB((1))\n" +
    "    Q --> BL((2))\n" +
    "  end\n" +
    "  subgraph TreeA [Tree A]\n" +
    "    A((1)) --> B((2))\n" +
    "    A --> C((3))\n" +
    "    B --> D((3))\n" +
    "    B --> E((4))\n" +
    "  end\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style P fill:#06b6d4,stroke:#0891b2\n" +
    "  style R fill:#14532d,stroke:#22c55e\n" +
    "  style S fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Overlapping nodes sum their values (1+2=3, 2+3=5); node C has no match in Tree B so it is kept as-is (3→4 absorbed from A's right, +1 from B).",

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
