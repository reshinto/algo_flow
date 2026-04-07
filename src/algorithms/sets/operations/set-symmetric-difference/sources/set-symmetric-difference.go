// Set Symmetric Difference using a Hash Set
// Returns all elements in either arrayA or arrayB, but NOT in both (A △ B).
// Time: O(n + m) — O(n) to build the set, O(m) to process B, O(n) to collect remaining
// Space: O(n) for the hash set

package main

import "fmt"

func setSymmetricDifference(arrayA []int, arrayB []int) []int {
	hashSet := make(map[int]struct{}) // @step:initialize
	result := make([]int, 0)         // @step:initialize

	// Phase 1: build the hash set from array A
	for _, valueA := range arrayA {
		hashSet[valueA] = struct{}{} // @step:add-to-set
	}

	// Phase 2: process array B — remove common elements, add unique ones to result
	for _, valueB := range arrayB {
		if _, exists := hashSet[valueB]; exists {
			// valueB is in both arrays — remove it (common element, excluded from result)
			delete(hashSet, valueB) // @step:skip-element
		} else {
			// valueB is only in B — add to result
			result = append(result, valueB) // @step:add-to-result
		}
	}

	// Phase 3: remaining elements in hash set are only in A — add to result
	for remaining := range hashSet {
		result = append(result, remaining) // @step:add-to-result
	}

	return result // @step:complete
}

func main() {
	arrayA := []int{1, 2, 3, 4}
	arrayB := []int{3, 4, 5, 6}
	result := setSymmetricDifference(arrayA, arrayB)
	fmt.Println(result)
}
