// Flip and Invert Binary Image (LeetCode 832)
// Flip each row horizontally (reverse), then invert every element (0→1, 1→0).
// Time: O(m × n) — each element touched once
// Space: O(1) — in-place

package main

func flipImage(matrix [][]int) [][]int {
	rowCount := len(matrix) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(matrix[0])
	} // @step:initialize

	for rowIdx := 0; rowIdx < rowCount; rowIdx++ {
		leftCol := 0            // @step:flip-cell
		rightCol := colCount - 1 // @step:flip-cell

		// Two-pointer: swap and XOR-invert simultaneously from both ends
		for leftCol < rightCol {
			leftVal := matrix[rowIdx][leftCol]   // @step:flip-cell
			rightVal := matrix[rowIdx][rightCol] // @step:flip-cell
			matrix[rowIdx][leftCol] = rightVal ^ 1 // @step:flip-cell
			matrix[rowIdx][rightCol] = leftVal ^ 1 // @step:flip-cell
			leftCol++  // @step:flip-cell
			rightCol-- // @step:flip-cell
		}

		// When colCount is odd, middle element only needs inversion
		if leftCol == rightCol {
			matrix[rowIdx][leftCol] ^= 1 // @step:flip-cell
		}
	}

	return matrix // @step:complete
}
