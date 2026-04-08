import type { EducationalContent } from "@/types";

export const bstFloorCeilEducational: EducationalContent = {
  overview:
    "**BST Floor & Ceil (Recursive)** finds two boundary values simultaneously:\n- **Floor:** the largest value in the BST that is ≤ the target.\n- **Ceil:** the smallest value in the BST that is ≥ the target.\n\nThese are useful for range queries, nearest-neighbor lookups, and scheduling algorithms.",

  howItWorks:
    "**Floor:** At each node, if the target equals the node value, that value is the floor. If the target is smaller, the floor must be in the left subtree. If the target is larger, the current node is a candidate floor — check the right subtree for a better (larger) candidate.\n\n**Ceil:** Mirror logic — if the target is larger, check right; if smaller, the current node is a candidate ceil and a better one may exist in the left subtree.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((20)) --> B((10))\n" +
    "  A --> C((30))\n" +
    "  B --> D((5))\n" +
    "  B --> E((15))\n" +
    "  C --> F((25))\n" +
    "  C --> G((40))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "Searching for target 17: floor path visits 20→10→15 (floor=15). Ceil path visits 20→10→15→null, backtracking through 20 (ceil=20). Both traversals share the same O(h) depth.",

  timeAndSpaceComplexity:
    "**Time: `O(h)`** — each of floor and ceil makes one root-to-leaf pass.\n\n**Space: `O(h)`** — recursive call stack depth equals tree height.",

  bestAndWorstCase:
    "**Best case:** Target equals a node value — both floor and ceil are found at that node immediately.\n\n**Worst case:** Target falls between the smallest and largest values in the tree, requiring traversal to a leaf.",

  realWorldUses: [
    "**Range queries:** Find the nearest stored timestamps to a given query time.",
    "**Price lookup:** Find the closest lower and upper price bands for a given amount.",
    "**Sorted set operations:** Floor/ceil correspond to `lower_bound`/`upper_bound` in C++ STL.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Exploits BST order to avoid scanning all nodes — only one path is followed.",
      "Finds both floor and ceil in two independent O(h) passes.",
    ],
    limitations: [
      "Requires a valid BST — violations cause incorrect results.",
      "Two separate recursive passes (one for floor, one for ceil); iterative version can combine in one.",
    ],
  },

  whenToUseIt:
    "Use when you need the nearest stored value below or above a query in a dynamically maintained sorted collection.",
};
