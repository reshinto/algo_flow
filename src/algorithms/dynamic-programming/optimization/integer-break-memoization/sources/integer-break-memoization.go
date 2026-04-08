// Integer Break memoization — top-down recursion to maximize product of parts

package main

import "fmt"

func integerBreakMemoization(targetNumber int, memo map[int]int) int {
	// @step:initialize
	if targetNumber == 1 {
		return 1 // @step:initialize
	}
	if cached, found := memo[targetNumber]; found {
		return cached // @step:read-cache
	}
	// @step:push-call
	maxProduct := 0 // @step:compute-cell
	for partSize := 1; partSize < targetNumber; partSize++ {
		// @step:compute-cell
		remainder := targetNumber - partSize     // @step:compute-cell
		splitProduct := partSize * remainder     // @step:compute-cell
		recurseProduct := partSize * integerBreakMemoization(remainder, memo) // @step:compute-cell
		if splitProduct > maxProduct {
			maxProduct = splitProduct // @step:compute-cell
		}
		if recurseProduct > maxProduct {
			maxProduct = recurseProduct // @step:compute-cell
		}
	}
	memo[targetNumber] = maxProduct // @step:compute-cell
	return maxProduct               // @step:pop-call
}

func main() {
	memo := make(map[int]int)
	targetNumber := 10
	result := integerBreakMemoization(targetNumber, memo)
	fmt.Printf("Integer break(%d): %d\n", targetNumber, result)
}
