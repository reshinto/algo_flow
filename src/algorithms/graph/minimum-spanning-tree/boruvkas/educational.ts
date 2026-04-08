import type { EducationalContent } from "@/types";

export const boruvkasEducational: EducationalContent = {
  overview:
    "**Borůvka's Algorithm** is the oldest known MST algorithm (1926), and uniquely suited to **parallel execution**. In each round, every component simultaneously finds its cheapest outgoing edge, and all safe merges are performed at once. This continues until only one component remains.\n\nUnlike Kruskal's (global edge sort) and Prim's (single-tree growth), Borůvka's works from **all components at once**, halving the component count each round.",

  howItWorks:
    "1. Start with every node as its own component.\n" +
    "2. Repeat while more than one component exists:\n" +
    "   * For each component, scan all edges and find the **cheapest edge** that leaves the component.\n" +
    "   * After scanning, add all discovered cheapest edges to the MST (skipping duplicates that would merge already-merged components).\n" +
    "   * Each merge reduces the total component count.\n" +
    "3. Stop when only one component remains — the MST is complete.\n\n" +
    "### Round-by-Round Merging\n\n" +
    "```\n" +
    "Round 1: Components {A},{B},{C},{D},{E},{F}\n" +
    "         Each finds cheapest outgoing edge → merge\n" +
    "Round 2: Fewer, larger components → merge again\n" +
    "Round 3: Single component → done\n" +
    "```\n\n" +
    "Each round at least halves the number of components, guaranteeing `O(log V)` rounds total.\n\n" +
    "### Borůvka's Round 1: Each Component Picks Its Cheapest Edge\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '  A((A)) -->|"1"| B((B))\n' +
    '  A((A)) -->|"4"| C((C))\n' +
    '  B((B)) -->|"3"| C((C))\n' +
    '  B((B)) -->|"2"| D((D))\n' +
    '  C((C)) -->|"5"| D((D))\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Round 1: A picks edge A→B (weight 1, cyan), B picks B→D (weight 2, amber). After merging, components {A,B,D} and {C} remain. Round 2 adds the cheapest inter-component edge to complete the MST.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(E log V)`**\n\n" +
    "- There are at most `O(log V)` rounds (component count halves each round).\n" +
    "- Each round scans all `E` edges once: `O(E)` per round.\n" +
    "- Total: `O(E log V)`.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The Union-Find structure and the per-round cheapest-edge map each use `O(V)` space.",

  bestAndWorstCase:
    "**Best case** is a graph where each round merges many components at once — converging in very few rounds. On highly symmetric graphs this approaches `O(E)`.\n\n" +
    "**Worst case** occurs on path-like graphs where each round only merges two components, requiring the maximum `O(log V)` rounds and `O(E log V)` total work.",

  realWorldUses: [
    "**Distributed computing:** Each processor handles a subset of components in parallel, making Borůvka's ideal for MapReduce-style MST on massive graphs.",
    "**VLSI circuit design:** Simultaneously identifying minimum-cost connections across all circuit regions in a single pass.",
    "**Social network analysis:** Identifying community structure by merging groups around their strongest inter-group ties.",
    "**Parallel road network planning:** Multiple engineering teams can simultaneously identify cheapest connections between their regions.",
    "**Dense point cloud processing:** Finding MSTs over spatial data where edge scans can be parallelized across processors.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Naturally parallelizable — all component merges in a round are independent.",
      "Guaranteed `O(log V)` rounds regardless of graph structure.",
      "No sorting required upfront — edges are scanned in any order each round.",
      "Handles disconnected graphs naturally, producing a minimum spanning forest.",
    ],
    limitations: [
      "Harder to implement correctly than Kruskal's or Prim's due to the multi-round merge logic.",
      "Sequential implementation offers no advantage over Kruskal's — benefits only appear with parallel execution.",
      "Must handle duplicate cheapest-edge selections carefully to avoid counting the same edge twice in one round.",
    ],
  },

  whenToUseIt:
    "Choose **Borůvka's** when you have access to a **parallel or distributed computing environment** and need to compute MSTs over very large graphs efficiently. It is the algorithm of choice for MapReduce-based graph processing frameworks.\n\nFor sequential single-machine use, prefer **Kruskal's** on sparse graphs or **Prim's** on dense graphs, both of which are simpler to implement and reason about.",
};
