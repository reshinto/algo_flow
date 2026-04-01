import type { EducationalContent } from "@/types";

export const recursiveBacktrackerEducational: EducationalContent = {
  overview:
    "**Recursive Backtracker** (also called Depth-First Search maze generation) is the most popular maze algorithm. It carves a path deep into the grid, backtracking only when it reaches a dead end, producing mazes with long winding corridors and few branches.\n\nEvery cell is visited exactly once, guaranteeing a perfect maze — a maze with exactly one path between any two cells and no unreachable regions.",

  howItWorks:
    "1. Start at a cell (marked as visited), push it onto the DFS stack.\n" +
    "2. Look at all unvisited passage-cell neighbors (2 cells away in cardinal directions).\n" +
    "3. If any exist, randomly choose one, carve through the wall between them, mark the neighbor visited, push it onto the stack.\n" +
    "4. If no unvisited neighbors exist, pop the stack (backtrack).\n" +
    "5. Repeat until the stack is empty — every reachable cell has been visited.\n\n" +
    "### Passage Cell Model\n\n" +
    "```\n" +
    "Cells at odd (row, col) are passage nodes.\n" +
    "Even-indexed cells act as walls between them.\n" +
    "Carving from (1,1) to (1,3) removes the wall at (1,2).\n" +
    "```\n\n" +
    "> *The DFS nature means the algorithm chases one long corridor before backtracking — resulting in dramatic, winding mazes.*",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V)`**\n\n" +
    "- Each passage cell is visited exactly once. Wall cells between them are carved in O(1). Total work is proportional to the number of cells.\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The DFS stack can hold up to V/2 cells in the worst case (a single snaking corridor through every cell).",

  bestAndWorstCase:
    "**Best case:** All neighbors happen to be chosen in a single straight line — the algorithm runs to completion in one pass with no backtracking.\n\n" +
    "**Worst case:** The random choices force maximum backtracking — the stack fills to its greatest depth before the maze is complete. In all cases the algorithm is O(V), so the distinction is purely constant-factor.",

  realWorldUses: [
    "**Game Level Generation:** Produces long winding dungeons or cave systems common in rogue-like games.",
    "**Puzzle Design:** Mazes with few branches and one long solution path are ideal for pencil-and-paper puzzles.",
    "**Animation and Teaching:** The DFS carving animation is visually dramatic and clearly illustrates backtracking.",
    "**Procedural Art:** Generates fractal-like labyrinthine patterns used in generative artwork.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Produces aesthetically pleasing mazes with long, winding corridors.",
      "Very simple to implement using an explicit stack or recursion.",
      "Guaranteed perfect maze — exactly one path between any two cells.",
    ],
    limitations: [
      "Visible DFS bias: the first path carved tends to be extremely long before branching occurs.",
      "Deep recursion can cause stack overflow on very large grids (mitigated by iterative stack).",
      "Not suitable when short, bushy mazes with many branches are desired (use Prim's instead).",
    ],
  },

  whenToUseIt:
    "Choose **Recursive Backtracker** when you want long corridor mazes with few dead ends and dramatic visual generation. It is the default choice for game dungeon generation and educational maze demonstrations.\n\nAvoid it when you need short solution paths, bushy branch structures, or uniform random spanning trees (use Aldous-Broder for uniform distribution).",
};
