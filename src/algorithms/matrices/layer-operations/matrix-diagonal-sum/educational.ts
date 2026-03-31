import type { EducationalContent } from "@/types";

export const matrixDiagonalSumEducational: EducationalContent = {
  overview:
    "**Matrix Diagonal Sum** computes the sum of all elements on the primary diagonal (top-left to bottom-right) and the secondary diagonal (top-right to bottom-left) of a square matrix.\n\n" +
    "Because both diagonals cross at the center cell in odd-sized matrices, that center element is counted twice and must be subtracted once to get the correct total. This gives an O(n) algorithm with O(1) extra space — a single pass with no auxiliary data structures.",

  howItWorks:
    "Initialize a `runningSum` variable to zero, then iterate over each index `diagIdx` from 0 to n−1:\n\n" +
    "1. **Primary diagonal** — add `matrix[diagIdx][diagIdx]` (top-left to bottom-right).\n" +
    "2. **Secondary diagonal** — add `matrix[diagIdx][n−1−diagIdx]` (top-right to bottom-left).\n\n" +
    "After the loop, check if `n` is odd. If so, the center element `matrix[n/2][n/2]` lies on both diagonals and has been added twice — subtract it once.\n\n" +
    "### Example: 3 × 3 matrix\n\n" +
    "```\n" +
    "1  2  3\n" +
    "4  5  6\n" +
    "7  8  9\n" +
    "```\n\n" +
    "Primary: 1 + 5 + 9 = 15  \n" +
    "Secondary: 3 + 5 + 7 = 15  \n" +
    "Center overlap (5) subtracted once → **Result: 25**",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "The algorithm iterates once over n indices, performing a constant number of additions per iteration. The optional center subtraction is O(1).\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a single integer accumulator is used. No auxiliary arrays, maps, or stacks are allocated.",

  bestAndWorstCase:
    "**Best case** — a 1 × 1 matrix: two diagonal reads on the same cell, one subtraction, O(1).\n\n" +
    "**Worst case** — an n × n matrix: exactly n iterations regardless of values. All inputs have the same cost; there is no shortcutting or early exit.\n\n" +
    "Even matrices (n even) avoid the center subtraction step, saving one operation, but asymptotically this makes no difference.",

  realWorldUses: [
    "**Image processing:** Diagonal pixel patterns are used in edge detection filters and texture analysis; summing both diagonals is a fast pre-check for symmetry.",
    "**Numerical methods:** Diagonal dominance checks in iterative solvers (e.g., Gauss-Seidel) rely on quickly accumulating diagonal sums.",
    "**Game boards:** Checking win conditions on diagonal lines in games like chess or Reversi reduces to summing diagonal entries.",
    "**Matrix property checks:** Symmetric, anti-symmetric, and trace calculations all involve diagonal access patterns similar to this algorithm.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — optimal since both diagonals each contain n elements.",
      "O(1) extra space — no auxiliary structures needed.",
      "Simple to extend: adding more diagonal patterns (e.g., sub-diagonals) requires minimal changes.",
    ],
    limitations: [
      "Square matrices only — rectangular matrices have no single well-defined primary diagonal.",
      "Returns a scalar, not individual diagonal elements; callers needing per-element data must iterate manually.",
      "Does not generalize to higher-dimensional tensors without significant restructuring.",
    ],
  },

  whenToUseIt:
    "Use Matrix Diagonal Sum whenever you need to aggregate both diagonals of a square matrix in a single pass. It is the canonical O(n) solution for LeetCode 1572 and similar problems. If you only need the primary diagonal (the trace), a simpler loop suffices. For non-square matrices, clarify which diagonal semantics apply before applying this pattern.",
};
