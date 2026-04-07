// Odd-Even Merge Sort — Batcher's odd-even transposition sort (correct for all sizes)
package main

import "math"

func oddEvenMergeSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength <= 1 {
		return sortedArray // @step:complete
	}

	// Batcher's odd-even transposition sort:
	// Alternates between odd-phase and even-phase compare-swap passes
	// Requires ceil(n/2) * 2 rounds to sort n elements
	totalRounds := int(math.Ceil(float64(arrayLength)/2.0)) * 2 // @step:merge

	for roundIndex := 0; roundIndex < totalRounds; roundIndex++ {
		// @step:compare
		isOddRound := roundIndex%2 == 0   // @step:compare
		startIndex := 1                   // @step:compare
		if isOddRound {
			startIndex = 0 // @step:compare
		}

		for leftIndex := startIndex; leftIndex+1 < arrayLength; leftIndex += 2 {
			// @step:compare
			if sortedArray[leftIndex] > sortedArray[leftIndex+1] {
				// @step:swap
				sortedArray[leftIndex], sortedArray[leftIndex+1] = sortedArray[leftIndex+1], sortedArray[leftIndex] // @step:swap
			}
		}
	}

	// @step:mark-sorted

	return sortedArray // @step:complete
}
