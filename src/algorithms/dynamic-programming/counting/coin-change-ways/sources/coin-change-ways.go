// Coin Change Ways (Tabulation) — count distinct ways to make each amount using given coins

package main

import "fmt"

func coinChangeWays(amount int, coins []int) int {
	// @step:initialize
	dpTable := make([]int, amount+1) // @step:initialize,fill-table
	dpTable[0] = 1                   // @step:fill-table
	// Outer loop over coins — ordering ensures we count combinations, not permutations
	for _, coin := range coins {
		// @step:compute-cell
		for currentAmount := coin; currentAmount <= amount; currentAmount++ {
			// @step:compute-cell
			dpTable[currentAmount] += dpTable[currentAmount-coin] // @step:compute-cell,read-cache
		}
	}
	return dpTable[amount] // @step:complete
}

func main() {
	amount := 5
	coins := []int{1, 2, 5}
	result := coinChangeWays(amount, coins)
	fmt.Printf("Ways to make %d: %d\n", amount, result)
}
