import type { EducationalContent } from "@/types";

export const bestFirstTieBreakingEducational: EducationalContent = {
  overview:
    "**Best-First Tie Breaking** is a variant of A* that resolves tie-breakers between nodes with equal f-costs by preferring nodes that lie closest to the straight line from start to goal. This produces **aesthetically pleaner, straighter paths** without sacrificing optimality.\n\nThe tie-breaker uses the **cross-product** of the direction vectors, giving zero weight to nodes on the ideal straight line and penalizing lateral deviations.",

  howItWorks:
    "1. Add the start node to the open list with `f = g + h` and `tie = cross(start, node, end)`.\n" +
    "2. Dequeue the node with the lowest `f`. If f-costs tie, prefer the lower `h`. If h-costs also tie, prefer the lower cross-product.\n" +
    "3. If it is the goal, reconstruct and return the path.\n" +
    "4. For each passable neighbor, compute `g_new`, `f_new`, and `tie_new`.\n" +
    "5. If `g_new` improves the known cost, update and enqueue the neighbor.\n" +
    "6. Repeat until the goal is dequeued or the open list empties.\n\n" +
    "### Cross-Product Tie Breaker\n\n" +
    "```\n" +
    "dx1 = node.col - start.col     dy1 = node.row - start.row\n" +
    "dx2 = end.col  - start.col     dy2 = end.row  - start.row\n" +
    "cross = |dx1*dy2 - dx2*dy1|\n" +
    "```\n\n" +
    "> *Nodes on the straight line from start to end have cross = 0 and are preferred.*",

  timeAndSpaceComplexity:
    "**Time Complexity: `O((V + E) log V)`** — same as A*. The tie-breaker adds no asymptotic overhead.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The priority queue and g-cost array each hold at most `V` entries. The cross-product computation is O(1) per node.",

  bestAndWorstCase:
    "**Best case** on obstacle-free grids — the tie breaker selects nodes on the straight line to the goal, producing a perfectly straight diagonal or cardinal path with minimal exploration.\n\n" +
    "**Worst case** in maze-like environments — ties rarely occur, making the tie breaker irrelevant and performance identical to standard A*.",

  realWorldUses: [
    "**Visualization Tools:** Path displays in educational or debugging contexts where path shape matters aesthetically.",
    "**Game Level Design:** Producing natural-looking NPC movement paths that don't zigzag unnecessarily.",
    "**Map Navigation UIs:** Turn-by-turn navigation systems that prefer fewer turns and straighter segments for readability.",
    "**Robotics:** Minimizing turning operations in robots where direction changes are costly.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Produces visually cleaner, straighter paths than vanilla A* on open grids.",
      "Optimal — the tie-breaker only affects path shape among equally-cost routes.",
      "Zero additional time complexity — cross-product is O(1) per node.",
    ],
    limitations: [
      "Tie-breaking benefits are only visible when multiple equally-optimal paths exist.",
      "The cross-product tie breaker is specific to grid geometry; not directly applicable to arbitrary graphs.",
      "In dense environments with many walls, ties are rare and the technique provides no benefit.",
    ],
  },

  whenToUseIt:
    "Choose **Best-First Tie Breaking** when you want A* with cleaner-looking paths — especially in visualization, game AI, or navigation UIs.\n\nAvoid it when path aesthetics don't matter (use standard A*) or when performance is so constrained that even the additional comparison overhead is significant.",
};
