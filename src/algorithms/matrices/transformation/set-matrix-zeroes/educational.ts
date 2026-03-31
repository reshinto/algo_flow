import type { EducationalContent } from "@/types";

export const setMatrixZeroesEducational: EducationalContent = {
  overview:
    "**Set Matrix Zeroes** modifies a matrix in-place so that if any cell contains `0`, " +
    "every cell in that cell's row and every cell in that cell's column is set to `0`.\n\n" +
    "The challenge is doing this without accidentally propagating zeros from cells you just zeroed out. " +
    "The O(1)-space trick uses the matrix's own **first row and first column as a marker array**, " +
    "avoiding any extra storage beyond two boolean flags.",

  howItWorks:
    "The algorithm runs in two phases:\n\n" +
    "**Preliminary:** Record whether the first row and first column themselves contain a zero " +
    "(stored in `firstRowHasZero` and `firstColHasZero`) — we will need this later.\n\n" +
    "**Phase 1 — Scan and mark (inner cells only):**\n" +
    "For every cell `(row, col)` where `row ≥ 1` and `col ≥ 1`:\n" +
    "- If `matrix[row][col] == 0`, set `matrix[row][0] = 0` and `matrix[0][col] = 0`.\n\n" +
    "This records which rows and columns must be zeroed using the first row/column as scratch space.\n\n" +
    "**Phase 2 — Zero inner cells:**\n" +
    "For every inner cell `(row, col)` where `row ≥ 1` and `col ≥ 1`:\n" +
    "- If `matrix[row][0] == 0` OR `matrix[0][col] == 0`, set `matrix[row][col] = 0`.\n\n" +
    "**Cleanup:** Finally, zero the first row if `firstRowHasZero`, and zero the first column if `firstColHasZero`.\n\n" +
    "### Example\n\n" +
    "```\n" +
    "Input:           After:\n" +
    "1  1  1          1  0  1\n" +
    "1  0  1    →     0  0  0\n" +
    "1  1  1          1  0  1\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m × n)`**\n\n" +
    "The algorithm makes two full passes over the matrix — phase 1 scans all inner cells, " +
    "phase 2 updates them. Each pass is `O(m × n)`, giving `O(m × n)` overall.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only two boolean variables (`firstRowHasZero`, `firstColHasZero`) are used. " +
    "The first row and first column serve as markers entirely within the existing matrix. " +
    "No auxiliary arrays are allocated.",

  bestAndWorstCase:
    "**Best case** — no zeros in the matrix: the algorithm still scans all cells in `O(m × n)` " +
    "but makes no changes beyond the initial scan. No early exit exists.\n\n" +
    "**Worst case** — every cell is `0`: every cell gets zeroed (already zero), " +
    "still `O(m × n)` time. The two-phase structure means we cannot do better.\n\n" +
    "All cases are equal asymptotically — the algorithm is `O(m × n)` regardless of input content.",

  realWorldUses: [
    "**Sparse matrix compression:** Detecting and propagating zero regions is a preprocessing step in some sparse formats.",
    "**Image masking:** If a pixel in a mask layer is black (0), block the entire row and column — used in certain filter effects.",
    "**Database null propagation:** In some analytics engines, a null in a join key zeroes out related aggregate rows and columns.",
    "**Game grids:** Clearing entire rows and columns from a triggered cell (e.g., puzzle games like Tetris row-clear variants).",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) extra space — no auxiliary arrays needed; the matrix itself acts as the marker structure.",
      "O(m × n) time — optimal since every cell must be inspected at least once.",
      "Handles edge cases cleanly: single row, single column, all-zeros, and no-zeros matrices.",
    ],
    limitations: [
      "Mutates the original matrix — callers who need the original must copy before calling.",
      "The first-row/first-column marker trick is non-obvious and requires careful ordering (inner cells before boundaries).",
      "Extending to 3D tensors requires significantly more bookkeeping for each dimension's marker plane.",
    ],
  },

  whenToUseIt:
    "Use this algorithm whenever you need to zero out entire rows and columns of a matrix in O(1) space. " +
    "The marker trick is elegant but subtle — if mutation of the input is not acceptable, " +
    "use an O(m + n) approach with two separate boolean arrays for clarity. " +
    "This pattern generalises to any 'mark-then-apply' grid problem where you cannot use auxiliary storage.",
};
