// Reshape Matrix
// Reshape an m×n matrix into a new r×c matrix in row-major order.
// If reshape is impossible (m*n != r*c), return the original matrix.
// LeetCode 566
// Time: O(m × n) — visits every element exactly once
// Space: O(1) extra (output matrix aside)

function reshapeMatrix(matrix: number[][], targetRows: number, targetCols: number): number[][] {
  const sourceRows = matrix.length; // @step:initialize
  const sourceCols = matrix[0]?.length ?? 0; // @step:initialize
  const totalElements = sourceRows * sourceCols; // @step:initialize

  if (totalElements !== targetRows * targetCols) {
    return matrix; // @step:initialize
  }

  const result: number[][] = Array.from({ length: targetRows }, () =>
    new Array<number>(targetCols).fill(0),
  ); // @step:initialize

  for (let flatIdx = 0; flatIdx < totalElements; flatIdx++) {
    const srcRow = Math.floor(flatIdx / sourceCols);
    const srcCol = flatIdx % sourceCols;
    const dstRow = Math.floor(flatIdx / targetCols);
    const dstCol = flatIdx % targetCols;
    result[dstRow]![dstCol] = matrix[srcRow]![srcCol]!; // @step:place-value
  }

  return result; // @step:complete
}
