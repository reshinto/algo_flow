// Multiset Intersection (Bag Intersection) using frequency Maps
// For each element, take the MIN count from arrayA and arrayB.
// Time: O(n + m) — one pass over each array plus iteration over shared keys
// Space: O(n + m) for the two frequency maps

package main

import (
	"fmt"
	"sort"
)

func multisetIntersection(arrayA []int, arrayB []int) []int {
	countsA := make(map[int]int) // @step:initialize
	countsB := make(map[int]int) // @step:initialize
	result := make([]int, 0)    // @step:initialize

	// Phase 1: count frequencies in arrayA
	for _, valueA := range arrayA {
		countsA[valueA]++ // @step:count-element
	}

	// Phase 2: count frequencies in arrayB
	for _, valueB := range arrayB {
		countsB[valueB]++ // @step:count-element
	}

	// Phase 3: for each element in A, take min(countA, countB) copies
	for value, countA := range countsA {
		countB := countsB[value]
		minCount := countA
		if countB < minCount {
			minCount = countB
		}
		// @step:compare-count
		for copyIdx := 0; copyIdx < minCount; copyIdx++ {
			result = append(result, value) // @step:add-to-result
		}
	}

	sort.Ints(result)
	return result // @step:complete
}

func main() {
	arrayA := []int{1, 2, 2, 3, 3, 3}
	arrayB := []int{2, 2, 3, 4}
	result := multisetIntersection(arrayA, arrayB)
	fmt.Println(result)
}
