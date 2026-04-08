import type { EducationalContent } from "@/types";

export const bellmanFordEducational: EducationalContent = {
  overview:
    "**Bellman-Ford** finds the shortest paths from a single source to all other nodes in a weighted graph, and crucially handles **negative edge weights** — something Dijkstra cannot do.\n\nIt works by repeatedly relaxing every edge in the graph `V − 1` times, where `V` is the number of vertices. A final extra pass detects **negative-weight cycles**, where paths can be made infinitely short.",

  howItWorks:
    "1. Set the distance to the source node as `0` and all other distances to `Infinity`.\n" +
    "2. Repeat `V − 1` times (once per possible path length):\n" +
    "   * For every edge `(u, v)` with weight `w`:\n" +
    "     * If `dist[u] + w < dist[v]`, update `dist[v] = dist[u] + w`.\n" +
    "3. Perform one final relaxation pass:\n" +
    "   * If any distance can still be reduced, a **negative cycle** is reachable from the source — mark it.\n\n" +
    "### Why V − 1 passes suffice\n\n" +
    "The shortest path between any two nodes in a graph without negative cycles can use at most `V − 1` edges. Each pass of Bellman-Ford guarantees that all shortest paths of length `≤ passIndex` are correctly computed.\n\n" +
    "### Bellman-Ford with a Negative Edge\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    '  S((S)) -->|"4"| A((A))\n' +
    '  S((S)) -->|"5"| B((B))\n' +
    '  A((A)) -->|"-3"| B((B))\n' +
    '  A((A)) -->|"2"| C((C))\n' +
    '  B((B)) -->|"3"| C((C))\n' +
    "  style S fill:#06b6d4,stroke:#0891b2\n" +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "After pass 1: dist[A]=4, dist[B]=5. After pass 2: edge A→B(-3) updates dist[B] to 4+(-3)=1. After pass 3: dist[C] = min(4+2, 1+3) = 4. The negative edge is handled correctly across multiple relaxation rounds.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V × E)`**\n\n" +
    "- The outer loop runs `V − 1` times.\n" +
    "- The inner loop iterates over every edge `E`.\n" +
    "- Combined: `O(V × E)`.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "Only the distances array of size `V` is required, plus the graph itself.",

  bestAndWorstCase:
    "**Best case:** The graph is sparse and the source can reach all nodes quickly. Early passes stabilize all distances, but the algorithm still runs all `V − 1` passes — `O(V × E)` regardless.\n\n" +
    "**Worst case:** A dense graph with `E ≈ V²` edges, giving `O(V³)`. On such graphs, Dijkstra with a binary heap is significantly faster if no negative weights are present.",

  realWorldUses: [
    "**Financial arbitrage detection:** Modeling currency exchange rates as edge weights (using log transforms) to detect negative cycles representing profitable arbitrage loops.",
    "**Network routing (distance-vector protocols):** RIP (Routing Information Protocol) uses a distributed variant of Bellman-Ford to propagate routing tables across routers.",
    "**Constraint satisfaction:** Solving systems of difference constraints where variables are nodes and constraints are weighted edges.",
    "**Traffic network analysis:** Computing shortest travel times when some road segments provide time savings (negative weights after transformation).",
    "**Game theory:** Finding optimal strategies in games modeled as graphs with reward/penalty edges.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Correctly handles negative edge weights, unlike Dijkstra's algorithm.",
      "Detects negative-weight cycles reachable from the source.",
      "Simple to implement — no priority queue required.",
    ],
    limitations: [
      "Significantly slower than Dijkstra for graphs with only non-negative weights: O(VE) vs O((V+E)logV).",
      "Does not reconstruct actual paths without an additional predecessor array.",
      "Paths through negative cycles are undefined (marked as -∞) rather than resolved.",
    ],
  },

  whenToUseIt:
    "Use **Bellman-Ford** when the graph may contain **negative edge weights** and you need guaranteed correctness. It is also the right tool when you need to **detect negative-weight cycles**.\n\nIf all weights are non-negative, prefer **Dijkstra's algorithm** for better performance. If you need all-pairs shortest paths, consider **Floyd-Warshall** instead.",
};
