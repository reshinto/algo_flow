// Reshape Matrix
// Reshape an m×n matrix into a new r×c matrix in row-major order.
// If reshape is impossible (m*n != r*c), return the original matrix.
// LeetCode 566
// Time: O(m × n) — visits every element exactly once
// Space: O(1) extra (output matrix aside)

package main

func reshapeMatrix(matrix [][]int, targetRows int, targetCols int) [][]int {
	sourceRows := len(matrix) // @step:initialize
	sourceCols := 0
	if sourceRows > 0 {
		sourceCols = len(matrix[0])
	} // @step:initialize
	totalElements := sourceRows * sourceCols // @step:initialize

	if totalElements != targetRows*targetCols {
		return matrix // @step:initialize
	}

	result := make([][]int, targetRows)
	for rowIdx := range result {
		result[rowIdx] = make([]int, targetCols)
	} // @step:initialize

	for flatIdx := 0; flatIdx < totalElements; flatIdx++ {
		srcRow := flatIdx / sourceCols
		srcCol := flatIdx % sourceCols
		dstRow := flatIdx / targetCols
		dstCol := flatIdx % targetCols
		result[dstRow][dstCol] = matrix[srcRow][srcCol] // @step:place-value
	}

	return result // @step:complete
}
