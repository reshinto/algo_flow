// Tribonacci memoization — top-down recursion with cached subproblems

package main

import "fmt"

func tribonacciMemoization(targetIndex int, memo map[int]int) int {
	// @step:initialize
	if targetIndex == 0 {
		return 0 // @step:initialize
	}
	if targetIndex <= 2 {
		return 1 // @step:initialize
	}
	if cached, found := memo[targetIndex]; found {
		return cached // @step:read-cache
	}
	// Recursively compute the three preceding subproblems and cache the result
	result := tribonacciMemoization(targetIndex-1, memo) + // @step:compute-cell
		tribonacciMemoization(targetIndex-2, memo) + // @step:compute-cell
		tribonacciMemoization(targetIndex-3, memo) // @step:compute-cell
	memo[targetIndex] = result // @step:compute-cell
	return result              // @step:complete
}

func main() {
	memo := make(map[int]int)
	targetIndex := 7
	result := tribonacciMemoization(targetIndex, memo)
	fmt.Printf("Tribonacci(%d) = %d\n", targetIndex, result)
}
