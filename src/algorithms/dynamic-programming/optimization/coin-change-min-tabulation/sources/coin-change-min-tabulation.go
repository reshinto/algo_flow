// Coin Change (Min Coins) tabulation — find minimum coins needed to make amount

package main

import (
	"fmt"
	"math"
)

func coinChangeMinTabulation(amount int, coins []int) int {
	// @step:initialize
	tableSize := amount + 1 // @step:initialize
	dpTable := make([]int, tableSize)
	for idx := range dpTable {
		dpTable[idx] = math.MaxInt32 // @step:initialize,fill-table
	}
	dpTable[0] = 0 // @step:fill-table
	// For each amount, try every coin and take the minimum
	for currentAmount := 1; currentAmount <= amount; currentAmount++ {
		// @step:compute-cell
		for _, coin := range coins {
			if currentAmount >= coin && dpTable[currentAmount-coin] != math.MaxInt32 {
				// @step:read-cache
				candidate := dpTable[currentAmount-coin] + 1 // @step:read-cache
				if candidate < dpTable[currentAmount] {
					dpTable[currentAmount] = candidate // @step:compute-cell
				}
			}
		}
	}
	if dpTable[amount] == math.MaxInt32 {
		return -1 // @step:complete
	}
	return dpTable[amount] // @step:complete
}

func main() {
	amount := 11
	coins := []int{1, 5, 6, 9}
	result := coinChangeMinTabulation(amount, coins)
	fmt.Printf("Min coins for %d: %d\n", amount, result)
}
