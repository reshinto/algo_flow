// Zigzag (Diagonal) Traversal
// Traverses a 2D matrix in alternating diagonal directions.
// Even diagonals: upward (bottom-left → top-right)
// Odd diagonals: downward (top-right → bottom-left)
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

package main

func zigzagTraversal(matrix [][]int) []int {
	result := []int{} // @step:initialize
	if len(matrix) == 0 { return result } // @step:initialize

	rowCount := len(matrix)           // @step:initialize
	colCount := len(matrix[0])        // @step:initialize
	diagonalCount := rowCount + colCount - 1 // @step:initialize

	for diagIdx := 0; diagIdx < diagonalCount; diagIdx++ {
		// @step:move-direction
		if diagIdx%2 == 0 {
			// @step:move-direction
			// Even diagonal: go upward (increasing col, decreasing row)
			currentRow := diagIdx
			if diagIdx >= rowCount {
				currentRow = rowCount - 1
			} // @step:move-direction
			currentCol := 0
			if diagIdx >= rowCount {
				currentCol = diagIdx - rowCount + 1
			} // @step:move-direction

			for currentRow >= 0 && currentCol < colCount {
				// @step:collect-element
				result = append(result, matrix[currentRow][currentCol]) // @step:collect-element
				currentRow-- // @step:collect-element
				currentCol++ // @step:collect-element
			}
		} else {
			// @step:move-direction
			// Odd diagonal: go downward (decreasing col, increasing row)
			currentRow := 0
			if diagIdx >= colCount {
				currentRow = diagIdx - colCount + 1
			} // @step:move-direction
			currentCol := diagIdx
			if diagIdx >= colCount {
				currentCol = colCount - 1
			} // @step:move-direction

			for currentRow < rowCount && currentCol >= 0 {
				// @step:collect-element
				result = append(result, matrix[currentRow][currentCol]) // @step:collect-element
				currentRow++ // @step:collect-element
				currentCol-- // @step:collect-element
			}
		}
	}

	return result // @step:complete
}
