// House Robber memoization — top-down recursion with cached subproblems

package main

import "fmt"

func rob(houses []int, houseIndex int, memo map[int]int) int {
	if houseIndex == 0 {
		// @step:fill-table
		memo[0] = houses[0] // @step:fill-table
		return houses[0]    // @step:fill-table
	}
	if houseIndex == 1 {
		// @step:fill-table
		baseValue := houses[0]
		if houses[1] > baseValue {
			baseValue = houses[1]
		}
		memo[1] = baseValue // @step:fill-table
		return baseValue    // @step:fill-table
	}
	if cached, found := memo[houseIndex]; found {
		return cached // @step:read-cache
	}
	// @step:push-call
	skipCurrent := rob(houses, houseIndex-1, memo)              // @step:compute-cell
	robCurrent := rob(houses, houseIndex-2, memo) + houses[houseIndex] // @step:compute-cell
	maxProfit := skipCurrent
	if robCurrent > maxProfit {
		maxProfit = robCurrent // @step:compute-cell
	}
	memo[houseIndex] = maxProfit // @step:compute-cell
	return maxProfit             // @step:pop-call
}

func houseRobberMemoization(houses []int) int {
	// @step:initialize
	if len(houses) == 0 {
		return 0 // @step:initialize
	}
	if len(houses) == 1 {
		return houses[0] // @step:initialize
	}
	memo := make(map[int]int)
	return rob(houses, len(houses)-1, memo) // @step:complete
}

func main() {
	houses := []int{2, 7, 9, 3, 1}
	result := houseRobberMemoization(houses)
	fmt.Printf("Max rob from %v: %d\n", houses, result)
}
