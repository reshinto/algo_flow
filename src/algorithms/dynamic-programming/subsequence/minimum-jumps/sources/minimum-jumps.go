// Minimum Jumps tabulation — build DP table iteratively from base case

package main

import (
	"fmt"
	"math"
)

func minimumJumps(jumps []int) int {
	// @step:initialize
	arrayLength := len(jumps) // @step:initialize
	if arrayLength == 0 {
		return 0 // @step:initialize
	}
	dpTable := make([]int, arrayLength)
	for idx := range dpTable {
		dpTable[idx] = math.MaxInt32 // @step:initialize,fill-table
	}
	dpTable[0] = 0 // @step:fill-table
	// For each position, check all prior positions that can reach it
	for targetIndex := 1; targetIndex < arrayLength; targetIndex++ {
		// @step:compute-cell
		for sourceIndex := 0; sourceIndex < targetIndex; sourceIndex++ {
			// @step:read-cache
			if dpTable[sourceIndex] != math.MaxInt32 &&
				sourceIndex+jumps[sourceIndex] >= targetIndex {
				// @step:read-cache
				candidate := dpTable[sourceIndex] + 1
				if candidate < dpTable[targetIndex] {
					dpTable[targetIndex] = candidate // @step:compute-cell,read-cache
				}
			}
		}
	}
	if dpTable[arrayLength-1] == math.MaxInt32 {
		return -1
	}
	return dpTable[arrayLength-1] // @step:complete
}

func main() {
	jumps := []int{2, 3, 1, 1, 4}
	result := minimumJumps(jumps)
	fmt.Printf("Minimum jumps for %v: %d\n", jumps, result)
}
