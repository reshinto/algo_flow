import type { EducationalContent } from "@/types";

export const sumRootToLeafNumbersEducational: EducationalContent = {
  overview:
    "**Sum Root to Leaf Numbers** treats each root-to-leaf path as a decimal integer " +
    "and returns the sum of all such integers. For example, the path `4 → 2 → 1` forms the number 421.",

  howItWorks:
    "A recursive DFS carries a `runningNumber` built by digit shifting:\n\n" +
    "1. At each node: `currentNumber = runningNumber * 10 + node.value`.\n" +
    "2. At a leaf, `currentNumber` is the fully formed path number — return it.\n" +
    "3. Otherwise, return `dfs(left, currentNumber) + dfs(right, currentNumber)`.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((4)):::root --> B((9)):::visited\n" +
    "  A --> C((0)):::visited\n" +
    "  B --> D((5)):::current\n" +
    "  B --> E((1)):::current\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "DFS: root 4 → node 9 computes `4*10+9=49` → leaf 5 computes `49*10+5=495`. Leaf 1 computes `49*10+1=491`. Right path: `4*10+0=40` (leaf). Total = 495 + 491 + 40 = 1026.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — each node is visited once.\n\n" +
    "**Space Complexity: `O(h)`** — call stack depth.",

  bestAndWorstCase: "Both are `O(n)` — all nodes are visited.",

  realWorldUses: [
    "**Binary coded decimal trees:** Used in compiler optimization for numeric literal trees.",
    "**Path encoding:** Encoding tree paths as numbers for hashing or comparison.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Elegant use of digit shifting to avoid string allocation.",
      "Single-pass O(n) solution.",
    ],
    limitations: [
      "Overflow is possible for deep trees with large digit values — consider big integer arithmetic for production.",
    ],
  },

  whenToUseIt: "Use when paths in a digit tree must be interpreted as decimal numbers.",
};
