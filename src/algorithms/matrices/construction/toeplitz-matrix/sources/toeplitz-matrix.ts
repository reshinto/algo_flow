// Toeplitz Matrix Verification
// Determines if a matrix is a Toeplitz matrix — every descending diagonal
// from left to right contains all equal elements.
// LeetCode 766
// Time: O(m × n) — every cell (except first row/col) is compared exactly once
// Space: O(1)

function toeplitzMatrix(matrix: number[][]): boolean {
  const rowCount = matrix.length; // @step:initialize
  const colCount = matrix[0]!.length; // @step:initialize

  for (let rowIdx = 1; rowIdx < rowCount; rowIdx++) {
    for (let colIdx = 1; colIdx < colCount; colIdx++) {
      const current = matrix[rowIdx]![colIdx]!; // @step:compare-cell
      const upperLeft = matrix[rowIdx - 1]![colIdx - 1]!; // @step:compare-cell
      if (current !== upperLeft) return false; // @step:compare-cell
    }
  }

  return true; // @step:complete
}
