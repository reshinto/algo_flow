import type { EducationalContent } from "@/types";

export const edmondsKarpEducational: EducationalContent = {
  overview:
    "**Edmonds-Karp** is a refinement of Ford-Fulkerson that uses **BFS** instead of DFS to find augmenting paths, guaranteeing a polynomial `O(VE²)` runtime regardless of capacity values.\n\nBy always choosing the **shortest** augmenting path (fewest edges), Edmonds-Karp limits the number of augmentation rounds and avoids the pathological behavior that can occur with DFS-based path selection.",

  howItWorks:
    "1. Build a **residual graph** identical to Ford-Fulkerson.\n" +
    "2. Run **BFS** from source `s` to sink `t` to find the shortest path with positive residual capacity.\n" +
    "3. Find the **bottleneck** along that path.\n" +
    "4. **Augment flow** by the bottleneck, updating residual capacities both forward and backward.\n" +
    "5. Repeat BFS until no path from `s` to `t` exists in the residual graph.\n\n" +
    "### Why BFS Guarantees Polynomial Runtime\n\n" +
    "Each edge can become a bottleneck at most `O(V)` times before it is permanently removed from shortest paths. Since there are `E` edges, the total number of augmentations is bounded by `O(VE)`, and each BFS costs `O(V + E)`, giving `O(VE²)` overall.\n\n" +
    "### Network Flow Example (Edmonds-Karp BFS Path)\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    '  S((S)) -->|"10"| A((A))\n' +
    '  S((S)) -->|"8"| B((B))\n' +
    '  A((A)) -->|"6"| C((C))\n' +
    '  B((B)) -->|"7"| C((C))\n' +
    '  A((A)) -->|"4"| T((T))\n' +
    '  C((C)) -->|"9"| T((T))\n' +
    "  style S fill:#06b6d4,stroke:#0891b2\n" +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style T fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "BFS from S (cyan) finds the shortest path S→A→T (fewest hops) first, augmenting 4 units. Next BFS finds S→A→C→T, augmenting 6 more. BFS path selection prevents the alternating-path inefficiency of plain Ford-Fulkerson.",

  timeAndSpaceComplexity:
    "**Time Complexity: O(VE²)**\n\n" +
    "- Each BFS takes `O(V + E)`.\n" +
    "- The number of augmenting path iterations is bounded by `O(VE)` due to the shortest-path property.\n" +
    "- Combined: `O(VE) × O(V + E) = O(VE²)`.\n\n" +
    "**Space Complexity: O(V + E)**\n\n" +
    "The residual graph, BFS queue, and parent-map each use at most `O(V + E)` space.",

  bestAndWorstCase:
    "**Best case:** A single BFS finds a path saturating the entire max flow in one pass — `O(V + E)`.\n\n" +
    "**Worst case:** Fully adversarial graph topologies where every BFS augments only a small amount of flow, requiring `O(VE)` iterations each costing `O(V + E)` — total `O(VE²)`.",

  realWorldUses: [
    "**Network bandwidth allocation:** Finding maximum data throughput with a guaranteed runtime even for large networks.",
    "**Project scheduling:** Modeling task dependencies and resource limits as flow problems.",
    "**Bipartite matching:** Polynomial-time maximum matching via the max-flow reduction.",
    "**Transportation planning:** Routing maximum cargo volume through road or rail networks.",
    "**Telecommunications:** Maximizing call routing capacity between switching centers.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guaranteed polynomial `O(VE²)` runtime — safe to use with any capacity values including real numbers.",
      "BFS shortest-path selection is simple to implement and reason about.",
      "Directly produces the min-cut as a byproduct via the residual graph after termination.",
    ],
    limitations: [
      "Slower than Dinic's algorithm (`O(V²E)`) on dense graphs or graphs with many augmentation rounds.",
      "BFS overhead per iteration is higher than DFS used in plain Ford-Fulkerson for small instances.",
      "Does not exploit blocking-flow optimizations available in more advanced algorithms.",
    ],
  },

  whenToUseIt:
    "Use **Edmonds-Karp** when you need a reliable polynomial max-flow algorithm that handles any capacity type. It is the go-to choice when Ford-Fulkerson's DFS may be inefficient and when Dinic's additional complexity is not warranted.\n\nPrefer **Dinic's algorithm** for very dense graphs or performance-critical applications.",
};
