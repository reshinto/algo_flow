import type { EducationalContent } from "@/types";

export const pascalsTriangleEducational: EducationalContent = {
  overview:
    "**Pascal's Triangle** is a triangular array of numbers where each element is the sum of the two elements directly above it. Row and column edges are always 1.\n\n" +
    "It is named after the French mathematician Blaise Pascal, though earlier records exist in Persian, Indian, and Chinese mathematics. Despite its simple construction rule, Pascal's Triangle encodes a remarkable range of mathematical patterns — including binomial coefficients, Fibonacci numbers, and combinatorial identities.",

  howItWorks:
    "Build the triangle row by row, starting with `[1]`:\n\n" +
    "1. **Edge cells** — the first and last element of every row are always `1`.\n" +
    "2. **Inner cells** — each inner element `pascal[row][col]` equals `pascal[row-1][col-1] + pascal[row-1][col]`.\n\n" +
    "### Example: 5 rows\n\n" +
    "```\n" +
    "        1\n" +
    "       1 1\n" +
    "      1 2 1\n" +
    "     1 3 3 1\n" +
    "    1 4 6 4 1\n" +
    "```\n\n" +
    "Row 4 (0-indexed) inner cells: `1+3=4`, `3+3=6`, `3+1=4`.\n\n" +
    "To visualize as a rectangular matrix, shorter rows are padded with zeros — so the full output is an `n × n` grid where only the upper-left triangle is filled.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "Row `r` contains `r + 1` elements, and we fill each exactly once. The total cell count is `1 + 2 + ... + n = n(n+1)/2`, which is `O(n²)`.\n\n" +
    "**Space Complexity: `O(1)` extra**\n\n" +
    "Beyond the output triangle itself, only a constant number of scalar variables are used at any time. The previous row is referenced in-place inside the growing result array rather than copied.",

  bestAndWorstCase:
    "**Best case** — `numRows = 1`: a single `[1]` element, `O(1)`.\n\n" +
    "**Worst case** — any `numRows = n`: all `O(n²)` cells must be filled because each inner cell depends on the previous row. There is no shortcut — the algorithm is optimal since it fills exactly as many cells as the output requires.\n\n" +
    "There is no distinction between best and worst beyond input size; the algorithm is deterministic.",

  realWorldUses: [
    "**Combinatorics:** `pascal[n][k]` equals `C(n, k)` — the number of ways to choose `k` items from `n`. This is used directly in probability, statistics, and combinatorial optimization.",
    "**Binomial expansion:** The coefficients of `(a + b)^n` are exactly row `n` of Pascal's Triangle — used in algebra, polynomial arithmetic, and cryptography.",
    "**Fractal geometry:** Coloring cells by parity (odd/even) produces the Sierpiński triangle — a well-known fractal pattern studied in chaos theory.",
    "**Image processing:** Pascal coefficients form Gaussian-like smoothing kernels used for edge detection and blurring filters.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n²) time — optimal since every output cell is produced by a single addition.",
      "O(1) extra space — each row references only the one above it, which is already stored in the output.",
      "Simple, cache-friendly access pattern — each row is built left to right using only the previous row.",
    ],
    limitations: [
      "Output grows as O(n²) cells — for very large `n`, the triangle itself consumes substantial memory.",
      "Each row is shorter than the full width — naively padding all rows to width `n` wastes half the storage for large triangles.",
      "Not suitable for looking up a single `C(n, k)` value efficiently — computing the full triangle is wasteful if only one cell is needed.",
    ],
  },

  whenToUseIt:
    "Use Pascal's Triangle when you need all binomial coefficients up to row `n`, or when building an educational visualization of combinatorial relationships. For a single `C(n, k)` value, use the direct formula `n! / (k! × (n-k)!)` instead. For just one row, use the sliding-window row generator (DP approach) rather than building the entire triangle.",
};
