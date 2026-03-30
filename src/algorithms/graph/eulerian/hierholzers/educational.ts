import type { EducationalContent } from "@/types";

export const hierholzersEducational: EducationalContent = {
  overview:
    "**Hierholzer's Algorithm** is an efficient method for finding an **Eulerian circuit** in an undirected graph — a closed path that traverses every edge exactly once and returns to the starting vertex.\n\n" +
    "The algorithm works by building partial circuits (subcircuits) from nodes that still have unused edges, then **splicing** those subcircuits together into one complete Eulerian circuit. It requires that every vertex in the graph has an **even degree** (an equal number of connections), which is a necessary and sufficient condition for an Eulerian circuit to exist.",

  howItWorks:
    "1. **Initialize** a stack with the starting node and an empty circuit list.\n" +
    "2. **Peek** at the top of the stack to get the current node.\n" +
    "3. If the current node has **unused edges**:\n" +
    "   * Pick any unused edge to a neighbor.\n" +
    "   * **Mark that edge as used** (remove it from both directions in the adjacency list).\n" +
    "   * Push the neighbor onto the stack.\n" +
    "4. If the current node has **no unused edges**:\n" +
    "   * Pop it from the stack.\n" +
    "   * Prepend it to the circuit list.\n" +
    "5. Repeat until the stack is empty — the circuit list now contains the complete Eulerian circuit.\n\n" +
    "### Why Splicing Works\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    "    A((A)) -- 1 --- B((B))\n" +
    "    B -- 2 --- C((C))\n" +
    "    C -- 3 --- A\n" +
    "    A -- 4 --- D((D))\n" +
    "    D -- 5 --- E((E))\n" +
    "    E -- 6 --- A\n" +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style D fill:#6366f1,stroke:#4f46e5\n" +
    "    style E fill:#6366f1,stroke:#4f46e5\n" +
    "```\n\n" +
    "- **First subcircuit:** `A → B → C → A`\n" +
    "- **Second subcircuit:** `A → D → E → A`\n" +
    "- **Spliced result:** `A → B → C → A → D → E → A`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "Each edge is visited and removed exactly once. Each node is pushed and popped from the stack exactly once per edge it connects. The total work across all iterations is proportional to the number of vertices plus the number of edges.\n\n" +
    "**Space Complexity: `O(E)`**\n\n" +
    "The mutable adjacency list (remaining edges) stores a copy of all edges. The stack can grow up to `O(E)` nodes in the worst case (a long chain before backtracking), and the circuit list stores every node in the result path.",

  bestAndWorstCase:
    "**Best case** is `O(V + E)`, achieved when the graph has a simple structure where the algorithm follows the circuit directly without excessive backtracking — for example, a single cycle visiting all edges in one pass.\n\n" +
    "**Worst case** is still `O(V + E)`, because even in the most complex graphs (dense, many subcircuits to splice), each edge is removed exactly once and each node appears in the stack exactly as many times as its degree divided by two. The constant factors may be larger with deep backtracking, but the asymptotic bound remains linear in the graph size.",

  realWorldUses: [
    "**Route optimization:** Planning delivery or postal routes that must cover every street segment exactly once before returning to the depot.",
    "**PCB circuit routing:** Designing printed circuit board traces that visit every connection point in a single continuous path.",
    "**DNA fragment assembly:** Reconstructing DNA sequences by finding Eulerian paths through de Bruijn graphs built from overlapping fragments.",
    '**Pen-and-paper puzzles:** Solving "draw this figure without lifting your pen" problems, which are exactly Eulerian path/circuit problems.',
    "**Chinese Postman Problem:** As a core subroutine for finding minimum-cost routes that traverse every edge at least once.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal linear `O(V + E)` time complexity — as fast as it is theoretically possible to solve this problem.",
      "Simple and iterative — uses a stack rather than recursion, which avoids stack overflow on large graphs.",
      "Produces the complete Eulerian circuit in a single pass, with no need to revisit nodes or edges.",
    ],
    limitations: [
      "Only applicable when all vertices have even degree — the algorithm produces an incorrect (incomplete) result on graphs with odd-degree vertices.",
      "Requires checking the Eulerian circuit condition beforehand; the algorithm itself does not validate the input graph.",
      "Does not handle disconnected graphs where the Eulerian circuit spans multiple components — the graph must be connected.",
    ],
  },

  whenToUseIt:
    "Use **Hierholzer's Algorithm** when you need to find a closed path that traverses every edge in an undirected graph exactly once, and you have verified that all vertices have even degree.\n\n" +
    "Do not use this algorithm when the graph has vertices with odd degree — in that case, an Eulerian circuit does not exist (though an **Eulerian path** from one odd-degree vertex to the other may still be found with a modified approach). For weighted traversal problems, prefer **Dijkstra's** or **Bellman-Ford**. For simple connectivity checks, prefer **BFS** or **DFS**.",
};
