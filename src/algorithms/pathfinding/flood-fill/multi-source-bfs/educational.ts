import type { EducationalContent } from "@/types";

export const multiSourceBfsEducational: EducationalContent = {
  overview:
    "**Multi-Source BFS** launches a BFS simultaneously from multiple source cells — specifically, all empty cells adjacent to walls or grid boundaries. It computes the distance from the nearest wall for every empty cell on the grid in a single pass.\n\nUnlike single-source flood fills, Multi-Source BFS finds the *maximum open space* at each cell, enabling applications like safe-zone detection, robot navigation margins, and Voronoi-style distance maps.",

  howItWorks:
    "1. Initialize the distance map with `-1` (unvisited) for all cells.\n" +
    "2. Enqueue every empty cell that is adjacent to a wall or grid boundary, setting its distance to `1`.\n" +
    "3. Run standard BFS: dequeue a cell, then enqueue each unvisited empty neighbor at `distance + 1`.\n" +
    "4. Repeat until the queue is empty — every reachable empty cell now holds its distance to the nearest wall.\n\n" +
    "### Distance Map Example (3x5 open grid, boundary as wall)\n\n" +
    "```\n" +
    "1 1 1 1 1\n" +
    "1 2 2 2 1\n" +
    "1 1 1 1 1\n" +
    "```\n\n" +
    "> *Cells near the edges get distance 1; the center cell gets the maximum value — the furthest point from any wall.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    W1((Wall 1)) --> S((Safe Zone))\n" +
    "    W2((Wall 2)) --> S\n" +
    "    W3((Wall 3)) --> S\n" +
    "```\n\n",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Each cell is enqueued and dequeued at most once. The seed scan adds at most `O(V)` cells in the initial pass.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The distance array and queue together hold at most `O(V)` entries.",

  bestAndWorstCase:
    "**Best case** occurs when every empty cell is adjacent to a wall — all distances are 1 and the BFS phase is skipped entirely after the seeding pass.\n\n" +
    "**Worst case** is a large fully-open square grid where the center cell is farthest from all walls — the BFS propagates across all `O(V)` cells.",

  realWorldUses: [
    "**Robot Navigation:** Computing safe clearance distances so a robot avoids paths too close to obstacles.",
    "**Game Level Design:** Identifying the most open areas of a map (maximum inscribed circle / largest safe zone).",
    "**Voronoi Diagrams:** Discrete Voronoi decomposition — each empty cell is assigned to its nearest wall source.",
    "**Path Widening:** Prefer paths that maximize wall clearance for smoother agent movement in simulation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Computes wall-distance for ALL cells in a single O(V) BFS pass — no per-cell shortest-path needed.",
      "Naturally handles multiple wall sources simultaneously without any merging step.",
      "The resulting distance map enables many secondary computations (center of free space, bottleneck detection).",
    ],
    limitations: [
      "Requires a full grid scan to seed the initial frontier — not suited for dynamic environments where walls change frequently.",
      "Distances reflect nearest wall only; for nearest obstacle of a specific type, the seeding logic must be adapted.",
      "On sparse, wall-free grids the distance values are trivially 1 everywhere, providing little useful information.",
    ],
  },

  whenToUseIt:
    "Choose **Multi-Source BFS** when you need the distance-to-nearest-wall (or nearest obstacle) for every cell in one efficient pass. It is the algorithm of choice for clearance maps, safe-zone analysis, and discrete Voronoi decomposition.\n\nFor simple flood fill without distance information, use Flood Fill BFS or DFS instead. For single-source shortest path to a specific target, use BFS Shortest Path.",
};
