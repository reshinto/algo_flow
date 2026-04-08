// Set Union using a Hash Set
// Returns all unique elements from both arrayA and arrayB.
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n + m) for the hash set and result

package main

import "fmt"

func setUnion(arrayA []int, arrayB []int) []int {
	hashSet := make(map[int]struct{}) // @step:initialize
	result := make([]int, 0)         // @step:initialize

	// Phase 1: add all elements of array A to hash set and result
	for _, valueA := range arrayA {
		hashSet[valueA] = struct{}{} // @step:add-to-set
		result = append(result, valueA)
	}

	// Phase 2: add elements of array B that are not already in the hash set
	for _, valueB := range arrayB {
		if _, exists := hashSet[valueB]; exists {
			// valueB already in result — skip
			_ = valueB // @step:skip-element
		} else {
			// valueB is only in array B — add to result
			result = append(result, valueB) // @step:add-to-result
		}
	}

	return result // @step:complete
}

func main() {
	arrayA := []int{1, 2, 3}
	arrayB := []int{3, 4, 5}
	result := setUnion(arrayA, arrayB)
	fmt.Println(result)
}
