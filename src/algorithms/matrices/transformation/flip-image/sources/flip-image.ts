// Flip and Invert Binary Image (LeetCode 832)
// Flip each row horizontally (reverse), then invert every element (0→1, 1→0).
// Time: O(m × n) — each element touched once
// Space: O(1) — in-place

function flipImage(matrix: number[][]): number[][] {
  const rowCount = matrix.length; // @step:initialize
  const colCount = matrix[0]?.length ?? 0; // @step:initialize

  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    let leftCol = 0; // @step:flip-cell
    let rightCol = colCount - 1; // @step:flip-cell

    // Two-pointer: swap and XOR-invert simultaneously from both ends
    while (leftCol < rightCol) {
      const leftVal = matrix[rowIdx]![leftCol]!; // @step:flip-cell
      const rightVal = matrix[rowIdx]![rightCol]!; // @step:flip-cell
      matrix[rowIdx]![leftCol] = rightVal ^ 1; // @step:flip-cell
      matrix[rowIdx]![rightCol] = leftVal ^ 1; // @step:flip-cell
      leftCol++; // @step:flip-cell
      rightCol--; // @step:flip-cell
    }

    // When colCount is odd, middle element only needs inversion
    if (leftCol === rightCol) {
      matrix[rowIdx]![leftCol] = matrix[rowIdx]![leftCol]! ^ 1; // @step:flip-cell
    }
  }

  return matrix; // @step:complete
}
