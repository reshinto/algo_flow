// Search a 2D Matrix II (Staircase Search)
// Each row sorted left-to-right, each column sorted top-to-bottom.
// Start from top-right: move left if value > target, move down if value < target.
// Time: O(m + n) — at most m+n steps eliminating a row or column each time
// Space: O(1) — no auxiliary data structures

function search2DMatrixII(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0]!.length === 0) return false; // @step:initialize

  const rowCount = matrix.length; // @step:initialize
  const colCount = matrix[0]!.length; // @step:initialize
  let currentRow = 0; // @step:initialize
  let currentCol = colCount - 1; // @step:initialize

  while (currentRow < rowCount && currentCol >= 0) {
    const currentValue = matrix[currentRow]![currentCol]!; // @step:compare-cell

    if (currentValue === target) {
      return true; // @step:mark-found
    } else if (currentValue > target) {
      currentCol--; // @step:compare-cell
    } else {
      currentRow++; // @step:compare-cell
    }
  }

  return false; // @step:complete
}
