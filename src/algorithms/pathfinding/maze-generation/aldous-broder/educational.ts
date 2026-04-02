import type { EducationalContent } from "@/types";

export const aldousBroderEducational: EducationalContent = {
  overview:
    "**Aldous-Broder** generates a maze by performing a completely random walk through the grid. When the walk steps onto an unvisited cell, it carves the wall between the previous and current cell. The algorithm terminates when every cell has been visited.\n\nIt is the canonical algorithm for generating **uniform spanning trees** — every possible perfect maze is equally likely to be generated. This statistical property is not shared by DFS, Prim's, or Kruskal's algorithms.",

  howItWorks:
    "1. Start at any cell, mark it visited.\n" +
    "2. Choose a random neighbor (2 cells away in a cardinal direction).\n" +
    "3. If the neighbor is unvisited: carve through the wall between current and neighbor; mark the neighbor visited.\n" +
    "4. If the neighbor is already visited: move there but do nothing (wall stays).\n" +
    "5. Repeat from the new position until all passage cells are visited.\n\n" +
    "### Random Walk Behavior\n\n" +
    "```\n" +
    "Visit A → move to B (unvisited) → carve A-B → mark B visited\n" +
    "Move to C (visited) → no carve, just move\n" +
    "Move to D (unvisited) → carve C-D → mark D visited\n" +
    "```\n\n" +
    "> *The random walk revisits cells many times before finishing — this inefficiency is the price of perfect uniformity.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    Random((Random Walk)) --> HitUnvisited((Unvisited Node: Carve!))\n" +
    "    Random --> HitVisited((Visited Node: Ignore))\n" +
    "```\n\n",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V²)` expected**\n\n" +
    "- The random walk must visit all cells, but visits many cells multiple times before finding new ones. The expected cover time of a random walk on an n×m grid is O(nm · log(nm)) in practice.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- Only the visited boolean array is required. No frontier list, stack, or union-find structure is needed.",

  bestAndWorstCase:
    "**Best case:** The random walk happens to visit all cells in sequence without revisiting — O(V) steps total. This is astronomically unlikely on large grids.\n\n" +
    "**Worst case:** The walk gets trapped revisiting already-visited areas many times before finding the remaining unvisited cells — O(V²) or more. This makes Aldous-Broder impractical for large grids in time-critical applications.",

  realWorldUses: [
    "**Statistical Research:** Generating uniform random spanning trees for graph theory experiments.",
    "**Puzzle Design:** When every possible maze layout must be equally likely — for fair puzzle collections.",
    "**Algorithm Study:** Demonstrating the coupon collector's problem and random walk cover times.",
    "**Procedural Generation Research:** Baseline comparison for measuring bias in faster maze algorithms.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Generates perfectly uniform random mazes — every spanning tree is equally probable.",
      "Extremely simple implementation — no frontier list, union-find, or stack required.",
      "Produces no structural bias — no long corridors, no bushy branches, just pure randomness.",
    ],
    limitations: [
      "Very slow in practice — the random walk revisits cells many times before the maze is complete.",
      "O(V²) expected time makes it impractical for large grids (> 50×50).",
      "Difficult to animate efficiently because most walk steps produce no visible change.",
    ],
  },

  whenToUseIt:
    "Choose **Aldous-Broder** when statistical uniformity is required — every possible maze must be equally likely. This is important for research, puzzle collections, and algorithm benchmarking.\n\nAvoid it in production game generation due to its O(V²) expected runtime. For large grids, use Wilson's algorithm instead (same uniformity guarantee, O(V) expected time).",
};
