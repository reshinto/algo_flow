// 0/1 Knapsack (Tabulation) — max value from items with weight/value pairs within capacity

package main

import "fmt"

func knapsack01(weights []int, values []int, capacity int) int {
	// @step:initialize
	itemCount := len(weights) // @step:initialize
	dpTable := make([]int, capacity+1) // @step:initialize,fill-table
	// For each item, iterate capacity right-to-left to enforce 0/1 constraint
	for itemIndex := 0; itemIndex < itemCount; itemIndex++ {
		// @step:compute-cell
		itemWeight := weights[itemIndex] // @step:compute-cell
		itemValue := values[itemIndex]   // @step:compute-cell
		for capacityW := capacity; capacityW >= itemWeight; capacityW-- {
			// @step:read-cache
			withoutItem := dpTable[capacityW]                    // @step:read-cache
			withItem := dpTable[capacityW-itemWeight] + itemValue // @step:read-cache
			if withItem > withoutItem {
				dpTable[capacityW] = withItem // @step:compute-cell
			}
		}
	}
	return dpTable[capacity] // @step:complete
}

func main() {
	weights := []int{2, 3, 4, 5}
	values := []int{3, 4, 5, 6}
	capacity := 8
	result := knapsack01(weights, values, capacity)
	fmt.Printf("Max knapsack value: %d\n", result)
}
