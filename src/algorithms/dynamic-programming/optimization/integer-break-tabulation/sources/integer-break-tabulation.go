// Integer Break tabulation — build DP table iteratively from base cases

package main

import "fmt"

func integerBreakTabulation(targetNumber int) int {
	// @step:initialize
	dpTable := make([]int, targetNumber+1) // @step:initialize
	dpTable[1] = 1                         // @step:fill-table
	// For each i, try every split j + (i - j) and track the best product
	for splitIndex := 2; splitIndex <= targetNumber; splitIndex++ {
		// @step:compute-cell
		for partIndex := 1; partIndex < splitIndex; partIndex++ {
			// @step:compute-cell,read-cache
			keepSplit := partIndex * (splitIndex - partIndex)     // @step:compute-cell
			useDp := partIndex * dpTable[splitIndex-partIndex] // @step:read-cache,compute-cell
			if keepSplit > dpTable[splitIndex] {
				dpTable[splitIndex] = keepSplit // @step:compute-cell
			}
			if useDp > dpTable[splitIndex] {
				dpTable[splitIndex] = useDp // @step:compute-cell
			}
		}
	}
	return dpTable[targetNumber] // @step:complete
}

func main() {
	targetNumber := 10
	result := integerBreakTabulation(targetNumber)
	fmt.Printf("Integer break(%d): %d\n", targetNumber, result)
}
