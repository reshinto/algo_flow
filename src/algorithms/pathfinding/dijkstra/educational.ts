import type { EducationalContent } from "@/types";

export const dijkstraEducational: EducationalContent = {
  overview:
    "**Dijkstra's Algorithm** is the definitive graph search protocol solving the foundational 'single-source shortest path' problem across directed or undirected networks bearing exclusively non-negative mathematical weightings.\n\nInvented by Edsger W. Dijkstra in 1956, it greedily parses outward, utilizing a Priority Queue to continuously isolate the most mathematically 'affordable' node available, locking in its strict cheapest path before proceeding universally outward.",

  howItWorks:
    "1. For the starting node, forcibly assign a tentative structural distance of `0`. Assign `Infinity` globally to all remote others.\n" +
    "2. Add the start node to a live Priority Queue tracking unvisited terrain.\n" +
    "3. **Pop** the absolute computationally cheapest unvisited node directly off the Queue.\n" +
    "4. Iteratively scan all neighboring connected edges tethered to this current node.\n" +
    "5. Calculate the total tentative distance mathematically required passing through this vector.\n" +
    "6. If the newly calculated sum is mathematically smaller than the old recorded node boundary, rigidly **Overwrite** it.\n" +
    "7. Mark the host node irreversibly as *Closed*.\n" +
    "8. Repeat recursively until the absolute lowest destination node is reached.\n\n" +
    "### Priority Targeting Visualized\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    "    A((Start)) --\"Cost 5\"--> B((B))\n" +
    "    A --\"Cost 2\"--> C((C))\n" +
    "    C --\"Cost 1\"--> B\n" +
    "    B --\"Cost 10\"--> D((Target))\n" +
    "    C --\"Cost 8\"--> D\n" +
    "    \n" +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style C fill:#10b981,stroke:#059669\n" +
    "```\n\n" +
    "> *Instead of taking the direct `Cost 5` route to B, Dijkstra utilizes the Priority Queue to cleanly determine navigating through C takes only `2 + 1 = 3` total mathematical cost!*",

  timeAndSpaceComplexity:
    "**Time Complexity: `O((V + E) log V)`**\n\n" +
    "- Leveraging a structurally integrated Binary Heap Priority Queue gracefully executes pathing at `O((V + E) log V)`, where `V` signifies overall vertices and `E` defines mathematical edges.\n" +
    "- If implemented weakly using base naive un-indexed Arrays, raw latency dangerously cascades down to `O(V²)` forcing crippling sequential linear scans.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "Forces `O(V)` requirements natively to house the respective nested tracking structures (Global Distance Maps, Reversing Parent Logs, Closed Sets, and live Priority Queues).",

  bestAndWorstCase:
    "**Best case** surfaces elegantly when processing maps housing tightly clustered neighboring start/end hubs. The target natively forces rapid target confirmation triggering early termination, executing technically closer to `O(E)` practically regarding speed.\n\n" +
    "**Worst case** mathematically degrades heavily on networks where un-linked nodes mandate verifying millions of irrelevant mathematical nodes before exhausting search potential finding dead-ends on the literal final Queue pop.",

  realWorldUses: [
    "**Navigation Satellites (GPS):** Core structural blueprint underlying Map Routing applications parsing geometric terrain vectors mathematically.",
    "**Internet Topology (OSPF):** The baseline implementation routing discrete UDP sequence packets optimizing paths around live dead-zoned server routers globally.",
    "**Industrial Robotics:** Directing self-driving chassis units away from mathematical collision gradients around simulated 2D blueprint arrays.",
    "**Algorithmic High-Frequency Arbitrage:** Flagging ultra-fractional optimal micro-routes mapping FX currency triangular valuation paths."
  ],

  strengthsAndLimitations: {
    strengths: [
      "Rigidly mathematical completion proving unassailable shortest-path guarantees ensuring completely optimal solutions natively.",
      "Parses gracefully natively supporting both strict directional arrays and un-coupled bidirectional network hubs.",
      "Easily computes every single optimal path spanning outward iteratively terminating simultaneously across entire map sets."
    ],
    limitations: [
      "Catastrophically vulnerable directly failing entirely against algorithmic negative edge weights. (Mandates `Bellman-Ford` fallback).",
      "Scans fully homogeneously completely blind without spatial vector heuristics (Unlike `A*` Pathfinding).",
      "Necessarily requires statically accessing the fully mapped topology strictly ahead of runtime processing triggers."
    ]
  },

  whenToUseIt:
    "Mandate **Dijkstra's** core runtime entirely when architectural constraints demand securing the absolutely optimal numeric mathematical pathing string bridging disparate topologies heavily mapped with differing edge resistance sizes.\n\nRefuse usage globally however upon networks explicitly featuring known negative node penalties, or if vector-heavily prioritized heuristic hunting (`A* Search`) natively yields radically superior target locking."
};
