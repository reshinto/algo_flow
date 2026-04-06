import type { EducationalContent } from "@/types";

export const cousinsInBinaryTreeEducational: EducationalContent = {
  overview:
    "**Cousins in Binary Tree** determines whether two nodes are cousins — meaning they are at the same depth " +
    "in the tree but have different parents. Siblings (same parent) are NOT cousins.",

  howItWorks:
    "BFS traversal tracks two facts for both target nodes:\n\n" +
    "1. **Depth** — the BFS level at which the node was found.\n" +
    "2. **Parent** — the parent node object (for identity comparison).\n\n" +
    "After traversal, the two nodes are cousins if and only if `depthA === depthB && parentA !== parentB`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — worst case visits all nodes.\n\n" +
    "**Space Complexity: `O(w)`** — BFS queue width.",

  bestAndWorstCase:
    "**Best case** is when both targets are found near the root — BFS terminates early.\n\n" +
    "**Worst case** is when both targets are at the deepest level — all nodes are visited.",

  realWorldUses: [
    "**Network topology:** Identifying nodes at the same hop count from the root with different upstream parents.",
    "**Organizational hierarchy:** Finding employees at the same level but different manager chains.",
    "**Gene relationships:** Identifying genes that diverged at the same evolutionary distance from a common ancestor.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "BFS naturally produces level and parent information without extra passes.",
      "Clean termination condition: same depth, different parent.",
    ],
    limitations: [
      "Uses O(w) queue memory.",
      "Does not handle duplicate node values — assumes each value is unique.",
    ],
  },

  whenToUseIt:
    "Use cousins-in-binary-tree when checking level-relative sibling relationships. " +
    "If performance is critical and both targets are expected to be near the root, BFS is optimal due to early termination.",
};
