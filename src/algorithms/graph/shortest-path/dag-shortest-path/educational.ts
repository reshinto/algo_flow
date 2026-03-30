import type { EducationalContent } from "@/types";

export const dagShortestPathEducational: EducationalContent = {
  overview:
    "**DAG Shortest Path** finds the shortest path from a source node to all reachable nodes in a **Directed Acyclic Graph** — a graph with directed edges and no cycles.\n\nBecause a DAG has a topological ordering (a linear sequence where every edge goes forward), we can process nodes exactly once in that order and relax edges greedily. This avoids the priority queue overhead of Dijkstra's algorithm and handles **negative edge weights** safely, achieving `O(V + E)` time.",

  howItWorks:
    "1. Initialize all distances to `Infinity`, except the source node which gets distance `0`.\n" +
    "2. **Topological Sort:** Run a DFS across all nodes, appending each node to the front of the order after all its descendants are visited. This produces a valid processing sequence.\n" +
    "3. **Edge Relaxation in Topological Order:** For each node `u` in topological order:\n" +
    "   * If `distance(u)` is still `Infinity`, skip it — it is unreachable from the source.\n" +
    "   * For each outgoing edge `u → v` with weight `w`, compute `tentative = distance(u) + w`.\n" +
    "   * If `tentative < distance(v)`, update `distance(v) = tentative`.\n" +
    "4. After processing all nodes, `distances` holds the shortest path cost from the source to every reachable node.\n\n" +
    "### Why topological order enables one-pass relaxation\n\n" +
    "Because the graph is acyclic, once a node `u` is processed in topological order, no later node can offer a shorter path back to `u`. This guarantees that when we relax `u`'s edges, `distance(u)` is already finalized.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Topological sort via DFS visits each vertex and edge once: `O(V + E)`.\n" +
    "- Edge relaxation in topological order also visits each vertex and edge once: `O(V + E)`.\n" +
    "- Combined: `O(V + E)` — strictly faster than Dijkstra's `O((V + E) log V)`.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The distances table, visited set, and topological order list each hold at most `V` entries. The DFS call stack depth is at most `V` in the worst case.",

  bestAndWorstCase:
    "**Best case:** The source node has all other nodes reachable via a linear chain. The algorithm performs `V − 1` relaxations, one per edge, completing in `O(V)` time for a sparse graph.\n\n" +
    "**Worst case:** A dense DAG where every pair of nodes is connected. With `E ≈ V(V−1)/2` edges, the relaxation phase takes `O(V²)`. However, unlike Dijkstra, no priority queue is involved, so the constant factor is smaller. The algorithm also handles negative weights, which Dijkstra cannot.",

  realWorldUses: [
    "**Build systems and task schedulers:** Finding the critical path (longest path, by negating weights) in a dependency graph to determine minimum project completion time.",
    "**Compiler optimization:** Scheduling instructions in a basic block where data dependencies form a DAG, minimizing pipeline stalls.",
    "**Financial modeling:** Computing minimum-cost transformations in acyclic state machines, such as currency conversion pipelines.",
    "**Event-driven simulations:** Processing causally ordered events in simulations where future events depend on completed past events.",
    "**PERT/CPM project management:** Calculating earliest and latest start times for project activities with precedence constraints.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(V + E)` time — faster than Dijkstra for graphs that happen to be acyclic.",
      "Correctly handles negative edge weights, unlike Dijkstra's algorithm.",
      "Simple implementation: DFS-based topological sort followed by a single linear sweep.",
    ],
    limitations: [
      "Only applicable to directed acyclic graphs — fails on graphs with cycles.",
      "Requires knowing all node IDs upfront to build the topological order.",
      "Cannot be used for undirected graphs, which always contain implicit cycles.",
    ],
  },

  whenToUseIt:
    "Use **DAG Shortest Path** when your graph is a directed acyclic graph and you need shortest paths from a single source. It is the optimal choice for task scheduling, build dependency graphs, and any domain where a natural topological ordering exists.\n\nChoose **Dijkstra's algorithm** when the graph may contain cycles and all edge weights are non-negative. Choose **Bellman-Ford** when the graph has cycles and may contain negative edge weights.",
};
