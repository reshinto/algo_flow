import type { EducationalContent } from "@/types";

export const transposeMatrixEducational: EducationalContent = {
  overview:
    "**Transpose Matrix** reflects a matrix along its main diagonal, turning rows into columns and columns into rows. " +
    "For a matrix `M` where `M[i][j]` holds a value, the transpose `T` satisfies `T[j][i] = M[i][j]`.\n\n" +
    "For **square matrices** (m = n), the swap can be done in-place without any extra space. " +
    "For **non-square matrices** (m ≠ n), a new matrix of dimensions n × m must be allocated.",

  howItWorks:
    "**Square matrix (in-place):**\n\n" +
    "Iterate over every cell strictly above the main diagonal — where `col > row`. " +
    "Swap `matrix[row][col]` with `matrix[col][row]`. Cells on the diagonal and below are never touched twice.\n\n" +
    "```\n" +
    "Input 3×3:     After transpose:\n" +
    "1  2  3        1  4  7\n" +
    "4  5  6   →    2  5  8\n" +
    "7  8  9        3  6  9\n" +
    "```\n\n" +
    "**Non-square matrix (new matrix):**\n\n" +
    "Allocate `result[colCount][rowCount]`, then for every `(rowIdx, colIdx)` in the original, " +
    "assign `result[colIdx][rowIdx] = matrix[rowIdx][colIdx]`.\n\n" +
    "```\n" +
    "Input 2×3:     After transpose (3×2):\n" +
    "1  2  3        1  4\n" +
    "4  5  6   →    2  5\n" +
    "               3  6\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m × n)`**\n\n" +
    "Every element is visited exactly once. For a square matrix of size n × n this is `O(n²)`; " +
    "for a general m × n matrix it is `O(m × n)`.\n\n" +
    "**Space Complexity: `O(1)` for square, `O(m × n)` for non-square**\n\n" +
    "Square matrices are transposed using only a single temporary variable. " +
    "Non-square matrices require a new matrix of size n × m since the shape itself changes.",

  bestAndWorstCase:
    "**Best case** — a 1 × 1 matrix: `O(1)` time, no swaps needed.\n\n" +
    "**Square matrices** — the in-place path visits exactly `n(n-1)/2` pairs (upper-triangle cells), " +
    "all O(n²) in total with O(1) space.\n\n" +
    "**Non-square matrices** — always `O(m × n)` time and space regardless of content. " +
    "There is no early-exit condition; all cells must be copied to produce the correct shape.",

  realWorldUses: [
    "**Linear algebra:** Transposing is a fundamental matrix operation required for dot products, computing the inverse, and solving systems of equations.",
    "**Image rotation:** Combining a transpose with a horizontal flip produces a 90-degree clockwise image rotation.",
    "**Data reshaping:** Converting row-oriented data (one record per row) to column-oriented data (one feature per column) for analytical workloads.",
    "**Graph algorithms:** Transposing an adjacency matrix gives the reverse graph, which is used in Kosaraju's algorithm for strongly connected components.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) extra space for square matrices — no auxiliary storage beyond a single temp variable.",
      "O(m × n) time — optimal since every element must be touched at least once.",
      "Clean separation of square vs. non-square cases keeps the logic straightforward.",
    ],
    limitations: [
      "Non-square matrices always require O(m × n) auxiliary space — unavoidable since the output dimensions differ.",
      "In-place square transpose has poor cache behaviour on large matrices: the column-access pattern (strided reads) causes many cache misses.",
      "Mutates the input square matrix — callers who need the original must make a copy before calling.",
    ],
  },

  whenToUseIt:
    "Use transpose whenever you need to reflect a matrix along its main diagonal — as part of image rotation, " +
    "graph reversal, or data reshaping. For square matrices the in-place approach is ideal when mutation is acceptable. " +
    "For non-square matrices (or when you must preserve the original), allocate a fresh result matrix. " +
    "Avoid transpose for very large matrices where cache-miss overhead is prohibitive — consider cache-oblivious or tiled transpose algorithms instead.",
};
