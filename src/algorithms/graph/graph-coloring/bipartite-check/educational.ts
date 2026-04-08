import type { EducationalContent } from "@/types";

export const bipartiteCheckEducational: EducationalContent = {
  overview:
    "**Bipartite Check** determines whether a graph can be 2-colored — that is, whether its nodes can be split into two groups where every edge connects a node from one group to a node in the other.\n\nThe algorithm uses **BFS** to attempt a 2-coloring. If a neighbor is found with the same color as the current node, a conflict is detected and the graph is declared non-bipartite.",

  howItWorks:
    "1. Assign color `0` to the starting node and add it to the BFS queue.\n" +
    "2. For each dequeued node with color `c`, examine all its neighbors:\n" +
    "   - If a neighbor is **uncolored**, assign color `1 - c` and enqueue it.\n" +
    "   - If a neighbor already has color `c` (same as current), a **conflict** is found — the graph is not bipartite.\n" +
    "3. Repeat for all connected components.\n" +
    "4. If BFS completes without conflict, the graph is bipartite.\n\n" +
    "### Bipartite vs Non-Bipartite\n\n" +
    "```\n" +
    "Bipartite:     A — B — C — D     (even cycle, 2-colorable)\n" +
    "               |           |\n" +
    "               +-----------+\n\n" +
    "Not bipartite: A — B — C — A     (odd cycle, conflict at A)\n" +
    "```\n\n" +
    "A graph is bipartite **if and only if** it contains no odd-length cycles.\n\n" +
    "### BFS 2-Coloring on a Bipartite Graph\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    "  A((A:0)) --- B((B:1))\n" +
    "  A((A:0)) --- D((D:1))\n" +
    "  B((B:1)) --- C((C:0))\n" +
    "  D((D:1)) --- C((C:0))\n" +
    "  B((B:1)) --- E((E:0))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style C fill:#06b6d4,stroke:#0891b2\n" +
    "  style E fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Cyan nodes are color `0` (group 1), green nodes are color `1` (group 2). Every edge crosses between the two groups — no two adjacent nodes share a color, confirming bipartiteness.",

  timeAndSpaceComplexity:
    "**Time Complexity: O(V + E)**\n\n" +
    "- BFS visits every node once and examines every edge once.\n" +
    "- Handles disconnected graphs by restarting BFS from any unvisited node.\n\n" +
    "**Space Complexity: O(V)**\n\n" +
    "The coloring map and BFS queue each store at most `V` entries.",

  bestAndWorstCase:
    "**Best case:** The graph is bipartite with a simple structure — BFS completes in `O(V + E)` without conflicts.\n\n" +
    "**Worst case:** A non-bipartite graph where the odd cycle is discovered only after visiting almost all nodes — still `O(V + E)`, but the algorithm terminates early as soon as a conflict is found.",

  realWorldUses: [
    "**Matching problems:** Bipartite graphs model two-sided markets (jobs and workers, tasks and machines) where maximum matching algorithms apply.",
    "**Conflict scheduling:** Verifying that a set of tasks can be split into two non-conflicting groups.",
    "**Network design:** Checking whether a communication network has a two-tier hierarchy.",
    "**Compiler dependency analysis:** Detecting circular dependencies between two layers of modules.",
    "**Game theory:** Identifying zero-sum game structures representable as bipartite graphs.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Linear time `O(V + E)` — optimal for graph property checking.",
      "Handles disconnected graphs correctly by iterating over all unvisited nodes.",
      "Produces a valid 2-coloring as a byproduct when the graph is bipartite.",
    ],
    limitations: [
      "Only solves 2-coloring — cannot determine the chromatic number for general graphs.",
      "Does not identify which specific odd cycle caused a non-bipartite result.",
      "Assumes an undirected graph; directed graphs require different bipartiteness definitions.",
    ],
  },

  whenToUseIt:
    "Use **Bipartite Check** whenever you need to verify that a graph is two-sided before applying bipartite-specific algorithms like Hungarian matching or König's theorem.\n\nIf the graph is confirmed bipartite, you can safely apply max bipartite matching, stable matching, or network flow reductions that assume a two-partition structure.",
};
