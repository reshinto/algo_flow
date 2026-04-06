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
    "5. Return total when stack empties.",

  timeAndSpaceComplexity: "**Time Complexity: `O(n)`**.\n\n**Space Complexity: `O(h)`**.",

  bestAndWorstCase: "Same as the recursive version.",

  realWorldUses: ["**Recursion-free number tree summation:** Safe for deep digit trees."],

  strengthsAndLimitations: {
    strengths: ["No recursion stack overflow."],
    limitations: ["Same overflow risk for very deep trees."],
  },

  whenToUseIt: "Use the iterative version for deep trees or recursion-constrained environments.",
};
