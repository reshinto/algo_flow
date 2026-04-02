import type { EducationalContent } from "@/types";

export const recursiveDivisionEducational: EducationalContent = {
  overview:
    "**Recursive Division** is the only common maze algorithm that works by *adding* walls rather than carving passages. It starts with a completely open grid and recursively divides it with walls, leaving exactly one gap in each wall as a passage.\n\nThis top-down approach produces mazes with a distinctive rectangular, room-like structure that is visually different from carving algorithms.",

  howItWorks:
    "1. Start with a completely open grid (all cells empty).\n" +
    "2. Choose an orientation: build a horizontal wall if the region is taller, vertical if wider.\n" +
    "3. Place a wall across the region at a random position, leaving one random gap.\n" +
    "4. Recursively apply the same process to each of the two sub-regions created by the wall.\n" +
    "5. Stop when a sub-region is too small to divide (width or height < 2).\n\n" +
    "### Division Pattern\n\n" +
    "```\n" +
    "Open region → horizontal wall + gap:\n" +
    "  ┌─────────┐     ┌─────────┐\n" +
    "  │         │  →  │         │\n" +
    "  │         │     │──── ────│\n" +
    "  │         │     │         │\n" +
    "  └─────────┘     └─────────┘\n" +
    "```\n\n" +
    "> *The recursive splits create nested rectangular sub-rooms, giving the maze a structured, architectural appearance.*\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    Room((Main Room)) --"Horizontal Wall"--> Sub1((Sub Room Top))\n' +
    "    Room --> Sub2((Sub Room Bot))\n" +
    '    Sub1 --"Vertical Wall"--> Sub3((Sub Room Quadrant))\n' +
    "```\n\n",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V)`**\n\n" +
    "- Each cell is part of exactly one wall being built at each recursion level. Total work across all levels sums to O(V) — each cell is touched a constant number of times.\n\n" +
    "**Space Complexity: `O(log V)`**\n\n" +
    "- The recursion stack depth is O(log V) since the region halves at each step. No additional storage beyond the grid is required.",

  bestAndWorstCase:
    "**Best case:** The random splits evenly bisect the grid at every level — the recursion tree is balanced and the algorithm finishes in O(log V) recursion depth.\n\n" +
    "**Worst case:** A degenerate split creates one region of size 1 and one of size n-1 at every level — the recursion depth reaches O(V). This is extremely rare with random placement.",

  realWorldUses: [
    "**Level Design:** Produces structured dungeon rooms with clear corridors between them.",
    "**Binary Space Partitioning:** Directly related to BSP trees used in 3D game engine culling.",
    "**Room Generators:** Sub-dividing a floor plan to create rooms is a natural application.",
    "**Image Segmentation:** Recursive quad-tree decomposition uses the same divide-and-conquer structure.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Produces architecturally structured mazes with rectangular rooms — visually distinct from carving algorithms.",
      "O(log V) stack depth makes it safe for large grids without overflow risk.",
      "Simple recursive implementation — easy to understand and modify.",
    ],
    limitations: [
      "Mazes have a noticeable rectangular bias — long straight walls are always present.",
      "Does not produce perfectly uniform random mazes — structural regularities are always visible.",
      "Passages can appear as narrow one-cell gaps in long walls, making navigation feel contrived.",
    ],
  },

  whenToUseIt:
    "Choose **Recursive Division** when you want structured, room-like mazes with clear rectangular regions and visible architectural order. It is ideal for dungeon games with distinct chambers connected by single-cell doorways.\n\nAvoid it when organic or naturally winding mazes are desired (use Recursive Backtracker or Prim's), or when the rectangular structural bias would be disruptive.",
};
