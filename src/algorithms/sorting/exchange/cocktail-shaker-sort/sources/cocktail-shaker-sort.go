// Cocktail Shaker Sort — bidirectional bubble sort sweeping left-to-right then right-to-left
package main

func cocktailShakerSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize
	leftBound := 0                              // @step:initialize
	rightBound := arrayLength - 1              // @step:initialize
	swapped := true                             // @step:initialize

	for swapped {
		swapped = false

		// Forward pass: left to right — bubble largest unsorted element to rightBound
		// @step:forward-pass
		for forwardIndex := leftBound; forwardIndex < rightBound; forwardIndex++ {
			// @step:compare
			if sortedArray[forwardIndex] > sortedArray[forwardIndex+1] {
				// @step:swap
				sortedArray[forwardIndex], sortedArray[forwardIndex+1] = sortedArray[forwardIndex+1], sortedArray[forwardIndex] // @step:swap
				swapped = true // @step:swap
			}
		}

		// The rightmost unsorted element is now sorted
		// @step:mark-sorted
		rightBound--

		if !swapped {
			break
		}
		swapped = false

		// Backward pass: right to left — bubble smallest unsorted element to leftBound
		// @step:backward-pass
		for backwardIndex := rightBound; backwardIndex > leftBound; backwardIndex-- {
			// @step:compare
			if sortedArray[backwardIndex-1] > sortedArray[backwardIndex] {
				// @step:swap
				sortedArray[backwardIndex], sortedArray[backwardIndex-1] = sortedArray[backwardIndex-1], sortedArray[backwardIndex] // @step:swap
				swapped = true // @step:swap
			}
		}

		// The leftmost unsorted element is now sorted
		// @step:mark-sorted
		leftBound++
	}

	return sortedArray // @step:complete
}
