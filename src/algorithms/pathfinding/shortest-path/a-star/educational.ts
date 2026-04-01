import type { EducationalContent } from "@/types";

export const aStarEducational: EducationalContent = {
  overview:
    "**A* Search** is a best-first pathfinding algorithm that uses a heuristic to guide exploration toward the goal. It combines Dijkstra's guaranteed-shortest-path property with the directional focus of Greedy Best-First Search.\n\nEach candidate cell is scored with `fCost = gCost + hCost`, where `gCost` is the exact distance from the start and `hCost` is a heuristic estimate to the goal (Manhattan distance for grids). A* always expands the cell with the lowest fCost.",

  howItWorks:
    "1. Assign `gCost = 0` and `hCost = manhattan(start, end)` to the start cell and push it onto the open set.\n" +
    "2. Pop the cell with the lowest `fCost` from the open set.\n" +
    "3. If it is the goal, trace parent pointers back to recover the path.\n" +
    "4. For each passable neighbor, compute `tentativeG = currentG + 1`.\n" +
    "5. If `tentativeG` improves the neighbor's recorded gCost, update it, set its parent, and enqueue it.\n" +
    "6. Move the current cell to the closed set and repeat.\n\n" +
    "### fCost = gCost + hCost\n\n" +
    "```\n" +
    "gCost  = exact steps from start\n" +
    "hCost  = Manhattan distance to goal  (admissible — never overestimates)\n" +
    "fCost  = priority for expansion\n" +
    "```\n\n" +
    "> *The Manhattan heuristic is admissible, so A* is guaranteed to find the shortest path.*",

  timeAndSpaceComplexity:
    "**Time Complexity: `O((V + E) log V)`**\n\n" +
    "- With a binary-heap priority queue, each cell is enqueued and dequeued in `O(log V)` time. In the best case the heuristic perfectly guides the search and barely any extra cells are explored.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The open set, closed set, gCost map, and parent map each hold at most `V` entries.",

  bestAndWorstCase:
    "**Best case** occurs when the heuristic perfectly predicts the remaining cost — A* explores only cells on the optimal path, approaching `O(path length)` in practice.\n\n" +
    "**Worst case** occurs when the heuristic provides little guidance (e.g., many walls) and A* degrades toward Dijkstra's performance, visiting most reachable cells before reaching the goal.",

  realWorldUses: [
    "**GPS Navigation:** A* with geographic distance heuristics powers real-time driving-route computation in mapping software.",
    "**Video Game Pathfinding:** Standard NPC movement algorithm in tile-based and open-world games where performance is critical.",
    "**Robotics Motion Planning:** A* guides autonomous robots through obstacle-filled environments with minimal computation.",
    "**Puzzle Solving:** Sliding-tile, Sokoban, and other combinatorial puzzles solved optimally using A* over state graphs.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Finds the optimal shortest path while exploring far fewer cells than BFS or Dijkstra in practice.",
      "The Manhattan heuristic is admissible — correctness is guaranteed on uniform-weight grids.",
      "Highly flexible: swap the heuristic to adapt A* to weighted, diagonal, or 3-D grids.",
    ],
    limitations: [
      "Requires a good admissible heuristic — a poor heuristic degrades performance to Dijkstra or worse.",
      "Memory-intensive on large grids: the open set can grow to O(V) in worst-case layouts.",
      "On grids with uniform weights BFS is equally optimal and simpler to implement.",
    ],
  },

  whenToUseIt:
    "Choose **A* Search** when you need the shortest path on a grid or graph and a spatial heuristic is available to focus the search. It is the standard algorithm when optimality and speed both matter.\n\nUse BFS instead for simple unweighted grids where simplicity is preferred. Use Dijkstra when no admissible heuristic is available or edge weights vary arbitrarily.",
};
