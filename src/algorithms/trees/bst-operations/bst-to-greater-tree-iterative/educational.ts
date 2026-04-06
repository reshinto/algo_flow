import type { EducationalContent } from "@/types";

export const bstToGreaterTreeIterativeEducational: EducationalContent = {
  overview:
    "**BST to Greater Tree (Iterative)** performs the same reverse in-order accumulation as the recursive version but uses an explicit stack to traverse right subtrees before visiting root nodes.",

  howItWorks:
    "Maintains a stack for reverse in-order (right → root → left):\n1. Push all right-spine nodes first.\n2. Pop a node, accumulate its value into `runningSum`, update the node.\n3. Push the left child's right spine.\n4. Repeat until stack is empty.",

  timeAndSpaceComplexity: "**Time: `O(n)`**\n\n**Space: `O(h)`** — explicit stack.",

  bestAndWorstCase: "Always O(n) — all nodes updated.",

  realWorldUses: [
    "**Iterative greater-tree transformation:** Used in environments where recursion depth is bounded.",
  ],

  strengthsAndLimitations: {
    strengths: ["No recursion — safe for any tree depth."],
    limitations: ["More code than the recursive version for the same result."],
  },

  whenToUseIt:
    "Choose the iterative variant when the BST may be very deep or when implementing in a language without tail-call optimization.",
};
