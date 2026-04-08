// Bitonic Sort — build a bitonic sequence then merge to sort; works best on power-of-2 sizes
package main

import "math"

func bitonicSort(inputArray []int) []int {
	// @step:initialize
	arrayLength := len(inputArray) // @step:initialize
	if arrayLength <= 1 {
		return append([]int{}, inputArray...) // @step:initialize
	}

	// Pad to the next power of 2 with math.MaxInt so real elements always sort first
	paddedLength := 1 // @step:initialize
	for paddedLength < arrayLength {
		paddedLength <<= 1 // @step:initialize
	}
	sortedArray := append([]int{}, inputArray...) // @step:initialize
	for len(sortedArray) < paddedLength {
		sortedArray = append(sortedArray, math.MaxInt) // @step:initialize
	}

	// Bitonic sort network: outer stage controls the sub-sequence size
	for stage := 2; stage <= paddedLength; stage <<= 1 {
		// Each stage doubles the size of sorted bitonic sequences
		for step := stage >> 1; step > 0; step >>= 1 {
			// @step:compare
			for elementIndex := 0; elementIndex < paddedLength; elementIndex++ {
				partnerIndex := elementIndex ^ step // @step:compare

				if partnerIndex > elementIndex {
					// @step:compare
					isAscending := (elementIndex & stage) == 0 // @step:compare

					if isAscending && sortedArray[elementIndex] > sortedArray[partnerIndex] {
						// @step:swap
						sortedArray[elementIndex], sortedArray[partnerIndex] = sortedArray[partnerIndex], sortedArray[elementIndex] // @step:swap
					} else if !isAscending && sortedArray[elementIndex] < sortedArray[partnerIndex] {
						// @step:swap
						sortedArray[elementIndex], sortedArray[partnerIndex] = sortedArray[partnerIndex], sortedArray[elementIndex] // @step:swap
					}
				}
			}
		}
	}

	// @step:mark-sorted
	return sortedArray[:arrayLength] // @step:complete
}
