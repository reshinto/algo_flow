import type { EducationalContent } from "@/types";

export const sumOfLeftLeavesIterativeEducational: EducationalContent = {
  overview:
    "**Sum of Left Leaves (Iterative)** uses a stack to simulate the same DFS as the recursive version, " +
    "carrying an `isLeft` boolean alongside each node on the stack.",

  howItWorks:
    "1. Push `[root, isLeft=false]` onto the stack.\n" +
    "2. Pop `[current, isLeft]`.\n" +
    "3. If it's a left leaf (`isLeft && !left && !right`), add to sum.\n" +
    "4. Push right child with `isLeft=false` and left child with `isLeft=true`.\n" +
    "5. Continue until the stack empties.\n\n" +
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
    "Node 9 is a left leaf (isLeft=true, no children) — adds 9 to sum. Node 15 is a left leaf — adds 15. Node 7 is a right leaf (isLeft=false) — skipped. Total sum = 24.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — all nodes are visited.\n\n" +
    "**Space Complexity: `O(h)`** — stack depth.",

  bestAndWorstCase: "Both best and worst cases are `O(n)` since all nodes must be visited.",

  realWorldUses: ["**Recursion-free left-leaf analysis:** Safe for deep trees."],

  strengthsAndLimitations: {
    strengths: ["No recursion stack overflow risk."],
    limitations: ["More verbose than the recursive version."],
  },

  whenToUseIt: "Use the iterative version for large or deeply nested trees.",
};
