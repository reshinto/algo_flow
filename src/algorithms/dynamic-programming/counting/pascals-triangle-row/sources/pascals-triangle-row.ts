// Pascal's Triangle Row (Tabulation) — build one row using in-place right-to-left updates
function pascalsTriangleRow(rowIndex: number): number[] {
  // @step:initialize
  const dpTable = new Array(rowIndex + 1).fill(1); // @step:initialize,fill-table
  // Iterate each row from 2 up to rowIndex, updating right-to-left
  for (let rowNumber = 2; rowNumber <= rowIndex; rowNumber++) {
    // @step:compute-cell
    for (let columnIndex = rowNumber - 1; columnIndex >= 1; columnIndex--) {
      // @step:compute-cell,read-cache
      dpTable[columnIndex] = (dpTable[columnIndex] ?? 0) + (dpTable[columnIndex - 1] ?? 0); // @step:compute-cell,read-cache
    }
  }
  return dpTable; // @step:complete
}
