import type { EducationalContent } from "@/types";

export const dijkstraEducational: EducationalContent = {
  overview:
    "**Dijkstra's algorithm** finds the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights.\n\nIt uses a **min-priority queue** to always process the node with the currently known smallest distance, greedily expanding outward from the source and relaxing edges as cheaper paths are discovered.",

  howItWorks:
    "1. Assign distance `0` to the start node and `Infinity` to every other node.\n" +
    "2. Add the start node to a min-priority queue with priority `0`.\n" +
    "3. While the queue is not empty:\n" +
    "   * Dequeue the node with the smallest tentative distance.\n" +
    "   * Skip it if it has already been finalized (visited).\n" +
    "   * Mark it as finalized.\n" +
    "   * For each neighbor, compute `tentativeDist = currentDist + edgeWeight`.\n" +
    "   * If `tentativeDist < knownDist[neighbor]`, update the distance and re-enqueue.\n" +
    "4. When the queue empties, `distances` holds the shortest path cost from the source to every reachable node.\n\n" +
    "### Why the greedy choice is safe\n\n" +
    "Because all edge weights are non-negative, once a node is dequeued with distance `d`, no future path can improve on `d`. This invariant lets Dijkstra finalize distances one node at a time without backtracking.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O((V + E) log V)`**\n\n" +
    "- Each vertex is dequeued at most once: `O(V log V)`.\n" +
    "- Each edge is relaxed at most once, triggering at most one priority queue insertion: `O(E log V)`.\n" +
    "- Combined: `O((V + E) log V)`.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The distances table, visited set, and priority queue each hold at most `V` entries.",

  bestAndWorstCase:
    "**Best case:** The target node is immediately adjacent to the source with the smallest edge weight. The queue empties after a single dequeue, giving effectively `O(E log V)` where `E` is small.\n\n" +
    "**Worst case:** A dense graph where every pair of nodes is connected. With `E ≈ V²` edges, the complexity approaches `O(V² log V)`. For very dense graphs, a simple array-based priority queue achieves `O(V²)`, which can outperform the heap variant.",

  realWorldUses: [
    "**GPS and mapping apps:** Finding the fastest driving route between two points on a road network with weighted travel times.",
    "**Network routing protocols:** OSPF (Open Shortest Path First) uses Dijkstra to calculate least-cost paths between routers.",
    "**Airline route planning:** Minimizing total flight duration or layover cost across a hub-and-spoke network.",
    "**Game pathfinding:** Computing movement costs across weighted tile maps where terrain affects speed.",
    "**Telecommunications:** Routing data packets through a network with latency-weighted edges.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Guarantees the globally optimal shortest path for graphs with non-negative weights.",
      "Efficient on sparse graphs when a binary heap is used as the priority queue.",
      "Produces shortest distances to all nodes in one pass, not just a single target.",
    ],
    limitations: [
      "Fails to produce correct results when the graph contains negative edge weights — use Bellman-Ford instead.",
      "Priority queue overhead makes it slower than BFS for unweighted graphs.",
      "Does not reconstruct the actual path without an additional predecessor map.",
    ],
  },

  whenToUseIt:
    "Use **Dijkstra's algorithm** when you need the shortest weighted path in a graph and all edge weights are non-negative. It is the standard choice for road networks, routing protocols, and any domain where traversal cost varies per edge.\n\nAvoid it for graphs with **negative edge weights** (use Bellman-Ford) or when you only need **shortest hop count** in an unweighted graph (use BFS, which is simpler and faster).",
};
