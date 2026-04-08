// Multiset Union (Bag Union) using frequency Maps
// For each element, take the MAX count from arrayA and arrayB.
// Time: O(n + m) — one pass over each array plus iteration over unique keys
// Space: O(n + m) for the two frequency maps

package main

import (
	"fmt"
	"sort"
)

func multisetUnion(arrayA []int, arrayB []int) []int {
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

	// Phase 3: for each unique element take max(countA, countB) copies
	allKeys := make(map[int]struct{})
	for key := range countsA {
		allKeys[key] = struct{}{}
	}
	for key := range countsB {
		allKeys[key] = struct{}{}
	}

	for value := range allKeys {
		countA := countsA[value]
		countB := countsB[value]
		maxCount := countA
		if countB > maxCount {
			maxCount = countB
		}
		// @step:compare-count
		for copyIdx := 0; copyIdx < maxCount; copyIdx++ {
			result = append(result, value) // @step:add-to-result
		}
	}

	sort.Ints(result)
	return result // @step:complete
}

func main() {
	arrayA := []int{1, 2, 2, 3}
	arrayB := []int{2, 3, 3, 4}
	result := multisetUnion(arrayA, arrayB)
	fmt.Println(result)
}
