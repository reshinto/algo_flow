// Search a 2D Matrix II (Staircase Search)
// Each row sorted left-to-right, each column sorted top-to-bottom.
// Start from top-right: move left if value > target, move down if value < target.
// Time: O(m + n) — at most m+n steps eliminating a row or column each time
// Space: O(1) — no auxiliary data structures

package main

func search2DMatrixII(matrix [][]int, target int) bool {
	if len(matrix) == 0 || len(matrix[0]) == 0 { return false } // @step:initialize

	rowCount := len(matrix)   // @step:initialize
	colCount := len(matrix[0]) // @step:initialize
	currentRow := 0           // @step:initialize
	currentCol := colCount - 1 // @step:initialize

	for currentRow < rowCount && currentCol >= 0 {
		currentValue := matrix[currentRow][currentCol] // @step:compare-cell

		if currentValue == target {
			return true // @step:mark-found
		} else if currentValue > target {
			currentCol-- // @step:compare-cell
		} else {
			currentRow++ // @step:compare-cell
		}
	}

	return false // @step:complete
}
