import type { EducationalContent } from "@/types";

export const primsEducational: EducationalContent = {
  overview:
    "**Prim's Algorithm** is a greedy algorithm that constructs a **Minimum Spanning Tree (MST)** by growing a single connected tree one edge at a time. Starting from any node, it always picks the cheapest edge that connects the current tree to a node not yet included.\n\nUnlike Kruskal's, which operates globally on sorted edges, Prim's works **locally** — it only ever considers edges adjacent to the nodes already in the MST.",

  howItWorks:
    "1. Mark the start node as part of the MST.\n" +
    "2. Add all edges from the start node to a **min-priority queue** (ordered by weight).\n" +
    "3. While the priority queue is not empty:\n" +
    "   * Dequeue the minimum-weight edge `(source → target, weight)`.\n" +
    "   * If `target` is already in the MST, skip (it would create a cycle).\n" +
    "   * Otherwise, add `target` to the MST and record the edge.\n" +
    "   * Enqueue all edges from `target` to nodes not yet in the MST.\n" +
    "4. Repeat until all nodes are in the MST.\n\n" +
    "### Greedy Expansion Visualization\n\n" +
    "```\n" +
    "MST = {A}         → edges from A: (A-B,4), (A-C,2)\n" +
    "MST = {A, C}      → cheapest: (A-C,2) → add C\n" +
    "MST = {A, C, B}   → cheapest: (B-C,1)? already done; next: ...\n" +
    "```\n\n" +
    "At every step the algorithm is locally optimal — it picks the smallest available bridge into unexplored territory.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O((V + E) log V)`**\n\n" +
    "- Each of the `V` nodes is dequeued once: `O(V log V)` for heap operations.\n" +
    "- Each of the `E` edges is examined and potentially enqueued once: `O(E log V)`.\n" +
    "- Combined: `O((V + E) log V)`.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The `inMstSet` and the priority queue together hold at most `O(V + E)` entries, but the MST result itself is `O(V)` edges.",

  bestAndWorstCase:
    "**Best case** on a sparse graph (`E ≈ V`): the priority queue stays small and total work is `O(V log V)`.\n\n" +
    "**Worst case** on a complete graph (`E = V(V−1)/2`): every edge is enqueued, giving `O(V² log V)`. Using a Fibonacci heap reduces this to `O(E + V log V)` but is rarely implemented in practice.",

  realWorldUses: [
    "**Telecommunications:** Laying out cable or fiber networks to connect all nodes with minimum total cable length.",
    "**Game map generation:** Procedurally connecting dungeon rooms or map regions with minimum-cost corridors.",
    "**Approximation algorithms:** Prim's MST forms the backbone of the 2-approximation for the Metric TSP problem.",
    "**Power grid design:** Designing electrical grids that connect all substations at minimum infrastructure cost.",
    "**Hierarchical clustering:** Building dendrograms by iteratively merging the closest unconnected data points.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "More efficient than Kruskal's on dense graphs — examines fewer edges overall.",
      "Produces a single connected tree (not a forest) — always results in a fully connected MST if the graph is connected.",
      "Works well with adjacency-list representations and priority queues.",
      "Easy to adapt to produce the MST edges in the order they were added.",
    ],
    limitations: [
      "Less efficient than Kruskal's on sparse graphs where sorting edges is cheaper.",
      "Requires the graph to be connected — does not naturally handle disconnected graphs (would need to restart from each unvisited component).",
      "Priority queue operations dominate performance; a naive array-based queue gives `O(V²)` which is unacceptable for large graphs.",
    ],
  },

  whenToUseIt:
    "Choose **Prim's** when the graph is **dense** (many edges relative to nodes) and you want to grow the MST incrementally from a specific root. It is also preferred when you receive edges online (as the tree grows) rather than all at once.\n\nPrefer **Kruskal's** for sparse graphs or when edges are pre-sorted. Use **Borůvka's** when you need a parallel MST construction with `O(log V)` rounds.",
};
