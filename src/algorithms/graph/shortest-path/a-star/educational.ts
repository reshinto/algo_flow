import type { EducationalContent } from "@/types";

export const aStarEducational: EducationalContent = {
  overview:
    "**A\\* Search** finds the shortest path between a start node and a target node by combining the cost already paid to reach a node with an admissible heuristic estimate of the remaining cost to the goal.\n\nThe key insight is the **f = g + h** formula: `g` is the exact cost from the start to the current node, and `h` is the heuristic estimate from the current node to the target. By always expanding the node with the lowest `f` score, A\\* is both complete and optimal — provided the heuristic never overestimates the true remaining cost.",

  howItWorks:
    "1. Assign `g(start) = 0` and `g(v) = Infinity` for all other nodes.\n" +
    "2. Add the start node to a min-priority queue keyed by `f = g + h`.\n" +
    "3. While the open queue is not empty:\n" +
    "   * Dequeue the node `u` with the lowest `f` score.\n" +
    "   * Skip `u` if it has already been finalized (closed).\n" +
    "   * Mark `u` as finalized.\n" +
    "   * If `u` is the target, reconstruct and return the path.\n" +
    "   * For each neighbor `v` of `u`, compute `tentativeG = g(u) + weight(u, v)`.\n" +
    "   * If `tentativeG < g(v)`, update `g(v)`, record `u` as `v`'s predecessor, and push `v` with `f = tentativeG + h(v)` onto the queue.\n" +
    "4. If the queue empties without reaching the target, no path exists.\n\n" +
    "### Why the heuristic matters\n\n" +
    "An **admissible** heuristic (one that never overestimates) guarantees optimality. Euclidean distance is admissible for physical maps. A heuristic of `0` turns A\\* into Dijkstra's algorithm; a heuristic equal to the true remaining cost makes A\\* explore only the optimal path with no wasted work.\n\n" +
    "### A* Guided Search: f = g + h\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    '  S((S)) -->|"2"| A((A))\n' +
    '  S((S)) -->|"5"| B((B))\n' +
    '  A((A)) -->|"3"| C((C))\n' +
    '  A((A)) -->|"6"| T((T))\n' +
    '  C((C)) -->|"1"| T((T))\n' +
    '  B((B)) -->|"4"| T((T))\n' +
    "  style S fill:#06b6d4,stroke:#0891b2\n" +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style T fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "S (cyan) starts with g=0. A* prioritizes A (amber) because its f = g(2) + h(4) = 6 beats B's f = g(5) + h(3) = 8. From A, path S→A→C→T (total cost 6) is discovered before the suboptimal S→A→T (cost 8).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O((V + E) log V)`**\n\n" +
    "- In the worst case A\\* behaves like Dijkstra: every vertex is dequeued once and every edge is relaxed once, each priority queue operation costing `O(log V)`.\n" +
    "- With a perfect heuristic the search visits only the optimal-path nodes, approaching `O(path length × log V)`.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The open queue, closed set, g-cost table, and predecessor map each hold at most `V` entries.",

  bestAndWorstCase:
    "**Best case:** The heuristic is perfect (equals the true remaining cost). A\\* expands only the nodes on the optimal path and terminates immediately upon reaching the target, exploring `O(path length)` nodes.\n\n" +
    "**Worst case:** The heuristic is zero everywhere (degenerating to Dijkstra) or the graph is a dense, uniform-weight mesh. In that scenario all `V` nodes may be dequeued and all `E` edges relaxed, giving `O((V + E) log V)` — the same asymptotic cost as Dijkstra.",

  realWorldUses: [
    "**Video game pathfinding:** Tile-based and navmesh pathfinding in games like strategy and RPG titles, where Euclidean or Manhattan distance serves as the heuristic.",
    "**Robotics and autonomous vehicles:** Planning collision-free trajectories in continuous or discretized configuration spaces.",
    "**GPS navigation:** Finding driving routes on road networks where geographic coordinates provide an effective straight-line heuristic.",
    "**Puzzle solving:** Solving sliding-tile puzzles (15-puzzle) and other combinatorial search problems where a lower-bound heuristic can be defined.",
    "**Network routing:** Computing optimal paths in weighted communication networks with a measurable distance proxy.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal and complete when the heuristic is admissible — guarantees the shortest path.",
      "Outperforms Dijkstra in practice by focusing the search toward the goal rather than expanding uniformly.",
      "Flexible heuristic design lets practitioners trade off optimality for speed by allowing slight overestimation.",
    ],
    limitations: [
      "Memory usage can be prohibitive on large graphs because all discovered nodes must be held in the open and closed sets.",
      "Performance degrades to Dijkstra when a good heuristic cannot be formulated.",
      "An inadmissible heuristic (one that overestimates) voids the optimality guarantee, potentially returning a suboptimal path.",
    ],
  },

  whenToUseIt:
    "Use **A\\* Search** when you need the shortest path between a specific start and target node and you can define an admissible heuristic — such as straight-line distance on a map. A\\* is the canonical choice for game pathfinding, robot navigation, and map routing where geographic proximity provides a natural lower bound.\n\nChoose **Dijkstra's algorithm** instead when you need shortest paths to *all* nodes from a source, or when no meaningful heuristic is available. Use **BFS** for unweighted graphs where hop count is the cost metric.",
};
