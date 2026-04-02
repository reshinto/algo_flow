import type { EducationalContent } from "@/types";

export const primsMazeEducational: EducationalContent = {
  overview:
    "**Prim's Maze** applies Randomized Prim's minimum spanning tree algorithm to maze generation. Instead of choosing the cheapest edge, it randomly selects any frontier cell connected to the growing maze. The result is a perfect maze with short, branchy dead ends — visually bushy compared to the long corridors of the Recursive Backtracker.",

  howItWorks:
    "1. Add the start cell to the maze; add all its unvisited passage-cell neighbors to the frontier list.\n" +
    "2. Randomly pick any cell from the frontier.\n" +
    "3. Find a maze-cell neighbor of the picked cell, carve through the wall between them.\n" +
    "4. Add the picked cell to the maze; add its new unvisited neighbors to the frontier.\n" +
    "5. Repeat until the frontier is empty — the entire grid is connected.\n\n" +
    "### Frontier Growth Pattern\n\n" +
    "```\n" +
    "Start: [S]   →  Frontier: [A, B, C]\n" +
    "Pick B  →  Add B + walls; frontier: [A, C, D, E]\n" +
    "Pick A  →  Add A + walls; frontier: [C, D, E, F]\n" +
    "```\n\n" +
    "> *Because any frontier cell can be picked at random, growth radiates outward in multiple directions simultaneously — creating short, bushy branches.*\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    Tree((Current Tree)) --- F1((Frontier 1))\n" +
    "    Tree --- F2((Frontier 2))\n" +
    "    F1 --\"Random Selection\"--> Expand((Expand Tree))\n" +
    "```\n\n" ,

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V log V)`**\n\n" +
    "- Each passage cell enters the frontier once. With a priority queue this would be O(V log V); with a plain list (as used here) random removal is O(1) per pick but list management is O(V) overall.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The frontier list holds at most O(V) entries, and the in-maze boolean array is O(V).",

  bestAndWorstCase:
    "**Best case:** The random choices consistently pick cells that reduce frontier size quickly — the algorithm finishes in few iterations.\n\n" +
    "**Worst case:** All frontier cells are picked in the worst order, keeping the frontier large for as long as possible. Runtime remains O(V) in all cases.",

  realWorldUses: [
    "**Network Topology:** Building minimum spanning trees in telecommunications network design.",
    "**Game Levels:** Creating open cave systems and rooms with many short branch corridors.",
    "**Procedural Terrain:** Generating branchy river systems and cave formations.",
    "**Educational Tools:** Demonstrating how Prim's MST algorithm generalizes to maze construction.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Produces aesthetically different mazes from DFS — short dead ends and bushy branching.",
      "Simple to implement with a list-based frontier; no complex data structures required.",
      "Guaranteed perfect maze — every cell reachable, exactly one path between any two cells.",
    ],
    limitations: [
      "Tends to produce many short dead ends rather than the long corridors preferred for some games.",
      "The naive list frontier is O(V) in size and can be slow on very large grids versus a set-based approach.",
      "All mazes look similar — the bushy style offers less structural variety than DFS.",
    ],
  },

  whenToUseIt:
    "Choose **Prim's Maze** when you want a maze with many branches, short dead ends, and uniform-looking structure. It is ideal for games where players should feel lost in a bushy labyrinth rather than following one long path.\n\nAvoid it when long corridors or a specific bias is needed (use Recursive Backtracker), or when a perfectly uniform random spanning tree is required (use Aldous-Broder).",
};
