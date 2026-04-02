import type { EducationalContent } from "@/types";

export const dijkstraBidirectionalEducational: EducationalContent = {
  overview:
    "**Bidirectional Dijkstra** runs two simultaneous Dijkstra searches — one expanding forward from the start and one expanding backward from the goal. When the two frontiers meet at a common cell, the shortest path is reconstructed by joining the two partial paths at that meeting point.\n\nBecause each search only needs to cover roughly half the graph, the practical speedup over standard Dijkstra can approach a factor of 2 on open grids.",

  howItWorks:
    "1. Initialize forward distances from the start (`dist_f[start] = 0`) and reverse distances from the end (`dist_r[end] = 0`).\n" +
    "2. Maintain two priority queues: one for the forward search, one for the reverse search.\n" +
    "3. Alternate expanding the cell with the lowest cost from each queue.\n" +
    "4. When a cell is extracted that has already been settled by the other search, record the meeting-point cost.\n" +
    "5. Stop when the sum of the two queue minimums cannot improve the best meeting cost.\n" +
    "6. Reconstruct: stitch the forward path (start → meeting) with the reverse path (meeting → end).\n\n" +
    "### Why It's Faster\n\n" +
    "```\n" +
    "Standard Dijkstra: explores radius R around start\n" +
    "Bidirectional:     each front explores radius R/2\n" +
    "Area ratio ≈ π(R)² vs 2 × π(R/2)² = πR²/2  →  ~2× fewer cells\n" +
    "```\n\n" +
    "> *The savings are most dramatic on open grids with no obstacles between start and end.*\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    SF((Start)) --\"Forward\"--> M1((Mid))\n" +
    "    M1 --\"Meeting Point\"--- M2((Mid))\n" +
    "    EF((End)) --\"Backward\"--> M2\n" +
    "    style SF fill:#06b6d4,stroke:#0891b2\n" +
    "    style EF fill:#f43f5e,stroke:#e11d48\n" +
    "```\n\n" ,

  timeAndSpaceComplexity:
    "**Time Complexity: `O((V + E) log V)`**\n\n" +
    "- Asymptotically the same as standard Dijkstra, but the constant factor is roughly halved in practice because each frontier covers only half the search space.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- Two distance maps, two parent maps, two visited sets, and two priority queues — all bounded by `O(V)` in total.",

  bestAndWorstCase:
    "**Best case** occurs on open grids where start and end are far apart — the two frontiers meet near the midpoint and the total explored area is minimized, giving close to 2× speedup over unidirectional Dijkstra.\n\n" +
    "**Worst case** occurs on grids with obstacles that force both frontiers to expand deeply before meeting, or when the path does not pass through the geometric center — in extreme cases performance can match or slightly exceed standard Dijkstra's explored count.",

  realWorldUses: [
    "**Large-Scale Road Networks:** Bidirectional Dijkstra (and its A* variant) is the core of point-to-point routing in Google Maps and OpenStreetMap routing engines.",
    "**Transit Planning:** Finding optimal transit routes where the network graph is too large for standard BFS.",
    "**Game AI:** Pathfinding in large open-world games where meeting-in-the-middle halves computation time.",
    "**Social Graph Search:** Finding shortest connection paths between two people in a large social network.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Explores roughly half as many cells as standard Dijkstra on open grids — a practical 2× speedup.",
      "Retains full optimality guarantee of Dijkstra — the path found is always the true shortest path.",
      "The meeting-point visualization provides a unique educational perspective on how two frontiers converge.",
    ],
    limitations: [
      "More complex to implement correctly — the termination condition requires checking both queue minimums against the best known meeting cost.",
      "Speedup diminishes on grids with many obstacles, where the frontiers cannot expand symmetrically.",
      "Cannot handle negative edge weights, just like standard Dijkstra.",
    ],
  },

  whenToUseIt:
    "Choose **Bidirectional Dijkstra** when the search space is large and symmetric (both forward and reverse traversal are equally easy), and when halving the explored area provides a meaningful performance gain.\n\nFor small grids or when an admissible heuristic is available, standard A* often performs better. For graphs with negative weights, use Bellman-Ford.",
};
