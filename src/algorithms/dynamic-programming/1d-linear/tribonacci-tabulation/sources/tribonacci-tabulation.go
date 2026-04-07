// Tribonacci tabulation — build DP table iteratively from three base cases

package main

import "fmt"

func tribonacciTabulation(targetIndex int) int {
	// @step:initialize
	if targetIndex == 0 {
		return 0 // @step:initialize
	}
	if targetIndex <= 2 {
		return 1 // @step:initialize
	}
	dpTable := make([]int, targetIndex+1) // @step:initialize,fill-table
	dpTable[1] = 1                        // @step:fill-table
	dpTable[2] = 1                        // @step:fill-table
	// Each entry is the sum of the three preceding entries
	for currentIndex := 3; currentIndex <= targetIndex; currentIndex++ {
		// @step:compute-cell
		dpTable[currentIndex] = dpTable[currentIndex-1] + dpTable[currentIndex-2] + dpTable[currentIndex-3] // @step:compute-cell,read-cache
	}
	return dpTable[targetIndex] // @step:complete
}

func main() {
	targetIndex := 7
	result := tribonacciTabulation(targetIndex)
	fmt.Printf("Tribonacci(%d) = %d\n", targetIndex, result)
}
