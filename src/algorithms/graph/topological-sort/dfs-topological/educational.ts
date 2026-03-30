import type { EducationalContent } from "@/types";

export const dfsTopologicalEducational: EducationalContent = {
  overview:
    "**DFS-Based Topological Sort** produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) using depth-first search. The key insight: a vertex should appear *before* all vertices it points to, so we prepend each vertex to the result *after* all its descendants have been fully explored.\n\n" +
    "Unlike **Kahn's Algorithm** (which processes vertices in BFS order by in-degree), the DFS approach works by recursively diving as deep as possible along each path, then recording nodes in reverse finish order — a technique called **reverse post-order**.",

  howItWorks:
    "1. Maintain a `visited` set and an output list.\n" +
    "2. For each unvisited vertex in the graph:\n" +
    "   * Mark it as visited.\n" +
    "   * Recursively visit all unvisited neighbors.\n" +
    "   * Once all descendants are finished, **prepend** the vertex to the front of the result.\n" +
    "3. The final list is a valid topological ordering.\n\n" +
    "### Why Prepend on Finish?\n\n" +
    "```\n" +
    "DAG: A→B, A→C, B→D, C→D, C→E, D→F, E→F\n\n" +
    "DFS from A:\n" +
    "  Visit A → recurse B → recurse D → recurse F\n" +
    "    F finishes → prepend F  → order: [F]\n" +
    "    D finishes → prepend D  → order: [D, F]\n" +
    "  B finishes   → prepend B  → order: [B, D, F]\n" +
    "  recurse C → recurse D (already visited) → recurse E → recurse F (visited)\n" +
    "    E finishes → prepend E  → order: [E, B, D, F]\n" +
    "  C finishes   → prepend C  → order: [C, E, B, D, F]\n" +
    "A finishes     → prepend A  → order: [A, C, E, B, D, F]\n" +
    "```\n\n" +
    "Every edge `u→v` is guaranteed to have `u` earlier than `v` because `v` finishes before `u`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Each vertex is visited exactly once: `O(V)`.\n" +
    "- Each edge is examined exactly once when exploring neighbors: `O(E)`.\n" +
    "- The prepend operation on a linked structure is `O(1)` per node.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The visited set holds up to `V` entries: `O(V)`.\n" +
    "- The implicit call stack can grow up to `V` frames deep on a linear chain: `O(V)`.\n" +
    "- The output array stores all `V` vertices: `O(V)`.",

  bestAndWorstCase:
    "**Best case** is `O(V + E)` — sparse graphs with few edges process quickly since the edge-scanning term `E` is small.\n\n" +
    "**Worst case** is `O(V + E)` — a fully connected DAG (E = O(V²)) or a deep linear chain causes the edge term to dominate. On very deep linear graphs, the recursive call stack depth equals `V`, which may cause a stack overflow for extremely large inputs.\n\n" +
    "For graphs where stack depth is a concern, **Kahn's Algorithm** (iterative BFS) is a safer choice.",

  realWorldUses: [
    "**Compiler Symbol Resolution:** Determining the order in which symbols, types, and modules must be resolved before the code that references them.",
    "**Linker Dependency Ordering:** Ensuring object files and static libraries are linked in the correct order to resolve all symbols.",
    "**Task Scheduling with Dependencies:** Ordering jobs in a workflow system where each job must wait for its prerequisite jobs to finish.",
    "**Makefile Target Ordering:** Deciding which build targets to compile first based on their file dependencies.",
    "**Database Migration Sequencing:** Running schema migrations in the correct order when migrations depend on prior ones.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Elegant and concise — the post-order DFS naturally yields a topological ordering with minimal extra bookkeeping.",
      "Works well alongside other DFS-based graph algorithms (cycle detection, SCC) that may already be in use.",
      "No need to precompute in-degrees — the traversal itself drives the ordering.",
    ],
    limitations: [
      "Recursive implementation risks stack overflow on very deep or linear graphs with thousands of nodes.",
      "Does not detect cycles as a built-in byproduct — a separate visited-in-recursion-stack check is needed.",
      "Less intuitive than Kahn's for learners unfamiliar with post-order DFS reasoning.",
    ],
  },

  whenToUseIt:
    "Use **DFS Topological Sort** when you already have DFS infrastructure in place, when you need a concise implementation, or when working with moderately sized graphs where recursion depth is not a concern.\n\n" +
    "Prefer **Kahn's Algorithm** when you need explicit cycle detection, when the graph could be very deep (risking stack overflow), or when a BFS-style level-by-level processing order is more intuitive for your use case. Both run in `O(V + E)` — the choice is primarily about style and secondary properties.",
};
