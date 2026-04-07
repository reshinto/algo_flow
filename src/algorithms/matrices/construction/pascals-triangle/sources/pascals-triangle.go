// Pascal's Triangle Construction
// Builds Pascal's triangle as a 2D matrix with numRows rows.
// Each inner element is the sum of the two elements above it; edges are always 1.
// Time: O(n²) — filling each cell in every row
// Space: O(1) extra (output matrix aside)

package main

func pascalsTriangle(numRows int) [][]int {
	triangle := [][]int{} // @step:initialize

	for rowIdx := 0; rowIdx < numRows; rowIdx++ {
		// @step:initialize
		row := make([]int, rowIdx+1) // @step:initialize

		row[0] = 1               // @step:compute-value
		row[rowIdx] = 1          // @step:compute-value

		for colIdx := 1; colIdx < rowIdx; colIdx++ {
			above := triangle[rowIdx-1]
			row[colIdx] = above[colIdx-1] + above[colIdx] // @step:compute-value
		}

		triangle = append(triangle, row) // @step:complete
	}

	return triangle // @step:complete
}
