import type { EducationalContent } from "@/types";

export const kahnsEducational: EducationalContent = {
  overview:
    "**Kahn's Algorithm** is a BFS-based approach to **topological sorting** — producing a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge `u → v`, vertex `u` appears before vertex `v` in the output.\n\n" +
    "It works by repeatedly selecting vertices with **zero in-degree** (no remaining prerequisites), adding them to the result, and decrementing the in-degree of their neighbors. This mirrors how a course scheduler resolves prerequisite chains level by level.",

  howItWorks:
    "1. Compute the **in-degree** (number of incoming edges) for every vertex.\n" +
    "2. Enqueue all vertices with in-degree `0` — they have no prerequisites.\n" +
    "3. While the queue is not empty:\n" +
    "   * Dequeue the front vertex and append it to the topological order.\n" +
    "   * For each outgoing neighbor, decrement its in-degree by 1.\n" +
    "   * If a neighbor's in-degree drops to `0`, enqueue it.\n" +
    "4. If the final order contains all `V` vertices, a valid topological sort exists. A shorter result indicates a cycle.\n\n" +
    "### Visualizing In-Degree Reduction\n\n" +
    "```\n" +
    "DAG: A→B, A→C, B→D, C→D, C→E, D→F, E→F\n" +
    "In-degrees: A=0, B=1, C=1, D=2, E=1, F=2\n\n" +
    "Queue: [A]  → process A → decrement B,C → Queue: [B, C]\n" +
    "Queue: [B, C] → process B → decrement D → Queue: [C]\n" +
    "Queue: [C]  → process C → decrement D,E → D in-degree=0, E in-degree=0 → Queue: [D, E]\n" +
    "Queue: [D, E] → process D → decrement F → Queue: [E]\n" +
    "Queue: [E]  → process E → decrement F → F in-degree=0 → Queue: [F]\n" +
    "Queue: [F]  → process F → done\n" +
    "Order: [A, B, C, D, E, F]\n" +
    "```\n\n" +
    "### Kahn's In-Degree Reduction on a Package DAG\n\n" +
    "```mermaid\n" +
    "graph LR\n" +
    "  A((A)) --> C((C))\n" +
    "  B((B)) --> C((C))\n" +
    "  B((B)) --> D((D))\n" +
    "  C((C)) --> E((E))\n" +
    "  D((D)) --> E((E))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#06b6d4,stroke:#0891b2\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "A and B (cyan) start with in-degree 0 and are enqueued first. Processing them decrements C and D to in-degree 0 (amber). Processing C and D finally reduces E (green) to in-degree 0. Output order: [A, B, C, D, E].",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Each vertex is enqueued and dequeued exactly once: `O(V)`.\n" +
    "- Each edge is examined exactly once when its source vertex is processed: `O(E)`.\n" +
    "- Total: `O(V + E)` regardless of graph density.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The in-degree map stores one entry per vertex: `O(V)`.\n" +
    "- The queue holds at most `V` vertices simultaneously: `O(V)`.\n" +
    "- The output array stores `V` vertices: `O(V)`.",

  bestAndWorstCase:
    "**Best case** is `O(V + E)` — all in-degree-0 nodes are available immediately and the graph has few edges to process.\n\n" +
    "**Worst case** is also `O(V + E)` — linear graphs like `A→B→C→…→Z` force sequential processing one node at a time, and dense DAGs with `E = O(V²)` edges push the edge-processing term to dominate.\n\n" +
    "Unlike comparison-based sorting algorithms, topological sort has no average vs. worst distinction — it is uniformly linear in `V + E`.",

  realWorldUses: [
    "**Build Systems (Make, Gradle, Bazel):** Determining the order in which compilation units must be built based on their dependency graph.",
    "**Course Scheduling:** Universities ordering courses so all prerequisites appear before the courses that depend on them.",
    "**Package Managers (npm, pip, apt):** Installing dependencies in the correct order before the packages that require them.",
    "**Spreadsheet Evaluation:** Computing cell values in the order their formula dependencies require.",
    "**CI/CD Pipelines:** Scheduling pipeline stages (lint → test → build → deploy) where each stage depends on prior ones.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simultaneously detects cycles — if the result contains fewer than `V` nodes, the graph has a cycle and no valid topological order exists.",
      "Intuitive BFS-style processing makes it easy to reason about and debug step-by-step.",
      "Produces a valid ordering in a single linear pass without recursion, avoiding stack overflow on large graphs.",
    ],
    limitations: [
      "Only valid for Directed Acyclic Graphs — graphs with cycles have no topological ordering.",
      "The resulting order is not unique; many valid orderings may exist for a given DAG.",
      "Requires computing and storing in-degrees upfront, which is an `O(V + E)` preprocessing step.",
    ],
  },

  whenToUseIt:
    "Use **Kahn's Algorithm** when you need a topological sort and want to avoid recursion (e.g., large graphs where DFS might overflow the call stack), or when you also need cycle detection as a built-in byproduct.\n\n" +
    "Prefer the **DFS-based topological sort** when you already have a DFS traversal framework in place, or when you need to produce the reverse post-order naturally. Both approaches run in `O(V + E)`, so the choice is typically stylistic or driven by whether you also need DFS for other graph properties.",
};
