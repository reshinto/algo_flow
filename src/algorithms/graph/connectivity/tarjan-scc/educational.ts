import type { EducationalContent } from "@/types";

export const tarjanSccEducational: EducationalContent = {
  overview:
    "**Tarjan's Strongly Connected Components (SCC)** algorithm finds all maximal groups of nodes in a **directed** graph where every node can reach every other node within the group — in a single DFS pass.\n\nIt maintains a **discovery timestamp** and a **low-link value** per node, plus an explicit stack, to identify SCC roots on the fly as the DFS unwinds.",

  howItWorks:
    "1. Assign each node a **discovery time** (order visited) and initialize its **low-link** to the same value.\n" +
    "2. Push the node onto the **SCC stack** and mark it as on-stack.\n" +
    "3. For each unvisited neighbor, recurse and then update the current node's low-link: `low[u] = min(low[u], low[v])`.\n" +
    "4. For neighbors already on the stack (back edges), update: `low[u] = min(low[u], disc[v])`.\n" +
    "5. When `low[u] == disc[u]`, the current node is an **SCC root** — pop nodes off the stack until reaching `u` to collect the SCC.\n\n" +
    "### Low-Link Value Intuition\n\n" +
    "The low-link `low[u]` tracks the smallest discovery time reachable from the subtree rooted at `u` via back edges. When `low[u]` equals `disc[u]`, no node in `u`'s subtree can escape to an ancestor — making `u` the root of a complete SCC.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Each node is visited exactly once and each edge is examined exactly once during the single DFS pass.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The discovery time map, low-link map, on-stack map, and explicit stack each hold at most `V` entries.",

  bestAndWorstCase:
    "**Best case** is a graph with no edges — each node is trivially its own SCC, discovered in `O(V)` time.\n\n" +
    "**Worst case** is a fully connected directed graph where the stack holds all nodes before any SCC is popped, but time complexity remains `O(V + E)`.",

  realWorldUses: [
    "**Compiler optimizations:** Detecting mutually recursive function call cycles for inlining or dead-code elimination.",
    "**Deadlock detection:** Finding cycles in resource-allocation graphs in operating systems.",
    "**Web link analysis:** Identifying clusters of pages that all link to each other (e.g., Wikipedia categories).",
    "**Social network analysis:** Finding tight-knit groups where everyone follows everyone else.",
    "**Model checking:** Verifying safety properties in state-transition systems by identifying cyclic states.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single DFS pass — finds all SCCs in `O(V + E)` with no preprocessing.",
      "Works in-place with minimal bookkeeping: just discovery time, low-link, and a stack.",
      "Produces SCCs in **reverse topological order** of the condensation DAG.",
    ],
    limitations: [
      "Only works on **directed** graphs — for undirected graphs, use Connected Components.",
      "Recursive DFS can cause stack overflow on very deep graphs; an iterative version is needed for production use.",
      "Low-link semantics are subtle and easy to implement incorrectly, especially for cross-edges vs. back-edges.",
    ],
  },

  whenToUseIt:
    "Use **Tarjan's SCC** when you need all strongly connected components of a **directed** graph in a single efficient pass, or when you need SCCs in reverse topological order (e.g., for condensation DAG construction).\n\nFor an alternative with similar complexity but a simpler two-pass structure, consider **Kosaraju's SCC**. For undirected graphs, use plain **Connected Components** instead.",
};
