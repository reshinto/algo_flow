import type { EducationalContent } from "@/types";

export const bstDeleteIterativeEducational: EducationalContent = {
  overview:
    "**BST Delete (Iterative)** removes a node without recursion by explicitly tracking the parent pointer during the search phase.\n\nHandles the same three cases as the recursive version: leaf, one child, and two children (with in-order successor).",

  howItWorks:
    "1. Walk with a `parent` pointer and `current` pointer until `current.value === deleteValue` or `current === null`.\n" +
    "2. **Two children:** Find the successor (leftmost of right subtree), copy its value, reassign `current` to the successor.\n" +
    "3. Determine the child to promote (left or right, or `null` for a leaf).\n" +
    "4. Update `parent.left` or `parent.right` to point to the promoted child.",

  timeAndSpaceComplexity: "**Time: `O(h)`**\n\n**Space: `O(1)`** — no call stack.",

  bestAndWorstCase:
    "**Best case:** Target at root with no children — O(1).\n\n**Worst case:** Degenerate tree — O(n).",

  realWorldUses: [
    "**Embedded BST implementations:** Where recursion overhead must be avoided.",
    "**In-place data structure management:** Iterative deletion allows direct pointer manipulation.",
  ],

  strengthsAndLimitations: {
    strengths: ["O(1) auxiliary space.", "No function-call overhead."],
    limitations: ["More pointer bookkeeping than the recursive version — harder to read."],
  },

  whenToUseIt:
    "Choose iterative delete when the BST may be very deep or when stack usage must be bounded.",
};
