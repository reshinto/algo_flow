// Island Count
// Count the number of islands (connected groups of 1s) in a binary matrix using DFS flood fill.
// An island is a group of adjacent 1s connected horizontally or vertically.
// Time: O(m × n) — every cell is visited at most once
// Space: O(m × n) — DFS call stack depth in the worst case

package main

func islandCount(grid [][]int) int {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0])
	} // @step:initialize
	islandTotal := 0 // @step:initialize

	for rowIdx := 0; rowIdx < rowCount; rowIdx++ {
		for colIdx := 0; colIdx < colCount; colIdx++ {
			if grid[rowIdx][colIdx] == 1 {
				// @step:compare-cell
				islandTotal++ // @step:mark-found
				dfsFloodFill(grid, rowIdx, colIdx, rowCount, colCount) // @step:mark-found
			}
		}
	}

	return islandTotal // @step:complete
}

func dfsFloodFill(grid [][]int, rowIdx int, colIdx int, rowCount int, colCount int) {
	if rowIdx < 0 || rowIdx >= rowCount { return } // @step:compare-cell
	if colIdx < 0 || colIdx >= colCount { return } // @step:compare-cell
	if grid[rowIdx][colIdx] != 1 { return }        // @step:compare-cell

	grid[rowIdx][colIdx] = 0                                       // @step:mark-found
	dfsFloodFill(grid, rowIdx-1, colIdx, rowCount, colCount)       // @step:mark-found
	dfsFloodFill(grid, rowIdx+1, colIdx, rowCount, colCount)       // @step:mark-found
	dfsFloodFill(grid, rowIdx, colIdx-1, rowCount, colCount)       // @step:mark-found
	dfsFloodFill(grid, rowIdx, colIdx+1, rowCount, colCount)       // @step:mark-found
}
