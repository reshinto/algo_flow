// Toeplitz Matrix Verification
// Determines if a matrix is a Toeplitz matrix — every descending diagonal
// from left to right contains all equal elements.
// LeetCode 766
// Time: O(m × n) — every cell (except first row/col) is compared exactly once
// Space: O(1)

package main

func toeplitzMatrix(matrix [][]int) bool {
	rowCount := len(matrix)   // @step:initialize
	colCount := len(matrix[0]) // @step:initialize

	for rowIdx := 1; rowIdx < rowCount; rowIdx++ {
		for colIdx := 1; colIdx < colCount; colIdx++ {
			current := matrix[rowIdx][colIdx]         // @step:compare-cell
			upperLeft := matrix[rowIdx-1][colIdx-1]   // @step:compare-cell
			if current != upperLeft { return false }  // @step:compare-cell
		}
	}

	return true // @step:complete
}
