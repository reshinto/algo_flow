import type { EducationalContent } from "@/types";

export const rotateMatrixEducational: EducationalContent = {
  overview:
    "**Rotate Matrix 90° Clockwise** transforms an n×n matrix in-place so that each element moves to the position it would occupy after a quarter-turn clockwise. Rather than allocating a second matrix, the algorithm achieves this with two sequential in-place passes over the data.\n\n" +
    "The approach is a two-step decomposition: **transpose** the matrix (reflect over the main diagonal), then **reverse each row**. Together, these two O(n²) passes produce the 90° clockwise rotation without any extra memory.",

  howItWorks:
    "The algorithm runs in two passes:\n\n" +
    "**Pass 1 — Transpose**\n\n" +
    "Swap every element `matrix[rowIdx][colIdx]` with `matrix[colIdx][rowIdx]` for all positions where `colIdx > rowIdx`. This reflects the matrix over its main diagonal, turning rows into columns.\n\n" +
    "**Pass 2 — Reverse each row**\n\n" +
    "Walk each row with two pointers (`leftCol` and `rightCol`) swapping from the outside in until they meet. Reversing the rows after a transpose is equivalent to rotating the whole matrix 90° clockwise.\n\n" +
    "### Example: 3 × 3 matrix\n\n" +
    "```\n" +
    "Input:       After transpose:   After row-reverse:\n" +
    "1  2  3      1  4  7            7  4  1\n" +
    "4  5  6  →   2  5  8       →    8  5  2\n" +
    "7  8  9      3  6  9            9  6  3\n" +
    "```\n\n" +
    "The final matrix `[[7,4,1],[8,5,2],[9,6,3]]` is the original rotated 90° clockwise.\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  subgraph Input["Input"]\n' +
    '    I["1 2 3\\n4 5 6\\n7 8 9"]\n' +
    "  end\n" +
    '  subgraph T["After Transpose"]\n' +
    '    TR["1 4 7\\n2 5 8\\n3 6 9"]\n' +
    "  end\n" +
    '  subgraph R["After Row-Reverse"]\n' +
    '    RR["7 4 1\\n8 5 2\\n9 6 3"]\n' +
    "  end\n" +
    '  Input -->|"swap [i][j] ↔ [j][i]"| T\n' +
    '  T -->|"reverse each row"| R\n' +
    "  style I fill:#06b6d4,stroke:#0891b2\n" +
    "  style TR fill:#f59e0b,stroke:#d97706\n" +
    "  style RR fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Transpose turns columns into rows, then reversing each row shifts all elements to their final clockwise positions — element `1` travels from `[0][0]` to `[0][2]` across both passes.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "The transpose visits every element above the main diagonal — roughly n²/2 swaps. The row-reverse visits every element again — roughly n²/2 more swaps. Both passes are O(n²), giving an overall O(n²) time cost.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "All swaps are done in-place using a single temporary variable. No auxiliary matrix or extra data structure is allocated.",

  bestAndWorstCase:
    "**Best case** — a 1×1 matrix: zero swaps in the transpose, zero swaps in the row-reverse. The algorithm runs in O(1).\n\n" +
    "**Worst case** — any n×n matrix: both passes run to completion in O(n²). There is no early-exit condition, so all cases are equal in asymptotic cost.\n\n" +
    "A 2×2 matrix is a useful sanity check: `[[1,2],[3,4]]` → transpose → `[[1,3],[2,4]]` → reverse rows → `[[3,1],[4,2]]`, which matches the expected 90° clockwise result.",

  realWorldUses: [
    "**Image rotation:** Rotating a pixel buffer (represented as a 2D grid) 90° clockwise is a foundational operation in image editors, game engines, and GPU shaders.",
    "**Display orientation:** Mobile operating systems rotate framebuffer matrices when the device tilts — the same transpose-then-reverse pattern underlies efficient hardware implementations.",
    "**Game boards and puzzles:** Tetris-style piece rotation, sliding-puzzle state generation, and chess board mirroring all rely on matrix rotation.",
    "**Computer vision preprocessing:** Aligning image datasets to a canonical orientation before feeding them into a neural network reduces the burden on the model and improves generalization.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) extra space — in-place rotation with only a single temp variable.",
      "Simple two-pass decomposition — easy to reason about correctness and to verify by hand.",
      "Cache-friendly access pattern — the transpose pass walks rows sequentially; the reverse pass is also row-sequential.",
    ],
    limitations: [
      "Squares only — the in-place approach requires n×n input; rotating an m×n (non-square) matrix in-place is significantly more complex.",
      "Clockwise only — rotating counter-clockwise requires a different decomposition (reverse rows first, then transpose), and 180° rotation needs two reversal passes.",
      "n² touches — for very large matrices, even O(n²) can be costly; hardware-accelerated rotation (SIMD, GPU texture sampling) is preferred in performance-critical paths.",
    ],
  },

  whenToUseIt:
    "Use this algorithm whenever you need to rotate a square matrix in-place with O(1) extra memory — interview problems, game state manipulation, image processing pipelines running on constrained hardware. If the matrix is non-square, or you need counter-clockwise / 180° rotation, adapt accordingly: for counter-clockwise, reverse each row first then transpose; for 180°, reverse all rows then reverse all columns.",
};
