// Superset Check using a Hash Set
// Determines whether every element of arrayB also appears in arrayA (A ⊇ B).
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

package main

import "fmt"

func supersetCheck(arrayA []int, arrayB []int) bool {
	hashSet := make(map[int]struct{}) // @step:initialize

	// Phase 1: build the hash set from arrayA
	for _, valueA := range arrayA {
		hashSet[valueA] = struct{}{} // @step:add-to-set
	}

	// Phase 2: check each element of arrayB for membership in the hash set
	for _, valueB := range arrayB {
		if _, exists := hashSet[valueB]; exists {
			// valueB is present in arrayA — condition holds so far
			_ = valueB // @step:subset-pass
		} else {
			// valueB is missing from arrayA — A is not a superset of B
			return false // @step:subset-fail
		}
	}

	return true // @step:complete
}

func main() {
	arrayA := []int{1, 2, 3, 4, 5}
	arrayB := []int{1, 2, 3}
	fmt.Println(supersetCheck(arrayA, arrayB))
}
