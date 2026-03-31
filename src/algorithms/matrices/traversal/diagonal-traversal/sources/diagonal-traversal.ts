// Diagonal Traversal
// Collects all elements of a 2D matrix along its diagonals (top-left to bottom-right).
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

function diagonalTraversal(matrix: number[][]): number[] {
  const result: number[] = []; // @step:initialize
  if (matrix.length === 0) return result; // @step:initialize

  const rowCount = matrix.length; // @step:initialize
  const colCount = matrix[0]!.length; // @step:initialize
  const diagonalCount = rowCount + colCount - 1; // @step:initialize

  for (let diagIdx = 0; diagIdx < diagonalCount; diagIdx++) {
    // @step:move-direction
    const startRow = diagIdx < colCount ? 0 : diagIdx - colCount + 1; // @step:move-direction
    const startCol = diagIdx < colCount ? diagIdx : colCount - 1; // @step:move-direction

    let currentRow = startRow; // @step:move-direction
    let currentCol = startCol; // @step:move-direction

    while (currentRow < rowCount && currentCol >= 0) {
      // @step:collect-element
      result.push(matrix[currentRow]![currentCol]!); // @step:collect-element
      currentRow++; // @step:collect-element
      currentCol--; // @step:collect-element
    }
  }

  return result; // @step:complete
}
