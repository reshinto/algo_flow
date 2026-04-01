import type { EducationalContent } from "@/types";

export const kruskalsMazeEducational: EducationalContent = {
  overview:
    "**Kruskal's Maze** applies Randomized Kruskal's minimum spanning tree algorithm to maze generation. It treats all walls between cells as edges and randomly removes them — but only when the two cells on either side belong to different connected components. This guarantees no cycles and a perfect maze.\n\nThe Union-Find data structure tracks which cells are connected, enabling O(α(V)) per-wall merge operations.",

  howItWorks:
    "1. Treat every passage cell (odd row and col) as a node in a forest; each starts in its own set.\n" +
    "2. Collect all walls between adjacent passage cells into a list.\n" +
    "3. Shuffle the wall list randomly.\n" +
    "4. For each wall, check if the two cells on either side belong to different sets.\n" +
    "5. If yes: remove the wall (carve a passage) and merge the two sets.\n" +
    "6. If no: skip (they are already connected — removing would create a cycle).\n" +
    "7. Continue until all walls are processed — the result is a spanning tree (perfect maze).\n\n" +
    "### Union-Find Merge\n\n" +
    "```\n" +
    "Initially: {A}, {B}, {C}, {D}\n" +
    "Remove A-B wall → {A, B}, {C}, {D}\n" +
    "Remove C-D wall → {A, B}, {C, D}\n" +
    "Remove B-C wall → {A, B, C, D}  ← all connected\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(E · α(V))`**\n\n" +
    "- `E` = number of internal walls, `α` = inverse Ackermann function (effectively constant). Shuffling the wall list is O(E).\n\n" +
    "**Space Complexity: `O(V)`**\n\n" +
    "- The Union-Find array holds one entry per cell. The wall list holds O(E) entries.",

  bestAndWorstCase:
    "**Best case:** The shuffle happens to process walls in a nearly optimal order — the maze is completed after processing roughly V-1 walls.\n\n" +
    "**Worst case:** Many walls are skipped because their cells are already connected — nearly all E walls are examined before a spanning tree emerges. In all cases runtime is O(E · α(V)).",

  realWorldUses: [
    "**Network Infrastructure:** Building minimum cost spanning trees for power grids and network cables.",
    "**Cluster Detection:** Identifying connected components in social network graphs.",
    "**Game Level Generation:** Creating scatter-patch mazes that gradually connect into a single labyrinth.",
    "**Academic Teaching:** Kruskal's maze is the canonical example of Union-Find applied to graph connectivity.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Produces mazes with a distinctive scattered-patch visual style as sets merge.",
      "Union-Find ensures no cycles are created — perfect maze guaranteed.",
      "The algorithm can be paused and resumed trivially — each wall decision is independent.",
    ],
    limitations: [
      "The naive Union-Find relabeling is O(V) per merge — use path compression and union by rank for large grids.",
      "Must collect all walls upfront, requiring O(E) extra memory before generation begins.",
      "Mazes tend to look similar to Prim's — both lack the long corridor bias of DFS.",
    ],
  },

  whenToUseIt:
    "Choose **Kruskal's Maze** when you want a visually interesting generation animation showing scattered patches gradually merging, or when you need to demonstrate Union-Find data structures. It produces perfect mazes with properties similar to Prim's.\n\nAvoid it when memory is constrained (the wall list must be stored), or when the distinctive scatter-merge visual is not desired.",
};
