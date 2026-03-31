// Island Count
// Count the number of islands (connected groups of 1s) in a binary matrix using DFS flood fill.
// An island is a group of adjacent 1s connected horizontally or vertically.
// Time: O(m × n) — every cell is visited at most once
// Space: O(m × n) — DFS call stack depth in the worst case

function islandCount(grid: number[][]): number {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  let islandTotal = 0; // @step:initialize

  function dfsFloodFill(rowIdx: number, colIdx: number): void {
    if (rowIdx < 0 || rowIdx >= rowCount) return; // @step:compare-cell
    if (colIdx < 0 || colIdx >= colCount) return; // @step:compare-cell
    if (grid[rowIdx]![colIdx] !== 1) return; // @step:compare-cell

    grid[rowIdx]![colIdx] = 0; // @step:mark-found
    dfsFloodFill(rowIdx - 1, colIdx); // @step:mark-found
    dfsFloodFill(rowIdx + 1, colIdx); // @step:mark-found
    dfsFloodFill(rowIdx, colIdx - 1); // @step:mark-found
    dfsFloodFill(rowIdx, colIdx + 1); // @step:mark-found
  }

  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      if (grid[rowIdx]![colIdx] === 1) {
        // @step:compare-cell
        islandTotal++; // @step:mark-found
        dfsFloodFill(rowIdx, colIdx); // @step:mark-found
      }
    }
  }

  return islandTotal; // @step:complete
}
