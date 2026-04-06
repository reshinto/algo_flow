import type { EducationalContent } from "@/types";

export const lowestCommonAncestorIterativeEducational: EducationalContent = {
  overview:
    "**Lowest Common Ancestor (Iterative)** finds the LCA without recursion using two phases: first build a parent map with BFS, then trace the ancestor chain of each target node until a common ancestor is found.\n\nThis is safe for arbitrarily deep trees and provides explicit access to the full ancestry chain.",

  howItWorks:
    "The algorithm has two phases:\n\n" +
    "**Phase 1 — Build parent map:**\n" +
    "1. Initialize a `parentMap` with `root → null`.\n" +
    "2. BFS through the tree, recording each node's parent in `parentMap`.\n" +
    "3. Stop early once both target nodes are found.\n\n" +
    "**Phase 2 — Trace ancestors:**\n" +
    "4. Walk the ancestry chain from `nodeA` up to root, collecting all ancestors into a set.\n" +
    "5. Walk the ancestry chain from `nodeB` upward; return the first node present in the set.\n\n" +
    "For the default tree with targets 1 and 3, Phase 1 finds both targets and Phase 2 returns node 2 as the LCA.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "BFS visits at most all `n` nodes in Phase 1; the ancestor traces in Phase 2 are `O(h)` each.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The parent map stores an entry for every node visited during BFS.",

  bestAndWorstCase:
    "**Best case** — both target nodes are near the root: BFS terminates early — sub-linear time.\n\n" +
    "**Worst case** — targets are deep leaves on opposite sides: BFS visits all nodes — `O(n)` time and space.",

  realWorldUses: [
    "**Safe deep-tree LCA** — Avoid stack overflow for trees with thousands of levels.",
    "**Parent-map reuse** — After building the map once, multiple LCA queries can be answered in `O(h)` each.",
    "**Iterative ancestor traversal** — The ancestor chain from each node is explicitly available for inspection.",
    "**Framework integration** — Iterative implementation fits naturally in callback-based or async tree processors.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No recursion — safe for arbitrarily deep trees.",
      "Parent map can be reused for multiple LCA queries without re-traversal.",
      "BFS early exit avoids visiting the entire tree when both targets are near the top.",
    ],
    limitations: [
      "`O(n)` space for the parent map — more memory than the recursive approach.",
      "Two-phase algorithm is more complex than the simple recursive version.",
      "Not beneficial for a single query on a shallow tree where the recursive version is simpler.",
    ],
  },

  whenToUseIt:
    "Use the iterative LCA when trees may be very deep (risking stack overflow) or when you need to reuse the parent map for multiple LCA queries. For shallow trees or single queries, the recursive version is simpler and more memory-efficient.",
};
