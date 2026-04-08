import type { EducationalContent } from "@/types";

export const antiDiagonalTraversalEducational: EducationalContent = {
  overview:
    "**Anti-Diagonal Traversal** visits every element of a 2D matrix exactly once, grouping elements along anti-diagonals where `row + col` is constant. " +
    "Each anti-diagonal is traversed top-to-bottom, and the diagonals themselves are processed from the top-left corner outward.\n\n" +
    "For an `m × n` matrix there are exactly `m + n - 1` anti-diagonals. This traversal needs no extra data structures — only a loop counter and simple index arithmetic.",

  howItWorks:
    "Iterate a `diagSum` counter from `0` to `m + n - 2`. For each diagonal, compute the row range that stays in-bounds:\n\n" +
    "- `startRow = diagSum < colCount ? 0 : diagSum - colCount + 1`\n" +
    "- `endRow   = diagSum < rowCount ? diagSum : rowCount - 1`\n\n" +
    "Within that range, walk `currentRow` from `startRow` to `endRow` and derive the column as `currentCol = diagSum - currentRow`.\n\n" +
    "### Example: 3 × 3 matrix\n\n" +
    "```\n" +
    "1  2  3\n" +
    "4  5  6\n" +
    "7  8  9\n" +
    "```\n\n" +
    "| diagSum | Elements      |\n" +
    "| ------- | ------------- |\n" +
    "| 0       | `[1]`         |\n" +
    "| 1       | `[2, 4]`      |\n" +
    "| 2       | `[3, 5, 7]`   |\n" +
    "| 3       | `[6, 8]`      |\n" +
    "| 4       | `[9]`         |\n\n" +
    "Result: `[1, 2, 4, 3, 5, 7, 6, 8, 9]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  D0["diagSum=0\\n[1]"] --> D1["diagSum=1\\n[2,4]"] --> D2["diagSum=2\\n[3,5,7]"] --> D3["diagSum=3\\n[6,8]"] --> D4["diagSum=4\\n[9]"]\n' +
    "  style D0 fill:#06b6d4,stroke:#0891b2\n" +
    "  style D1 fill:#14532d,stroke:#22c55e\n" +
    "  style D2 fill:#f59e0b,stroke:#d97706\n" +
    "  style D3 fill:#14532d,stroke:#22c55e\n" +
    "  style D4 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each node represents one anti-diagonal where all elements share the same `row + col` sum — the longest diagonal (`diagSum=2`) runs through the matrix center.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m × n)`**\n\n" +
    "Every cell is visited exactly once. The outer loop runs `m + n - 1` times and the total inner iterations across all diagonals equal `m × n`.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a handful of integer counters are used. The output array is the required return value and is not counted as auxiliary space.",

  bestAndWorstCase:
    "**Best case** — a 1 × 1 matrix: a single collect step, `O(1)`.\n\n" +
    "**Worst case** — any `m × n` matrix: `O(m × n)` regardless of shape. All cases are equivalent; the algorithm cannot short-circuit because every element must appear in the output.\n\n" +
    "Single-row and single-column matrices produce one element per anti-diagonal and are handled correctly without any special guards.",

  realWorldUses: [
    "**Image processing:** Anti-diagonal scans appear in some JPEG-style zig-zag encoding schemes that reorder DCT coefficients for entropy coding.",
    "**Matrix operations:** Computing anti-diagonal sums or products (e.g., checking a win condition in board games like Connect-Four along one direction).",
    "**Signal processing:** Hankel matrix construction and analysis iterate elements along constant `row + col` diagonals.",
    "**Competitive programming:** A foundation pattern for diagonal DP transitions in problems such as edit distance variants and matrix chain multiplication.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(m × n) time — optimal since every element must be visited.",
      "O(1) extra space — no auxiliary stack, queue, or visited array needed.",
      "Handles all matrix shapes (square, rectangular, single row/column) with a single unified loop.",
    ],
    limitations: [
      "Access pattern is column-jumping, not row-major — cache performance is worse than row-by-row iteration for large matrices.",
      "Produces one fixed anti-diagonal order; collecting diagonals in the opposite direction (bottom-right to top-left) or reversing within each diagonal requires code changes.",
      "Generalizing to 3D tensors requires non-trivial restructuring of the index arithmetic.",
    ],
  },

  whenToUseIt:
    "Use anti-diagonal traversal when a problem explicitly requires grouping or processing elements where `row + col` is constant — for example, zig-zag matrix encoding, diagonal DP table fills, or board-game diagonal checks. " +
    "For simple full-matrix scans, row-major order is faster in practice due to cache locality. " +
    "The index arithmetic pattern here (`diagSum`, `startRow`, `endRow`) is directly reusable for any problem whose recurrence runs along constant `row + col` diagonals.",
};
