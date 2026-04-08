import type { EducationalContent } from "@/types";

export const greedyColoringEducational: EducationalContent = {
  overview:
    "**Greedy Graph Coloring** assigns colors to graph nodes one at a time, giving each node the smallest color number not already used by any of its neighbors.\n\nIt is a simple, fast heuristic — not guaranteed to use the minimum number of colors (the chromatic number), but it always produces a valid coloring and often achieves near-optimal results in practice.",

  howItWorks:
    "1. Process nodes in a fixed order (typically the order given in the input).\n" +
    "2. For each node, collect the colors already assigned to its neighbors.\n" +
    "3. Assign the **smallest non-negative integer** not in that neighbor-color set.\n" +
    "4. Continue until all nodes are colored.\n\n" +
    "### Example\n\n" +
    "```\n" +
    "Graph: A—B, A—C, B—C  (triangle)\n" +
    "Process A → no neighbors colored → assign color 0\n" +
    "Process B → neighbor A has color 0 → assign color 1\n" +
    "Process C → neighbors A(0) and B(1) → assign color 2\n" +
    "```\n\n" +
    "The result uses 3 colors — optimal for a triangle, which has chromatic number 3.\n\n" +
    "### Greedy Coloring on a 4-Node Graph\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((A:0)) --- B((B:1))\n" +
    "  A((A:0)) --- C((C:1))\n" +
    "  B((B:1)) --- C((C:1))\n" +
    "  B((B:1)) --- D((D:0))\n" +
    "  C((C:1)) --- D((D:0))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style D fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Processing order A→B→C→D: A gets color 0 (cyan), B gets color 1 (green), C has neighbors A(0) and B(1) so gets color 2 (amber), D has neighbors B(1) and C(2) so gets color 0 again. Three colors total for this graph.",

  timeAndSpaceComplexity:
    "**Time Complexity: O(V²)**\n\n" +
    "- For each of `V` nodes, we scan all neighbors to collect used colors — up to `V` neighbors in a dense graph.\n" +
    "- With an adjacency list representation this is `O(V + E)` total, which is `O(V²)` in the worst case for dense graphs.\n\n" +
    "**Space Complexity: O(V)**\n\n" +
    "Storing the color assignment and the neighbor-color set each requires at most `O(V)` space.",

  bestAndWorstCase:
    "**Best case:** A bipartite graph processed in the correct order uses exactly 2 colors — `O(V + E)` time.\n\n" +
    "**Worst case:** A graph where the processing order maximizes conflicts can use up to `Δ + 1` colors (where `Δ` is the maximum degree), which may be far from the chromatic number. For example, processing nodes of a bipartite graph in an adversarial interleaved order can produce a 3-coloring instead of the optimal 2-coloring.",

  realWorldUses: [
    "**Register allocation:** Compilers use graph coloring to assign CPU registers to variables, minimizing spills.",
    "**Exam timetabling:** Assigning exam time slots so no student has two exams at the same time.",
    "**Frequency assignment:** Allocating radio frequencies to transmitters so nearby ones do not interfere.",
    "**Map coloring:** Coloring geographic regions so no two adjacent regions share a color.",
    "**Task scheduling:** Assigning tasks to time slots where conflicting tasks cannot run simultaneously.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Extremely fast — linear to near-linear in the size of the graph for sparse inputs.",
      "Always produces a valid coloring with no two adjacent nodes sharing a color.",
      "Simple to implement and understand; a good baseline before trying exact algorithms.",
    ],
    limitations: [
      "Not optimal — the number of colors used depends on the processing order and may exceed the chromatic number.",
      "Finding the optimal ordering (Welsh-Powell, saturation degree) requires extra preprocessing.",
      "Graph coloring in general is NP-hard; greedy is a heuristic, not an exact solver.",
    ],
  },

  whenToUseIt:
    "Use **Greedy Graph Coloring** when you need a fast, practical coloring and optimality is not strictly required — such as register allocation, scheduling, or frequency assignment with many nodes.\n\nWhen an optimal coloring is needed and the graph is small, consider backtracking or constraint-satisfaction approaches. For large graphs, more sophisticated heuristics like DSATUR or simulated annealing may produce better colorings.",
};
