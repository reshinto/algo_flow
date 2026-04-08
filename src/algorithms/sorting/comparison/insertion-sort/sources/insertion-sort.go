// Insertion Sort — insert each element into the correct position within the sorted prefix
package main

func insertionSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	for outerIndex := 1; outerIndex < arrayLength; outerIndex++ {
		// @step:outer-loop
		currentValue := sortedArray[outerIndex] // @step:outer-loop
		innerIndex := outerIndex - 1            // @step:outer-loop

		// Shift elements that are greater than currentValue one position to the right
		for innerIndex >= 0 && sortedArray[innerIndex] > currentValue {
			// @step:compare
			sortedArray[innerIndex+1] = sortedArray[innerIndex] // @step:swap
			innerIndex--                                        // @step:swap
		}

		// Place currentValue in its correct sorted position
		sortedArray[innerIndex+1] = currentValue // @step:mark-sorted
	}

	return sortedArray // @step:complete
}
