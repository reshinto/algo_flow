import type { EducationalContent } from "@/types";

export const kosarajuSccEducational: EducationalContent = {
  overview:
    "**Kosaraju's Strongly Connected Components (SCC)** algorithm finds all maximal groups of mutually reachable nodes in a **directed** graph using two separate DFS passes.\n\nIts key insight is that running DFS on the **transposed graph** (all edges reversed) in reverse finish-time order naturally peels off one SCC at a time — without any low-link bookkeeping.",

  howItWorks:
    "**Pass 1 — Collect finish order:**\n" +
    "1. Run DFS on the original graph over all unvisited nodes.\n" +
    "2. When a node finishes (all its descendants are processed), push it onto a finish-order stack.\n\n" +
    "**Pass 2 — Discover SCCs on transposed graph:**\n" +
    "3. Build the **transposed graph** by reversing every edge.\n" +
    "4. Pop nodes from the finish-order stack (highest finish time first).\n" +
    "5. For each unvisited node, run DFS on the transposed graph — every node reachable forms one SCC.\n\n" +
    "### Why transposing works\n\n" +
    "If node `u` can reach node `v` in the original graph, `v` can reach `u` in the transposed graph. The node with the highest finish time is always the SCC root — so processing in reverse finish order guarantees that a second-pass DFS never escapes the current SCC.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- First DFS pass: `O(V + E)`\n" +
    "- Transposition: `O(V + E)`\n" +
    "- Second DFS pass: `O(V + E)`\n" +
    "- Total: `O(V + E)`\n\n" +
    "**Space Complexity: `O(V + E)`**\n\n" +
    "The transposed adjacency list requires `O(V + E)` space — more than Tarjan's `O(V)` — making Kosaraju slightly less memory-efficient.",

  bestAndWorstCase:
    "**Best case** is a graph with no edges — all nodes are trivially single-node SCCs found in `O(V)` time with no edges to process.\n\n" +
    "**Worst case** is a fully connected directed graph: both DFS passes examine all `V` nodes and `E` edges, but runtime stays `O(V + E)`.",

  realWorldUses: [
    "**Dependency resolution:** Finding circular dependencies in package managers or build systems.",
    "**Game theory:** Identifying equivalence classes in game state graphs.",
    "**Circuit analysis:** Detecting feedback loops in signal processing graphs.",
    "**Biology:** Finding groups of genes with mutual regulatory relationships.",
    "**Distributed systems:** Detecting cycles in distributed transaction graphs to prevent deadlock.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Conceptually simple — two standard DFS passes with a graph transposition step in between.",
      "Correct and complete: guaranteed to find every SCC in `O(V + E)`.",
      "Easier to reason about than Tarjan's low-link semantics.",
    ],
    limitations: [
      "Requires `O(V + E)` extra space for the transposed graph — Tarjan's SCC uses only `O(V)`.",
      "Two full DFS passes make constant factors larger than Tarjan's single pass.",
      "Recursive DFS can overflow the call stack on very large graphs without an iterative implementation.",
    ],
  },

  whenToUseIt:
    "Use **Kosaraju's SCC** when you prefer a simpler two-pass algorithm over Tarjan's low-link bookkeeping, and when the extra `O(E)` space for the transposed graph is acceptable.\n\nFor memory-constrained environments or when you need SCCs in reverse topological order naturally, prefer **Tarjan's SCC**. For undirected graphs, use plain **Connected Components** instead.",
};
