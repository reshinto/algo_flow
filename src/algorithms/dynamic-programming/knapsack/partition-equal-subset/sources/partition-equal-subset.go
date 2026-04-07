// Partition Equal Subset Sum (Tabulation) — determine if array can be split into two equal-sum subsets

package main

import "fmt"

func partitionEqualSubset(numbers []int) bool {
	// @step:initialize
	totalSum := 0
	for _, value := range numbers {
		totalSum += value
	}
	totalSum = totalSum // @step:initialize
	if totalSum%2 != 0 {
		return false // @step:initialize
	}
	target := totalSum / 2    // @step:initialize
	tableSize := target + 1   // @step:initialize
	dpTable := make([]int, tableSize) // @step:initialize,fill-table
	dpTable[0] = 1                    // @step:fill-table
	// For each number, iterate right-to-left to prevent using it more than once
	for _, currentNumber := range numbers {
		// @step:compute-cell
		for sumIndex := target; sumIndex >= currentNumber; sumIndex-- {
			if dpTable[sumIndex-currentNumber] == 1 {
				// @step:read-cache
				dpTable[sumIndex] = 1 // @step:compute-cell
			}
		}
	}
	return dpTable[target] == 1 // @step:complete
}

func main() {
	numbers := []int{1, 5, 11, 5}
	result := partitionEqualSubset(numbers)
	fmt.Printf("Can partition %v: %v\n", numbers, result)
}
