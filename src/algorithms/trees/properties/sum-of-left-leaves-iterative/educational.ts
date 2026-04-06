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
    "5. Continue until the stack empties.",

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
