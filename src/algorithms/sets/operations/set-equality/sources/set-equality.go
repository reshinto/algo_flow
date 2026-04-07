// Set Equality using a Hash Set
// Determines whether arrayA and arrayB contain exactly the same unique elements (A = B).
// Two sets are equal iff A ⊆ B and B ⊆ A, which implies equal unique element counts.
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

package main

import "fmt"

func setEquality(arrayA []int, arrayB []int) bool {
	hashSet := make(map[int]struct{}) // @step:initialize
	uniqueCountA := 0

	// Phase 1: build the hash set from arrayA, counting unique elements
	for _, valueA := range arrayA {
		if _, exists := hashSet[valueA]; !exists {
			uniqueCountA++
		}
		hashSet[valueA] = struct{}{} // @step:add-to-set
	}

	// Phase 2: check each element of arrayB for membership; count unique elements in B
	uniqueCountB := 0
	seenInB := make(map[int]struct{})

	for _, valueB := range arrayB {
		if _, seen := seenInB[valueB]; !seen {
			uniqueCountB++
			seenInB[valueB] = struct{}{}
		}

		if _, exists := hashSet[valueB]; exists {
			// valueB is present in arrayA — A ⊇ {valueB} holds so far
			_ = valueB // @step:subset-pass
		} else {
			// valueB is missing from arrayA — sets cannot be equal
			return false // @step:subset-fail
		}
	}

	// Equal iff all B elements are in A and both have the same unique count
	isEqual := uniqueCountA == uniqueCountB
	return isEqual // @step:complete
}

func main() {
	arrayA := []int{1, 2, 3}
	arrayB := []int{3, 1, 2}
	fmt.Println(setEquality(arrayA, arrayB))
}
