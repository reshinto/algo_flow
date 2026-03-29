// Unique Paths (Tabulation) — count distinct paths from top-left to bottom-right in a rows×columns grid
function uniquePaths(rows: number, columns: number): number {
  // @step:initialize
  const dpTable = new Array(columns).fill(1); // @step:initialize,fill-table
  // First row is all 1s — only one way to reach any cell by moving right only
  for (let rowIndex = 1; rowIndex < rows; rowIndex++) {
    // @step:compute-cell
    for (let columnIndex = 1; columnIndex < columns; columnIndex++) {
      // @step:compute-cell
      dpTable[columnIndex] = dpTable[columnIndex] + dpTable[columnIndex - 1]; // @step:compute-cell,read-cache
    }
  }
  return dpTable[columns - 1]; // @step:complete
}
