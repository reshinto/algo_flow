// Rod Cutting (Tabulation) — find maximum revenue from cutting a rod of length n

package main

import "fmt"

func rodCutting(prices []int) int {
	// @step:initialize
	rodLength := len(prices) // @step:initialize
	dpTable := make([]int, rodLength+1) // @step:initialize,fill-table
	// dp[0] = 0 (base case: zero revenue for zero-length rod)
	for currentLength := 1; currentLength <= rodLength; currentLength++ {
		// @step:compute-cell
		for cutLength := 1; cutLength <= currentLength; cutLength++ {
			// @step:read-cache
			remainder := currentLength - cutLength            // @step:read-cache
			candidate := prices[cutLength-1] + dpTable[remainder] // @step:read-cache
			if candidate > dpTable[currentLength] {
				dpTable[currentLength] = candidate // @step:compute-cell
			}
		}
	}
	return dpTable[rodLength] // @step:complete
}

func main() {
	prices := []int{1, 5, 8, 9, 10, 17, 17, 20}
	result := rodCutting(prices)
	fmt.Printf("Max rod cutting revenue: %d\n", result)
}
