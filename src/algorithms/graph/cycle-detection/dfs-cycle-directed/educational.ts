import type { EducationalContent } from "@/types";

export const dfsCycleDirectedEducational: EducationalContent = {
  overview:
    "**DFS Cycle Detection (Directed Graph)** determines whether a directed graph contains a cycle using depth-first search with **three-color marking**.\n\n" +
    "Each node is assigned one of three colors: **white** (unvisited), **gray** (currently in the DFS call stack), or **black** (fully processed). A cycle is detected when DFS encounters a gray node — meaning there is a path from a node back to itself through the active recursion stack.",

  howItWorks:
    "1. Mark every node **white** (unvisited).\n" +
    "2. For each unvisited (white) node, start a DFS:\n" +
    "   * Color the node **gray** — it is now on the active stack.\n" +
    "   * Examine each outgoing edge to a neighbor:\n" +
    "     * If the neighbor is **gray** → **back edge detected → cycle exists**. Return `true`.\n" +
    "     * If the neighbor is **white** → recurse into it.\n" +
    "     * If the neighbor is **black** → already processed; skip it.\n" +
    "   * After exploring all neighbors, color the node **black** and pop it from the stack.\n" +
    "3. If DFS completes without finding a back edge, the graph is acyclic.\n\n" +
    "### Why Three Colors?\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    "    A((A)) -->|tree-edge| B((B))\n" +
    "    B((B)) -->|tree-edge| C((C))\n" +
    "    C((C)) -->|back-edge| B((B))\n" +
    "    style A fill:#6b7280,stroke:#4b5563\n" +
    "    style B fill:#f59e0b,stroke:#d97706\n" +
    "    style C fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "- **White (unvisited):** node has not been discovered\n" +
    "- **Gray (in-stack):** node is part of the current DFS path\n" +
    "- **Black (processed):** node and all its descendants have been fully explored\n\n" +
    "A two-color (visited/unvisited) approach would incorrectly flag cross-edges in directed graphs as cycles.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "Every vertex and every edge is visited exactly once during DFS traversal.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The color map requires `O(V)` space. The implicit call stack can reach `O(V)` depth in a linear chain.",

  bestAndWorstCase:
    "**Best case:** A back edge is found immediately on the first DFS path — the algorithm returns `true` early, visiting only a small portion of the graph.\n\n" +
    "**Worst case:** The graph is acyclic (a DAG). Every vertex and edge must be explored before concluding no cycle exists, giving full `O(V + E)` cost.",

  realWorldUses: [
    "**Build Systems:** Detecting circular dependencies in package managers (npm, Maven) where module A depends on B which depends back on A.",
    "**Compiler Optimization:** Verifying that control-flow graphs have no improper back edges that would break certain optimizations.",
    "**Deadlock Detection:** Identifying circular wait conditions in operating system resource allocation graphs.",
    "**Task Schedulers:** Ensuring a directed task dependency graph is a valid DAG before computing a topological execution order.",
    "**Database Transactions:** Detecting cycles in lock-wait graphs to identify and resolve deadlocks.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(V + E)` time — cannot be done faster for a general directed graph.",
      "The three-color scheme cleanly distinguishes back edges (cycles) from cross-edges and forward-edges unique to directed graphs.",
      "Works correctly on disconnected graphs by iterating over all white nodes as DFS roots.",
      "Naturally extended to produce the actual cycle path by recording the gray stack.",
    ],
    limitations: [
      "Recursive implementation risks stack overflow on very deep graphs — an iterative version with an explicit stack is preferred in production.",
      "The three-color logic does not apply to undirected graphs — a simpler parent-tracking approach is used there instead.",
      "Only detects the existence of a cycle, not its length or all cycles present.",
    ],
  },

  whenToUseIt:
    "Use **DFS Cycle Detection (Directed)** when you need to validate that a directed graph is a DAG — for example, before computing a topological sort, resolving dependency graphs, or scheduling tasks.\n\n" +
    "For **undirected graphs**, use the parent-tracking DFS variant instead — the gray/black distinction is unnecessary and the simpler two-color approach suffices.\n\n" +
    "For **large or frequently updated graphs**, **Union-Find cycle detection** offers near-constant-time edge queries and is preferred when you process edges incrementally.",
};
