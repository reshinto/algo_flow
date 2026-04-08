import type { EducationalContent } from "@/types";

export const kruskalsEducational: EducationalContent = {
  overview:
    "**Kruskal's Algorithm** is a greedy algorithm that constructs a **Minimum Spanning Tree (MST)** by processing edges in ascending order of weight and adding each edge only when it connects two previously disconnected components.\n\nIt uses a **Union-Find (Disjoint Set Union)** data structure to efficiently detect cycles — if both endpoints of an edge already belong to the same component, adding it would form a cycle and the edge is rejected.",

  howItWorks:
    "1. Sort all edges by weight in ascending order.\n" +
    "2. Initialize each node as its own component (Union-Find forest).\n" +
    "3. For each edge in sorted order:\n" +
    "   * Use `find()` with path compression to locate the root of each endpoint.\n" +
    "   * If the roots differ, the edge safely connects two components — add it to the MST and call `union()` to merge them.\n" +
    "   * If the roots match, the edge would create a cycle — reject it.\n" +
    "4. Stop once the MST contains **V − 1** edges (all nodes connected).\n\n" +
    "### Union-Find with Path Compression\n\n" +
    "```\n" +
    "find(A) → root via path compression\n" +
    "find(B) → root via path compression\n" +
    "if roots differ → union by rank → merge trees\n" +
    "```\n\n" +
    "Path compression flattens the tree on every `find()` call, making subsequent lookups nearly O(1).\n\n" +
    "### Kruskal's Edge Selection on a Weighted Graph\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '  A((A)) -->|"1"| B((B))\n' +
    '  B((B)) -->|"2"| C((C))\n' +
    '  A((A)) -->|"4"| C((C))\n' +
    '  B((B)) -->|"3"| D((D))\n' +
    '  C((C)) -->|"5"| D((D))\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Edges sorted by weight: A–B(1), B–C(2), B–D(3), A–C(4), C–D(5). Kruskal's picks A–B, B–C, B–D (green/amber) — adding A–C would create a cycle and is rejected. MST weight = 6.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(E log E)`**\n\n" +
    "- **Sorting edges** dominates at `O(E log E)`.\n" +
    "- Each **Union-Find** operation with path compression and union by rank is `O(α(V))` — effectively constant.\n" +
    "- Overall: `O(E log E)` which simplifies to `O(E log V)` since `E ≤ V²`.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The Union-Find structure stores parent and rank arrays of size `V`. The sorted edge list requires `O(E)` auxiliary space.",

  bestAndWorstCase:
    "**Best case** occurs on sparse graphs (`E ≈ V`) where sorting is cheap and the MST is found after processing very few edges. Performance approaches `O(V log V)`.\n\n" +
    "**Worst case** is a dense graph where `E ≈ V²`. Sorting takes `O(V² log V)` and nearly every edge must be examined before the MST is complete.",

  realWorldUses: [
    "**Network cable layout:** Minimizing total wire length when connecting buildings or data centers in a campus network.",
    "**Cluster analysis:** Removing the longest edges from a Kruskal MST to partition data points into clusters.",
    "**Circuit board routing:** Finding minimum-cost wiring between components on a PCB.",
    "**Road construction planning:** Determining which roads to build to connect all cities at minimum total cost.",
    "**Image segmentation:** Merging similar-weight regions in a pixel-adjacency graph to separate foreground from background.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple to implement and reason about — sort, then greedily add safe edges.",
      "Works efficiently on sparse graphs where `E` is close to `V`.",
      "Naturally handles disconnected graphs — the result is a minimum spanning forest.",
      "The sorted edge list can be reused if the graph is queried multiple times.",
    ],
    limitations: [
      "Sorting all edges upfront is wasteful on dense graphs — Prim's is faster when `E ≈ V²`.",
      "Requires all edges to be available in memory before starting — unsuitable for streaming edge inputs.",
      "Union-Find with path compression adds implementation complexity compared to a naive approach.",
    ],
  },

  whenToUseIt:
    "Choose **Kruskal's** when the graph is **sparse** (few edges relative to nodes) or when the edges are already sorted or nearly sorted. It is also the natural choice when you need a minimum spanning **forest** across a disconnected graph.\n\nPrefer **Prim's algorithm** for dense graphs where a priority-queue-based approach processes fewer edges overall. Use **Borůvka's** when parallelism is important, as each round of component merges can run concurrently.",
};
