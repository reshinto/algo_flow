import type { EducationalContent } from "@/types";

export const pathSumIterativeEducational: EducationalContent = {
  overview:
    "**Path Sum (Iterative)** performs the same root-to-leaf sum check using an explicit stack. " +
    "Each stack entry pairs a node with the accumulated path sum from the root to that node.",

  howItWorks:
    "1. Push `[root, root.value]` onto the stack.\n" +
    "2. Pop an entry `[current, runningSum]`.\n" +
    "3. At a leaf, check `runningSum === targetSum`. Return `true` immediately if matched.\n" +
    "4. Otherwise, push right and left children with `runningSum + childValue`.\n" +
    "5. Continue until the stack empties — return `false`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** worst case.\n\n" +
    "**Space Complexity: `O(h)`** — stack holds at most `h` entries.",

  bestAndWorstCase:
    "**Best case** is an early match — terminates after visiting few nodes.\n\n" +
    "**Worst case** is a full traversal when no path matches.",

  realWorldUses: [
    "**Stack-safe path checking:** Avoids recursion limits for deep trees.",
    "**Debugging traversal:** Explicit stack makes it easy to inspect which nodes were processed.",
  ],

  strengthsAndLimitations: {
    strengths: ["No stack overflow risk.", "Explicit state makes debugging easier."],
    limitations: ["More verbose than the recursive version."],
  },

  whenToUseIt:
    "Prefer the iterative version when tree depth is large or when recursion must be avoided.",
};
