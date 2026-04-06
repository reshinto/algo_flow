import type { EducationalContent } from "@/types";

export const sumOfLeftLeavesEducational: EducationalContent = {
  overview:
    "**Sum of Left Leaves** sums the values of all nodes that are: (a) a leaf (no children), and (b) a left child of their parent. " +
    "Right leaves and non-leaf left children are excluded.",

  howItWorks:
    "A DFS helper `dfs(node, isLeft)` passes a flag indicating whether the current node was reached from the left:\n\n" +
    "1. If `node` is a leaf AND `isLeft` is `true`, add its value to the sum.\n" +
    "2. Recurse left with `isLeft = true`.\n" +
    "3. Recurse right with `isLeft = false`.\n\n" +
    "The root is called with `isLeft = false` since it has no parent.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — all nodes are visited.\n\n" +
    "**Space Complexity: `O(h)`** — call stack depth.",

  bestAndWorstCase:
    "**Best case** and **worst case** are both `O(n)` — all nodes are visited regardless of the tree structure.",

  realWorldUses: [
    "**Asymmetric tree analysis:** Comparing left vs right leaf distributions.",
    "**Tax/accounting trees:** Summing leaves on a specific side of hierarchical accounts.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Clean use of a flag parameter to propagate left-child context without extra data structures.",
    ],
    limitations: ["Only returns a sum, not the list of left leaves."],
  },

  whenToUseIt:
    "Use when you need to aggregate only left leaf values. " +
    "The flag-passing pattern generalizes to other 'conditional leaf' aggregation problems.",
};
