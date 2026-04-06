import type { EducationalContent } from "@/types";

export const flipEquivalentTreesEducational: EducationalContent = {
  overview:
    "**Flip Equivalent Trees** determines whether two binary trees can be made identical by flipping (swapping) the left and right children at any number of nodes. Two null trees are always flip-equivalent.\n\nThis problem generalizes structural tree equality: same-tree requires exact match, but flip-equivalent allows any combination of child swaps.",

  howItWorks:
    "The recursive algorithm checks two possibilities at each node:\n\n" +
    "1. **Base cases** — if both nodes are null: `true`; if only one is null: `false`; if values differ: `false`.\n" +
    "2. **No-flip** — check if `(A.left, B.left)` and `(A.right, B.right)` are flip-equivalent.\n" +
    "3. **With-flip** — check if `(A.left, B.right)` and `(A.right, B.left)` are flip-equivalent.\n" +
    "4. **Return** — `noFlip || withFlip`.\n\n" +
    "For the default input (Tree A: values 1–7 in standard BST, Tree B: same values but with left/right swapped at the root), the result is `true`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(min(n, m))` to `O(n × m)`**\n\n" +
    "In the worst case (similar trees differing only near the leaves), both no-flip and with-flip branches are explored at every node, yielding exponential time. In practice, early termination on value mismatch keeps it much faster.\n\n" +
    "**Space Complexity: `O(min(h₁, h₂))`**\n\n" +
    "The recursive call stack depth is bounded by the height of the shallower tree.",

  bestAndWorstCase:
    "**Best case** — root values differ: returns `false` immediately — `O(1)` time.\n\n" +
    "**Worst case** — both trees have identical values throughout: both no-flip and with-flip are explored at every node.",

  realWorldUses: [
    "**Test equivalence** — Verify two compiler-generated syntax trees are equivalent despite reordering.",
    "**Data normalization** — Check if two hierarchical data structures represent the same information regardless of child order.",
    "**Symmetric comparisons** — Detect when two game state trees differ only by commutative operations.",
    "**Tree canonicalization** — Used as a building block for canonical tree representations.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Handles all possible flip combinations in a clean recursive formulation.",
      "Early exit on value mismatch avoids exploring unnecessary branches.",
      "Extends naturally to n-ary trees by checking all child permutations.",
    ],
    limitations: [
      "Potentially exponential in pathological cases — use sorting-based canonicalization for repeated queries.",
      "Recursive — may stack overflow for very deep trees.",
      "For trees with unique values, canonical sorting at each node can reduce to `O(n log n)`.",
    ],
  },

  whenToUseIt:
    "Use flip-equivalent-trees for one-off equivalence checks on moderate-sized trees. For repeated checks or large trees with duplicate values, preprocess both trees into canonical form (sort children by value) and then compare normally.",
};
