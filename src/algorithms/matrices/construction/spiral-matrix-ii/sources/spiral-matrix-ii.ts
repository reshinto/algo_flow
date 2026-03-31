// Spiral Matrix II
// Generates an n×n matrix filled with elements from 1 to n² in clockwise spiral order.
// LeetCode 59
// Time: O(n²) — every cell is filled exactly once
// Space: O(1) extra (output matrix aside)

function spiralMatrixII(matrixSize: number): number[][] {
  const matrix: number[][] = Array.from({ length: matrixSize }, () =>
    new Array(matrixSize).fill(0),
  ); // @step:initialize

  let topBound = 0; // @step:initialize
  let bottomBound = matrixSize - 1; // @step:initialize
  let leftBound = 0; // @step:initialize
  let rightBound = matrixSize - 1; // @step:initialize
  let currentValue = 1; // @step:initialize

  while (topBound <= bottomBound && leftBound <= rightBound) {
    // Fill right along top row
    for (let colIdx = leftBound; colIdx <= rightBound; colIdx++) {
      matrix[topBound]![colIdx] = currentValue++; // @step:place-value
    }
    topBound++;

    // Fill down along right column
    for (let rowIdx = topBound; rowIdx <= bottomBound; rowIdx++) {
      matrix[rowIdx]![rightBound] = currentValue++; // @step:place-value
    }
    rightBound--;

    // Fill left along bottom row (if still within bounds)
    if (topBound <= bottomBound) {
      for (let colIdx = rightBound; colIdx >= leftBound; colIdx--) {
        matrix[bottomBound]![colIdx] = currentValue++; // @step:place-value
      }
      bottomBound--;
    }

    // Fill up along left column (if still within bounds)
    if (leftBound <= rightBound) {
      for (let rowIdx = bottomBound; rowIdx >= topBound; rowIdx--) {
        matrix[rowIdx]![leftBound] = currentValue++; // @step:place-value
      }
      leftBound++;
    }
  }

  return matrix; // @step:complete
}
