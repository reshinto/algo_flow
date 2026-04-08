// Bitonic Sort Network — fixed compare-swap network for power-of-2 sizes
package main

import "math"

func bitonicSortNetwork(inputArray []int) []int {
	// @step:initialize
	sortedArray := append([]int{}, inputArray...) // @step:initialize
	originalLength := len(sortedArray)            // @step:initialize

	// Pad to next power of 2 with large sentinel values
	paddedLength := 1 // @step:initialize
	for paddedLength < originalLength {
		// @step:initialize
		paddedLength *= 2 // @step:initialize
	}
	for len(sortedArray) < paddedLength {
		// @step:initialize
		sortedArray = append(sortedArray, math.MaxInt) // @step:initialize
	}

	// Bitonic sort network: log2(n) stages, each with sub-stages of compare-swap pairs
	for stageSize := 2; stageSize <= paddedLength; stageSize *= 2 {
		// @step:compare
		for subSize := stageSize; subSize >= 2; subSize /= 2 {
			// @step:compare
			halfSubSize := subSize / 2 // @step:compare
			for elementIndex := 0; elementIndex < paddedLength; elementIndex++ {
				// @step:compare
				partnerIndex := elementIndex ^ halfSubSize // @step:compare
				if partnerIndex > elementIndex {
					// @step:compare
					ascending := (elementIndex & stageSize) == 0 // @step:compare
					if (ascending && sortedArray[elementIndex] > sortedArray[partnerIndex]) ||
						(!ascending && sortedArray[elementIndex] < sortedArray[partnerIndex]) {
						// @step:swap
						sortedArray[elementIndex], sortedArray[partnerIndex] = sortedArray[partnerIndex], sortedArray[elementIndex] // @step:swap
					}
				}
			}
		}
	}

	// Remove padding sentinels
	// @step:mark-sorted
	result := sortedArray[:originalLength] // @step:mark-sorted

	return result // @step:complete
}
