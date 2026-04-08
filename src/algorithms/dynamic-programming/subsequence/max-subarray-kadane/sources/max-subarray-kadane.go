// Maximum Subarray Kadane — build DP table where dp[i] = max subarray sum ending at index i

package main

import "fmt"

func maxSubarrayKadane(array []int) int {
	// @step:initialize
	if len(array) == 0 {
		return 0 // @step:initialize
	}
	dpTable := make([]int, len(array)) // @step:initialize,fill-table
	dpTable[0] = array[0]             // @step:fill-table
	maxSum := dpTable[0]              // @step:fill-table
	// Each entry: extend the previous subarray or start fresh at current element
	for elementIndex := 1; elementIndex < len(array); elementIndex++ {
		// @step:compute-cell
		extendPrev := dpTable[elementIndex-1] + array[elementIndex]
		dpTable[elementIndex] = array[elementIndex]
		if extendPrev > dpTable[elementIndex] {
			dpTable[elementIndex] = extendPrev // @step:compute-cell,read-cache
		}
		if dpTable[elementIndex] > maxSum {
			// @step:compute-cell
			maxSum = dpTable[elementIndex] // @step:compute-cell
		}
	}
	return maxSum // @step:complete
}

func main() {
	array := []int{-2, 1, -3, 4, -1, 2, 1, -5, 4}
	result := maxSubarrayKadane(array)
	fmt.Printf("Max subarray sum of %v: %d\n", array, result)
}
