// Set Complement using a Hash Set
// Returns all elements in the universal set U that are NOT in set A.
// Complement = U \ A
// Time: O(n + u) — O(n) to build the set from A, O(u) to scan the universal set
// Space: O(n) for the hash set

package main

import "fmt"

func setComplement(arrayA []int, universalSet []int) []int {
	hashSet := make(map[int]struct{}) // @step:initialize
	result := make([]int, 0)         // @step:initialize

	// Phase 1: build the hash set from array A
	for _, valueA := range arrayA {
		hashSet[valueA] = struct{}{} // @step:add-to-set
	}

	// Phase 2: collect elements in the universal set that are NOT in A
	for _, valueU := range universalSet {
		if _, exists := hashSet[valueU]; exists {
			// valueU is in A, so skip it
			_ = valueU // @step:skip-element
		} else {
			// valueU is not in A — it belongs to the complement
			result = append(result, valueU) // @step:add-to-result
		}
	}

	return result // @step:complete
}

func main() {
	arrayA := []int{1, 2, 3}
	universalSet := []int{1, 2, 3, 4, 5}
	result := setComplement(arrayA, universalSet)
	fmt.Println(result)
}
