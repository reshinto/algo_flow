import type { EducationalContent } from "@/types";

export const dStarLiteEducational: EducationalContent = {
  overview:
    "**D\\* Lite** (Dynamic A* Lite) is an incremental replanning algorithm designed for environments where the map changes over time. It performs an initial search from start to goal, then efficiently **replans** when new obstacles are discovered during execution — reusing computation from the previous search rather than starting from scratch.\n\nIt is used in real-world mobile robots that must navigate in partially known environments.",

  howItWorks:
    "1. **Phase 1 — Initial Search:** Run A* from the start node to compute the first optimal path.\n" +
    "2. Begin executing the path toward the goal.\n" +
    "3. **Phase 2 — Obstacle Discovery:** When a new wall is discovered along the planned path, mark it on the working map.\n" +
    "4. **Replan:** Update cost estimates for affected nodes and recompute the shortest path, reusing cached g-values wherever possible.\n" +
    "5. Continue execution on the new path.\n\n" +
    "### Replanning Efficiency\n\n" +
    "```\n" +
    "Initial path:   S → A → B → C → G\n" +
    "Obstacle found: B is blocked\n" +
    "Replanned path: S → A → D → E → G  (only affected nodes recomputed)\n" +
    "```\n\n" +
    "> *D\\* Lite reuses all unaffected cost estimates — replanning is far cheaper than restarting A*.*",

  timeAndSpaceComplexity:
    "**Time Complexity: `O((V + E) log V)`** for the initial search; replanning is proportional only to the number of changed edges.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- Stores g-values and rhs-values (one-step lookahead) for all cells. The priority queue holds at most `O(V)` entries.",

  bestAndWorstCase:
    "**Best case** occurs when no obstacles are discovered — the initial path is followed to completion with zero replanning cost.\n\n" +
    "**Worst case** occurs when many new obstacles are discovered, each requiring significant replanning — performance degrades toward repeated A* searches.",

  realWorldUses: [
    "**Mobile Robotics:** Navigation systems on autonomous robots (Mars rovers, warehouse robots) that continuously update their maps.",
    "**Autonomous Vehicles:** Route planning that must adapt to unexpected road closures or traffic changes.",
    "**Game AI:** Dynamic environments where the map changes during gameplay — falling debris, closing doors, enemy placement.",
    "**Disaster Response:** Search-and-rescue robots that must replan as new obstacles are uncovered in rubble.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Efficient replanning — reuses cached computations rather than restarting from scratch.",
      "Optimal — the replanned path is always the shortest given the updated map.",
      "Handles multiple obstacle discoveries without resetting all state.",
    ],
    limitations: [
      "More complex to implement than A* — requires maintaining rhs-values and a more sophisticated priority queue.",
      "Overhead on static maps — if the environment never changes, standard A* is simpler and equally efficient.",
      "Memory usage doubles compared to A* due to the additional rhs-value per node.",
    ],
  },

  whenToUseIt:
    "Choose **D\\* Lite** when the environment is partially known and may change during execution — particularly in robotics and autonomous navigation.\n\nAvoid it for static, fully-known maps (use A* or Dijkstra), or when replanning frequency is so high that incremental benefits are negligible.",
};
