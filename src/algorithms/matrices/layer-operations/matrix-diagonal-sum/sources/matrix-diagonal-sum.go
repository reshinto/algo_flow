// Matrix Diagonal Sum
// Sum of primary diagonal + secondary (anti) diagonal elements.
// For odd-sized matrices, subtract the center element (counted twice).
// LeetCode 1572
// Time: O(n) — single pass over n diagonal pairs
// Space: O(1) — only integer accumulator

package main

func matrixDiagonalSum(matrix [][]int) int {
	matrixSize := len(matrix) // @step:initialize
	runningSum := 0           // @step:initialize

	for diagIdx := 0; diagIdx < matrixSize; diagIdx++ {
		runningSum += matrix[diagIdx][diagIdx]                       // @step:accumulate
		runningSum += matrix[diagIdx][matrixSize-1-diagIdx]          // @step:accumulate
	}

	if matrixSize%2 == 1 {
		centerIdx := matrixSize / 2
		runningSum -= matrix[centerIdx][centerIdx] // @step:accumulate
	}

	return runningSum // @step:complete
}
