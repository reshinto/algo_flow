import type { EducationalContent } from "@/types";

export const bstValidationIterativeEducational: EducationalContent = {
  overview:
    "**BST Validation (Iterative)** validates the BST property by performing a stack-based in-order traversal and checking that each value is strictly greater than the previous one.\n\nA valid BST always produces a strictly ascending sequence during in-order traversal — any deviation is a violation.",

  howItWorks:
    "Uses an explicit stack to simulate in-order traversal:\n1. Push all left nodes.\n2. Pop a node, compare its value to the last seen value (`previousValue`).\n3. If `current.value ≤ previousValue` — invalid BST, return `false`.\n4. Update `previousValue`, then move to the right child.\n5. If traversal completes without violations — return `true`.",

  timeAndSpaceComplexity:
    "**Time: `O(n)`** — every node processed once.\n\n**Space: `O(h)`** — explicit stack holds at most `h` nodes.",

  bestAndWorstCase:
    "**Best case:** Violation found at the first comparison — O(1).\n\n**Worst case:** Valid BST — all `n` nodes processed.",

  realWorldUses: [
    "**Iterative BST correctness testing:** Avoids recursion for stack-constrained environments.",
    "**Sorted-order verification:** Confirms that a sequence of BST in-order values is ascending.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No recursive call stack — bounded by O(h) explicit stack.",
      "Intuitive: a valid BST must produce sorted output during in-order traversal.",
    ],
    limitations: [
      "Still O(h) space for the explicit stack — not O(1).",
      "Less directly communicates the BST invariant compared to the min/max bounds approach.",
    ],
  },

  whenToUseIt:
    "Prefer this approach when you also want to collect the sorted values during validation, or when recursion is not acceptable.",
};
