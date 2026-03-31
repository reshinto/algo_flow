// Zigzag (Diagonal) Traversal
// Traverses a 2D matrix in alternating diagonal directions.
// Even diagonals: upward (bottom-left → top-right)
// Odd diagonals: downward (top-right → bottom-left)
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

function zigzagTraversal(matrix: number[][]): number[] {
  const result: number[] = []; // @step:initialize
  if (matrix.length === 0) return result; // @step:initialize

  const rowCount = matrix.length; // @step:initialize
  const colCount = matrix[0]!.length; // @step:initialize
  const diagonalCount = rowCount + colCount - 1; // @step:initialize

  for (let diagIdx = 0; diagIdx < diagonalCount; diagIdx++) {
    // @step:move-direction
    if (diagIdx % 2 === 0) {
      // @step:move-direction
      // Even diagonal: go upward (increasing col, decreasing row)
      let currentRow = diagIdx < rowCount ? diagIdx : rowCount - 1; // @step:move-direction
      let currentCol = diagIdx < rowCount ? 0 : diagIdx - rowCount + 1; // @step:move-direction

      while (currentRow >= 0 && currentCol < colCount) {
        // @step:collect-element
        result.push(matrix[currentRow]![currentCol]!); // @step:collect-element
        currentRow--; // @step:collect-element
        currentCol++; // @step:collect-element
      }
    } else {
      // @step:move-direction
      // Odd diagonal: go downward (decreasing col, increasing row)
      let currentRow = diagIdx < colCount ? 0 : diagIdx - colCount + 1; // @step:move-direction
      let currentCol = diagIdx < colCount ? diagIdx : colCount - 1; // @step:move-direction

      while (currentRow < rowCount && currentCol >= 0) {
        // @step:collect-element
        result.push(matrix[currentRow]![currentCol]!); // @step:collect-element
        currentRow++; // @step:collect-element
        currentCol--; // @step:collect-element
      }
    }
  }

  return result; // @step:complete
}
