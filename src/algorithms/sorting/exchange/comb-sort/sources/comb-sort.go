// Comb Sort — improved bubble sort using a shrinking gap (factor 1.3) to eliminate turtles
package main

func combSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize
	const shrinkFactor = 1.3                    // @step:initialize
	gap := arrayLength                          // @step:initialize
	sorted := false                             // @step:initialize

	for !sorted {
		// Shrink the gap by the shrink factor
		// @step:gap-update
		gap = int(float64(gap) / shrinkFactor) // @step:gap-update
		if gap <= 1 {
			gap = 1
			sorted = true // assume sorted until a swap proves otherwise
		}

		// Perform a pass with the current gap
		for startIndex := 0; startIndex+gap < arrayLength; startIndex++ {
			compareIndex := startIndex + gap
			// @step:compare
			if sortedArray[startIndex] > sortedArray[compareIndex] {
				// @step:swap
				sortedArray[startIndex], sortedArray[compareIndex] = sortedArray[compareIndex], sortedArray[startIndex] // @step:swap
				sorted = false // a swap occurred — need another pass
			}
		}
	}

	// All elements are now in their sorted positions
	// @step:mark-sorted

	return sortedArray // @step:complete
}
