import type { EducationalContent } from "@/types";

export const bfsEducational: EducationalContent = {
  overview:
    "**Breadth-First Search (BFS)** is a foundational graph traversal algorithm that explores all vertices at the immediate present depth level entirely before moving outward to adjacent vertices at the next depth level.\n\nIt utilizes a **Queue (FIFO)** data structure to logically retain track of which exact node requires visitation next, rigidly ensuring that all nodes are verified explicitly in hierarchical order of their physical distance from the root starting node.",

  howItWorks:
    "1. Start at the chosen source node and permanently mark it sequentially as **visited**.\n" +
    "2. Push the root node sequentially into an active queue array.\n" +
    "3. While the live Queue is not absolutely empty:\n" +
    "   * Immediately remove the *first* front node off the queue *(dequeue)*.\n" +
    "   * Register a visit upon the newly dequeued target.\n" +
    "   * Parse every single unvisited neighbor connected to this dequeued node.\n" +
    "   * Mark the neighbors as visited and append them to the trailing back of the queue.\n" +
    "4. Repeat cleanly until the queue is completely drained.\n\n" +
    "### Visualizing Layer Expansion\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    A((A)) --> B((B))\n" +
    "    A --> C((C))\n" +
    "    B --> D((D))\n" +
    "    C --> E((E))\n" +
    "    D --> F((F))\n" +
    "    \n" +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style B fill:#3b82f6,stroke:#2563eb\n" +
    "    style C fill:#3b82f6,stroke:#2563eb\n" +
    "    style D fill:#6366f1,stroke:#4f46e5\n" +
    "    style E fill:#6366f1,stroke:#4f46e5\n" +
    "```\n\n" +
    "- **Level 1 (Cyan):** Node `A`\n" +
    "- **Level 2 (Blue):** Nodes `B`, `C`\n" +
    "- **Level 3 (Indigo):** Nodes `D`, `E`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- **Best / Average / Worst Case:** The traversal engine mandates examining every single vertex `V` and systematically indexing every respective edge `E` reachable from the root. Regardless of topological maps, performance yields predictably at `O(V + E)`.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The required active tracking Queue and the static Visited Array can each theoretically balloon to hold up to absolute maximum `V` vertices simultaneously in the worst-case structural scenario (e.g. a wide star-graph layout).",

  bestAndWorstCase:
    "**Best case** persistently requires fixed `O(V + E)` elapsed time because strict BFS logic forces comprehensive exploration of all reachable structural parameters. Even if your search target resolves favorably early, the fundamental algorithm class scales universally identical.\n\n" +
    "**Worst case** structural degradation materializes explicitly when resolving wildly interconnected dense topologies or if the target requested node is literally the final indexed vertex. In entirely saturated mathematical graphs, `E = V(V-1)/2`, artificially forcing the raw temporal complexity overhead into quadratic `O(V²)`.",

  realWorldUses: [
    "**GPS Telemetry:** Resolving the definitive shortest unweighted road topography maps for literal driving navigation hops.",
    "**Social Network Maps:** Uncovering granular generic 'degrees of separation' linkages between separated network users.",
    "**Web Crawling Scripts:** Systematically traversing arbitrary HTTP document hyperlinks cascading cleanly outward level by level from the root URL.",
    "**P2P Network Broadcasting:** Propagating secure validation protocol handshakes cleanly among all immediate peer nodes level-by-layer.",
    "**Algorithmic GC Scavengers:** Bootstrapping the initial mark-phase mapping arrays utilized universally in V8/JVM background runtime garbage collectors."
  ],

  strengthsAndLimitations: {
    strengths: [
      "Mathematically natively guarantees finding the absolute shortest logical path across explicitly unweighted graphic topologies.",
      "Strict logical completeness guarantees locating the termination node safely if any singular permutation mathematically exists mapping to it.",
      "Sprawls homogeneously strictly level by level yielding mathematically identical proximity boundaries globally."
    ],
    limitations: [
      "Drastic `O(V)` auxiliary storage footprint routinely forces massive out-of-memory structural failures when analyzing billion-node infinite domains.",
      "Utterly crippled and practically useless when executing atop mathematically weighted topographies (Requires Dijkstra).",
      "Expends huge processing payload scanning massive broad networks fully before traveling deep toward known centralized targets."
    ]
  },

  whenToUseIt:
    "Trigger **Breadth-First Search** deployment specifically when isolated logical distance directly determines target hierarchy significance, or strictly when guaranteeing the universally shortest path on an un-weighted mapping matters flawlessly. \n\nConversely, pivot decisively off BFS in favor of **Depth-First Search (DFS)** whenever systemic memory constraints threaten payload caps, or pivot explicitly to **Dijkstra** if mapped nodal edges begin requiring dynamic integer weights."
};
