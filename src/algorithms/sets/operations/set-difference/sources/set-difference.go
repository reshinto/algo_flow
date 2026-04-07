// Set Difference using a Hash Set
// Returns all elements in arrayA that are NOT in arrayB (A \ B).
// Time: O(n + m) — O(m) to build the set, O(n) to filter
// Space: O(m) for the hash set

package main

import "fmt"

func setDifference(arrayA []int, arrayB []int) []int {
	hashSet := make(map[int]struct{}) // @step:initialize
	result := make([]int, 0)         // @step:initialize

	// Phase 1: build the hash set from array B
	for _, valueB := range arrayB {
		hashSet[valueB] = struct{}{} // @step:add-to-set
	}

	// Phase 2: include only elements of array A not found in the hash set
	for _, valueA := range arrayA {
		if _, exists := hashSet[valueA]; exists {
			// valueA exists in B — exclude from result
			_ = valueA // @step:skip-element
		} else {
			// valueA is only in A — include in result
			result = append(result, valueA) // @step:add-to-result
		}
	}

	return result // @step:complete
}

func main() {
	arrayA := []int{1, 2, 3, 4, 5}
	arrayB := []int{3, 4, 5, 6}
	result := setDifference(arrayA, arrayB)
	fmt.Println(result)
}
