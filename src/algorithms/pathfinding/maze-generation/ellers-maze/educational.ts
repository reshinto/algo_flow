import type { EducationalContent } from "@/types";

export const ellersMazeEducational: EducationalContent = {
  overview:
    "**Eller's Maze** generates a perfect maze one row at a time, requiring only O(width) memory — making it suitable for generating infinitely tall mazes without storing the full grid.\n\nEach row maintains a set assignment for each passage cell. Cells in the same set are already connected; cells in different sets can be merged by removing the wall between them. After horizontal merging, each set must extend at least one cell downward before the row is finalized.",

  howItWorks:
    "1. Assign each cell in the first row to its own unique set.\n" +
    "2. **Horizontal merging:** For each adjacent pair of cells in different sets, randomly decide whether to remove the wall and merge them. On the last row, always merge all adjacent cells in different sets.\n" +
    "3. **Vertical extension:** For each set in the current row, randomly pick ≥1 cells to extend downward. Cells that extend keep their set ID in the next row; non-extending cells get new set IDs.\n" +
    "4. Repeat for each subsequent row.\n" +
    "5. On the last row, only horizontal merging is performed — no vertical extensions needed.\n\n" +
    "### Row-by-Row Set Tracking\n\n" +
    "```\n" +
    "Row 1:  [A] [A] [B] [C] [C]  ← merged A-A and C-C horizontally\n" +
    "Down:   [A]     [B] [C]      ← A extends 1, B extends 1, C extends 1\n" +
    "Row 2:  [A] [D] [B] [C] [E]  ← non-extending cells get new sets D, E\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    R1((Row 1)) --\"Merge Sets\"--> R1A((Set A))\n" +
    "    R1A --\"Vertical Drop\"--> R2((Row 2))\n" +
    "```\n\n" ,

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V)`**\n\n" +
    "- Each cell is processed once for horizontal merging and once for vertical extension — O(cols) per row, O(rows × cols) = O(V) total.\n\n" +
    "**Space Complexity: `O(cols)`**\n\n" +
    "- Only the current row's set assignments need to be stored. This makes Eller's the only standard maze algorithm that can generate mazes of infinite height in constant memory.",

  bestAndWorstCase:
    "**Best case:** Minimal merging decisions needed — few horizontal merges and few vertical extensions per row.\n\n" +
    "**Worst case:** Many merging and extension decisions with maximum set bookkeeping per row. Runtime is always O(V) regardless — the best/worst distinction is in constant factors only.",

  realWorldUses: [
    "**Streaming Maze Generation:** Generating endless scrolling dungeon levels where only the current row needs to be in memory.",
    "**Level Procedural Generation:** Row-by-row generation matches how many platformer levels are laid out.",
    "**Memory-Constrained Devices:** The O(width) memory requirement makes it ideal for embedded systems generating maze graphics.",
    "**Infinite Maze Games:** Games where the player never reaches the bottom of the maze.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Only O(width) memory needed — can generate mazes of any height without storing the full grid.",
      "Produces perfect mazes with a different visual style from DFS or Prim's.",
      "Row-by-row generation is cache-friendly and produces uniform-looking vertical distributions.",
    ],
    limitations: [
      "More complex to implement correctly than DFS or Prim's — set bookkeeping is non-trivial.",
      "The last row special-casing adds implementation complexity.",
      "Random merging on each row can produce mazes with non-uniform passage distributions if not carefully tuned.",
    ],
  },

  whenToUseIt:
    "Choose **Eller's Maze** when you need to generate mazes row-by-row in O(width) memory — streaming dungeon generation, infinite scroll levels, or severely memory-constrained environments.\n\nAvoid it when implementation simplicity is important (use Binary Tree or Recursive Backtracker), or when full grid access is available and memory is not a concern.",
};
