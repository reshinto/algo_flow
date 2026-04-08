import type { EducationalContent } from "@/types";

export const allRootToLeafPathsIterativeEducational: EducationalContent = {
  overview:
    "**All Root-to-Leaf Paths (Iterative)** collects all root-to-leaf path strings using an explicit stack. " +
    "Each stack entry carries a node and the path string accumulated to reach it.",

  howItWorks:
    "1. Push `[root, String(root.value)]` onto the stack.\n" +
    "2. Pop `[current, pathSoFar]`.\n" +
    "3. At a leaf, push `pathSoFar` to results.\n" +
    "4. Push right child with `pathSoFar + '->' + right.value`, then left child similarly.\n" +
    "5. Continue until the stack empties.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((1)):::root --> B((2)):::visited\n" +
    "  A --> C((3)):::visited\n" +
    "  B --> D((4)):::visited\n" +
    "  B --> E((5)):::visited\n" +
    "  C --> F((6)):::visited\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    'Stack pops node 1 → pushes nodes 2 and 3. Popping node 2 → pushes leaves 4 and 5 with paths `"1->2->4"` and `"1->2->5"`. Three completed paths are collected: `"1->2->4"`, `"1->2->5"`, and `"1->3->6"`.',

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n * h)`** — same as the recursive version.\n\n" +
    "**Space Complexity: `O(L * h)`** — path strings stored per leaf.",

  bestAndWorstCase: "Both cases are the same as the recursive version.",

  realWorldUses: ["**Recursion-free path enumeration:** Safe for arbitrarily deep trees."],

  strengthsAndLimitations: {
    strengths: ["No recursion stack overflow risk."],
    limitations: ["More verbose; path string memory usage is the same."],
  },

  whenToUseIt: "Use the iterative version for large trees where recursion depth is a concern.",
};
