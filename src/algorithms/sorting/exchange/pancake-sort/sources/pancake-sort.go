// Pancake Sort — find max in unsorted portion, flip to front, flip to end
// A flip reverses the subarray from index 0 to flipIndex (inclusive) via adjacent swaps
package main

func pancakeSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	for unsortedSize := arrayLength; unsortedSize > 1; unsortedSize-- {
		// Find the index of the maximum element in the unsorted portion
		// @step:find-max
		maxIndex := 0 // @step:find-max
		for searchIndex := 1; searchIndex < unsortedSize; searchIndex++ {
			// @step:compare
			if sortedArray[searchIndex] > sortedArray[maxIndex] {
				maxIndex = searchIndex // @step:compare
			}
		}

		// If the max is not already at the end, flip it there
		if maxIndex != unsortedSize-1 {
			// Flip max to front if not already there
			if maxIndex != 0 {
				// @step:flip
				flipLeft := 0      // @step:flip
				flipRight := maxIndex // @step:flip
				for flipLeft < flipRight {
					// @step:swap
					sortedArray[flipLeft], sortedArray[flipRight] = sortedArray[flipRight], sortedArray[flipLeft] // @step:swap
					flipLeft++
					flipRight--
				}
			}

			// Flip front to end of unsorted portion
			// @step:flip
			flipLeft := 0            // @step:flip
			flipRight := unsortedSize - 1 // @step:flip
			for flipLeft < flipRight {
				// @step:swap
				sortedArray[flipLeft], sortedArray[flipRight] = sortedArray[flipRight], sortedArray[flipLeft] // @step:swap
				flipLeft++
				flipRight--
			}
		}

		// The element at unsortedSize - 1 is now in its sorted position
		// @step:mark-sorted
	}

	return sortedArray // @step:complete
}
