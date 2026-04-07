// Transpose Matrix
// Swap rows and columns. For square matrices, swap in-place above the diagonal.
// For non-square matrices, build a new matrix with dimensions swapped.
// Time: O(m × n) — every element is processed exactly once
// Space: O(1) for square matrices (in-place), O(m × n) for non-square

package main

func transposeMatrix(matrix [][]int) [][]int {
	rowCount := len(matrix)    // @step:initialize
	colCount := len(matrix[0]) // @step:initialize

	if rowCount == colCount {
		// Square matrix: swap in-place above the main diagonal
		for rowIdx := 0; rowIdx < rowCount; rowIdx++ {
			for colIdx := rowIdx + 1; colIdx < colCount; colIdx++ {
				temp := matrix[rowIdx][colIdx]           // @step:swap-cells
				matrix[rowIdx][colIdx] = matrix[colIdx][rowIdx] // @step:swap-cells
				matrix[colIdx][rowIdx] = temp            // @step:swap-cells
			}
		}
		return matrix // @step:complete
	}

	// Non-square matrix: create a new colCount × rowCount matrix
	result := make([][]int, colCount)
	for colIdx := range result {
		result[colIdx] = make([]int, rowCount)
	} // @step:initialize

	for rowIdx := 0; rowIdx < rowCount; rowIdx++ {
		for colIdx := 0; colIdx < colCount; colIdx++ {
			result[colIdx][rowIdx] = matrix[rowIdx][colIdx] // @step:swap-cells
		}
	}

	return result // @step:complete
}
