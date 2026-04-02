import type { EducationalContent } from "@/types";

export const binaryTreeMazeEducational: EducationalContent = {
  overview:
    "**Binary Tree Maze** is the simplest possible maze generation algorithm. For every passage cell, it makes a single binary decision: carve north or carve east. No stack, no frontier list, no union-find — just a single loop and a coin flip per cell.\n\nThe simplicity comes at a cost: every maze has a visible **diagonal bias**. The top row always has a continuous open corridor, and the right column is always fully open. This makes the algorithm trivially predictable but visually distinctive.",

  howItWorks:
    "1. Iterate over every passage cell (odd row, odd col) left-to-right, top-to-bottom.\n" +
    "2. For each cell, determine which neighbors are available: north (if not on row 1) and east (if not on last column).\n" +
    "3. If both are available: flip a coin — carve north or carve east.\n" +
    "4. If only one is available: carve that direction (forced move).\n" +
    "5. If neither is available (top-right corner): leave the cell isolated.\n\n" +
    "### Binary Decision Per Cell\n\n" +
    "```\n" +
    "For cell (3,3):  Can go N → (1,3)? Yes. Can go E → (3,5)? Yes.\n" +
    "Coin flip → go North → carve wall at (2,3)\n" +
    "```\n\n" +
    "> *This produces perfect mazes but with always-open top row and right column — a recognizable signature bias.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    Node((Cell)) --"Pick North or West"--> North((North))\n' +
    '    Node -.-"Biased Diagonal".-> West((West))\n' +
    "```\n\n",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V)`**\n\n" +
    "- Exactly one decision per passage cell, O(1) work per cell. Total is O(V/4) ≈ O(V).\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "- No extra storage beyond the grid itself. No visited array, no frontier, no stack.",

  bestAndWorstCase:
    "**Best case = Worst case = O(V):** The algorithm is a single deterministic scan with one random choice per cell. There is no variability in runtime — it always processes every passage cell exactly once.",

  realWorldUses: [
    "**Teaching Tool:** The simplest possible perfect maze algorithm — ideal for introducing maze generation concepts.",
    "**Embedded Systems:** O(1) memory makes it suitable for microcontrollers where RAM is severely limited.",
    "**Puzzle Generation:** The diagonal bias creates predictable easy mazes useful for beginner puzzle books.",
    "**Performance Baseline:** Used as the fastest possible baseline when benchmarking other maze algorithms.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Trivially simple — 10 lines of code produce a complete perfect maze.",
      "O(1) extra memory — no auxiliary data structures whatsoever.",
      "Deterministic linear scan makes it cache-friendly and extremely fast.",
    ],
    limitations: [
      "Strong diagonal bias: the top row and right column are always continuous open corridors.",
      "Mazes are predictable — experienced players immediately exploit the always-open edges.",
      "Not suitable for any application requiring unbiased or visually natural-looking mazes.",
    ],
  },

  whenToUseIt:
    "Choose **Binary Tree Maze** when simplicity and speed are paramount and the diagonal bias is acceptable — teaching environments, minimal-resource embedded systems, or trivially easy puzzle mazes.\n\nAvoid it in any context where the bias would be noticed or exploited. For unbiased mazes use Aldous-Broder; for fast unbiased alternatives use Wilson's algorithm.",
};
