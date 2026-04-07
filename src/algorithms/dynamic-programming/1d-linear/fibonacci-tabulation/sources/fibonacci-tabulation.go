// Fibonacci tabulation — build DP table iteratively from base cases

package main

import "fmt"

func fibonacciTabulation(targetIndex int) int {
	// @step:initialize
	if targetIndex <= 1 {
		return targetIndex // @step:initialize
	}
	dpTable := make([]int, targetIndex+1) // @step:initialize,fill-table
	dpTable[1] = 1                        // @step:fill-table
	// Each entry is the sum of the two preceding entries
	for currentIndex := 2; currentIndex <= targetIndex; currentIndex++ {
		// @step:compute-cell
		dpTable[currentIndex] = dpTable[currentIndex-1] + dpTable[currentIndex-2] // @step:compute-cell,read-cache
	}
	return dpTable[targetIndex] // @step:complete
}

func main() {
	targetIndex := 8
	result := fibonacciTabulation(targetIndex)
	fmt.Printf("Fibonacci(%d) = %d\n", targetIndex, result)
}
