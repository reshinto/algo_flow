import type { EducationalContent } from "@/types";

export const floodFillDfsEducational: EducationalContent = {
  overview:
    '**Flood Fill DFS** fills all connected empty cells using a stack (Depth-First Search order). Starting from a seed cell, it dives as deep as possible along one corridor before backtracking and exploring another — resulting in a dramatically different, "snaking" fill pattern compared to the wave-like BFS variant.\n\nThe final set of filled cells is identical to BFS Flood Fill — only the order of exploration differs.',

  howItWorks:
    "1. Push the seed (start) cell onto the stack and mark it as visited.\n" +
    "2. Pop the top cell from the stack and count it as filled.\n" +
    "3. For each of its 4 neighbors: skip walls and already-visited cells, then push and mark as visited.\n" +
    "4. Repeat until the stack is empty.\n\n" +
    "### DFS vs BFS Fill Order\n\n" +
    "```\n" +
    "BFS fills layer by layer (waves):    DFS fills in long corridor paths:\n" +
    "  1 1 1 1 1                            1 6 7 8 9\n" +
    "  1 1 1 1 1                            2 5 . . 10\n" +
    "  1 1 S 1 1                            3 4 . . 11\n" +
    "```\n\n" +
    "> *DFS follows one path to its end before exploring another — creating irregular, winding fill patterns.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    Center((Stack: Last In)) --> Deep((Stack: First Out))\n" +
    "```\n\n",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Each cell is pushed and popped exactly once. `V` = total cells, `E` = adjacency edges.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The stack holds at most `O(V)` entries. In practice, DFS uses less peak queue memory than BFS on open grids because the frontier is a single path rather than a wave.",

  bestAndWorstCase:
    "**Best case** is when the seed cell has no passable neighbors — the stack empties after one pop, terminating immediately with a single filled cell.\n\n" +
    "**Worst case** is a spiral-shaped open grid — DFS must traverse the full length of the spiral before backtracking, visiting `O(V)` cells with a stack that mirrors the spiral depth.",

  realWorldUses: [
    "**Maze Solving:** DFS naturally explores a single path to its end, making it intuitive for maze traversal and backtracking solvers.",
    "**Memory-Constrained Systems:** On narrow, corridor-heavy maps, DFS uses less peak stack memory than the broad BFS frontier queue.",
    "**Recursive Parsers:** The DFS flood fill pattern mirrors recursive descent parsers that explore nested structures depth-first.",
    "**Topology Analysis:** Identifying connected components in graphs where order of exploration is unimportant but completeness is required.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Identical final result to BFS Flood Fill — every reachable cell is visited exactly once.",
      "Lower peak memory usage on narrow/corridor-heavy grids compared to BFS.",
      "Stack-based implementation avoids call-stack overflow risks of recursive DFS on large grids.",
    ],
    limitations: [
      "Fill order is irregular and unpredictable — not suitable when wave-like expansion order matters.",
      "On open grids the stack can be as large as the BFS queue, negating any memory advantage.",
      "Does not compute distance from source; for distance information, use BFS Flood Fill or Multi-Source BFS.",
    ],
  },

  whenToUseIt:
    "Choose **Flood Fill DFS** when the order of cell filling is unimportant and you want to highlight the contrast between DFS and BFS traversal patterns for educational purposes. It is also appropriate when the grid layout favors deep corridors over broad open spaces.\n\nUse BFS Flood Fill instead when you need cells filled in distance order (wave-like). Use Multi-Source BFS when you need distance-to-wall data.",
};
