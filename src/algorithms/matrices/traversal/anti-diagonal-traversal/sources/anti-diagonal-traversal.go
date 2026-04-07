// Anti-Diagonal Traversal
// Collects all elements of a 2D matrix along anti-diagonals (where row + col = constant).
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

package main

func antiDiagonalTraversal(matrix [][]int) []int {
	result := []int{} // @step:initialize
	if len(matrix) == 0 { return result } // @step:initialize

	rowCount := len(matrix)           // @step:initialize
	colCount := len(matrix[0])        // @step:initialize
	diagonalCount := rowCount + colCount - 1 // @step:initialize

	for diagSum := 0; diagSum < diagonalCount; diagSum++ {
		// @step:move-direction
		startRow := 0
		if diagSum >= colCount {
			startRow = diagSum - colCount + 1
		} // @step:move-direction
		endRow := diagSum
		if diagSum >= rowCount {
			endRow = rowCount - 1
		} // @step:move-direction

		for currentRow := startRow; currentRow <= endRow; currentRow++ {
			// @step:collect-element
			currentCol := diagSum - currentRow                       // @step:collect-element
			result = append(result, matrix[currentRow][currentCol])  // @step:collect-element
		}
	}

	return result // @step:complete
}
