// Spiral Matrix II
// Generates an n×n matrix filled with elements from 1 to n² in clockwise spiral order.
// LeetCode 59
// Time: O(n²) — every cell is filled exactly once
// Space: O(1) extra (output matrix aside)

package main

func spiralMatrixII(matrixSize int) [][]int {
	matrix := make([][]int, matrixSize)
	for rowIdx := range matrix {
		matrix[rowIdx] = make([]int, matrixSize)
	} // @step:initialize

	topBound := 0              // @step:initialize
	bottomBound := matrixSize - 1 // @step:initialize
	leftBound := 0             // @step:initialize
	rightBound := matrixSize - 1 // @step:initialize
	currentValue := 1          // @step:initialize

	for topBound <= bottomBound && leftBound <= rightBound {
		// Fill right along top row
		for colIdx := leftBound; colIdx <= rightBound; colIdx++ {
			matrix[topBound][colIdx] = currentValue // @step:place-value
			currentValue++
		}
		topBound++

		// Fill down along right column
		for rowIdx := topBound; rowIdx <= bottomBound; rowIdx++ {
			matrix[rowIdx][rightBound] = currentValue // @step:place-value
			currentValue++
		}
		rightBound--

		// Fill left along bottom row (if still within bounds)
		if topBound <= bottomBound {
			for colIdx := rightBound; colIdx >= leftBound; colIdx-- {
				matrix[bottomBound][colIdx] = currentValue // @step:place-value
				currentValue++
			}
			bottomBound--
		}

		// Fill up along left column (if still within bounds)
		if leftBound <= rightBound {
			for rowIdx := bottomBound; rowIdx >= topBound; rowIdx-- {
				matrix[rowIdx][leftBound] = currentValue // @step:place-value
				currentValue++
			}
			leftBound++
		}
	}

	return matrix // @step:complete
}
