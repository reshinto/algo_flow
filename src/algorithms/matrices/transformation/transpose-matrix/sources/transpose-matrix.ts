// Transpose Matrix
// Swap rows and columns. For square matrices, swap in-place above the diagonal.
// For non-square matrices, build a new matrix with dimensions swapped.
// Time: O(m × n) — every element is processed exactly once
// Space: O(1) for square matrices (in-place), O(m × n) for non-square

function transposeMatrix(matrix: number[][]): number[][] {
  const rowCount = matrix.length; // @step:initialize
  const colCount = matrix[0]!.length; // @step:initialize

  if (rowCount === colCount) {
    // Square matrix: swap in-place above the main diagonal
    for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
      for (let colIdx = rowIdx + 1; colIdx < colCount; colIdx++) {
        const temp = matrix[rowIdx]![colIdx]!; // @step:swap-cells
        matrix[rowIdx]![colIdx] = matrix[colIdx]![rowIdx]!; // @step:swap-cells
        matrix[colIdx]![rowIdx] = temp; // @step:swap-cells
      }
    }
    return matrix; // @step:complete
  }

  // Non-square matrix: create a new colCount × rowCount matrix
  const result: number[][] = Array.from({ length: colCount }, () =>
    new Array<number>(rowCount).fill(0),
  ); // @step:initialize

  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      result[colIdx]![rowIdx] = matrix[rowIdx]![colIdx]!; // @step:swap-cells
    }
  }

  return result; // @step:complete
}
