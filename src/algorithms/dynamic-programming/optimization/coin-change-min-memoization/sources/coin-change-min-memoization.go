// Coin Change Minimum — top-down memoization: find the fewest coins summing to target amount

package main

import "fmt"

func minCoins(remaining int, coins []int, memo map[int]int) int {
	if remaining == 0 {
		// @step:fill-table
		memo[0] = 0 // @step:fill-table
		return 0    // @step:fill-table
	}
	if remaining < 0 {
		return -1 // @step:fill-table
	}
	if cached, found := memo[remaining]; found {
		return cached // @step:read-cache
	}
	// @step:push-call
	bestResult := -1
	for _, coin := range coins {
		// @step:compute-cell
		subResult := minCoins(remaining-coin, coins, memo) // @step:compute-cell
		if subResult >= 0 {
			// @step:compute-cell
			candidate := subResult + 1 // @step:compute-cell
			if bestResult == -1 || candidate < bestResult {
				// @step:compute-cell
				bestResult = candidate // @step:compute-cell
			}
		}
	}
	memo[remaining] = bestResult // @step:compute-cell
	return bestResult            // @step:pop-call
}

func coinChangeMinMemoization(amount int, coins []int) int {
	// @step:initialize
	memo := make(map[int]int) // @step:initialize
	return minCoins(amount, coins, memo) // @step:complete
}

func main() {
	amount := 11
	coins := []int{1, 5, 6, 9}
	result := coinChangeMinMemoization(amount, coins)
	fmt.Printf("Min coins for %d: %d\n", amount, result)
}
