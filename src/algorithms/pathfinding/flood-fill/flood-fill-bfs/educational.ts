import type { EducationalContent } from "@/types";

export const floodFillBfsEducational: EducationalContent = {
  overview:
    "**Flood Fill BFS** simulates the classic paint-bucket tool using Breadth-First Search. Starting from a seed cell, it spreads outward in waves, filling all connected empty cells reachable without crossing walls.\n\nThe BFS order guarantees that cells are filled layer by layer — the algorithm always finishes all cells at distance `d` before moving to cells at distance `d+1`, producing a smooth radial expansion visible in the visualization.",

  howItWorks:
    "1. Enqueue the seed (start) cell and mark it as visited.\n" +
    "2. Dequeue the front cell and count it as filled.\n" +
    "3. For each of its 4 neighbors: skip walls, skip already-visited cells, then enqueue and mark as visited.\n" +
    "4. Repeat until the queue is empty.\n\n" +
    "### Wave-by-Wave Expansion\n\n" +
    "```\n" +
    "Step 0: seed S           Step 1: ring of distance-1 cells\n" +
    "  [ ][ ][ ]                [A][B][C]\n" +
    "  [ ][S][ ]                [D][S][E]\n" +
    "  [ ][ ][ ]                [F][G][H]\n" +
    "```\n\n" +
    "> *Every cell at Manhattan distance 1 is processed before any cell at distance 2 — creating a perfect outward wave.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    Center((Queue: First)) --> Top((Queue: Last))\n" +
    "```\n\n",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Each empty cell is enqueued and dequeued exactly once. `V` = total cells, `E` = adjacency edges.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The queue holds at most the frontier of the current wave, which is bounded by `O(V)` in the worst case.",

  bestAndWorstCase:
    "**Best case** is when the seed cell is isolated — no empty neighbors exist and the algorithm terminates immediately after processing the single seed cell.\n\n" +
    "**Worst case** is a fully open grid with no walls — every cell must be visited before the queue empties, giving `O(rows × cols)` operations.",

  realWorldUses: [
    "**Image Editing:** The paint-bucket fill tool in raster editors (Photoshop, GIMP, MS Paint) uses flood fill to recolor contiguous regions.",
    "**Game Development:** Detecting connected empty regions in tile-based games (e.g., open areas, rooms in a dungeon).",
    "**Board Games:** Checking if a player's pieces form a connected group (Go, Othello territory counting).",
    "**Computer Vision:** Connected-component labeling — segmenting regions of the same color or intensity in an image.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees that every reachable cell is visited exactly once — no redundant work.",
      "BFS order produces a smooth, visually intuitive wave expansion ideal for educational demos.",
      "Simple data structure requirement: only a FIFO queue and a visited boolean array.",
    ],
    limitations: [
      "Memory: the frontier queue can be large on open grids — up to O(√V) cells wide on a square grid.",
      "Does not compute distance or path information; for those, use BFS Shortest Path or Multi-Source BFS.",
      "On very large grids the queue may stress memory; DFS (stack-based) uses less queue memory but a larger call stack.",
    ],
  },

  whenToUseIt:
    "Choose **Flood Fill BFS** when you need to identify or mark all cells connected to a seed position and the visual order of filling matters (wave-like). It is the standard algorithm for paint-bucket operations and connected-region detection.\n\nIf fill order is unimportant and memory is tight, consider Flood Fill DFS instead. If you need distance-to-wall information for every cell, use Multi-Source BFS.",
};
