// Catalan numbers tabulation — build DP table iteratively from the base case

package main

import "fmt"

func catalanNumber(targetIndex int) int {
	// @step:initialize
	if targetIndex == 0 {
		return 1 // @step:initialize
	}
	dpTable := make([]int, targetIndex+1) // @step:initialize,fill-table
	dpTable[0] = 1                        // @step:fill-table
	// Each entry is the sum C(i) = sum over k from 0 to i-1 of C(k) * C(i-1-k)
	for outerIndex := 1; outerIndex <= targetIndex; outerIndex++ {
		// @step:compute-cell
		runningSum := 0 // @step:compute-cell
		for splitIndex := 0; splitIndex < outerIndex; splitIndex++ {
			// @step:read-cache
			runningSum += dpTable[splitIndex] * dpTable[outerIndex-1-splitIndex] // @step:read-cache,compute-cell
		}
		dpTable[outerIndex] = runningSum // @step:compute-cell
	}
	return dpTable[targetIndex] // @step:complete
}

func main() {
	targetIndex := 5
	result := catalanNumber(targetIndex)
	fmt.Printf("Catalan(%d) = %d\n", targetIndex, result)
}
