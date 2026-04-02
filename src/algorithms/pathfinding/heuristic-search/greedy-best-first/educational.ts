import type { EducationalContent } from "@/types";

export const greedyBestFirstEducational: EducationalContent = {
  overview:
    "**Greedy Best-First Search** navigates a grid by always expanding the node that appears closest to the goal, measured by the Manhattan distance heuristic `h(n)`. Unlike A*, it ignores the cost already paid to reach a node — making it faster in practice but **not guaranteed to find the shortest path**.\n\nThink of it as always walking toward the goal without looking back at how far you have come.",

  howItWorks:
    "1. Add the start node to a priority queue, keyed by `h(start)`.\n" +
    "2. Dequeue the node with the smallest heuristic value.\n" +
    "3. If it is the goal, reconstruct the path via parent pointers.\n" +
    "4. Otherwise, add each unvisited, passable neighbor to the queue with its heuristic value.\n" +
    "5. Mark nodes as closed after dequeuing to avoid revisiting.\n" +
    "6. Repeat until the queue empties (no path) or the goal is reached.\n\n" +
    "### Heuristic Only\n\n" +
    "```\n" +
    "f(n) = h(n)   ← greedy ignores g(n) entirely\n" +
    "h(n) = |row_n - row_goal| + |col_n - col_goal|  (Manhattan)\n" +
    "```\n\n" +
    "> *The algorithm rushes toward the goal but may travel through suboptimal corridors.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    Start((Start)) --\"h=8\"--> Node1((h=4))\n" +
    "    Start --\"h=6\"--> Node2((h=2))\n" +
    "    Node2 --\"Greedy Pick\"--> End((Goal: h=0))\n" +
    "```\n\n" ,

  timeAndSpaceComplexity:
    "**Time Complexity: `O(b^m)`** in the worst case, where `b` is the branching factor and `m` is the maximum depth. With a good heuristic, it is much faster in practice.\n\n" +
    "**Space Complexity: `O(b^m)`**\n\n" +
    "- The open list can grow exponentially in pathological cases, but on grid maps it is typically bounded by the number of reachable cells `O(V)`.",

  bestAndWorstCase:
    "**Best case** occurs when the heuristic perfectly guides the search (no walls) — the path is found immediately along the straight-line heuristic direction.\n\n" +
    "**Worst case** occurs when walls force backtracking — the greedy approach may loop or find a path far longer than the shortest one. In extreme cases it can be as slow as BFS while still not finding the optimal path.",

  realWorldUses: [
    "**Robotics:** Quick approximate navigation when strict optimality is not required and speed matters.",
    "**Game AI:** Enemy pathfinding in real-time games where approximate routes are acceptable and fast computation is essential.",
    "**Puzzle Heuristics:** Provides fast initial solutions that can be improved by subsequent optimization passes.",
    "**Network Routing:** Rapid route selection in low-latency environments where path length variations are tolerable.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Significantly faster than A* or BFS in open environments with few obstacles.",
      "Simple to implement — only a single heuristic value is stored per node.",
      "Explores far fewer nodes than BFS when the heuristic is informative.",
    ],
    limitations: [
      "Not optimal — the path found may be longer than the true shortest path.",
      "Not complete on infinite graphs — can follow an infinite heuristic-guided detour.",
      "Sensitive to obstacle layout — performs poorly when walls force non-intuitive routes.",
    ],
  },

  whenToUseIt:
    "Choose **Greedy Best-First Search** when you need a quick approximate path and strict optimality is not required — such as real-time game AI or rapid prototyping.\n\nAvoid it when the shortest path is important (use A* or Dijkstra), or when the heuristic might be misleading due to complex obstacle layouts.",
};
