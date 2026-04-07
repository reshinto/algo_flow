// Odd-Even Sort — alternates between comparing odd-indexed and even-indexed adjacent pairs
package main

func oddEvenSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize
	sorted := false                             // @step:initialize

	for !sorted {
		sorted = true

		// Odd phase: compare pairs at (1,2), (3,4), (5,6), ...
		// @step:odd-phase
		for oddIndex := 1; oddIndex < arrayLength-1; oddIndex += 2 {
			// @step:compare
			if sortedArray[oddIndex] > sortedArray[oddIndex+1] {
				// @step:swap
				sortedArray[oddIndex], sortedArray[oddIndex+1] = sortedArray[oddIndex+1], sortedArray[oddIndex] // @step:swap
				sorted = false
			}
		}

		// Even phase: compare pairs at (0,1), (2,3), (4,5), ...
		// @step:even-phase
		for evenIndex := 0; evenIndex < arrayLength-1; evenIndex += 2 {
			// @step:compare
			if sortedArray[evenIndex] > sortedArray[evenIndex+1] {
				// @step:swap
				sortedArray[evenIndex], sortedArray[evenIndex+1] = sortedArray[evenIndex+1], sortedArray[evenIndex] // @step:swap
				sorted = false
			}
		}
	}

	// All elements are in their sorted positions
	// @step:mark-sorted

	return sortedArray // @step:complete
}
