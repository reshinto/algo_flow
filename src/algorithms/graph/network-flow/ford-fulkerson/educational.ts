import type { EducationalContent } from "@/types";

export const fordFulkersonEducational: EducationalContent = {
  overview:
    "**Ford-Fulkerson** is a foundational max-flow algorithm that repeatedly finds augmenting paths from source to sink through a **residual graph** and pushes flow along them until no augmenting path remains.\n\nThe algorithm works on directed flow networks where each edge has a **capacity** constraint. The total flow from source to sink is maximized while respecting those constraints.",

  howItWorks:
    "1. Build a **residual graph** from the input: for each forward edge `u→v` with capacity `c`, track the remaining capacity `c - flow`.\n" +
    "2. Use **DFS** to find any path from source `s` to sink `t` where all residual capacities are positive.\n" +
    "3. Find the **bottleneck**: the minimum residual capacity along the path.\n" +
    "4. **Augment flow** by the bottleneck: subtract from forward edges, add to backward (residual) edges.\n" +
    "5. Repeat until no augmenting path exists — the total augmented flow is the max flow.\n\n" +
    "### Residual Graph Example\n\n" +
    "```\n" +
    "Forward:  S →(10)→ A →(7)→ T\n" +
    "After pushing 7 units:\n" +
    "S →(3)→ A →(0)→ T   (forward residual)\n" +
    "S ←(7)← A ←(7)← T   (backward residual)\n" +
    "```\n\n" +
    "Backward edges allow the algorithm to **undo** suboptimal routing decisions in later iterations.\n\n" +
    "### Residual Graph After One Augmentation\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    '  S((S)) -->|"cap:10"| A((A))\n' +
    '  A((A)) -->|"cap:7"| T((T))\n' +
    '  S((S)) -->|"cap:5"| B((B))\n' +
    '  B((B)) -->|"cap:6"| T((T))\n' +
    '  A((A)) -->|"cap:3"| B((B))\n' +
    "  style S fill:#06b6d4,stroke:#0891b2\n" +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style T fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "DFS finds path S→A→T (bottleneck 7). After augmenting: forward edge A→T has residual 0, backward edge T→A has residual 7. A subsequent DFS can route through S→B→T or use the backward edge to reroute flow.",

  timeAndSpaceComplexity:
    "**Time Complexity: O(V · E²)**\n\n" +
    "- Each DFS costs `O(V + E)` to find one augmenting path.\n" +
    "- In the worst case with integer capacities, the number of augmenting paths is bounded by the max flow value `f`, giving `O(f · E)`. With irrational capacities Ford-Fulkerson may not terminate.\n" +
    "- The Edmonds-Karp variant (BFS paths) gives the tighter polynomial `O(VE²)` bound.\n\n" +
    "**Space Complexity: O(V + E)**\n\n" +
    "The residual graph stores at most `2E` edges and the DFS visit set is at most `V` nodes.",

  bestAndWorstCase:
    "**Best case:** A single augmenting path saturates the max flow in one DFS pass — `O(V + E)`.\n\n" +
    "**Worst case:** With adversarial integer capacities, the algorithm may augment 1 unit per iteration, requiring `O(f)` iterations where `f` is the max flow value. For large `f` this is effectively `O(f · E)`. With non-integer capacities the algorithm may not terminate at all.",

  realWorldUses: [
    "**Network routing:** Determining maximum data throughput between two nodes in a communication network.",
    "**Supply chain logistics:** Computing the maximum goods that can flow from warehouses to distribution centers.",
    "**Bipartite matching:** Modeling matching problems as flow networks to find maximum matchings.",
    "**Image segmentation:** Min-cut / max-flow duality used in computer vision to segment foreground from background.",
    "**Airline scheduling:** Assigning aircraft and crews to routes subject to capacity constraints.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Conceptually simple — the augmenting path idea is easy to understand and implement.",
      "Works correctly on any directed graph with integer or rational capacities.",
      "The max-flow min-cut theorem is a direct consequence, providing duality insight.",
    ],
    limitations: [
      "Does not terminate with irrational capacities — use Edmonds-Karp for a polynomial guarantee.",
      "DFS path selection can be very inefficient with large capacity values (pseudo-polynomial).",
      "Does not handle undirected edges or negative capacities without preprocessing.",
    ],
  },

  whenToUseIt:
    "Use **Ford-Fulkerson** when you need a straightforward max-flow implementation on graphs with small integer capacities or when studying the augmenting-path framework conceptually.\n\nPrefer **Edmonds-Karp** when you need a guaranteed polynomial runtime. Prefer **Dinic's algorithm** for dense graphs requiring `O(V² · E)` performance.",
};
