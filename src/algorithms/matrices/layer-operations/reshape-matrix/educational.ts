import type { EducationalContent } from "@/types";

export const reshapeMatrixEducational: EducationalContent = {
  overview:
    "**Reshape Matrix** transforms an m×n matrix into a new r×c matrix while preserving the original row-major (left-to-right, top-to-bottom) element order. If the total element count differs (m×n ≠ r×c), the original matrix is returned unchanged.\n\n" +
    "The key insight is using a single flat index to bridge source and destination coordinates. This avoids nested loop coupling and keeps the algorithm clean and O(m×n).",

  howItWorks:
    "First validate that `m × n == r × c`. If not, return the original matrix immediately.\n\n" +
    "Then iterate a single flat index `flatIdx` from 0 to m×n−1:\n\n" +
    "1. **Source coordinates** — `srcRow = flatIdx ÷ sourceCols`, `srcCol = flatIdx % sourceCols`.\n" +
    "2. **Destination coordinates** — `dstRow = flatIdx ÷ targetCols`, `dstCol = flatIdx % targetCols`.\n" +
    "3. **Copy** — `result[dstRow][dstCol] = matrix[srcRow][srcCol]`.\n\n" +
    "The flat index unifies both coordinate spaces: the same linear position maps to different (row, col) pairs depending on the number of columns.\n\n" +
    "### Example: 2 × 2 → 1 × 4\n\n" +
    "```\n" +
    "Input:   [[1, 2],    Output: [[1, 2, 3, 4]]\n" +
    "          [3, 4]]\n" +
    "```\n\n" +
    "flatIdx 0 → (0,0)→(0,0)=1, flatIdx 1 → (0,1)→(0,1)=2, flatIdx 2 → (1,0)→(0,2)=3, flatIdx 3 → (1,1)→(0,3)=4",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m × n)`**\n\n" +
    "Every element is visited and copied exactly once. The impossibility check is O(1).\n\n" +
    "**Space Complexity: `O(1)` extra**\n\n" +
    "Only index variables are allocated beyond the required output matrix. The output itself is not counted as extra space since it is the return value.",

  bestAndWorstCase:
    "**Best case** — m×n ≠ r×c (impossible reshape): returns immediately in O(1) after the size check.\n\n" +
    "**Worst case** — any valid reshape: O(m×n) to fill the output matrix. All valid inputs have the same cost; there is no early-exit shortcut once the reshape is confirmed possible.",

  realWorldUses: [
    "**Deep learning:** Tensor reshape is a fundamental operation in neural networks (e.g., flattening a feature map before a fully-connected layer).",
    "**Image processing:** Converting between row-major 1D pixel buffers and 2D image grids uses the same flat-index mapping.",
    "**Data pipelines:** Reshaping tabular data from wide format to long format, or vice versa, mirrors this algorithm's logic.",
    "**Scientific computing:** NumPy's `reshape` and MATLAB's `reshape` are direct implementations of this exact pattern.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(m × n) time — optimal since every element must be placed into the output.",
      "O(1) extra space — the flat-index trick avoids auxiliary data structures.",
      "Clean single-loop structure — the flat index eliminates nested loop coupling and makes the mapping explicit.",
    ],
    limitations: [
      "Requires m×n == r×c — no partial fills or padding are supported.",
      "Row-major order only — column-major or custom strides require modifying the coordinate mapping.",
      "Returns the original matrix on invalid input rather than throwing an error — callers must check if the returned shape matches the requested shape.",
    ],
  },

  whenToUseIt:
    "Use Reshape Matrix whenever you need to reinterpret the layout of a 2D array without changing its element order. This is the canonical O(m×n) single-pass solution for LeetCode 566. For in-place reshape (only possible when row counts match), a rotation-based approach may avoid allocating the output array. For multi-dimensional reshapes, extend the flat-index mapping to the appropriate number of dimensions.",
};
