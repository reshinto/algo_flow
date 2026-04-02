import type { EducationalContent } from "@/types";

export const leeAlgorithmEducational: EducationalContent = {
  overview:
    "**Lee's Algorithm** is a BFS-based shortest-path method developed by C. Y. Lee in 1961 for circuit-board routing. It expands outward from the start cell in a wavefront pattern, stamping each reachable cell with its distance number. After the goal is reached, the path is recovered by backtracking through decreasing wave numbers.\n\nThough functionally equivalent to BFS for unweighted grids, Lee's algorithm is celebrated for its elegant wave-numbering visualization — each cell's label tells you exactly how far it is from the source.",

  howItWorks:
    "1. Stamp the start cell with wave number `0` and enqueue it.\n" +
    "2. Dequeue the front cell. If it is the goal, begin backtracking.\n" +
    "3. For each unvisited, passable neighbor, stamp it with `currentWave + 1`, record its parent, and enqueue it.\n" +
    "4. Continue until the queue is empty or the goal is found.\n" +
    "5. **Backtrack:** from the goal, follow parent pointers to reconstruct the path.\n\n" +
    "### Wavefront Expansion\n\n" +
    "```\n" +
    " 0  1  2  3  4\n" +
    " 1  W  W  W  5\n" +
    " 2  W  W  W  6\n" +
    " 3  4  5  6  7\n" +
    "```\n\n" +
    "> *`W` = wall. Wave numbers mark Manhattan distance from start; the path backtracks through decreasing values.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    S((Start [0])) --> A((Node [1]))\n" +
    "    A --> B((Node [2]))\n" +
    "    B -.-> S\n" +
    "    B --> E((End [3]))\n" +
    "```\n\n" ,

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Equivalent to BFS: each of the `V` cells is enqueued and dequeued at most once, and each of the `E` adjacency edges is checked once.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The queue, wave-number map, and parent map each hold at most `V` entries.",

  bestAndWorstCase:
    "**Best case** occurs when the goal is adjacent to the start — the wavefront terminates after one expansion step, giving effectively `O(1)` practical cost.\n\n" +
    "**Worst case** occurs on a fully open grid where the goal is in the far corner — the wavefront must label every reachable cell before terminating, visiting all `V` cells.",

  realWorldUses: [
    "**PCB Routing:** The original application — routing wire traces between pins on circuit boards while avoiding other traces.",
    "**Maze Solving:** Guaranteed shortest solution for any maze solvable by 4-directional movement.",
    "**Fire Simulation:** Modeling fire-spread wavefronts across grid terrain with uniform propagation speed.",
    "**Educational Visualization:** The wave-number labeling provides an especially clear visual of how BFS distances propagate.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guaranteed shortest path on unweighted grids — identical correctness guarantee to BFS.",
      "Wave numbers give each cell an explicit distance label, making execution extremely transparent to learners.",
      "Simple to implement with only a queue, wave map, and parent array.",
    ],
    limitations: [
      "Cannot handle weighted edges — each move must have equal cost for optimality.",
      "Memory usage is the same as BFS: the wave map stores a number for every cell, even unreachable ones.",
      "No directional focus — explores all directions equally, unlike A* which uses a heuristic to focus toward the goal.",
    ],
  },

  whenToUseIt:
    "Choose **Lee's Algorithm** when visualizing BFS wave propagation is important — for example, in educational tools or circuit-routing demonstrations where the wave-number labels add insight.\n\nFor purely practical pathfinding on unweighted grids, BFS is identical in performance. Use A* when you need to minimize explored cells on larger grids.",
};
