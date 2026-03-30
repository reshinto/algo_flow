import type { EducationalContent } from "@/types";

export const dfsEducational: EducationalContent = {
  overview:
    "**Depth-First Search (DFS)** is a fundamental graph traversal algorithm that explores as far as possible along each branch before backtracking to try another path.\n\nUnlike BFS, which fans outward level by level, DFS plunges deep into the graph along a single path until it reaches a dead end, then retraces its steps to explore other branches. It uses a **Stack (LIFO)** data structure — either an explicit stack or the implicit call stack in recursive implementations — to remember which nodes still have unexplored neighbors.",

  howItWorks:
    "1. Push the starting node onto the stack and mark it as **visited**.\n" +
    "2. While the stack is not empty:\n" +
    "   * **Pop** the top node off the stack.\n" +
    "   * If already visited, skip it.\n" +
    "   * Otherwise, mark it visited and record the visit.\n" +
    "   * Push each unvisited neighbor onto the stack for later exploration.\n" +
    "3. Repeat until the stack is fully drained.\n\n" +
    "### Visualizing Depth-First Exploration\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    A((A)) --> B((B))\n" +
    "    A --> C((C))\n" +
    "    B --> D((D))\n" +
    "    B --> E((E))\n" +
    "    C --> F((F))\n" +
    "    \n" +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style B fill:#10b981,stroke:#059669\n" +
    "    style D fill:#10b981,stroke:#059669\n" +
    "    style E fill:#10b981,stroke:#059669\n" +
    "    style C fill:#6366f1,stroke:#4f46e5\n" +
    "    style F fill:#6366f1,stroke:#4f46e5\n" +
    "```\n\n" +
    "- **Cyan:** Starting node `A`\n" +
    "- **Green:** One complete depth branch (`B → D → E`)\n" +
    "- **Indigo:** Second branch explored after backtracking (`C → F`)",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- **Best / Average / Worst Case:** DFS must examine every reachable vertex `V` and check every edge `E` from each visited vertex. The traversal cost is always proportional to the graph's size.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "The explicit stack (iterative) or recursion call stack can hold at most `V` nodes simultaneously in the worst case — a fully linear chain where every node leads to the next. In practice, DFS typically uses far less memory than BFS on wide graphs because it does not need to hold an entire frontier layer at once.",

  bestAndWorstCase:
    "**Best case** is `O(V + E)` just like worst case — DFS always commits to fully exploring every reachable node. Even if the target is adjacent to the start, the algorithm may have already pushed deeper neighbors onto the stack first.\n\n" +
    "**Worst case** occurs on densely connected graphs or long linear chains. A degenerate chain of `V` nodes forces the stack to grow `V` deep, and if `E = V(V-1)/2` (complete graph), all edges must be inspected, driving time to `O(V²)` in terms of edge count.\n\n" +
    "**DFS vs BFS memory:** On a balanced binary tree with `V` nodes, BFS must hold the entire bottom layer (`V/2` nodes) in its queue. DFS only holds one path root-to-leaf at a time, using `O(log V)` stack space — a major advantage for deep, narrow graphs.",

  realWorldUses: [
    "**Cycle Detection:** Identifying back-edges during DFS immediately reveals cycles in directed or undirected graphs.",
    "**Topological Sorting:** Processing nodes in reverse post-order DFS completion time yields a valid topological ordering for DAGs.",
    "**Maze Generation and Solving:** DFS naturally carves deep corridors through grids, forming the basis for randomized maze generation algorithms.",
    "**Connected Components:** A single DFS pass identifies all nodes reachable from a root, forming one connected component.",
    "**Compiler Symbol Resolution:** Programming language compilers use DFS-based algorithms to resolve dependencies between modules and detect circular imports.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Low memory usage on deep, narrow graphs — only the current path from root to frontier is held in the stack at any time.",
      "Naturally suited for problems requiring exhaustive path enumeration, cycle detection, and topological ordering.",
      "Simple recursive formulation makes DFS intuitive to implement and reason about for tree-shaped inputs.",
    ],
    limitations: [
      "Does not guarantee the shortest path — DFS may find a very long route to a node before discovering a shorter one.",
      "Can get trapped exploring irrelevant deep branches before finding the target, making it slow for shortest-path queries.",
      "Recursive DFS risks stack overflow on very deep graphs (thousands of nodes deep) unless converted to iterative form.",
    ],
  },

  whenToUseIt:
    "Choose **Depth-First Search** when you need to exhaustively explore all paths, detect cycles, compute topological orderings, or find connected components. DFS is also preferable over BFS when working with very wide graphs where BFS would consume excessive memory holding a large frontier.\n\nAvoid DFS when the **shortest path** matters on an unweighted graph — use **BFS** instead. For weighted shortest paths, use **Dijkstra's algorithm**. If the search space is enormous and you only need any valid solution quickly, consider **iterative deepening DFS (IDDFS)** to combine DFS memory efficiency with BFS completeness.",
};
