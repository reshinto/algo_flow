import type { EducationalContent } from "@/types";

export const isBalancedTreeIterativeEducational: EducationalContent = {
  overview:
    "**Is Balanced Tree (Iterative)** performs the same balance check as the recursive version " +
    "but uses an explicit stack to simulate post-order traversal. " +
    "A `Map` stores computed heights so they can be looked up during the post-processing phase.",

  howItWorks:
    "The algorithm simulates the three phases of recursive post-order DFS using a phase counter:\n\n" +
    "- **Phase 0:** First visit — push left child if it exists.\n" +
    "- **Phase 1:** Left done — push right child if it exists.\n" +
    "- **Phase 2:** Both children done — compute balance and record height.\n\n" +
    "Heights are stored in a `Map<node, number>` and retrieved when processing a parent node.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — each node is processed once.\n\n" +
    "**Space Complexity: `O(n)`** — the height map stores an entry for every node.",

  bestAndWorstCase:
    "**Best case** is an imbalanced tree found near the leaves — returns `false` quickly.\n\n" +
    "**Worst case** is a fully balanced tree — all `n` nodes are processed.",

  realWorldUses: [
    "**Production-safe balance checks:** No risk of stack overflow for arbitrarily deep trees.",
    "**Integration with iterative tree operations:** Consistent with iterative insert/delete that also avoid recursion.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Stack-overflow-safe for arbitrarily deep trees.",
      "Equivalent correctness to the recursive version.",
    ],
    limitations: [
      "More complex implementation than the recursive approach.",
      "Requires O(n) extra memory for the height map.",
    ],
  },

  whenToUseIt:
    "Use the iterative version when tree depth is unbounded or when working in environments with recursion limits. " +
    "For most practical balanced trees, the simpler recursive version is preferred.",
};
