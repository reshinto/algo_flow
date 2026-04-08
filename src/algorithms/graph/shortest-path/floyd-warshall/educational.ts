import type { EducationalContent } from "@/types";

export const floydWarshallEducational: EducationalContent = {
  overview:
    "**Floyd-Warshall** computes the shortest paths between **every pair of nodes** in a weighted graph in a single pass. Unlike Dijkstra or Bellman-Ford, which solve single-source problems, Floyd-Warshall produces a complete distance matrix covering all `V²` source-target combinations.\n\nIt works by progressively considering each node as a potential **intermediate waypoint** and checking whether routing through it shortens any known path.",

  howItWorks:
    "1. Build a `V × V` distance matrix. Set `dist[i][i] = 0` and `dist[i][j] = weight` for direct edges; all other entries start at `Infinity`.\n" +
    "2. For each intermediate node `k` (the outer loop):\n" +
    "   * For each source node `i`:\n" +
    "     * For each target node `j`:\n" +
    "       * If `dist[i][k] + dist[k][j] < dist[i][j]`, update `dist[i][j]`.\n" +
    "3. After processing all `V` intermediate nodes, `dist[i][j]` holds the shortest path between every pair `(i, j)`.\n\n" +
    "### The key insight\n\n" +
    "After the `k`-th outer iteration, `dist[i][j]` contains the shortest path from `i` to `j` that uses only nodes `{0, 1, …, k}` as intermediates. By the time `k = V`, all intermediates have been considered.\n\n" +
    "### All-Pairs Example: Using B as Intermediate\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '  A((A)) -->|"3"| B((B))\n' +
    '  B((B)) -->|"2"| C((C))\n' +
    '  A((A)) -->|"8"| C((C))\n' +
    '  C((C)) -->|"1"| D((D))\n' +
    '  B((B)) -->|"5"| D((D))\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "When k=B (amber): dist[A][C] = min(8, dist[A][B] + dist[B][C]) = min(8, 3+2) = 5. Floyd-Warshall discovers that routing through B shortens the A to C path from 8 to 5.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V³)`**\n\n" +
    "Three nested loops each running `V` iterations. For small graphs this is acceptable; for `V > 1000`, the cubic cost becomes prohibitive.\n\n" +
    "**Space Complexity: `O(V²)`**\n\n" +
    "The distance matrix requires `V²` entries — one for every ordered pair of nodes.",

  bestAndWorstCase:
    "**Best case:** A sparse graph where most pairs are unreachable. The algorithm still runs `O(V³)` — there is no early-exit mechanism. For sparse graphs, running Dijkstra from each source is often faster.\n\n" +
    "**Worst case:** A dense graph with `E ≈ V²`. Both Floyd-Warshall (`O(V³)`) and running Dijkstra `V` times (`O(V(V+E)logV) ≈ O(V³ logV)`) are expensive, but Floyd-Warshall has a smaller constant factor.",

  realWorldUses: [
    "**Network routing tables:** Computing the full shortest-path matrix for small autonomous systems where every router needs to know the shortest path to every other router.",
    "**Transitive closure:** Determining reachability between all node pairs in a directed graph (set edge weights to 1 for edges, Infinity otherwise).",
    "**Flight connection matrices:** Pre-computing minimum-cost or minimum-hop routes between every airport pair in a regional network.",
    "**Compiler analysis:** Data-flow analysis in control-flow graphs where all-pairs reachability is required.",
    "**Game AI:** Pre-computing shortest-path costs between all waypoints in a level for fast runtime path lookup.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Solves all-pairs shortest paths in a single O(V³) pass — no need to run Dijkstra V times.",
      "Handles negative edge weights correctly (though not negative cycles).",
      "Extremely simple implementation — just three nested loops.",
    ],
    limitations: [
      "O(V³) time and O(V²) space make it impractical for large graphs (V > ~1000).",
      "Does not reconstruct actual paths without an additional predecessor matrix.",
      "Gives incorrect results when negative-weight cycles are present — they must be detected separately.",
    ],
  },

  whenToUseIt:
    "Use **Floyd-Warshall** when you need **all-pairs shortest paths** on a small-to-medium graph and simplicity matters. It is ideal when `V` is small (≤ a few hundred nodes) and edge weights may be negative.\n\nFor large sparse graphs, prefer running **Dijkstra** from each source. For single-source queries on graphs with negative weights, use **Bellman-Ford**.",
};
