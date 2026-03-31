// Rotate Matrix 90° Clockwise
// Rotates an n×n matrix 90° clockwise in-place using transpose then reverse rows.
// Time: O(n²) — each element touched twice
// Space: O(1) — in-place

function rotateMatrix(matrix: number[][]): number[][] {
  const matrixSize = matrix.length; // @step:initialize

  // Step 1: Transpose (swap matrix[rowIdx][colIdx] with matrix[colIdx][rowIdx])
  for (let rowIdx = 0; rowIdx < matrixSize; rowIdx++) {
    // @step:swap-cells
    for (let colIdx = rowIdx + 1; colIdx < matrixSize; colIdx++) {
      // @step:swap-cells
      const temp = matrix[rowIdx]![colIdx]!; // @step:swap-cells
      matrix[rowIdx]![colIdx] = matrix[colIdx]![rowIdx]!; // @step:swap-cells
      matrix[colIdx]![rowIdx] = temp; // @step:swap-cells
    }
  }

  // Step 2: Reverse each row
  for (let rowIdx = 0; rowIdx < matrixSize; rowIdx++) {
    // @step:swap-cells
    let leftCol = 0; // @step:swap-cells
    let rightCol = matrixSize - 1; // @step:swap-cells
    while (leftCol < rightCol) {
      // @step:swap-cells
      const temp = matrix[rowIdx]![leftCol]!; // @step:swap-cells
      matrix[rowIdx]![leftCol] = matrix[rowIdx]![rightCol]!; // @step:swap-cells
      matrix[rowIdx]![rightCol] = temp; // @step:swap-cells
      leftCol++; // @step:swap-cells
      rightCol--; // @step:swap-cells
    }
  }

  return matrix; // @step:complete
}
