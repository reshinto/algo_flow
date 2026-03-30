import type { EducationalContent } from "@/types";

export const unionFindCycleEducational: EducationalContent = {
  overview:
    "**Union-Find Cycle Detection** determines whether an undirected graph contains a cycle by processing edges one at a time using the **Disjoint Set Union (DSU)** data structure.\n\n" +
    "Each node starts in its own component. For every edge `(u, v)`, the algorithm asks: are `u` and `v` already in the same component? If yes — adding this edge would create a cycle. If no — safely merge the two components. This approach is ideal when edges arrive incrementally and you need near-constant-time cycle queries.",

  howItWorks:
    "1. Initialize a **Union-Find** structure: every node is its own root, and all ranks start at 0.\n" +
    "2. For each edge `(source, target)`:\n" +
    "   * Find the **root** of `source` (with path compression).\n" +
    "   * Find the **root** of `target` (with path compression).\n" +
    "   * If `sourceRoot === targetRoot` → **cycle detected**. Return `true`.\n" +
    "   * Otherwise → **merge** the two components using union by rank.\n" +
    "3. If all edges are processed without a match, the graph is acyclic.\n\n" +
    "### Union by Rank + Path Compression\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    A((A)) --- B((B))\n" +
    "    B((B)) --- C((C))\n" +
    "    C((C)) --- D((D))\n" +
    "    D((D)) --- B((B))\n" +
    "    style D fill:#ef4444,stroke:#dc2626\n" +
    "    style B fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "When processing edge `D — B`, both nodes already share the same root. The cycle `B — C — D — B` is immediately detected without traversing the whole graph.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(E · α(V))` ≈ `O(E)`**\n\n" +
    "With both **path compression** and **union by rank**, the amortized cost per `find` or `union` operation is `α(V)` — the inverse Ackermann function, which is effectively constant (≤ 5) for any realistic graph size.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The `parent` and `rank` arrays each hold one entry per node.",

  bestAndWorstCase:
    "**Best case:** The first edge processed connects two nodes that are already in the same component — the algorithm returns `true` immediately after a single `find` pair.\n\n" +
    "**Worst case:** The graph is acyclic. All `E` edges must be processed and merged before concluding no cycle exists, giving `O(E · α(V))` total cost.",

  realWorldUses: [
    "**Kruskal's MST Algorithm:** Union-Find is the core data structure — each edge is checked for a cycle before being added to the spanning tree.",
    "**Network Connectivity:** Quickly determining whether adding a new link between two network segments would create a redundant loop.",
    "**Image Segmentation:** Merging adjacent pixel regions and detecting when a region forms a closed boundary.",
    "**Dynamic Graph Monitoring:** Streaming edge additions in real-time systems where a DFS restart would be too expensive.",
    "**Maze Generation:** Ensuring all cells are eventually connected without introducing cycles, as in randomized Kruskal's maze builder.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Near-constant `O(α(V))` per edge makes it the fastest option for incremental cycle detection.",
      "Extremely simple to implement — just `find` and `union` operations on an array.",
      "Naturally handles disconnected graphs and multiple components in a single pass.",
      "Path compression makes subsequent queries on the same nodes even faster.",
    ],
    limitations: [
      "Only applicable to **undirected graphs** — Union-Find cannot distinguish directed back edges from cross-edges.",
      "Requires the full edge list upfront (or an online stream); cannot detect cycles in a partially specified graph.",
      "Does not identify which specific nodes form the cycle — only whether one exists.",
    ],
  },

  whenToUseIt:
    "Use **Union-Find Cycle Detection** when you are processing an undirected edge list and need the fastest possible cycle check — especially in algorithms like Kruskal's MST where every edge is evaluated in sorted order.\n\n" +
    "For **directed graphs**, Union-Find cannot be used — switch to the three-color DFS approach which correctly distinguishes back edges (cycles) from cross-edges.\n\n" +
    "For a **one-shot undirected check** on a graph already stored as an adjacency list, **DFS with parent tracking** is equally efficient and requires no auxiliary DSU structure.",
};
