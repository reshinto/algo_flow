// Min Cost Climbing Stairs memoization — top-down recursion with cached subproblems

package main

import "fmt"

func computeMemo(costs []int, step int, memo map[int]int) int {
	if step <= 1 {
		return 0 // @step:initialize
	}
	if cached, found := memo[step]; found {
		return cached // @step:read-cache
	}
	// Recursively compute the minimum cost from each of the two preceding steps, cache to avoid recomputation
	// @step:push-call
	costFromOneStep := 0
	if step-1 < len(costs) {
		costFromOneStep = costs[step-1]
	}
	costFromTwoStep := 0
	if step-2 < len(costs) {
		costFromTwoStep = costs[step-2]
	}
	costFromOne := computeMemo(costs, step-1, memo) + costFromOneStep // @step:compute-cell
	costFromTwo := computeMemo(costs, step-2, memo) + costFromTwoStep // @step:compute-cell
	result := costFromOne
	if costFromTwo < result {
		result = costFromTwo // @step:compute-cell
	}
	memo[step] = result // @step:compute-cell
	// @step:pop-call
	return result // @step:complete
}

func minCostClimbingStairsMemoization(costs []int) int {
	// @step:initialize
	memo := make(map[int]int) // @step:initialize
	return computeMemo(costs, len(costs), memo)
}

func main() {
	costs := []int{10, 15, 20}
	result := minCostClimbingStairsMemoization(costs)
	fmt.Printf("Min cost to climb %v: %d\n", costs, result)
}
