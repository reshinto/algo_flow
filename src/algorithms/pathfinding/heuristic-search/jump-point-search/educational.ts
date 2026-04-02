import type { EducationalContent } from "@/types";

export const jumpPointSearchEducational: EducationalContent = {
  overview:
    "**Jump Point Search (JPS)** is an optimization of A* specifically for uniform-cost grids. Instead of expanding every neighbor one cell at a time, JPS identifies **jump points** — special nodes where a forced neighbor exists — and jumps directly to them, skipping all intermediate nodes.\n\nOn open grids, JPS explores dramatically fewer nodes than A* while guaranteeing the same optimal path.",

  howItWorks:
    "1. Start with the source node in the open list (sorted by f = g + h).\n" +
    "2. Dequeue the node with the lowest f-cost.\n" +
    "3. For each cardinal direction, **jump** along that direction:\n" +
    "   - If the jump reaches a wall boundary or grid edge, stop.\n" +
    "   - If the jump reaches the goal, add it as a successor.\n" +
    "   - If a **forced neighbor** is detected (a wall blocks the natural path), that cell is a **jump point**.\n" +
    "4. Add jump points to the open list as successors.\n" +
    "5. Continue until the goal is dequeued or the open list empties.\n\n" +
    "### Forced Neighbor Detection\n\n" +
    "```\n" +
    "Moving right →:  if cell above-left is a wall but cell above is passable,\n" +
    "                 the cell above is a forced neighbor → current is a jump point\n" +
    "```\n\n" +
    "> *JPS symmetry pruning means entire corridors are traversed in a single jump.*\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    S((Start)) -.->|"Scan Empty Space"| J1((Jump Point))\n' +
    '    J1 --"Corner Forced"--> J2((Obstacle))\n' +
    "```\n\n",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(b^d)`** in the worst case (same as A*), but in practice far fewer nodes are expanded.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- Jump points stored in open list. The actual number of open-list entries can be orders of magnitude smaller than A* on open grids.",

  bestAndWorstCase:
    "**Best case** on an open, obstacle-free grid — JPS jumps from start directly to goal in a handful of steps, far outpacing A*.\n\n" +
    "**Worst case** in dense or maze-like environments — forced neighbors occur everywhere and JPS degenerates to A*-level performance, but never worse.",

  realWorldUses: [
    "**Game Engines:** Used in pathfinding libraries (e.g., PathFinding.js) to accelerate real-time NPC navigation on tile maps.",
    "**Robotics:** Grid-based robot navigation where offline preprocessing is unavailable and speed is critical.",
    "**Simulation:** Large-scale crowd simulations that require pathfinding for thousands of agents simultaneously.",
    "**Map Editors:** Previewing optimal paths on static uniform-cost grids during level design.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal — guarantees the shortest path, identical to A* on uniform grids.",
      "Explores far fewer nodes than A* on open or semi-open environments.",
      "No preprocessing required — works online, unlike algorithms requiring precomputed data.",
    ],
    limitations: [
      "Only works on uniform-cost grids — cannot handle weighted terrain without modification.",
      "Recursion depth can be large on tall/wide open corridors; iterative implementations preferred in production.",
      "More complex to implement correctly than standard A*, especially forced-neighbor detection.",
    ],
  },

  whenToUseIt:
    "Choose **Jump Point Search** when you need optimal paths on uniform-cost tile grids and performance is critical — particularly when maps are large and relatively open.\n\nAvoid it on weighted grids (use A* or Dijkstra), or when the environment changes frequently (use D* Lite for dynamic replanning).",
};
