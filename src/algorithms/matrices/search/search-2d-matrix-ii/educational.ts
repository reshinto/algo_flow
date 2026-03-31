import type { EducationalContent } from "@/types";

export const search2DMatrixIIEducational: EducationalContent = {
  overview:
    "**Search a 2D Matrix II** handles a more general sorted matrix: each row is sorted left-to-right and each column is sorted top-to-bottom, but the first element of one row need not be greater than the last element of the previous row.\n\n" +
    "The staircase search starts at the **top-right corner** — the unique position where moving left decreases the value and moving down increases it. Each comparison eliminates either an entire column or an entire row.",

  howItWorks:
    "Start at `currentRow = 0`, `currentCol = colCount − 1` (top-right corner):\n\n" +
    "1. Read `currentValue = matrix[currentRow][currentCol]`.\n" +
    "2. If `currentValue === target` → return `true`.\n" +
    "3. If `currentValue > target` → move **left** (`currentCol--`), eliminating the current column.\n" +
    "4. If `currentValue < target` → move **down** (`currentRow++`), eliminating the current row.\n" +
    "5. Repeat until out of bounds → return `false`.\n\n" +
    "### Why does this work?\n\n" +
    "At the top-right corner, all values to the left are smaller (row-sorted) and all values below are larger (column-sorted). If the current value is too large, every value below it in this column is also too large — safe to discard the column. If too small, every value to its left in this row is also too small — safe to discard the row.\n\n" +
    "### Example: 5 × 5 matrix, target = 5\n\n" +
    "```\n" +
    " 1  4  7 11 15\n" +
    " 2  5  8 12 19\n" +
    " 3  6  9 16 22\n" +
    "10 13 14 17 24\n" +
    "18 21 23 26 30\n" +
    "```\n\n" +
    "Start at [0][4] = 15 > 5 → move left. [0][3] = 11 > 5 → left. [0][2] = 7 > 5 → left. [0][1] = 4 < 5 → down. [1][1] = 5 = target → found!",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m + n)`**\n\n" +
    "Each step either decrements `currentCol` or increments `currentRow`. At most `m + n − 1` steps are possible before one pointer goes out of bounds. No element is visited more than once.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only two pointer variables and a local value are maintained. The algorithm operates entirely in-place.",

  bestAndWorstCase:
    "**Best case** — target is at the top-right corner: found immediately in `O(1)`.\n\n" +
    "**Worst case** — target is absent or at the bottom-left corner: `O(m + n)` steps traversing the entire staircase path from top-right to bottom-left.\n\n" +
    "Unlike binary search, the staircase approach cannot exploit the strict row-continuity guarantee. If that guarantee holds, binary search on the virtual 1D array achieves `O(log(m × n))` — faster for large matrices.",

  realWorldUses: [
    "**Spreadsheet range queries:** Finding a value in a two-way sorted pivot table without scanning every cell.",
    "**Biostatistics:** Searching sorted gene expression tables where rows and columns both follow sorted biological orderings.",
    "**Time-series correlation matrices:** Sorted interaction matrices in signal processing or financial analysis.",
    "**Interview preparation:** LeetCode 240 — one of the most cited examples of exploiting sorted structure with a two-direction pointer.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Works on the more general sorted matrix variant — no cross-row continuity required.",
      "Intuitive: the top-right corner invariant is easy to explain and reason about.",
      "O(m + n) time — linear in the dimensions, not the total element count.",
      "O(1) space — no auxiliary storage needed.",
    ],
    limitations: [
      "Slower than binary search when the stricter row-continuity property holds — `O(m + n)` vs `O(log(m × n))`.",
      "Only works for fully sorted matrices (row-sorted AND column-sorted). An unsorted or only partially sorted matrix requires a different approach.",
      "Starting from the bottom-left corner works equally well but is a common source of off-by-one errors.",
    ],
  },

  whenToUseIt:
    "Use the staircase search when the matrix is sorted per row and per column but does NOT guarantee that the first element of each row is greater than the last element of the previous row (LeetCode 240 variant). For the stricter variant where rows are globally sorted in sequence (LeetCode 74), prefer binary search on the virtual 1D array for its superior `O(log(m × n))` time complexity.",
};
