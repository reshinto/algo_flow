import type { EducationalContent } from "@/types";

export const weightedAStarEducational: EducationalContent = {
  overview:
    "**Weighted A\\*** modifies standard A* by multiplying the heuristic by a weight factor `ε > 1`, giving `f(n) = g(n) + ε × h(n)`. This inflated heuristic causes the algorithm to prefer nodes that appear closer to the goal, reducing the number of nodes explored at the cost of path optimality.\n\nWith `ε = 1`, it behaves identically to A*. As `ε` increases, it approaches Greedy Best-First Search.",

  howItWorks:
    "1. Add the start node to the open list with `f = g + ε × h`.\n" +
    "2. Dequeue the node with the lowest f-cost.\n" +
    "3. If it is the goal, reconstruct and return the path.\n" +
    "4. For each passable neighbor, compute `g_new = g_current + 1` and `f_new = g_new + ε × h`.\n" +
    "5. If `g_new` improves the known cost, update and enqueue the neighbor.\n" +
    "6. Repeat until the goal is dequeued or the open list empties.\n\n" +
    "### Weight Effect on f-cost\n\n" +
    "```\n" +
    "ε = 1.0 → f = g + h     (standard A*, optimal)\n" +
    "ε = 1.5 → f = g + 1.5h  (weighted A*, sub-optimal but faster)\n" +
    "ε = ∞   → f = h         (Greedy, very fast, not optimal)\n" +
    "```\n\n" +
    "> *The path found is at most `ε` times longer than the optimal path — a bounded sub-optimality guarantee.*\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    S((Start)) --\"f = g + (h * 2)\"--> P((Accelerated Path))\n" +
    "```\n\n" ,

  timeAndSpaceComplexity:
    "**Time Complexity: `O(b^d / ε)` heuristically** — higher weights explore fewer nodes, trading optimality for speed.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The open list still stores all discovered but unprocessed nodes. The bounded sub-optimality guarantees the path length is at most `ε × optimal`.",

  bestAndWorstCase:
    "**Best case** occurs on open grids with `ε > 1` — the inflated heuristic guides the search nearly directly to the goal, visiting very few nodes.\n\n" +
    "**Worst case** in environments where the heuristic is misleading — the weight amplifies errors, potentially producing paths significantly longer than optimal.",

  realWorldUses: [
    "**Video Games:** NPC pathfinding where slight path length increases are imperceptible to players but speed is critical.",
    "**Robotics:** Real-time navigation with strict latency budgets where a near-optimal path suffices.",
    "**Large Maps:** Pathfinding on very large grids (thousands of cells) where A* is too slow but Greedy is too inaccurate.",
    "**Anytime Algorithms:** Weighted A* serves as the first pass in anytime planners — refine with lower ε if time allows.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Tunable trade-off: increase ε for speed, decrease toward 1 for better optimality.",
      "Bounded sub-optimality — the path is guaranteed no worse than ε × the optimal length.",
      "Simpler than IDA* and faster than standard A* in many practical scenarios.",
    ],
    limitations: [
      "Not optimal unless ε = 1 — paths may be longer than necessary.",
      "The quality guarantee depends on the heuristic being admissible (never overestimates true cost).",
      "Choosing the right ε requires knowledge of the domain; too large risks poor paths.",
    ],
  },

  whenToUseIt:
    "Choose **Weighted A\\*** when you need a faster alternative to A* and can tolerate a known bound on path sub-optimality. It is ideal for real-time applications with strict latency requirements.\n\nAvoid it when an exact optimal path is required (use standard A* or Dijkstra) or when the heuristic is not admissible.",
};
