import type { EducationalContent } from "@/types";

export const zigzagLevelOrderEducational: EducationalContent = {
  overview:
    "**Zigzag Level-Order Traversal** visits a tree level by level, but alternates direction: odd levels are read left-to-right and even levels right-to-left (or vice versa), producing a zigzag pattern. It uses BFS with a direction flag toggled after each level.",

  howItWorks:
    "The algorithm extends standard level-order BFS with an index-placement trick:\n\n" +
    "1. **BFS with queue** — standard level-by-level processing.\n" +
    "2. **Direction flag** — `leftToRight` toggles after each level.\n" +
    "3. **Index calculation** — when `leftToRight = true`, insert at `nodeIndex`; when false, insert at `levelSize - 1 - nodeIndex`.\n" +
    "4. **Result** — each level is naturally placed in the correct zigzag order.\n\n" +
    "### Example: Zigzag on a 7-Node BST\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n4((4)) --> n2((2))\n" +
    "    n4 --> n6((6))\n" +
    "    n2 --> n1((1))\n" +
    "    n2 --> n3((3))\n" +
    "    n6 --> n5((5))\n" +
    "    n6 --> n7((7))\n" +
    "```\n\n" +
    "**Level 0 (L→R):** `[4]` · **Level 1 (R→L):** `[6, 2]` · **Level 2 (L→R):** `[1, 3, 5, 7]`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every node is enqueued and dequeued exactly once.\n\n" +
    "**Space Complexity: `O(w)`**\n\n" +
    "The queue holds at most the widest level width `w` nodes simultaneously. For a perfect binary tree, `w = n/2`.",

  bestAndWorstCase:
    "**Best case** is a skewed tree — one node per level, `O(1)` queue space.\n\n" +
    "**Worst case** is a perfect binary tree — the last level fills the queue with `n/2` nodes.\n\n" +
    "Time is always `O(n)`. The index-calculation trick avoids any extra reversal passes.",

  realWorldUses: [
    "**Interview staple:** Zigzag traversal appears frequently in software engineering interviews (LeetCode #103).",
    "**Alternating-direction rendering:** Display tree layers in alternating directions for visual variety or symmetry.",
    "**Hierarchical data display:** Org charts or tournament brackets sometimes use alternating direction to reduce visual crossing.",
    "**Pattern-based tree analysis:** Zigzag structure can reveal symmetry properties of a tree.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Elegant single-pass BFS — no extra reversal step needed with the index-placement trick.",
      "Produces a visually distinctive and interview-ready traversal pattern.",
      "Easy to adapt from standard level-order traversal.",
    ],
    limitations: [
      "Requires pre-allocating a fixed-size array per level (when using the index-placement approach).",
      "More complex than standard level-order due to direction management.",
      "Rarely needed in production — primarily a pedagogical and interview algorithm.",
    ],
  },

  whenToUseIt:
    "Use zigzag level-order when you specifically need alternating left-right traversal across levels. In practice, this appears in interview problems and visualization scenarios. For standard level processing, use level-order traversal.",
};
