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
    "The root is called with `isLeft = false` since it has no parent.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((3)):::root --> B((9)):::current\n" +
    "  A --> C((20)):::visited\n" +
    "  C --> D((15)):::current\n" +
    "  C --> E((7)):::visited\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Node 9 is reached with `isLeft=true` and is a leaf — counted. Node 15 is reached with `isLeft=true` and is a leaf — counted. Node 7 is reached with `isLeft=false` — skipped. Sum of left leaves = 9 + 15 = 24.",

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
