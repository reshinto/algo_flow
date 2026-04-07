// Spiral Order Matrix Traversal
// Returns all elements of a 2D matrix in spiral (clockwise) order.
// Time: O(m × n) — every element is visited exactly once
// Space: O(1) extra (output array aside)

package main

func spiralOrder(matrix [][]int) []int {
	result := []int{} // @step:initialize
	if len(matrix) == 0 { return result } // @step:initialize

	topBound := 0                  // @step:initialize
	bottomBound := len(matrix) - 1 // @step:initialize
	leftBound := 0                 // @step:initialize
	rightBound := len(matrix[0]) - 1 // @step:initialize

	for topBound <= bottomBound && leftBound <= rightBound {
		// Traverse right along top row
		for colIdx := leftBound; colIdx <= rightBound; colIdx++ {
			result = append(result, matrix[topBound][colIdx]) // @step:collect-element
		}
		topBound++ // @step:shrink-boundary

		// Traverse down along right column
		for rowIdx := topBound; rowIdx <= bottomBound; rowIdx++ {
			result = append(result, matrix[rowIdx][rightBound]) // @step:collect-element
		}
		rightBound-- // @step:shrink-boundary

		// Traverse left along bottom row (if still within bounds)
		if topBound <= bottomBound {
			for colIdx := rightBound; colIdx >= leftBound; colIdx-- {
				result = append(result, matrix[bottomBound][colIdx]) // @step:collect-element
			}
			bottomBound-- // @step:shrink-boundary
		}

		// Traverse up along left column (if still within bounds)
		if leftBound <= rightBound {
			for rowIdx := bottomBound; rowIdx >= topBound; rowIdx-- {
				result = append(result, matrix[rowIdx][leftBound]) // @step:collect-element
			}
			leftBound++ // @step:shrink-boundary
		}
	}

	return result // @step:complete
}
