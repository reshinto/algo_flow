// Spiral Order Matrix Traversal
// Returns all elements of a 2D matrix in spiral (clockwise) order.
// Time: O(m × n) — every element is visited exactly once
// Space: O(1) extra (output array aside)

function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = []; // @step:initialize
  if (matrix.length === 0) return result; // @step:initialize

  let topBound = 0; // @step:initialize
  let bottomBound = matrix.length - 1; // @step:initialize
  let leftBound = 0; // @step:initialize
  let rightBound = matrix[0]!.length - 1; // @step:initialize

  while (topBound <= bottomBound && leftBound <= rightBound) {
    // Traverse right along top row
    for (let colIdx = leftBound; colIdx <= rightBound; colIdx++) {
      result.push(matrix[topBound]![colIdx]!); // @step:collect-element
    }
    topBound++; // @step:shrink-boundary

    // Traverse down along right column
    for (let rowIdx = topBound; rowIdx <= bottomBound; rowIdx++) {
      result.push(matrix[rowIdx]![rightBound]!); // @step:collect-element
    }
    rightBound--; // @step:shrink-boundary

    // Traverse left along bottom row (if still within bounds)
    if (topBound <= bottomBound) {
      for (let colIdx = rightBound; colIdx >= leftBound; colIdx--) {
        result.push(matrix[bottomBound]![colIdx]!); // @step:collect-element
      }
      bottomBound--; // @step:shrink-boundary
    }

    // Traverse up along left column (if still within bounds)
    if (leftBound <= rightBound) {
      for (let rowIdx = bottomBound; rowIdx >= topBound; rowIdx--) {
        result.push(matrix[rowIdx]![leftBound]!); // @step:collect-element
      }
      leftBound++; // @step:shrink-boundary
    }
  }

  return result; // @step:complete
}
