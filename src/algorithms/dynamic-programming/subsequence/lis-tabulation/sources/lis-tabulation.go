// LIS tabulation — O(n^2) bottom-up DP for longest increasing subsequence length

package main

import "fmt"

func lisLength(sequence []int) int {
	// @step:initialize
	sequenceLength := len(sequence) // @step:initialize
	if sequenceLength == 0 {
		return 0 // @step:initialize
	}
	dpTable := make([]int, sequenceLength)
	for idx := range dpTable {
		dpTable[idx] = 1 // @step:initialize,fill-table
	}
	// Each element is a subsequence of length 1
	maxLength := 1 // @step:fill-table
	// For each index, scan all previous indices
	for outerIndex := 1; outerIndex < sequenceLength; outerIndex++ {
		// @step:compute-cell
		for innerIndex := 0; innerIndex < outerIndex; innerIndex++ {
			// @step:read-cache
			if sequence[innerIndex] < sequence[outerIndex] {
				// @step:read-cache
				if dpTable[innerIndex]+1 > dpTable[outerIndex] {
					dpTable[outerIndex] = dpTable[innerIndex] + 1 // @step:compute-cell,read-cache
				}
			}
		}
		if dpTable[outerIndex] > maxLength {
			// @step:compute-cell
			maxLength = dpTable[outerIndex] // @step:compute-cell
		}
	}
	return maxLength // @step:complete
}

func main() {
	sequence := []int{10, 9, 2, 5, 3, 7, 101, 18}
	result := lisLength(sequence)
	fmt.Printf("LIS length of %v: %d\n", sequence, result)
}
