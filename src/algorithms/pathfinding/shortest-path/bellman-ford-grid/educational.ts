import type { EducationalContent } from "@/types";

export const bellmanFordGridEducational: EducationalContent = {
  overview:
    "**Bellman-Ford Grid** adapts the classic Bellman-Ford algorithm to grid pathfinding by treating each passable adjacency as a directed edge and relaxing all edges `V - 1` times (where `V` is the number of cells).\n\nUnlike Dijkstra or BFS, Bellman-Ford can theoretically handle negative edge weights — making it educational as a contrast to greedy approaches, even though a uniform-cost grid never has negative weights.",

  howItWorks:
    "1. Assign distance `0` to the start cell and `Infinity` to all others.\n" +
    "2. Enumerate every directed passable edge `(u → v)` in the grid.\n" +
    "3. For each of `V - 1` iterations, scan all edges and **relax** any that can be improved: if `dist[u] + 1 < dist[v]`, set `dist[v] = dist[u] + 1` and record `parent[v] = u`.\n" +
    "4. Stop early if an iteration completes with no updates.\n" +
    "5. If `dist[end]` is still `Infinity`, no path exists. Otherwise trace parent pointers to reconstruct the path.\n\n" +
    "### Why V - 1 Iterations?\n\n" +
    "```\n" +
    "Any shortest path in a graph with V vertices contains at most V-1 edges.\n" +
    "After iteration k, all paths of length ≤ k are correctly computed.\n" +
    "```\n\n" +
    '> *Each iteration "pushes" shortest-path knowledge one more hop away from the source.*\n\n' +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  S["Start S\\ndist=0"] -->|"relax edge +1"| A["Cell A\\ndist=1"]\n' +
    '  A -->|"relax edge +1"| B["Cell B\\ndist=2"]\n' +
    '  B -->|"relax edge +1"| G["Goal G\\ndist=3"]\n' +
    '  S -->|"longer path"| C["Cell C\\ndist=1"]\n' +
    '  C -->|"not improved"| G\n' +
    "  style S fill:#06b6d4,stroke:#0891b2\n" +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "After each full pass over all edges, shortest-path knowledge propagates one hop further from the source; after V−1 passes every reachable cell holds its true minimum distance.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V × E)`**\n\n" +
    "- For a grid with `V` cells and `E` edges (up to `4V`), each of the `V - 1` iterations scans all `E` edges: `O(V × E) = O(V²)` in the worst case.\n\n" +
    "**Space Complexity: `O(V + E)`**\n\n" +
    "- The distance map and parent map are `O(V)`; the explicit edge list is `O(E)`, giving `O(V + E)` total.",

  bestAndWorstCase:
    "**Best case** occurs when the start and goal are adjacent — the first relaxation iteration resolves the path and early termination stops the loop immediately, giving `O(E)` practical cost.\n\n" +
    "**Worst case** occurs on large open grids where many cells are reachable and all `V - 1` iterations are needed — degrading to `O(V × E) = O(V²)`, far slower than BFS or Dijkstra for uniform-weight grids.",

  realWorldUses: [
    "**Network Routing (RIP Protocol):** Distance-vector routing protocols model Bellman-Ford to propagate shortest hop-count paths across router networks.",
    "**Currency Arbitrage Detection:** Bellman-Ford detects negative-weight cycles in exchange-rate graphs, revealing arbitrage opportunities.",
    "**Scheduling with Precedence Constraints:** Longest-path variants (negating weights) solve critical-path analysis in project planning.",
    "**Educational Tool:** Demonstrates why negative-weight edges break Dijkstra, making Bellman-Ford the correct general-purpose shortest-path algorithm.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Handles negative edge weights correctly — the only classic single-source algorithm to do so.",
      "Simple implementation: no priority queue required, just iterate over all edges.",
      "Early termination optimization reduces iterations when the graph has sparse connectivity.",
    ],
    limitations: [
      "Significantly slower than Dijkstra and BFS on uniform-weight grids — O(V²) vs O(V + E).",
      "Requires enumerating all edges explicitly, adding memory and setup cost compared to BFS.",
      "Does not detect negative-weight cycles by default without an additional (V-th) relaxation pass.",
    ],
  },

  whenToUseIt:
    "Choose **Bellman-Ford Grid** when edge weights can be negative, or for educational comparison with Dijkstra and BFS to demonstrate why negative weights require a different approach.\n\nFor uniform-cost grids, prefer BFS (simplest) or Dijkstra/A* (faster). Bellman-Ford's O(V²) cost makes it impractical for large grids when weights are non-negative.",
};
