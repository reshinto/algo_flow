// Set Intersection using a Hash Set
// Returns all elements that appear in both arrayA and arrayB (no duplicates).
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

package main

import "fmt"

func setIntersection(arrayA []int, arrayB []int) []int {
	hashSet := make(map[int]struct{}) // @step:initialize
	result := make([]int, 0)         // @step:initialize

	// Phase 1: build the hash set from array A
	for _, valueA := range arrayA {
		hashSet[valueA] = struct{}{} // @step:add-to-set
	}

	// Phase 2: check each element of array B for membership
	for _, valueB := range arrayB {
		if _, exists := hashSet[valueB]; exists {
			// valueB is in both arrays
			result = append(result, valueB) // @step:member-found
			delete(hashSet, valueB)         // prevent duplicate results
		} else {
			// valueB is only in array B
			_ = valueB // @step:member-not-found
		}
	}

	return result // @step:complete
}

func main() {
	arrayA := []int{1, 2, 3, 4}
	arrayB := []int{3, 4, 5, 6}
	result := setIntersection(arrayA, arrayB)
	fmt.Println(result)
}
