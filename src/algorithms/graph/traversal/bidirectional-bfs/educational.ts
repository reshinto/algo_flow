import type { EducationalContent } from "@/types";

export const bidirectionalBfsEducational: EducationalContent = {
  overview:
    "**Bidirectional BFS** is an optimized shortest-path algorithm that runs two simultaneous BFS traversals — one forward from the **source node** and one backward from the **target node** — stopping as soon as their frontiers intersect.\n\nBy meeting in the middle, Bidirectional BFS dramatically reduces the number of nodes explored compared to standard BFS. Where a regular BFS might expand a frontier of radius `d`, Bidirectional BFS only needs to expand two frontiers of radius `d/2`, cutting the explored search space from `O(b^d)` to roughly `O(b^(d/2))`.",

  howItWorks:
    "1. Initialize two queues: one from the **start node** (forward frontier) and one from the **target node** (backward frontier).\n" +
    "2. Mark both start and target as visited in their respective visited maps.\n" +
    "3. Alternately expand one level from each frontier:\n" +
    "   * Dequeue the front node from the forward queue and explore its neighbors.\n" +
    "   * For each unvisited neighbor, record its parent and enqueue it.\n" +
    "   * If the neighbor already exists in the **backward** visited set — the frontiers have **met**.\n" +
    "   * Repeat the symmetric process from the backward queue.\n" +
    "4. When a meeting node is found, reconstruct the full path by tracing parent pointers through both visited maps.\n" +
    "5. If both queues drain with no intersection, no path exists.\n\n" +
    "### Frontier Intersection\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    "    A((A)) -->|Forward| B((B))\n" +
    "    B -->|Forward| C((C ★))\n" +
    "    F((F)) -->|Backward| E((E))\n" +
    "    E -->|Backward| C\n" +
    "    \n" +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style B fill:#3b82f6,stroke:#2563eb\n" +
    "    style C fill:#10b981,stroke:#059669\n" +
    "    style E fill:#f59e0b,stroke:#d97706\n" +
    "    style F fill:#ef4444,stroke:#dc2626\n" +
    "```\n\n" +
    "- **Cyan (A):** Forward source\n" +
    "- **Blue (B):** Forward frontier expansion\n" +
    "- **Green (C ★):** Meeting node — frontiers intersect here\n" +
    "- **Amber (E):** Backward frontier expansion\n" +
    "- **Red (F):** Backward target",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "| Case | Complexity | Notes |\n" +
    "| ---- | ---------- | ----- |\n" +
    "| Best | `O(b^(d/2))` | Frontiers meet exactly halfway |\n" +
    "| Average | `O(b^(d/2))` | Typical improvement over single BFS |\n" +
    "| Worst | `O(V + E)` | Degrades to full graph scan when target is unreachable |\n\n" +
    "Where `b` is the branching factor (average neighbors per node) and `d` is the shortest path length.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "Two visited maps and two queues each hold at most `V` entries, yielding linear space overall.",

  bestAndWorstCase:
    "**Best case** occurs when the graph has a high branching factor and the target is reachable. Expanding only `d/2` levels from each end instead of `d` levels from one end delivers an exponential speedup — on a branching factor of 10 and path length 6, regular BFS explores ~1,000,000 nodes vs. ~2,000 for Bidirectional BFS.\n\n" +
    "**Worst case** materializes when the target is unreachable. Both frontiers must exhaust all reachable nodes before concluding no path exists, matching standard BFS at `O(V + E)`. Performance also degrades on sparse graphs with low branching factors where the frontier radius saving is minimal.",

  realWorldUses: [
    "**Navigation Systems:** Finding driving routes in road networks where both the origin and destination are known in advance, allowing symmetric expansion.",
    "**Social Network Shortest Paths:** Computing degrees of separation between two specific users — both users expand their social rings simultaneously.",
    "**Game AI Pathfinding:** Meeting in the middle in large game maps where the start and goal are fixed, reducing CPU cycles for NPC navigation.",
    "**Protein Interaction Networks:** Tracing interaction chains between two specific proteins in large biological databases.",
    "**Network Routing:** Discovering efficient paths in telecommunications networks with known source and destination routers.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Exponentially reduces explored nodes compared to standard BFS on graphs with high branching factors — the key advantage is `O(b^(d/2))` vs `O(b^d)`.",
      "Guarantees the shortest path on unweighted graphs, just like standard BFS.",
      "Highly effective when both source and target are known ahead of time, which is common in navigation and social network problems.",
    ],
    limitations: [
      "Requires the graph to be undirected, or that backward edges are efficiently traversable — applying to directed graphs is non-trivial.",
      "More complex to implement correctly than standard BFS; path reconstruction requires parent tracking in two separate visited maps.",
      "Offers minimal benefit on linear chains or graphs with very low branching factors where `b^(d/2)` ≈ `b^d`.",
    ],
  },

  whenToUseIt:
    "Choose **Bidirectional BFS** when you know both the source and the target in advance, the graph is undirected (or you can reverse its edges), and the branching factor is moderate to high. It is particularly powerful in large social networks, road graphs, and game maps where a single-source BFS would explore too many nodes.\n\nAvoid Bidirectional BFS in favor of **standard BFS** when only the source is known (all-pairs or single-source traversal). Switch to **Dijkstra** or **A\\*** when edges carry weights — unweighted meeting-in-the-middle does not preserve optimality on weighted graphs.",
};
