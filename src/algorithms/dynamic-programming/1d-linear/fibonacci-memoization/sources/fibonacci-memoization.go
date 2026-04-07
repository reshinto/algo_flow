// Fibonacci memoization — top-down recursion with cached subproblems

package main

import "fmt"

func fibonacciMemoization(targetIndex int, memo map[int]int) int {
	// @step:initialize
	if targetIndex <= 1 {
		return targetIndex // @step:initialize
	}
	if cached, found := memo[targetIndex]; found {
		return cached // @step:read-cache
	}
	// Recursively compute subproblems and cache the result to avoid recomputation
	result := fibonacciMemoization(targetIndex-1, memo) + // @step:compute-cell
		fibonacciMemoization(targetIndex-2, memo) // @step:compute-cell
	memo[targetIndex] = result // @step:compute-cell
	return result              // @step:complete
}

func main() {
	memo := make(map[int]int)
	targetIndex := 8
	result := fibonacciMemoization(targetIndex, memo)
	fmt.Printf("Fibonacci(%d) = %d\n", targetIndex, result)
}
