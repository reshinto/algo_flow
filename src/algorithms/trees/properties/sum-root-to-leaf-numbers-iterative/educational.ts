import type { EducationalContent } from "@/types";

export const sumRootToLeafNumbersIterativeEducational: EducationalContent = {
  overview:
    "**Sum Root to Leaf Numbers (Iterative)** performs the same digit-path summation using an explicit stack. " +
    "Each stack entry pairs a node with its running decimal number.",

  howItWorks:
    "1. Push `[root, root.value]` onto the stack.\n" +
    "2. Pop `[current, runningNumber]`.\n" +
    "3. At a leaf, add `runningNumber` to total sum.\n" +
    "4. Push children with `runningNumber * 10 + child.value`.\n" +
    "5. Return total when stack empties.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((1)):::root --> B((2)):::visited\n" +
    "  A --> C((3)):::visited\n" +
    "  B --> D((4)):::current\n" +
    "  B --> E((5)):::current\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Stack pops `[1, 1]` → pushes `[2, 12]` and `[3, 13]`. Pops `[2, 12]` → pushes `[4, 124]` and `[5, 125]`. Leaf 4 adds 124, leaf 5 adds 125, leaf 3 adds 13. Total = 124 + 125 + 13 = 262.",

  timeAndSpaceComplexity: "**Time Complexity: `O(n)`**.\n\n**Space Complexity: `O(h)`**.",

  bestAndWorstCase: "Same as the recursive version.",

  realWorldUses: ["**Recursion-free number tree summation:** Safe for deep digit trees."],

  strengthsAndLimitations: {
    strengths: ["No recursion stack overflow."],
    limitations: ["Same overflow risk for very deep trees."],
  },

  whenToUseIt: "Use the iterative version for deep trees or recursion-constrained environments.",
};
