import type { EducationalContent } from "@/types";

export const connectedComponentsEducational: EducationalContent = {
  overview:
    "**Connected Components** is a fundamental graph algorithm that partitions an undirected graph into its maximally connected subgraphs — groups of nodes where every node can reach every other node within the group.\n\nUsing a simple **BFS sweep** across all unvisited nodes, it identifies every isolated cluster in a single linear pass, making it the go-to algorithm for understanding the structure of disconnected graphs.",

  howItWorks:
    "1. Maintain a global **visited set** so each node is processed at most once.\n" +
    "2. Iterate through every node in the graph.\n" +
    "3. When an **unvisited node** is found, start a BFS from it:\n" +
    "   * Add the start node to the queue and mark it visited.\n" +
    "   * Dequeue nodes one at a time, visit them, and enqueue unvisited neighbors.\n" +
    "   * All nodes reachable from the start form one **component**.\n" +
    "4. Record that component, increment the component counter, and continue scanning for the next unvisited node.\n" +
    "5. Repeat until all nodes have been assigned to a component.\n\n" +
    "### Component Discovery Example\n\n" +
    "```\n" +
    "Graph:  A—B—C   D—E   F—G—H\n" +
    "        Component 0  Component 1  Component 2\n" +
    "```\n\n" +
    "A BFS starting at A discovers {A, B, C}. Then D starts component {D, E}. Finally F starts {F, G, H}.\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    "  A((A)) --- B((B))\n" +
    "  B((B)) --- C((C))\n" +
    "  D((D)) --- E((E))\n" +
    "  F((F)) --- G((G))\n" +
    "  G((G)) --- H((H))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#06b6d4,stroke:#0891b2\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "  style F fill:#06b6d4,stroke:#0891b2\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "  style H fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Cyan nodes are the BFS start of each component. Green nodes are discovered within that component. The three clusters are fully disconnected from one another.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Every vertex is enqueued and dequeued exactly once: `O(V)`.\n" +
    "- Every edge is examined exactly once (twice for undirected): `O(E)`.\n" +
    "- Total is always `O(V + E)` regardless of graph shape.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The visited set, the BFS queue, and the component lists together hold at most `V` entries at any time.",

  bestAndWorstCase:
    "**Best case** is a fully connected graph — a single BFS sweep discovers all `V` nodes in one component in `O(V + E)` time.\n\n" +
    "**Worst case** is `V` isolated nodes with no edges — the outer loop runs `V` times, each starting a trivial BFS, but the total work is still `O(V)` since there are no edges to traverse.",

  realWorldUses: [
    "**Network analysis:** Identifying isolated subnetworks or disconnected clusters in communication graphs.",
    "**Image processing:** Labeling connected regions of pixels (blob detection, flood fill).",
    "**Social networks:** Finding communities or groups of users with no connection to the rest of the network.",
    "**Circuit design:** Detecting disconnected components on a PCB layout.",
    "**Game maps:** Determining which areas of a map are reachable from a starting point.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Linear time `O(V + E)` — optimal for this problem class.",
      "Simple to implement using BFS or DFS with a visited set.",
      "Works directly on the adjacency list without any preprocessing.",
    ],
    limitations: [
      "Only works on **undirected** graphs — for directed graphs, use Tarjan's or Kosaraju's SCC algorithm.",
      "Does not handle dynamic graphs efficiently — adding an edge may merge two components, requiring a rerun or a Union-Find structure.",
      "Provides no information about the strength or density of connections within a component.",
    ],
  },

  whenToUseIt:
    "Use **Connected Components** when you need to identify all isolated clusters in an **undirected** graph and your graph is static (not changing during the query).\n\nFor **dynamic** graphs where edges are added incrementally, prefer **Union-Find (Disjoint Set Union)** for near-constant-time component merges. For **directed** graphs, use **Tarjan's SCC** or **Kosaraju's SCC** instead.",
};
