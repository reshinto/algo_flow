// Double Selection Sort — find both minimum and maximum in each pass, place at both ends
package main

func doubleSelectionSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	leftBound := 0              // @step:initialize
	rightBound := arrayLength - 1 // @step:initialize

	for leftBound < rightBound {
		minimumIndex := leftBound // @step:compare
		maximumIndex := leftBound // @step:compare

		// Scan between bounds to find both minimum and maximum
		for scanIndex := leftBound + 1; scanIndex <= rightBound; scanIndex++ {
			// @step:compare
			if sortedArray[scanIndex] < sortedArray[minimumIndex] {
				// @step:compare
				minimumIndex = scanIndex // @step:compare
			}
			if sortedArray[scanIndex] > sortedArray[maximumIndex] {
				// @step:compare
				maximumIndex = scanIndex // @step:compare
			}
		}

		// Swap minimum to left bound
		if minimumIndex != leftBound {
			// @step:swap
			sortedArray[leftBound], sortedArray[minimumIndex] = sortedArray[minimumIndex], sortedArray[leftBound] // @step:swap
			// If maximum was at leftBound, it moved to minimumIndex
			if maximumIndex == leftBound {
				maximumIndex = minimumIndex // @step:swap
			}
		}

		// Swap maximum to right bound
		if maximumIndex != rightBound {
			// @step:swap
			sortedArray[rightBound], sortedArray[maximumIndex] = sortedArray[maximumIndex], sortedArray[rightBound] // @step:swap
		}

		// Both ends are now in their sorted positions
		// @step:mark-sorted
		leftBound++  // @step:mark-sorted
		rightBound-- // @step:mark-sorted
	}

	return sortedArray // @step:complete
}
