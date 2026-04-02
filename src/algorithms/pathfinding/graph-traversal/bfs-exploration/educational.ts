import type { EducationalContent } from "@/types";

export const bfsExplorationEducational: EducationalContent = {
  overview:
    "**BFS Exploration** uses Breadth-First Search to visit every reachable cell in a grid starting from a given origin — with no target endpoint. Unlike pathfinding BFS, it never stops early: it maps the entire connected region layer by layer.\n\nThe result is a complete flood-fill of all accessible cells, revealing the structure of the reachable space and its layered distance from the start.",

  howItWorks:
    "1. Enqueue the start cell and mark it visited.\n" +
    "2. Snapshot the current queue length — that is the layer size.\n" +
    "3. Dequeue exactly that many cells, visiting each and enqueuing their unvisited passable neighbors.\n" +
    "4. Increment the layer counter after each full layer is drained.\n" +
    "5. Repeat until the queue is empty — every reachable cell has been visited.\n\n" +
    "### Layer-by-Layer Flood\n\n" +
    "```\n" +
    "Layer 1: [S]           Layer 2: [A, B, C]    Layer 3: [D, E, F, G]\n" +
    "  S . .                  S A .                  S A D\n" +
    "  . . .                  B . .                  B E .\n" +
    "  . . .                  C . .                  C F G\n" +
    "```\n\n" +
    "> *All cells at distance 1 are visited before any cell at distance 2, producing a wave-like expansion.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    Root((Root)) --- A((L1))\n" +
    "    Root --- B((L1))\n" +
    "    A --- C((L2))\n" +
    "    A --- D((L2))\n" +
    "```\n\n",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Every cell (`V`) is enqueued and dequeued exactly once; every passable edge (`E`) is checked once.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The queue and visited set together hold at most `V` entries at any point.",

  bestAndWorstCase:
    "**Best case** occurs on a completely walled-off start cell — the algorithm terminates immediately with a single visited cell, giving `O(1)` practical cost.\n\n" +
    "**Worst case** is a fully open grid with no walls — every cell is reachable and must be visited, yielding `O(V)` visited nodes and `O(V)` queue entries.",

  realWorldUses: [
    "**Flood Fill:** Paint bucket tools in image editors that recolor connected same-color regions.",
    "**Connected Component Analysis:** Counting and labeling isolated regions in binary images.",
    "**Network Reachability:** Determining which nodes can be reached from a given source in network graphs.",
    "**Terrain Mapping:** Autonomous robots mapping reachable floor space from a starting position.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees that every reachable cell is discovered — no region is missed.",
      "Layer counting gives the maximum BFS distance from start across the entire reachable area.",
      "Simpler than shortest-path BFS — no path reconstruction or parent tracking needed.",
    ],
    limitations: [
      "Has no sense of direction or goal — explores everything uniformly regardless of relevance.",
      "Memory usage grows with the frontier width, which can be large on open grids.",
      "Produces no path information — a separate pass is needed if routes are required.",
    ],
  },

  whenToUseIt:
    "Choose **BFS Exploration** when you need to map the full extent of a connected region from a starting point, count reachable cells, or compute BFS distances to all cells simultaneously.\n\nAvoid it when you only need a path to a specific target — BFS Shortest Path terminates early and is more efficient for that use case.",
};
