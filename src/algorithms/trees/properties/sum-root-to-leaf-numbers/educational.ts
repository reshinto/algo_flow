import type { EducationalContent } from "@/types";

export const sumRootToLeafNumbersEducational: EducationalContent = {
  overview:
    "**Sum Root to Leaf Numbers** treats each root-to-leaf path as a decimal integer " +
    "and returns the sum of all such integers. For example, the path `4 → 2 → 1` forms the number 421.",

  howItWorks:
    "A recursive DFS carries a `runningNumber` built by digit shifting:\n\n" +
    "1. At each node: `currentNumber = runningNumber * 10 + node.value`.\n" +
    "2. At a leaf, `currentNumber` is the fully formed path number — return it.\n" +
    "3. Otherwise, return `dfs(left, currentNumber) + dfs(right, currentNumber)`.",

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
