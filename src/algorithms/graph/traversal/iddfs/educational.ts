import type { EducationalContent } from "@/types";

export const iddfsEducational: EducationalContent = {
  overview:
    "**Iterative Deepening Depth-First Search (IDDFS)** is a graph traversal algorithm that combines the **space efficiency of DFS** with the **completeness and optimality of BFS** for unweighted graphs.\n\nIt works by running a depth-limited DFS repeatedly, increasing the depth limit by one each iteration (0, 1, 2, ...) until every reachable node has been visited. Because each iteration discards and rebuilds the stack, memory usage stays at `O(V)` — the same as DFS — while still discovering all nodes at the minimum depth first.",

  howItWorks:
    "1. Start with a **depth limit of 0** and run a full DFS, visiting only the start node itself.\n" +
    "2. If all nodes have been visited, stop. Otherwise, **increment the depth limit by 1**.\n" +
    "3. Restart DFS from the start node with the new limit. Push neighbors onto the stack only when their depth would not exceed the current limit.\n" +
    "4. When a node is popped whose depth equals the limit, mark it visited but do **not** expand its neighbors.\n" +
    "5. Repeat until every node reachable from the start has been discovered.\n\n" +
    "### Depth Limit Expansion\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    A((A)) --> B((B))\n" +
    "    A --> C((C))\n" +
    "    B --> D((D))\n" +
    "    C --> E((E))\n" +
    "    D --> F((F))\n" +
    "\n" +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style B fill:#6366f1,stroke:#4f46e5\n" +
    "    style C fill:#6366f1,stroke:#4f46e5\n" +
    "    style D fill:#8b5cf6,stroke:#7c3aed\n" +
    "    style E fill:#8b5cf6,stroke:#7c3aed\n" +
    "    style F fill:#a855f7,stroke:#9333ea\n" +
    "```\n\n" +
    "- **Depth 0 (Cyan):** Only node `A`\n" +
    "- **Depth 1 (Indigo):** Nodes `B`, `C` become reachable\n" +
    "- **Depth 2 (Purple):** Nodes `D`, `E` become reachable\n" +
    "- **Depth 3 (Violet):** Node `F` becomes reachable",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(b^d)`** (where `b` = branching factor, `d` = depth of goal/final node)\n\n" +
    "- **Best Case: `O(V + E)`** — when all nodes lie at shallow depth the total re-work across iterations is small.\n" +
    "- **Average / Worst Case: `O(b^d)`** — in a balanced tree of branching factor `b` and depth `d`, nodes near the root are re-visited in every iteration. For most practical graphs `b^d` is close to `V + E`.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "Unlike BFS which must hold an entire frontier level in memory, IDDFS only keeps the current DFS stack plus a visited set for the active iteration — both bounded by the number of vertices.",

  bestAndWorstCase:
    "**Best case** occurs when the entire graph is reachable within depth 0 or 1. The first iteration visits the start node; the second iteration reaches all neighbors. Total work is proportional to `O(V + E)`, indistinguishable from a single BFS pass.\n\n" +
    "**Worst case** is a deep, wide tree where the target (or last node) sits at maximum depth `d` with branching factor `b`. Nodes at depth `k` are re-visited in every iteration from 0 through `d`, yielding total visits of roughly `b^0 + b^1 + ... + b^d = O(b^d)`. The repeated work at shallow depths is a small constant fraction of `b^d`, so the asymptotic bound matches that of a single DFS to depth `d`.",

  realWorldUses: [
    "**Game AI move search:** Iterative deepening powers chess and Go engines (e.g., iterative-deepening A*) because it finds optimal moves without blowing memory budgets.",
    "**Puzzle solvers:** Sliding-tile and Rubik's Cube solvers use IDDFS to find minimum-move solutions when the branching factor is high and the depth unknown.",
    "**Compiler reachability:** Static analyzers perform iterative deepening over call graphs to detect unreachable code within bounded stack depth.",
    "**Web crawlers with depth caps:** Crawlers that must respect a maximum link depth while minimizing queue memory naturally implement IDDFS-style iteration.",
    "**Network topology discovery:** In resource-constrained embedded networks, IDDFS locates nodes without maintaining a BFS queue that could exhaust RAM.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Achieves BFS-equivalent completeness and optimality (shortest path in unweighted graphs) while consuming only `O(V)` memory.",
      "No explicit queue required — a simple recursive call stack or explicit stack suffices, reducing implementation complexity.",
      "Naturally adapts to unknown graph depths: the depth limit grows until all nodes are found, eliminating the need to pre-compute graph diameter.",
      "Cache-friendly access patterns: repeated shallow traversals tend to hit warm cache lines, partially offsetting the cost of re-visiting early nodes.",
    ],
    limitations: [
      "Repeats work: nodes near the root are re-visited in every iteration. In practice the overhead is a small constant multiple of a single DFS, but it is nonzero.",
      "Not suitable for weighted graphs — like BFS it finds shortest hop paths, not minimum-weight paths (use Dijkstra or A* for those).",
      "Each new iteration resets the visited set, so the algorithm cannot resume from where it left off without storing extra state.",
      "Performance degrades sharply when the graph has very high branching factors, because most of the `b^d` work concentrates in the final iteration.",
    ],
  },

  whenToUseIt:
    "Choose **IDDFS** when you need **BFS-level correctness on unweighted graphs but cannot afford BFS-level memory**. It is the default choice in memory-constrained environments (embedded systems, game trees, puzzle solvers) where the graph depth is unknown in advance.\n\nAvoid IDDFS in favor of **BFS** when memory is plentiful and you want slightly simpler code without repeated traversals. Switch to **Dijkstra or A*** when edges carry weights and you need minimum-cost paths rather than minimum-hop paths.",
};
