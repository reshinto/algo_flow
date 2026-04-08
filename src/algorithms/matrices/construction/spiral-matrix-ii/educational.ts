import type { EducationalContent } from "@/types";

export const spiralMatrixIIEducational: EducationalContent = {
  overview:
    "**Spiral Matrix II** constructs an n×n matrix filled with the integers 1 through n² arranged in clockwise spiral order. " +
    "Starting from the top-left corner, values are placed in four passes per ring: **right** → **down** → **left** → **up**, " +
    "then all four boundaries shrink inward and the process repeats on the next inner ring until every cell is filled.\n\n" +
    "This is LeetCode 59 — the inverse problem of Spiral Order Traversal (LeetCode 54): instead of reading values from an " +
    "existing matrix, we write increasing values into a new one using the same boundary-shrinking technique.",

  howItWorks:
    "Maintain four boundary variables: `topBound`, `bottomBound`, `leftBound`, `rightBound`, " +
    "and a counter `currentValue` starting at 1. Each loop iteration fills one full spiral ring:\n\n" +
    "1. **Right** — fill `matrix[topBound][leftBound..rightBound]`, then `topBound++`.\n" +
    "2. **Down** — fill `matrix[topBound..bottomBound][rightBound]`, then `rightBound--`.\n" +
    "3. **Left** — fill `matrix[bottomBound][rightBound..leftBound]` (guard: `topBound ≤ bottomBound`), then `bottomBound--`.\n" +
    "4. **Up** — fill `matrix[bottomBound..topBound][leftBound]` (guard: `leftBound ≤ rightBound`), then `leftBound++`.\n\n" +
    "The two guards prevent double-filling when the matrix collapses to a single row or column.\n\n" +
    "### Example: n = 3\n\n" +
    "```\n" +
    "Fill order:  1  2  3  4  5  6  7  8  9\n" +
    "Result:\n" +
    "1  2  3\n" +
    "8  9  4\n" +
    "7  6  5\n" +
    "```\n\n" +
    "### Diagram: fill order for n = 3\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  subgraph Ring0["Outer ring (values 1–8)"]\n' +
    '    C00["1"] --> C01["2"] --> C02["3"]\n' +
    '    C02 --> C12["4"] --> C22["5"]\n' +
    '    C22 --> C21["6"] --> C20["7"]\n' +
    '    C20 --> C10["8"]\n' +
    "  end\n" +
    '  subgraph Center["Center"]\n' +
    '    C11["9"]\n' +
    "  end\n" +
    "  C10 --> C11\n" +
    "  style C00 fill:#06b6d4,stroke:#0891b2\n" +
    "  style C11 fill:#14532d,stroke:#22c55e\n" +
    "  style C01 fill:#f59e0b,stroke:#d97706\n" +
    "  style C02 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "Cyan marks the starting cell (top-left), amber shows the active outer ring being filled, and green marks the final center cell placed last.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "Every cell of the n×n matrix is written to exactly once, giving `n²` assignment operations total.\n\n" +
    "**Space Complexity: `O(1)` extra**\n\n" +
    "Only four integer boundary variables and a counter are used beyond the required output matrix. " +
    "The output matrix itself is not counted as extra space since it is the required return value.",

  bestAndWorstCase:
    "**Best case** — n = 1: a single placement step fills the 1×1 matrix, `O(1)`.\n\n" +
    "**Worst case** — any n > 1: `O(n²)` placements regardless of n. All cases are equivalent " +
    "because every cell must be filled — there is no early exit.\n\n" +
    "Non-square dimensions are not applicable here (the problem is always n×n), but the boundary guards " +
    "correctly handle odd-sized matrices where the spiral collapses to a single center cell.",

  realWorldUses: [
    "**Game board initialization:** Filling game tiles, puzzle grids, or board game cells in a visually ordered spiral pattern.",
    "**Matrix printing / display:** Generating aesthetic spiral-numbered grids for terminals, math puzzles, or educational tools.",
    "**Algorithm education:** Demonstrates boundary-shrinking construction as the canonical inverse of spiral traversal.",
    "**Image processing:** Assigning scan-order indices to pixels in a spiral sampling pattern for certain compression schemes.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n²) time — optimal since every cell must be written exactly once.",
      "O(1) extra space — only boundary variables needed beyond the output matrix.",
      "Clean boundary-shrinking logic reusable for related problems (rotation, layer peeling).",
      "Handles the n = 1 edge case correctly without special-casing.",
    ],
    limitations: [
      "Produces only clockwise spirals starting from the top-left — other directions or starting positions require code modifications.",
      "Fixed to square matrices (n×n) — rectangular variants need separate row/col size parameters.",
      "Not cache-optimal for large n — access pattern jumps across rows and columns instead of following a single stride.",
    ],
  },

  whenToUseIt:
    "Use Spiral Matrix II when you need to generate a matrix with a specific fill order for display, testing, " +
    "or puzzle construction. The exact same boundary-shrinking pattern applies to matrix rotation and layer-by-layer " +
    "processing — mastering this pattern unlocks a family of related matrix problems. For simple sequential fill " +
    "(row-major), prefer a nested loop; choose spiral fill only when the spiral order is semantically required.",
};
