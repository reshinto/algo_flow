import type { EducationalContent } from "@/types";

export const articulationPointsEducational: EducationalContent = {
  overview:
    "An **Articulation Point** (also called a cut vertex) is a node in an undirected graph whose removal disconnects the graph — or increases the number of connected components.\n\nThe algorithm uses a single DFS pass with **discovery timestamps** and **low-link values** to identify every such critical node in `O(V + E)` time, using the same core insight as bridge finding.",

  howItWorks:
    "1. Assign each node a **discovery time** and initialize its **low-link** to the same value.\n" +
    "2. For each unvisited neighbor (tree edge), recurse and update: `low[u] = min(low[u], low[v])`.\n" +
    "3. For already-visited neighbors that are **not the parent** (back edges), update: `low[u] = min(low[u], disc[v])`.\n" +
    "4. After processing each child `v`, apply **two rules** to detect articulation points:\n" +
    "   * **Root rule:** if `u` is the DFS root and has more than one child, `u` is an articulation point.\n" +
    "   * **Non-root rule:** if `u` is not the root and `low[v] >= disc[u]`, then `u` is an articulation point — removing `u` would disconnect `v`'s subtree.\n\n" +
    "### Root vs Non-Root Cases\n\n" +
    "```\n" +
    "Non-root:  low[v] >= disc[u]  →  u is articulation point\n" +
    "Root:      childCount > 1     →  u is articulation point\n" +
    "```\n\n" +
    "The root case is special because the parent check doesn't apply — the root has no parent to provide an alternative path.\n\n" +
    "### Example Graph with Articulation Points\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((A)) --- B((B))\n" +
    "  B((B)) --- C((C))\n" +
    "  C((C)) --- D((D))\n" +
    "  D((D)) --- E((E))\n" +
    "  A((A)) --- C((C))\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    "  style A fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Nodes **B** and **D** are articulation points (amber). Removing B disconnects the path from A/C to D/E; removing D isolates E. Nodes A, C, E (green) are not articulation points.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Each node is visited exactly once and each edge is examined exactly once during the DFS.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The discovery time map, low-link map, and recursion stack each hold at most `V` entries.",

  bestAndWorstCase:
    "**Best case** is a graph with no articulation points (e.g., any 2-connected graph like a cycle) — the DFS runs in `O(V + E)` and returns an empty result.\n\n" +
    "**Worst case** is a path graph (linear chain) where every internal node is an articulation point — still `O(V + E)` but `V - 2` nodes are reported.",

  realWorldUses: [
    "**Network reliability:** Identifying single-point-of-failure routers or switches in a network topology.",
    "**Social network analysis:** Finding key individuals whose removal would fragment a community.",
    "**Infrastructure planning:** Identifying critical hubs in transportation or utility networks.",
    "**Bioinformatics:** Finding essential proteins in protein interaction networks.",
    "**Database sharding:** Identifying nodes that separate clusters for optimal partitioning.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single DFS pass — finds all articulation points in optimal `O(V + E)` time.",
      "Closely related to bridge finding — both can be computed in the same DFS pass.",
      "Works correctly on disconnected graphs by iterating over all unvisited nodes.",
    ],
    limitations: [
      "Only works on **undirected** graphs — the concept of articulation points does not directly transfer to directed graphs.",
      "Recursive DFS can overflow the call stack on very deep graphs without an iterative implementation.",
      "The root case (two DFS children) is easy to forget and leads to subtle bugs.",
    ],
  },

  whenToUseIt:
    "Use **Articulation Points** when you need to find all critical nodes in an **undirected** graph whose removal would disconnect the network.\n\nFor critical **edges** rather than nodes, use **Bridge Finding** instead — they share the same low-link DFS framework. For directed graphs, the equivalent analysis requires computing **strongly connected components** with Tarjan's or Kosaraju's algorithm.",
};
