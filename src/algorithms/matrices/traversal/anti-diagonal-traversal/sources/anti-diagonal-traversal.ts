// Anti-Diagonal Traversal
// Collects all elements of a 2D matrix along anti-diagonals (where row + col = constant).
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

function antiDiagonalTraversal(matrix: number[][]): number[] {
  const result: number[] = []; // @step:initialize
  if (matrix.length === 0) return result; // @step:initialize

  const rowCount = matrix.length; // @step:initialize
  const colCount = matrix[0]!.length; // @step:initialize
  const diagonalCount = rowCount + colCount - 1; // @step:initialize

  for (let diagSum = 0; diagSum < diagonalCount; diagSum++) {
    // @step:move-direction
    const startRow = diagSum < colCount ? 0 : diagSum - colCount + 1; // @step:move-direction
    const endRow = diagSum < rowCount ? diagSum : rowCount - 1; // @step:move-direction

    for (let currentRow = startRow; currentRow <= endRow; currentRow++) {
      // @step:collect-element
      const currentCol = diagSum - currentRow; // @step:collect-element
      result.push(matrix[currentRow]![currentCol]!); // @step:collect-element
    }
  }

  return result; // @step:complete
}
