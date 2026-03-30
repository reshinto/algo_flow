import type { EducationalContent } from "@/types";

export const dfsCycleUndirectedEducational: EducationalContent = {
  overview:
    "**DFS Cycle Detection (Undirected Graph)** determines whether an undirected graph contains a cycle using depth-first search with **parent tracking**.\n\n" +
    "In an undirected graph, every edge appears in both directions, so DFS will always see the edge back to the node it came from. The key insight is that a back edge to any node *other than the direct parent* indicates a cycle. A simple visited/unvisited boolean per node is sufficient — no three-color scheme is needed.",

  howItWorks:
    "1. Maintain a `visitedSet` and, for each DFS call, track the `parentNodeId` (the node you came from).\n" +
    "2. For each unvisited node, start a DFS:\n" +
    "   * Mark the current node as visited.\n" +
    "   * For each neighbor:\n" +
    "     * If the neighbor is **unvisited** → recurse into it with the current node as its parent.\n" +
    "     * If the neighbor is **visited and is not the parent** → **back edge detected → cycle exists**.\n" +
    "     * If the neighbor is the direct parent → skip (it is the undirected reverse of the edge we arrived on).\n" +
    "3. If DFS completes without finding a back edge, the graph is acyclic.\n\n" +
    "### Why Parent Tracking?\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    "    A((A)) --- B((B))\n" +
    "    B((B)) --- C((C))\n" +
    "    C((C)) --- A((A))\n" +
    "    style A fill:#10b981,stroke:#059669\n" +
    "    style B fill:#10b981,stroke:#059669\n" +
    "    style C fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "When DFS reaches `C`, it sees neighbor `A` which is already visited and is not `C`'s parent (`B`). This back edge `C → A` confirms the cycle `A — B — C — A`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "Every vertex and every edge is examined exactly once during the DFS.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The visited set and the implicit call stack each require at most `O(V)` space in a linear chain graph.",

  bestAndWorstCase:
    "**Best case:** A back edge is encountered early in the very first DFS path, allowing the algorithm to return `true` after visiting only a small subgraph.\n\n" +
    "**Worst case:** The graph is a tree (acyclic). Every vertex and edge must be visited in full before concluding no cycle exists, giving `O(V + E)` cost.",

  realWorldUses: [
    "**Network Topology Validation:** Ensuring that a physical or logical network has no redundant loops that could cause broadcast storms.",
    "**Circuit Analysis:** Detecting feedback loops in analog or digital circuit graphs before simulation.",
    "**Geographic Maps:** Verifying that a road network modeled as an undirected graph does not contain unintended routing cycles.",
    "**Spanning Tree Construction:** Confirming the input graph is a valid tree before using it as a spanning structure.",
    "**Social Graph Integrity:** Validating that peer relationship graphs in specific undirected social models remain acyclic.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simpler than the directed variant — only a boolean visited set and parent tracking are needed; no three-color bookkeeping.",
      "Optimal `O(V + E)` time and `O(V)` space.",
      "Works correctly on disconnected graphs by iterating all unvisited nodes as DFS roots.",
      "The parent node can be passed as a parameter rather than stored separately, keeping the algorithm stateless.",
    ],
    limitations: [
      "Does not apply to **directed graphs** — the parent-tracking shortcut breaks because edges are not symmetric.",
      "Recursive implementation can overflow the call stack for very deep graphs; an iterative approach with an explicit stack is safer in production.",
      "Only detects whether any cycle exists — does not enumerate all cycles or return cycle nodes.",
    ],
  },

  whenToUseIt:
    "Use **DFS Cycle Detection (Undirected)** when you need a simple, fast cycle check on an undirected graph — for example, to verify that a graph is a valid tree (connected and acyclic) before running spanning tree algorithms.\n\n" +
    "For **directed graphs**, use the three-color DFS variant instead — the parent-tracking approach incorrectly classifies non-cycle edges in directed settings.\n\n" +
    "For **dynamic graphs** where edges are added incrementally, **Union-Find** is preferred because it can detect a cycle in near-constant time per edge without re-running a full DFS.",
};
