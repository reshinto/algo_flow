import type { EducationalContent } from "@/types";

export const bstValidationEducational: EducationalContent = {
  overview:
    "**BST Validation (Recursive)** verifies that a binary tree satisfies the BST property at every node: all left-descendant values must be strictly less than the node, and all right-descendant values must be strictly greater.\n\nA naïve approach checks only immediate children — it fails for nodes that are valid locally but violate a global constraint. This algorithm passes **min/max bounds** down the recursion to catch all violations.",

  howItWorks:
    "Each node is validated against a window `(minVal, maxVal)`:\n- Root is validated against `(-∞, +∞)`.\n- Left child is validated against `(minVal, node.value)` — must be less than parent.\n- Right child is validated against `(node.value, maxVal)` — must be greater than parent.\n\nAny node that falls outside its window fails validation immediately.",

  timeAndSpaceComplexity:
    "**Time: `O(n)`** — every node is visited exactly once.\n\n**Space: `O(h)`** — recursion depth.",

  bestAndWorstCase:
    "**Best case:** First node violates BST — returns `false` after one comparison.\n\n**Worst case:** Valid BST — all `n` nodes must be checked.",

  realWorldUses: [
    "**Tree deserialization:** Validate that a deserialized tree is structurally correct before use.",
    "**Testing BST implementations:** Correctness check after insertions and deletions.",
    "**Database consistency:** Verify B-tree node bounds after a page merge or split.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Correctly handles non-local BST violations that naïve child-only checks miss.",
      "Simple to understand once the min/max bounds pattern is grasped.",
    ],
    limitations: [
      "Visits all n nodes even if only validating a small subtree — no early pruning for valid trees.",
    ],
  },

  whenToUseIt:
    "Use after any structural modification to a BST to assert correctness. The iterative in-order variant offers the same correctness guarantee with O(1) space.",
};
