// Climbing stairs memoization — top-down recursion with cached subproblems

package main

import "fmt"

func climbingStairsMemoization(numberOfStairs int, memo map[int]int) int {
	// @step:initialize
	if numberOfStairs <= 1 {
		return 1 // @step:initialize
	}
	if cached, found := memo[numberOfStairs]; found {
		return cached // @step:read-cache
	}
	// Recursively count distinct ways from the previous two steps, cache to avoid recomputation
	// @step:push-call
	result := climbingStairsMemoization(numberOfStairs-1, memo) + // @step:compute-cell
		climbingStairsMemoization(numberOfStairs-2, memo) // @step:compute-cell
	memo[numberOfStairs] = result // @step:compute-cell
	// @step:pop-call
	return result // @step:complete
}

func main() {
	memo := make(map[int]int)
	numberOfStairs := 7
	result := climbingStairsMemoization(numberOfStairs, memo)
	fmt.Printf("Ways to climb %d stairs: %d\n", numberOfStairs, result)
}
