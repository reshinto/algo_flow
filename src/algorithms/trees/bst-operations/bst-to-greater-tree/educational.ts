import type { EducationalContent } from "@/types";

export const bstToGreaterTreeEducational: EducationalContent = {
  overview:
    "**BST to Greater Tree (Recursive)** transforms each node's value so it equals the sum of all values in the original BST that are **greater than or equal to** the node's value.\n\nThis is achieved by performing a **reverse in-order traversal** (right → root → left) and maintaining a running cumulative sum.",

  howItWorks:
    "Reverse in-order visits nodes from largest to smallest:\n1. Recurse into the right subtree (larger values first).\n2. Add the current node's value to the running sum.\n3. Replace the current node's value with the running sum.\n4. Recurse into the left subtree.\n\nFor the default BST `[1,2,3,4,5,6,7]`, node 7 → 7, node 6 → 13, node 5 → 18, node 4 → 22, etc.",

  timeAndSpaceComplexity:
    "**Time: `O(n)`** — every node is visited exactly once.\n\n**Space: `O(h)`** — recursion depth.",

  bestAndWorstCase: "Always O(n) — all nodes must be updated.",

  realWorldUses: [
    "**Cumulative score boards:** Transform individual scores into cumulative totals in a sorted BST.",
    "**Suffix sums in sorted data:** Greater-sum transformation corresponds to suffix sums on sorted arrays.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Elegant reverse in-order traversal pattern.",
      "Single pass transforms all values correctly.",
    ],
    limitations: ["Mutates the tree in-place — original values are lost unless copied beforehand."],
  },

  whenToUseIt:
    "Use when you need to enrich a BST with cumulative rank information, or to answer 'what is the total of all values ≥ mine?' for every node.",
};
