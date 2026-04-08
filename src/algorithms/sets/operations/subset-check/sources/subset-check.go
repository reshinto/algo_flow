// Subset Check using a Hash Set
// Determines whether every element of arrayA also appears in arrayB (A ⊆ B).
// Time: O(n + m) — O(m) to build the set, O(n) to check membership
// Space: O(m) for the hash set

package main

import "fmt"

func subsetCheck(arrayA []int, arrayB []int) bool {
	hashSet := make(map[int]struct{}) // @step:initialize

	// Phase 1: build the hash set from arrayB
	for _, valueB := range arrayB {
		hashSet[valueB] = struct{}{} // @step:add-to-set
	}

	// Phase 2: check each element of arrayA for membership in the hash set
	for _, valueA := range arrayA {
		if _, exists := hashSet[valueA]; exists {
			// valueA is present in arrayB — condition holds so far
			_ = valueA // @step:subset-pass
		} else {
			// valueA is missing from arrayB — A is not a subset of B
			return false // @step:subset-fail
		}
	}

	return true // @step:complete
}

func main() {
	arrayA := []int{1, 2, 3}
	arrayB := []int{1, 2, 3, 4, 5}
	fmt.Println(subsetCheck(arrayA, arrayB))
}
