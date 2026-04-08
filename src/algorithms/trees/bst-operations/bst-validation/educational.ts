import type { EducationalContent } from "@/types";

export const bstValidationEducational: EducationalContent = {
  overview:
    "**BST Validation (Recursive)** verifies that a binary tree satisfies the BST property at every node: all left-descendant values must be strictly less than the node, and all right-descendant values must be strictly greater.\n\nA naïve approach checks only immediate children — it fails for nodes that are valid locally but violate a global constraint. This algorithm passes **min/max bounds** down the recursion to catch all violations.",

  howItWorks:
    "Each node is validated against a window `(minVal, maxVal)`:\n- Root is validated against `(-∞, +∞)`.\n- Left child is validated against `(minVal, node.value)` — must be less than parent.\n- Right child is validated against `(node.value, maxVal)` — must be greater than parent.\n\nAny node that falls outside its window fails validation immediately.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((10)) --> B((5))\n" +
    "  A --> C((20))\n" +
    "  B --> D((3))\n" +
    "  B --> E((15))\n" +
    "  C --> F((null))\n" +
    "  C --> G((25))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "Node 15 is a right child of 5, so it must satisfy (5, 10) — but 15 > 10 violates the upper bound inherited from root 10. A naïve check (15 > 5 only) would miss this; the min/max bounds propagation catches it.",

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
