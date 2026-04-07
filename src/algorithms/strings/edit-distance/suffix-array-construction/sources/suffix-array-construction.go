// Suffix Array Construction (naive approach)
// Generates all suffixes of a string, sorts them lexicographically,
// and returns the array of starting indices in sorted suffix order.
// Time: O(n log²n) due to string comparisons during sort, Space: O(n)

package main

import "sort"

func suffixArrayConstruction(text string) []int {
	textLength := len(text) // @step:initialize

	if textLength == 0 {
		return []int{} // @step:complete
	}

	// Build array of suffix starting indices [0, 1, ..., n-1]
	suffixIndices := make([]int, textLength)
	for idx := range suffixIndices {
		suffixIndices[idx] = idx // @step:initialize
	}

	// Sort indices by their corresponding suffix lexicographically
	sort.Slice(suffixIndices, func(firstIdx, secondIdx int) bool {
		// @step:compare
		firstSuffix := text[suffixIndices[firstIdx]:] // @step:compare
		secondSuffix := text[suffixIndices[secondIdx]:] // @step:compare
		return firstSuffix < secondSuffix // @step:compare
	})

	return suffixIndices // @step:complete
}
