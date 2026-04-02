import type { EducationalContent } from "@/types";

export const dfsExplorationEducational: EducationalContent = {
  overview:
    "**DFS Exploration** uses Depth-First Search to visit every reachable cell in a grid starting from a given origin — with no target endpoint. Unlike BFS, which expands level-by-level, DFS dives as deep as possible along each branch before backtracking.\n\nThe result is a snake-like traversal pattern that fully maps connected regions while tracking the maximum depth reached from the start.",

  howItWorks:
    "1. Push the start cell onto a stack with depth 0 and mark it visited.\n" +
    "2. Pop the top cell from the stack.\n" +
    "3. Record it as visited and update the maximum depth tracker.\n" +
    "4. Push all unvisited passable neighbors onto the stack with depth + 1.\n" +
    "5. Repeat until the stack is empty — every reachable cell has been visited.\n\n" +
    "### Stack-Driven Deep Dive\n\n" +
    "```\n" +
    "Push S       Pop S, push A B     Pop B, push C D\n" +
    "[S]          [A, B]              [A, C, D]\n" +
    "→ DFS always processes the most recently added cell first\n" +
    "```\n\n" +
    "> *Unlike BFS, DFS follows one branch to its end before exploring siblings — producing depth-first ordering.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    Root((Root)) --> Left((Left Deep))\n" +
    "    Left --> Bottom((Bottom Hit))\n" +
    '    Bottom -."Backtrack".-> Root\n' +
    "```\n\n",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V + E)`**\n\n" +
    "- Every cell (`V`) is pushed and popped from the stack once; every passable edge (`E`) is checked once.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The stack holds at most `O(V)` entries in the worst case (a single long path through every cell).",

  bestAndWorstCase:
    "**Best case** occurs on a completely walled-off start cell — the algorithm terminates immediately with a single visited cell and zero depth.\n\n" +
    "**Worst case** is a long winding corridor where the stack grows to hold the full path length before any backtracking, yielding `O(V)` stack depth and `O(V)` visited nodes.",

  realWorldUses: [
    "**Maze Generation:** Recursive backtracking (DFS on a grid) is the most common maze generation algorithm.",
    "**Topological Sorting:** DFS on directed acyclic graphs determines processing order for build systems.",
    "**Connected Components:** Identifying and counting isolated regions in graphs and images.",
    "**Web Crawling:** Following links depth-first to fully explore a site before moving to adjacent sites.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Uses `O(d)` stack space where `d` is the current path depth — far less than BFS on deep narrow graphs.",
      "Naturally produces maze-like exploration patterns useful for procedural generation.",
      "Simple to implement iteratively with an explicit stack.",
    ],
    limitations: [
      "Does not guarantee shortest paths — the first path found may be much longer than optimal.",
      "Stack depth can reach `O(V)` on open grids with long winding paths.",
      "Exploration order is highly sensitive to neighbor ordering, producing different traversals for the same grid.",
    ],
  },

  whenToUseIt:
    "Choose **DFS Exploration** when you need to determine reachability or enumerate all cells in a connected region, and path length does not matter.\n\nAvoid it when shortest paths are required (use BFS) or when the search space is very deep and stack overflow is a concern (use BFS or iterative deepening DFS).",
};
