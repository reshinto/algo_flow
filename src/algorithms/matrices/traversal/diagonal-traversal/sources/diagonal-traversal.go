// Diagonal Traversal
// Collects all elements of a 2D matrix along its diagonals (top-left to bottom-right).
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

package main

func diagonalTraversal(matrix [][]int) []int {
	result := []int{} // @step:initialize
	if len(matrix) == 0 { return result } // @step:initialize

	rowCount := len(matrix)           // @step:initialize
	colCount := len(matrix[0])        // @step:initialize
	diagonalCount := rowCount + colCount - 1 // @step:initialize

	for diagIdx := 0; diagIdx < diagonalCount; diagIdx++ {
		// @step:move-direction
		startRow := 0
		if diagIdx >= colCount {
			startRow = diagIdx - colCount + 1
		} // @step:move-direction
		startCol := diagIdx
		if diagIdx >= colCount {
			startCol = colCount - 1
		} // @step:move-direction

		currentRow := startRow  // @step:move-direction
		currentCol := startCol  // @step:move-direction

		for currentRow < rowCount && currentCol >= 0 {
			// @step:collect-element
			result = append(result, matrix[currentRow][currentCol]) // @step:collect-element
			currentRow++ // @step:collect-element
			currentCol-- // @step:collect-element
		}
	}

	return result // @step:complete
}
